// screens-b.jsx — result, connect, expense, salary setup, account map, AI, piggy
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

// ─── Character archetypes ───
const CHARACTERS = {
  safe: {
    id:'safe', name:'금고 수호자',
    tagline:'불필요한 흔들림 없이,\n자산을 단단하게 지켜가는 타입이에요.',
    img:'assets/img-38064fd39c25.png',
    chips:[['🪙','저축 중심'],['🍎','리스크 회피'],['📊','지출 통제'],['💵','현금 흐름 유지'],['📈','장기 안정 추구']],
    salary:280, ratio:{salary:55, save:25, buf:20}, monthly:'2,800,000',
  },
  balanced: {
    id:'balanced', name:'흐름 조율자',
    tagline:'상황에 맞게 흐름을 읽고, 수입과 지출을\n균형 있게 움직이는 타입이에요.',
    img:'assets/img-720033c5005e.png',
    chips:[['📊','분산 관리'],['🎯','리스크 조절'],['🛒','유연한 소비'],['💡','상황 대응'],['📈','균형 성장 추구']],
    salary:300, ratio:{salary:55, save:25, buf:20}, monthly:'3,000,000',
  },
  aggressive: {
    id:'aggressive', name:'수익 증폭자',
    tagline:'기회를 놓치지 않고,\n수익을 빠르게 키워나가는 타입이에요.',
    img:'assets/img-f569cf785b04.png',
    chips:[['🚀','투자 집중'],['🎲','변동성 수용'],['💸','소비 적극성'],['⚡','빠른 의사결정'],['📈','고속 성장 추구']],
    salary:320, ratio:{salary:45, save:20, buf:35}, monthly:'3,200,000',
  },
};

function computeCharacter(answers) {
  let s = 0;
  if (answers.income === 'flex') s += 1; else if (answers.income === 'steady') s -= 1;
  if (answers.consume === 'spend') s += 1; else if (answers.consume === 'save') s -= 1;
  if (answers.risk === 'seek') s += 1.4; else if (answers.risk === 'avoid') s -= 1.4;
  if (answers.stress === 'high') s -= .5;
  if (answers.control === 'low') s += 1; else if (answers.control === 'high') s -= 1;
  if (answers.payment === 'perf') s += 1; else if (answers.payment === 'steady') s -= 1;
  if (s >= 1.2) return 'aggressive';
  if (s <= -1.2) return 'safe';
  return 'balanced';
}

// Korean ornamental corner bracket
function CornerBracket({ pos, color = 'rgba(255,255,255,.7)' }) {
  const map = {
    tl:{top:14, left:14,  rotate:0},
    tr:{top:14, right:14, rotate:90},
    bl:{bottom:14, left:14,  rotate:-90},
    br:{bottom:14, right:14, rotate:180},
  };
  const s = map[pos];
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" style={{position:'absolute', ...s, transform:`rotate(${s.rotate}deg)`}}>
      <path d="M2 18V4h14" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// 10 — Result card with flip
// ─────────────────────────────────────────────────────────
function ResultScreen({ characterKey, onNext, onBack }) {
  const ch = CHARACTERS[characterKey];
  const [flipped, setFlipped] = useStateB(false);
  useEffectB(() => {
    setFlipped(false);
    const t = setTimeout(() => setFlipped(true), 1800);
    return () => clearTimeout(t);
  }, [characterKey]);

  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:T.brand, overflow:'hidden', display:'flex', flexDirection:'column'}}>
      <div style={{height:T.safeTop}}/>
      <div style={{padding:'4px 8px 0'}}>
        <BackChevron onBack={onBack} color="#fff"/>
      </div>

      {/* twinkles backdrop */}
      <div style={{position:'absolute', inset:0, pointerEvents:'none'}}>
        {Array.from({length:14}).map((_,i)=>(
          <div key={i} className="twinkle" style={{
            position:'absolute',
            left:`${(i*53)%100}%`, top:`${5 + (i*37)%80}%`,
            color:'#fff', opacity:.45, fontSize:8 + (i%4)*4,
            animationDelay:`${(i*0.13)%2}s`,
          }}>✦</div>
        ))}
      </div>

      <div style={{padding:'14px 24px 0', textAlign:'center', color:'#fff'}}>
        <div style={{fontWeight:800, fontSize:22, letterSpacing:'-.045em', lineHeight:1.4}}>
          사장님에게 맞는<br/>월급 기준을 찾았어요
        </div>
      </div>

      <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'12px 24px'}}>
        <div onClick={() => setFlipped(f => !f)} style={{width:300, height:412, perspective:1400, cursor:'pointer'}}>
          <div style={{
            width:'100%', height:'100%', position:'relative', transformStyle:'preserve-3d',
            transition:'transform 1s cubic-bezier(.4,.1,.2,1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
          }}>
            {/* face up - gradient with chips */}
            <div style={{
              position:'absolute', inset:0, borderRadius:18, backfaceVisibility:'hidden',
              background:`linear-gradient(180deg, ${T.teal} 0%, ${T.brand} 100%)`,
              border:'1px solid rgba(255,255,255,.4)',
              boxShadow:'0 18px 40px rgba(0,0,0,.25)',
              padding:'34px 22px 26px',
              display:'flex', flexDirection:'column', alignItems:'center',
            }}>
              <CornerBracket pos="tl"/><CornerBracket pos="tr"/><CornerBracket pos="bl"/><CornerBracket pos="br"/>
              <div className="float" style={{marginTop:14, height:200, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <img src={ch.img} className="nodrag" style={{maxHeight:200, maxWidth:'85%', objectFit:'contain', filter:'drop-shadow(0 8px 14px rgba(0,0,0,.2))'}}/>
              </div>
              <div style={{marginTop:6, color:'#fff', fontWeight:800, fontSize:22, letterSpacing:'-.04em'}}>{ch.name}</div>
              <div style={{marginTop:14, display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center', padding:'0 4px'}}>
                {ch.chips.map(([emo, txt]) => (
                  <div key={txt} style={{
                    padding:'5px 10px', borderRadius:9999, background:T.chipDark, color:'#fff',
                    fontSize:11, fontWeight:600, letterSpacing:'-.04em',
                    display:'inline-flex', alignItems:'center', gap:4,
                  }}><span style={{fontSize:10}}>{emo}</span>{txt}</div>
                ))}
              </div>
            </div>
            {/* face down - white card with tagline */}
            <div style={{
              position:'absolute', inset:0, borderRadius:18, backfaceVisibility:'hidden', transform:'rotateY(180deg)',
              background:'#fff',
              border:`1px solid ${T.line}`,
              boxShadow:'0 18px 40px rgba(0,0,0,.25)',
              padding:'30px 24px 26px',
              display:'flex', flexDirection:'column', alignItems:'center',
            }}>
              <CornerBracket pos="tl" color={T.brand}/><CornerBracket pos="tr" color={T.brand}/>
              <CornerBracket pos="bl" color={T.brand}/><CornerBracket pos="br" color={T.brand}/>
              <div className="float" style={{marginTop:18, height:220, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <img src={ch.img} className="nodrag" style={{maxHeight:220, maxWidth:'85%', objectFit:'contain', filter:'drop-shadow(0 6px 12px rgba(0,0,0,.18))'}}/>
              </div>
              <div style={{marginTop:8, color:T.ink, fontWeight:800, fontSize:22, letterSpacing:'-.045em'}}>{ch.name}</div>
              <div style={{marginTop:12, color:T.muted, fontSize:13, fontWeight:500, letterSpacing:'-.04em', textAlign:'center', whiteSpace:'pre-line', lineHeight:1.55}}>
                {ch.tagline}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:'4px 32px 18px', textAlign:'center', color:'#fff', fontSize:13, fontWeight:500, letterSpacing:'-.04em', lineHeight:1.55}}>
        이제 수입과 지출 데이터를 연결하면,<br/>더 정확한 월급과 저금통 버퍼를 추천해 드릴게요
      </div>
      <div style={{padding:'0 22px 28px'}}>
        <PrimaryButton bg="#fff" disabled={!flipped} onClick={onNext}>월급 추천받기</PrimaryButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 11 — Connect Loading (white bg, character)
// ─────────────────────────────────────────────────────────
function ConnectLoadingScreen({ onDone, characterKey }) {
  const ch = CHARACTERS[characterKey];
  useEffectB(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div style={{height:T.safeTop}}/>
      <div style={{marginTop:60}}>
        <Bubble>조금만 기다려주세요.</Bubble>
      </div>
      <div className="float" style={{marginTop:60, height:240, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <img src={ch.img} className="nodrag" style={{height:230, objectFit:'contain', filter:'drop-shadow(0 12px 18px rgba(95,121,255,.25))'}}/>
      </div>
      <div style={{marginTop:30, fontWeight:800, fontSize:20, color:T.ink, textAlign:'center', letterSpacing:'-.045em', lineHeight:1.4}}>
        월급 추천을 위한<br/>데이터 연동 중 입니다
      </div>
      <div style={{marginTop:24, fontSize:12, color:T.muted, textAlign:'center', letterSpacing:'-.04em', lineHeight:1.55}}>
        약 10초 정도 소요됩니다.<br/>연동된 금융사: 신한은행, KB국민카드 외 4곳
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 11b — Connect complete (confetti)
// ─────────────────────────────────────────────────────────
function ConnectScreen({ onNext, onBack }) {
  // confetti shapes — pastel ovals
  const blobs = [
    {c:'#A5C9F2', x:'18%', y:'10%', w:60, h:18, r:30},
    {c:'#FBB7B0', x:'42%', y:'8%',  w:58, h:18, r:30},
    {c:'#F8E174', x:'66%', y:'13%', w:56, h:18, r:30},
    {c:'#C8B6F2', x:'76%', y:'24%', w:60, h:20, r:30},
    {c:'#FBC0E2', x:'82%', y:'36%', w:48, h:14, r:30},
    {c:'#B0F2D4', x:'12%', y:'30%', w:54, h:16, r:30},
    {c:'#9DC4F8', x:'8%',  y:'46%', w:60, h:20, r:30},
    {c:'#D9CDF5', x:'26%', y:'24%', w:50, h:16, r:30},
  ];
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', display:'flex', flexDirection:'column'}}>
      <div style={{height:T.safeTop}}/>
      {/* confetti */}
      <div style={{position:'relative', height:240}}>
        {blobs.map((b,i) => (
          <div key={i} style={{
            position:'absolute', left:b.x, top:b.y, width:b.w, height:b.h,
            background:b.c, borderRadius:b.r, transform:`rotate(${(i*47)%80 - 40}deg)`,
          }}/>
        ))}
      </div>

      <div style={{padding:'10px 24px 0', textAlign:'center'}}>
        <div style={{fontWeight:800, fontSize:22, color:T.ink, letterSpacing:'-.045em', lineHeight:1.35}}>
          데이터 연동 완료!
        </div>
        <div style={{marginTop:12, fontSize:13, color:T.muted, letterSpacing:'-.04em', lineHeight:1.6}}>
          최근 3개월간의 계좌 및 카드 거래 내역을<br/>분석하여 사장님의 고정 지출을 분류했습니다.
        </div>
      </div>

      <div style={{padding:'30px 24px 0'}}>
        <div style={{padding:'16px 16px', background:T.surface1, borderRadius:12}}>
          <div style={{display:'flex', alignItems:'center', gap:6, fontWeight:700, fontSize:13, color:T.ink2, letterSpacing:'-.04em'}}>
            <span style={{fontSize:14}}>🛡️</span> 보안 및 정확성 안내
          </div>
          <div style={{marginTop:8, fontSize:12, color:T.muted, letterSpacing:'-.04em', lineHeight:1.65}}>
            본 데이터는 금융결제원의 표준 API를 통해 안전하게 수집되었습니다. 수집된 정보는 분석 목적 이외에 절대 사용되지 않으며, 암호화되어 보호됩니다.
          </div>
        </div>
      </div>

      <div style={{flex:1}}/>
      <div style={{padding:'0 22px 28px'}}>
        <PrimaryButton onClick={onNext}>내역 확인하기</PrimaryButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 12 — Fixed expense
// ─────────────────────────────────────────────────────────
function ExpenseScreen({ onNext, onBack }) {
  const items = [
    {k:'rent', name:'임대료',     avg:'동종업계 평균 210만원', amt:'250', icon:'🏢'},
    {k:'wage', name:'인건비',     avg:'동종업계 평균 85만원',  amt:'59',  icon:'👩'},
    {k:'loan', name:'대출 이자',  avg:'동종업계 평균 45만원',  amt:'38',  icon:'📒'},
    {k:'fix',  name:'고정비/관리비', avg:'동종업계 평균 45만원', amt:'30',  icon:'📋'},
  ];
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', display:'flex', flexDirection:'column'}}>
      <div style={{height:T.safeTop}}/>
      <div style={{padding:'4px 8px 0'}}><BackChevron onBack={onBack}/></div>

      <div style={{padding:'4px 24px 0', textAlign:'center'}}>
        <div style={{fontWeight:800, fontSize:21, color:T.ink, letterSpacing:'-.045em', lineHeight:1.4}}>
          최근 3개월 데이터를 기준으로<br/>매달 약 <span style={{color:T.ink}}>377만원</span>이<br/>고정적으로 지출되고 있어요
        </div>
      </div>

      {/* bubble + character */}
      <div style={{position:'relative', margin:'18px 24px 0', minHeight:74}}>
        <Bubble bg={T.bubble} color={T.muted} style={{display:'block'}}>
          {`지출 내역은 계좌/카드 분석 결과로 측정되었습니다.\n불필요한 항목은 탭하여 제외하세요.`}
        </Bubble>
        <img src="assets/img-9da587cc4ccb.png" className="nodrag float" style={{position:'absolute', right:-6, bottom:-12, height:64}}/>
      </div>

      <div className="scrolly" style={{flex:1, padding:'18px 22px 0'}}>
        {/* lime summary */}
        <div style={{
          height:54, background:T.lime, borderRadius:12, padding:'0 18px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          boxShadow:'0 4px 10px rgba(213,230,65,.4)', marginBottom:8,
        }}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <span style={{fontSize:18}}>💰</span>
            <span style={{fontWeight:700, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>합계 지출액</span>
          </div>
          <div style={{fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.04em'}}>377만원</div>
        </div>

        {items.map(it => (
          <div key={it.k} style={{
            display:'flex', alignItems:'center', gap:12, padding:'14px 18px',
            border:`1px solid ${T.line}`, borderRadius:12, marginBottom:8,
          }}>
            <div style={{width:34, height:34, borderRadius:8, background:T.surface1, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16}}>{it.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>{it.name}</div>
              <div style={{fontSize:11, color:T.muted2, letterSpacing:'-.04em', marginTop:2}}>{it.avg}</div>
            </div>
            <div style={{fontWeight:700, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>{it.amt} 만원</div>
          </div>
        ))}

        <div style={{marginTop:6, marginBottom:14}}>
          <OutlineButton>＋ 항목 추가하기</OutlineButton>
        </div>
      </div>

      <div style={{padding:'8px 22px 24px'}}>
        <PrimaryButton onClick={onNext}>월급 설정하기</PrimaryButton>
        <div style={{textAlign:'center', marginTop:10, fontSize:11, color:T.muted2, letterSpacing:'-.04em'}}>
          놓친 게 있다면 나중에 수정할 수 있어요!
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 13 — Salary setup with slider
// ─────────────────────────────────────────────────────────
function SalarySetupScreen({ onNext, onBack, characterKey }) {
  const [val, setVal] = useStateB(230);
  const min = 100, max = 400;
  const pct = (val - min) / (max - min);
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', display:'flex', flexDirection:'column'}}>
      <div style={{height:T.safeTop}}/>
      <div style={{padding:'4px 8px 0'}}><BackChevron onBack={onBack}/></div>

      <div style={{padding:'8px 24px 0', textAlign:'center'}}>
        <div style={{display:'inline-block', padding:'6px 14px', borderRadius:9999, background:T.lime, fontSize:12, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>월급 설정</div>
        <div style={{marginTop:14, fontWeight:800, fontSize:22, color:T.ink, letterSpacing:'-.045em', lineHeight:1.4}}>
          매달 이정도는<br/>월급으로 받을 수 있어요
        </div>
      </div>

      <div className="float" style={{display:'flex', justifyContent:'center', marginTop:16, height:200, alignItems:'center'}}>
        <img src="assets/img-9da587cc4ccb.png" className="nodrag" style={{height:200, objectFit:'contain', filter:'drop-shadow(0 10px 16px rgba(95,121,255,.18))'}}/>
      </div>

      {/* slider */}
      <div style={{padding:'18px 32px 0', position:'relative'}}>
        <div style={{position:'relative', height:48}}>
          {/* tooltip */}
          <div style={{
            position:'absolute', left:`calc(${pct * 100}% - 26px)`, top:0,
            padding:'4px 10px', background:T.lime, borderRadius:9999,
            fontWeight:800, fontSize:12, color:T.ink, letterSpacing:'-.04em', minWidth:52, textAlign:'center',
            transition:'left .12s ease',
          }}>{val}만원</div>
          {/* track */}
          <div style={{position:'absolute', left:0, right:0, top:32, height:6, borderRadius:9999, background:T.surface2, overflow:'hidden'}}>
            <div style={{height:'100%', width:`${pct*100}%`, background:T.lime}}/>
          </div>
          {/* knob */}
          <div style={{position:'absolute', left:`calc(${pct*100}% - 11px)`, top:24, width:22, height:22, borderRadius:'50%', background:'#fff', border:`2px solid ${T.lime}`, boxShadow:'0 2px 4px rgba(0,0,0,.15)', transition:'left .12s ease'}}/>
          {/* invisible input */}
          <input type="range" min={min} max={max} step={10} value={val} onChange={e=>setVal(Number(e.target.value))}
            style={{position:'absolute', left:0, right:0, top:24, width:'100%', opacity:0, height:24, cursor:'pointer'}}/>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:0, fontSize:12, color:T.muted, fontWeight:600, letterSpacing:'-.04em'}}>
          <span>100만</span><span>200만</span><span>300만</span><span>400만</span>
        </div>
      </div>

      <div style={{padding:'24px 24px 0', textAlign:'center', fontSize:12, color:T.muted, letterSpacing:'-.04em', lineHeight:1.6}}>
        안내된 금액은 사용자의 소득 및 고정 지출에<br/>따라 AI 시뮬레이션 결과입니다.
      </div>

      <div style={{padding:'18px 24px 0'}}>
        <OutlineButton>＋ 제가 설정할게요</OutlineButton>
      </div>

      <div style={{flex:1}}/>
      <div style={{padding:'0 22px 28px'}}>
        <PrimaryButton onClick={onNext}>계좌 설정하기</PrimaryButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 14/15 — Account map
// ─────────────────────────────────────────────────────────
function AccountMapScreen({ onNext, onBack }) {
  // 14 = expense, then 15 = salary — show both phases sequentially
  const [phase, setPhase] = useStateB('expense'); // 'expense' | 'salary'
  const [pickExpense, setPickExpense] = useStateB('a1');
  const [pickSalary, setPickSalary] = useStateB('a2');

  const accounts = [
    {k:'a1', logo:'B', logoBg:'#FFE600', logoFg:'#000', name:'카카오뱅크', tag:'사업', acct:'123-4567-01-011', bal:'12,500,000원'},
    {k:'a2', logo:'B', logoBg:'#FFE600', logoFg:'#000', name:'카카오뱅크', tag:'개인', acct:'123-4567-01-011', bal:'18,000,000원'},
    {k:'a3', logo:'KB', logoBg:'#FFC700', logoFg:'#3D2B1F', name:'국민은행', tag:'개인', acct:'123-4567-01-011', bal:'18,000,000원'},
  ];

  const isExpense = phase === 'expense';
  const value = isExpense ? pickExpense : pickSalary;
  const setValue = isExpense ? setPickExpense : setPickSalary;

  function handleNext() {
    if (isExpense) setPhase('salary');
    else onNext();
  }

  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', display:'flex', flexDirection:'column'}}>
      <div style={{height:T.safeTop}}/>
      <div style={{padding:'4px 8px 0'}}>
        <BackChevron onBack={() => isExpense ? onBack() : setPhase('expense')}/>
      </div>

      <div style={{padding:'4px 24px 0', textAlign:'center'}}>
        <div style={{fontWeight:800, fontSize:21, color:T.ink, letterSpacing:'-.045em', lineHeight:1.4}}>
          {isExpense ? <>고정 지출이 빠져나갈<br/>주거래 계좌를 선택해주세요</> : <>월급을 입금 할<br/>월급 계좌를 선택해주세요</>}
        </div>
        <div style={{marginTop:10, fontSize:13, color:T.muted, letterSpacing:'-.04em', lineHeight:1.55}}>
          {isExpense
            ? <>사장님의 계좌 3개를 확인했어요.<br/>지출 계좌를 설정하면, 월급 계좌를 이어서 설정할 수 있어요.</>
            : <>사장님의 계좌 3개를 확인했어요.<br/>월급 계좌를 설정하면 AI 분석을 볼 수 있어요.</>}
        </div>
      </div>

      <div className="scrolly" style={{flex:1, padding:'24px 22px 0'}}>
        <div style={{fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em', marginBottom:10}}>
          {isExpense ? '고정 지출 계좌 설정' : '월급 계좌 설정'}
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {accounts.map(a => {
            const active = value === a.k;
            return (
              <button key={a.k} className="press" onClick={() => setValue(a.k)} style={{
                display:'flex', alignItems:'center', gap:12, padding:'14px 14px',
                background:'#fff', border:`1px solid ${T.line}`, borderRadius:12,
                textAlign:'left',
              }}>
                <div style={{width:38, height:38, borderRadius:8, background:a.logoBg, color:a.logoFg, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:14}}>{a.logo}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:6}}>
                    <span style={{fontWeight:700, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>{a.name}</span>
                    <span style={{padding:'2px 7px', borderRadius:9999, border:`1px solid ${T.line2}`, fontSize:10, color:T.muted, fontWeight:600}}>{a.tag}</span>
                  </div>
                  <div style={{marginTop:2, fontSize:11, color:T.muted2, letterSpacing:'-.04em'}}>{a.acct}</div>
                  <div style={{marginTop:6, fontSize:11, color:T.muted, letterSpacing:'-.04em'}}>출금 가능 잔액 <b style={{color:T.ink}}>{a.bal}</b></div>
                </div>
                <div style={{
                  width:22, height:22, borderRadius:6, background: active ? T.brand : '#fff',
                  border:`1.5px solid ${active ? T.brand : T.line2}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {active && <svg width="12" height="9" viewBox="0 0 12 9"><path d="M1 4.5L4.5 8L11 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
                </div>
              </button>
            );
          })}
        </div>
        <div style={{marginTop:12}}>
          <OutlineButton>＋ 새 계좌 연결하기</OutlineButton>
        </div>
      </div>

      <div style={{padding:'8px 22px 22px'}}>
        <PrimaryButton onClick={handleNext} disabled={!value}>{isExpense ? '선택 완료' : 'AI 분석 결과 보기'}</PrimaryButton>
        {!isExpense && (
          <div style={{textAlign:'center', marginTop:10, fontSize:12, color:T.muted2, letterSpacing:'-.04em', textDecoration:'underline'}}>
            나중에 설정할게요
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 16 — AI final analysis
// ─────────────────────────────────────────────────────────
function AIResultScreen({ onNext, onBack, characterKey }) {
  const ch = CHARACTERS[characterKey];
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', display:'flex', flexDirection:'column'}}>
      <div style={{height:T.safeTop}}/>
      <div style={{padding:'4px 8px 0'}}><BackChevron onBack={onBack}/></div>

      <div className="scrolly" style={{flex:1, padding:'4px 22px 0'}}>
        <div style={{display:'flex', justifyContent:'center', marginBottom:10}}>
          <div style={{padding:'6px 14px', borderRadius:9999, background:T.lime, fontWeight:700, fontSize:12, color:T.ink, letterSpacing:'-.04em'}}>AI분석완료</div>
        </div>
        <div style={{textAlign:'center', fontWeight:800, fontSize:21, color:T.ink, letterSpacing:'-.045em', lineHeight:1.4}}>
          안정적인 고정비 구조지만,<br/><span style={{color:T.ink}}>비상금 확보가 시급해요</span>
        </div>

        <div className="float" style={{marginTop:18, height:170, display:'flex', justifyContent:'center'}}>
          <img src={ch.img} className="nodrag" style={{height:170, objectFit:'contain', filter:'drop-shadow(0 8px 14px rgba(95,121,255,.15))'}}/>
        </div>
        <div style={{marginTop:6, textAlign:'center', fontWeight:800, fontSize:18, color:T.ink, letterSpacing:'-.04em'}}>{ch.name}</div>
        <div style={{marginTop:6, textAlign:'center', fontSize:12, color:T.muted, letterSpacing:'-.04em', whiteSpace:'pre-line', lineHeight:1.55}}>{ch.tagline}</div>

        {/* white card with shadow */}
        <div style={{
          marginTop:18, padding:'18px 18px 16px', borderRadius:14, background:'#fff',
          border:`1px solid ${T.line}`,
          boxShadow:'0 6px 20px rgba(0,0,0,.06)',
        }}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:6, fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>
              <span style={{display:'inline-flex', alignItems:'center', justifyContent:'center', width:20, height:20, borderRadius:'50%', background:T.surface2, fontSize:11}}>₩</span>
              월급 설정
            </div>
            <div style={{fontWeight:800, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>{ch.salary}만원</div>
          </div>
          <div style={{height:1, background:T.line, margin:'14px 0'}}/>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <span style={{fontSize:14}}>🔍</span>
            <span style={{fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>이렇게 분석했어요</span>
            <span style={{padding:'3px 8px', borderRadius:9999, background:T.lime, fontSize:10, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>AI분석</span>
          </div>
          <div style={{marginTop:10, fontSize:12, color:T.ink2, letterSpacing:'-.04em', lineHeight:1.65}}>
            임대료와 인건비가 전체 지출의 약 80%를 차지하고 있어요.<br/>
            주변 카페 대비 고정 지출은 약 15% 낮은 편이에요.<br/>
            수익 변동에 대비해 고정비의 1.3배 수준인 약 490만원을 비상금으로 준비해두세요.
          </div>

          {/* donut */}
          <div style={{marginTop:18, position:'relative', width:200, height:200, marginLeft:'auto', marginRight:'auto'}}>
            <div style={{
              width:200, height:200, borderRadius:'50%',
              background:`conic-gradient(${T.brand} 0 64.6%, ${T.teal} 64.6% 79.8%, ${T.chipDark} 79.8% 89.6%, #BFB94A 89.6% 97.4%, ${T.muted2} 97.4% 100%)`,
            }}/>
            <div style={{position:'absolute', inset:34, borderRadius:'50%', background:'#fff'}}/>
            {/* labels */}
            <div style={{position:'absolute', right:-6, top:60, fontSize:10, color:T.brand, fontWeight:700}}>임대료 64.6%</div>
            <div style={{position:'absolute', left:-2, top:80, fontSize:10, color:T.teal, fontWeight:700}}>인건비 15.2%</div>
            <div style={{position:'absolute', left:6,  top:46, fontSize:10, color:T.chipDark, fontWeight:700}}>대출이자 9.8%</div>
            <div style={{position:'absolute', left:30, top:20, fontSize:10, color:'#A09824', fontWeight:700}}>고정비 7.8%</div>
            <div style={{position:'absolute', right:34, top:6, fontSize:10, color:T.muted, fontWeight:700}}>관리비 8%</div>
            <div style={{position:'absolute', right:24, top:30, fontSize:10, color:T.muted, fontWeight:700}}>기타 3%</div>
          </div>
          <div style={{marginTop:6, textAlign:'center', fontSize:11, color:T.muted2, letterSpacing:'-.04em'}}>
            사장님의 소비 성향과 리스크 성향을 기반으로 자동 설정되었어요
          </div>
        </div>

        {/* peer comparison */}
        <div style={{
          marginTop:14, padding:'12px 14px', borderRadius:12, background:T.surface1,
          display:'flex', alignItems:'center', gap:12,
        }}>
          <div style={{width:38, height:38, borderRadius:'50%', background:T.brandSoft, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18}}>🥧</div>
          <div style={{flex:1}}>
            <div style={{fontSize:12, color:T.muted, letterSpacing:'-.04em'}}>동종업계 사장님들 대비,</div>
            <div style={{fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em', marginTop:2}}>지출 관리 상위 20%</div>
          </div>
          <div style={{padding:'4px 9px', borderRadius:9999, border:`1px solid ${T.brand}`, color:T.brand, fontSize:11, fontWeight:700, letterSpacing:'-.02em'}}>Excellent</div>
        </div>
        <div style={{height:18}}/>
      </div>

      <div style={{padding:'8px 22px 24px'}}>
        <PrimaryButton onClick={onNext}>내 저금통 설정하러 가기</PrimaryButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 17 — Piggy bank setup
// ─────────────────────────────────────────────────────────
function PiggyScreen({ onFinish, onBack }) {
  const [period, setPeriod] = useStateB('6개월');
  const [target, setTarget] = useStateB('');
  function bump(n) {
    const cur = Number(String(target).replace(/[^0-9]/g,'')) || 0;
    setTarget((cur + n*10000).toLocaleString('en-US'));
  }
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', display:'flex', flexDirection:'column'}}>
      <div style={{height:T.safeTop}}/>
      <div style={{padding:'4px 8px 0'}}><BackChevron onBack={onBack}/></div>

      <div style={{padding:'4px 24px 0', textAlign:'center'}}>
        <div style={{fontWeight:800, fontSize:22, color:T.ink, letterSpacing:'-.045em', lineHeight:1.4}}>
          비상시를 대비한<br/><span style={{color:T.ink}}>저금통을 만들어볼까요?</span>
        </div>
      </div>

      <div className="float" style={{display:'flex', justifyContent:'center', marginTop:14, height:160}}>
        <img src="assets/img-7e26313f8a05.png" className="nodrag" style={{height:160, objectFit:'contain'}}/>
      </div>

      <div style={{padding:'10px 24px 0', textAlign:'center', fontSize:13, color:T.muted, letterSpacing:'-.04em', lineHeight:1.55}}>
        예상치 못한 지출에도 당황하지 않게 도와드려요
      </div>

      <div className="scrolly" style={{flex:1, padding:'18px 22px 0'}}>
        {/* card 1 — target setup */}
        <div style={{padding:'16px 16px', border:`1px solid ${T.line}`, borderRadius:14}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:8, fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>
              <span style={{fontSize:14}}>📅</span> 목표 기준 설정
            </div>
            <div style={{padding:'5px 11px', borderRadius:9999, border:`1px solid ${T.line2}`, fontSize:11, fontWeight:600, color:T.ink2, letterSpacing:'-.04em', display:'flex', alignItems:'center', gap:4}}>
              {period} <span style={{fontSize:9}}>▼</span>
            </div>
          </div>
          <div style={{marginTop:14, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:8, fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>
              <span style={{fontSize:14}}>💼</span> 월 고정비
            </div>
            <div style={{fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>377만원</div>
          </div>
          <div style={{height:1, background:T.line, margin:'14px 0'}}/>
          <div style={{display:'flex', alignItems:'center', gap:8, fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>
            <span style={{fontSize:14}}>🐖</span> 비상금 목표 금액
          </div>
          <div style={{
            marginTop:10, height:54, borderRadius:10, border:`1px solid ${T.line}`,
            display:'flex', alignItems:'center', padding:'0 14px',
          }}>
            <input
              value={target}
              onChange={e => {
                const n = e.target.value.replace(/[^0-9]/g,'');
                setTarget(n ? Number(n).toLocaleString('en-US') : '');
              }}
              placeholder="얼마로 설정할까요?"
              inputMode="numeric"
              style={{flex:1, border:0, outline:0, background:'transparent',
                fontFamily:'inherit', fontSize:15, fontWeight:600, letterSpacing:'-.04em', color:T.ink}}
            />
            {target && <span style={{fontSize:13, color:T.muted}}>원</span>}
          </div>
          <div style={{marginTop:12, display:'flex', gap:6, justifyContent:'center'}}>
            <PillChip onClick={()=>bump(100)}>+100만원</PillChip>
            <PillChip onClick={()=>bump(50)}>+50만원</PillChip>
            <PillChip onClick={()=>bump(10)}>+10만원</PillChip>
            <PillChip onClick={()=>setTarget('')}>정정</PillChip>
          </div>
        </div>

        {/* card 2 — account */}
        <div style={{marginTop:14, padding:'16px 16px', border:`1px solid ${T.line}`, borderRadius:14}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:38, height:38, borderRadius:8, background:'#FFE600', color:'#000', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:14}}>B</div>
            <div style={{flex:1}}>
              <div style={{display:'flex', alignItems:'center', gap:6}}>
                <span style={{fontWeight:700, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>카카오뱅크</span>
                <span style={{padding:'2px 7px', borderRadius:9999, border:`1px solid ${T.line2}`, fontSize:10, color:T.muted, fontWeight:600}}>개인</span>
              </div>
              <div style={{marginTop:2, fontSize:11, color:T.muted2, letterSpacing:'-.04em'}}>123-4567-01-011</div>
            </div>
          </div>
          <div style={{marginTop:14}}>
            <OutlineButton>＋ 새 계좌 연결하기</OutlineButton>
          </div>
        </div>
        <div style={{height:14}}/>
      </div>

      <div style={{padding:'8px 22px 22px'}}>
        <PrimaryButton onClick={onFinish}>월급술사 시작하기</PrimaryButton>
        <div style={{textAlign:'center', marginTop:10, fontSize:12, color:T.muted2, letterSpacing:'-.04em', textDecoration:'underline'}}>
          나중에 설정할게요
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Done splash
// ─────────────────────────────────────────────────────────
function DoneScreen({ onRestart, characterKey }) {
  const ch = CHARACTERS[characterKey];
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:T.brand, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
      {Array.from({length:18}).map((_,i)=>(
        <div key={i} className="twinkle" style={{
          position:'absolute', left:`${(i*47)%100}%`, top:`${(i*29)%100}%`,
          color:'#fff', opacity:.55, fontSize:8 + (i%5)*4,
          animationDelay:`${(i*0.1)%2}s`,
        }}>✦</div>
      ))}
      <div className="float">
        <img src={ch.img} className="nodrag" style={{height:200}}/>
      </div>
      <div style={{marginTop:18, color:'#fff', fontWeight:800, fontSize:24, letterSpacing:'-.045em'}}>준비 완료!</div>
      <div style={{marginTop:8, color:'rgba(255,255,255,.85)', fontSize:14, fontWeight:500, letterSpacing:'-.04em', textAlign:'center', padding:'0 40px', lineHeight:1.55}}>
        {ch.name} 사장님,<br/>이제 매달 적정 월급을 챙겨드릴게요
      </div>
      <button onClick={onRestart} className="press" style={{
        marginTop:36, padding:'14px 30px', borderRadius:50, background:'#fff', color:T.brand,
        fontWeight:700, fontSize:14, letterSpacing:'-.04em',
      }}>처음부터 다시 보기</button>
    </div>
  );
}

Object.assign(window, {
  CHARACTERS, computeCharacter,
  ResultScreen, ConnectScreen, ConnectLoadingScreen,
  SalarySetupScreen, ExpenseScreen, AccountMapScreen,
  AIResultScreen, PiggyScreen, DoneScreen,
});
