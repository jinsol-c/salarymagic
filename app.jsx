// app.jsx — main state machine + iOS frame + Tweaks panel

const { useState: useAppState, useEffect: useAppEffect, useRef: useAppRef, useMemo: useAppMemo } = React;

// Stage scaler — fits the iPhone frame to viewport
function Stage({ children, frameW = 402, frameH = 874 }) {
  const [scale, setScale] = useAppState(1);
  useAppEffect(() => {
    function fit() {
      const padX = 40, padY = 40;
      const w = window.innerWidth - padX, h = window.innerHeight - padY;
      const s = Math.min(w / frameW, h / frameH, 1);
      setScale(s);
    }
    fit(); window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [frameW, frameH]);
  return (
    <div className="stage" style={{transform:`scale(${scale})`,transformOrigin:'center center',width:frameW,height:frameH}}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────
const ROUTES = [
  'intro',
  'industry',
  'salary',
  'q_income','q_consume','q_risk','q_stress','q_control','q_payment',
  'result',
  'connect_loading','connect',
  'expense','salary_setup','account_map',
  'ai_result','piggy','done',
];

const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "characterOverride": "auto",
  "showStepLabel": true
}/*EDITMODE-END*/;

// Preload every character/illustration up-front so screens never flash blank
const PRELOAD_IMAGES = [
  'assets/img-7e26313f8a05.png','assets/img-9da587cc4ccb.png',
  'assets/img-f8776e666fd0.png','assets/img-720033c5005e.png',
  'assets/img-0e51931bcd8e.png','assets/img-248b23f6c896.png',
  'assets/img-38064fd39c25.png','assets/img-f569cf785b04.png',
  'assets/img-45a69417262f.png','assets/img-f173d64a7512.png',
  'assets/char-1.png','assets/char-2.png','assets/char-3.png',
  'assets/char-4.png','assets/char-5.png',
];

function App() {
  useAppEffect(() => {
    PRELOAD_IMAGES.forEach(src => { const i = new Image(); i.src = src; });
  }, []);
  const [route, setRoute] = useAppState('intro');
  const [history, setHistory] = useAppState([]);
  const [industry, setIndustry] = useAppState(null);
  const [salary, setSalary] = useAppState(null);
  const [answers, setAnswers] = useAppState({});
  const [traits, setTraits] = useAppState([]);
  const [showError, setShowError] = useAppState(false);
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULS) : [TWEAK_DEFAULS, ()=>{}];

  const computedKey = computeCharacter(answers);
  const characterKey = (tweaks.characterOverride && tweaks.characterOverride !== 'auto')
    ? tweaks.characterOverride : computedKey;

  function go(next) { setHistory(h => [...h, route]); setRoute(next); }
  function back() {
    setHistory(h => {
      const prev = h[h.length-1];
      if (prev) { setRoute(prev); return h.slice(0,-1); }
      return h;
    });
  }
  function reset() { setRoute('intro'); setHistory([]); setIndustry(null); setSalary(null); setAnswers({}); setTraits([]); }

  function answerQuestion(qid, val, trait) {
    setAnswers(a => ({...a, [qid]: val}));
    setTraits(t => t.includes(trait) ? t : [...t, trait]);
    // auto-advance
    const idx = ROUTES.indexOf(`q_${qid}`);
    setTimeout(() => {
      const nextRoute = ROUTES[idx + 1];
      setHistory(h => [...h, `q_${qid}`]);
      setRoute(nextRoute);
    }, 360);
  }

  // Render current screen
  let screen = null;
  if (route === 'intro') {
    screen = <IntroScreen onNext={() => go('industry')}/>;
  } else if (route === 'industry') {
    screen = <IndustryScreen value={industry} setValue={setIndustry} onNext={()=>go('salary')} onBack={back}/>;
  } else if (route === 'salary') {
    screen = <SalaryScreen value={salary} setValue={setSalary} onNext={()=>go('q_income')} onBack={back}/>;
  } else if (route.startsWith('q_')) {
    const qid = route.slice(2);
    const q = QUESTIONS.find(x => x.id === qid);
    screen = <QuestionScreen
      q={q} value={answers[qid]} traits={traits}
      onAnswer={(val, trait) => answerQuestion(qid, val, trait)}
      onBack={back}/>;
  } else if (route === 'result') {
    screen = <ResultScreen characterKey={characterKey} onNext={()=>go('connect')} onBack={back}/>;
  } else if (route === 'connect_loading') {
    screen = <ConnectLoadingScreen characterKey={characterKey} onDone={()=>{ setHistory(h=>[...h,'connect_loading']); setRoute('connect'); }}/>;
  } else if (route === 'connect') {
    screen = <ConnectScreen onNext={()=>go('expense')} onBack={back}/>;
  } else if (route === 'expense') {
    screen = <ExpenseScreen onNext={()=>go('salary_setup')} onBack={back}/>;
  } else if (route === 'salary_setup') {
    screen = <SalarySetupScreen characterKey={characterKey} onNext={()=>go('account_map')} onBack={back}/>;
  } else if (route === 'account_map') {
    screen = <AccountMapScreen onNext={()=>go('ai_result')} onBack={back}/>;
  } else if (route === 'ai_result') {
    screen = <AIResultScreen characterKey={characterKey} onNext={()=>go('piggy')} onBack={back}/>;
  } else if (route === 'piggy') {
    screen = <PiggyScreen onFinish={()=>go('done')} onBack={back}/>;
  } else if (route === 'done') {
    screen = <DoneScreen characterKey={characterKey} onRestart={reset}/>;
  }

  // route index for jump nav
  const idx = ROUTES.indexOf(route);
  const stepLabel = `${idx+1} / ${ROUTES.length}`;

  return (
    <Stage>
      <IOSDevice width={402} height={874}>
        <div style={{position:'relative',width:'100%',height:'100%',overflow:'hidden',background:'#fff'}}>
          {screen}
          {showError && <NetworkErrorModal onRetry={()=>setShowError(false)}/>}
          {tweaks.showStepLabel && (
            <div style={{position:'absolute',top:64,right:14,padding:'4px 9px',borderRadius:50,background:'rgba(0,0,0,.55)',color:'#fff',fontSize:10,fontWeight:700,letterSpacing:'.06em',zIndex:30,pointerEvents:'none'}}>{stepLabel}</div>
          )}
        </div>
      </IOSDevice>
      {window.TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="결과 캐릭터 타입"/>
          <TweakSelect
            label="타입 강제 지정"
            value={tweaks.characterOverride}
            onChange={v => setTweak('characterOverride', v)}
            options={[
              {value:'auto', label:'자동 (응답 기반)'},
              {value:'balanced', label:'흐름 조율자 (균형형)'},
              {value:'aggressive', label:'수익 증폭자 (공격형)'},
              {value:'safe', label:'금고 수호자 (안정형)'},
            ]}
          />
          <TweakSection label="플로우 점프"/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,padding:'4px 12px 0'}}>
            {[
              ['intro','01 인트로'],
              ['industry','02 업종'],
              ['salary','03 월급'],
              ['q_income','04 Q 수입'],
              ['result','10 결과'],
              ['connect_loading','11 로딩'],
              ['connect','11b 완료'],
              ['expense','12 고정비'],
              ['salary_setup','13 월급'],
              ['account_map','14·15 매핑'],
              ['ai_result','16 AI'],
              ['piggy','17 저금통'],
              ['done','✓ 완료'],
            ].map(([r,l])=>(
              <button key={r} onClick={()=>{ setRoute(r); setHistory([]); }} style={{
                padding:'8px 10px',borderRadius:8,
                background: route===r ? '#5F79FF' : '#F2F3F8',
                color: route===r ? '#fff':'#333',fontSize:11,fontWeight:600,letterSpacing:'-.03em',
                border:0,cursor:'pointer',
              }}>{l}</button>
            ))}
          </div>
          <TweakSection label="예외 화면"/>
          <TweakButton label="네트워크 에러 모달" onClick={()=>setShowError(true)}/>
          <TweakToggle label="단계 인디케이터 표시" value={tweaks.showStepLabel} onChange={v=>setTweak('showStepLabel', v)}/>
        </TweaksPanel>
      )}
    </Stage>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
