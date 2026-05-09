// screens-a.jsx — intro, industry, salary, 6 personality questions
const { useState, useEffect, useRef, useMemo } = React;

// ─── tokens (mirror tokens.css for inline styles) ───
const T = {
  brand:'#5F79FF', brandSoft:'#B8C2FF', brandPress:'#4A64E8',
  teal:'#5DD3C9', lime:'#D5E641',
  ink:'#1A1A1A', ink2:'#3A3A3A', muted:'#7A7A7A', muted2:'#A0A0A0',
  line:'#E6E6E8', line2:'#D8D8DA',
  surface1:'#F7F7F8', surface2:'#ECECEE',
  bubble:'#EBEBEB', circle:'#D7D7D7', chipEmpty:'#E5E5E7',
  chipDark:'#353535', bankBg:'#FAFAFB',
  safeTop:60, padX:24, padBot:30,
};

// ─── shared atoms ───
function BackChevron({ onBack, color = '#222', style }) {
  return (
    <button onClick={onBack} aria-label="뒤로" className="press" style={{
      width: 40, height: 40, display:'flex', alignItems:'center', justifyContent:'center',
      ...style,
    }}>
      <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
        <path d="M9 1L2 10L9 19" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function PrimaryButton({ children, onClick, disabled, bg = T.brand, fg }) {
  const text = fg || (bg === '#fff' || bg === '#FFFFFF' ? T.ink : '#fff');
  const isLight = bg === '#fff' || bg === '#FFFFFF';
  return (
    <button className="press" disabled={disabled} onClick={onClick} style={{
      width:'100%', height:54, borderRadius:30, background:bg, color:text,
      fontWeight:700, fontSize:16, letterSpacing:'-.04em',
      opacity: disabled ? .45 : 1,
      boxShadow: isLight ? '0 8px 22px rgba(0,0,0,.12)' : '0 10px 22px rgba(95,121,255,.28)',
    }}>{children}</button>
  );
}

function OutlineButton({ children, onClick }) {
  return (
    <button className="press" onClick={onClick} style={{
      width:'100%', height:48, borderRadius:24, background:'#fff',
      border:`1px solid ${T.line}`, color:T.ink, fontWeight:600, fontSize:14,
      letterSpacing:'-.04em', display:'flex', alignItems:'center', justifyContent:'center', gap:6,
    }}>{children}</button>
  );
}

function PillChip({ children, onClick, active }) {
  return (
    <button onClick={onClick} className="press" style={{
      padding:'7px 13px', borderRadius:9999,
      border:`1px solid ${active ? T.brand : T.line2}`,
      background: active ? '#fff' : '#fff',
      color: active ? T.brand : T.muted,
      fontWeight:600, fontSize:12, letterSpacing:'-.04em',
    }}>{children}</button>
  );
}

// Speech bubble with downward tail
function Bubble({ children, bg = T.bubble, color = '#5B5B5B', style }) {
  return (
    <div style={{position:'relative', display:'inline-block', ...style}}>
      <div style={{
        background: bg, padding:'10px 18px', borderRadius:24,
        color, fontSize:13, fontWeight:600, letterSpacing:'-.04em',
        textAlign:'center', whiteSpace:'pre-line', lineHeight:1.45,
      }}>{children}</div>
      <svg style={{position:'absolute', left:'50%', transform:'translateX(-50%)', bottom:-7}} width="14" height="8" viewBox="0 0 14 8">
        <path d="M7 8L0 0H14L7 8Z" fill={bg}/>
      </svg>
    </div>
  );
}

// Trait pill (filled = blue outline w/ blue text; empty = gray block)
const TRAIT_LABELS = {
  income_flex:'유연한 수입원', income_steady:'안정형 수입',
  consume_save:'절제형 소비', consume_spend:'자유형 소비',
  risk_avoid:'안전 지향', risk_seek:'리스크 수용',
  stress_high:'세심한 관리 필요', stress_low:'멘탈 안정형',
  control_high:'정액 금여형', control_low:'유연 지출형',
  pay_steady:'정액 선호', pay_perf:'성과 연동형',
};
function TraitChips({ traits }) {
  // 6 slots arranged 4 + 2
  const slots = Array.from({length:6}).map((_,i) => traits[i] || null);
  return (
    <div style={{display:'flex', flexWrap:'wrap', gap:6, padding:'0 0 0 0'}}>
      {slots.map((t,i) => t ? (
        <div key={i} className="pop" style={{
          padding:'5px 12px', borderRadius:9999, border:`1px solid ${T.brand}`,
          color:T.brand, fontWeight:600, fontSize:11, letterSpacing:'-.04em', background:'#fff',
        }}>{TRAIT_LABELS[t] || t}</div>
      ) : (
        <div key={i} style={{
          height:24, width: 60 + (i%3)*8, borderRadius:9999, background:T.chipEmpty,
        }}/>
      ))}
    </div>
  );
}

// Step dots 1..6
function StepDots({ current = 1, total = 6 }) {
  return (
    <div style={{display:'flex', gap:8}}>
      {Array.from({length: total}).map((_,i) => {
        const n = i+1;
        const active = n === current;
        const past = n < current;
        return (
          <div key={i} style={{
            width:24, height:24, borderRadius:'50%',
            background: active ? T.brand : past ? T.brandSoft : '#fff',
            border: active || past ? 'none' : `1px solid ${T.line2}`,
            color: active || past ? '#fff' : T.muted2,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:11, fontWeight:700,
            transition:'all .25s ease',
          }}>{n}</div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 01 — Intro
// ─────────────────────────────────────────────────────────
function IntroScreen({ onNext }) {
  return (
    <div style={{
      position:'relative', width:'100%', height:'100%',
      background:T.brand, overflow:'hidden',
      display:'flex', flexDirection:'column',
    }}>
      <div style={{height:T.safeTop}}/>

      {/* white card */}
      <div style={{
        margin:'14px 22px 0', flex:'0 0 auto',
        background:'#fff', borderRadius:24, padding:'22px 22px 26px',
        boxShadow:'0 24px 48px rgba(0,0,0,.18)',
        display:'flex', flexDirection:'column', alignItems:'center',
        height: 510,
        position:'relative',
      }}>
        {/* speech bubble */}
        <Bubble>1분이면 끝나요</Bubble>

        {/* hero gray circle + character peeking out bottom-right */}
        <div style={{position:'relative', marginTop:32, width:230, height:230}}>
          <div className="float-slow" style={{
            position:'absolute', inset:0, borderRadius:'50%',
            background:T.circle,
          }}/>
          {/* twinkles */}
          <div className="twinkle" style={{position:'absolute', right:24, top:46, fontSize:14, color:'#9F8DFF'}}>✦</div>
          <div className="twinkle" style={{position:'absolute', right:50, top:78, fontSize:10, color:'#9F8DFF', animationDelay:'.5s'}}>✦</div>
          {/* character — placed to peek out bottom-right */}
          <img src="assets/img-7e26313f8a05.png" className="nodrag float" style={{
            position:'absolute',
            right:-22, bottom:-14,
            width:140, height:'auto',
            filter:'drop-shadow(0 6px 12px rgba(0,0,0,.12))',
          }}/>
        </div>

        {/* title */}
        <div style={{
          marginTop:'auto', fontWeight:800, fontSize:22, textAlign:'center',
          letterSpacing:'-.045em', color:T.ink, lineHeight:1.4,
          paddingTop:18,
        }}>
          루팡이가 사장님에게 맞는<br/>월급 루틴 찾아드릴게요
        </div>
      </div>

      {/* below-card description */}
      <div style={{
        padding:'24px 32px 0', textAlign:'center', color:'#fff',
        fontSize:14, fontWeight:500, letterSpacing:'-.04em', lineHeight:1.65,
      }}>
        몇 가지 질문만 답하면, <b>루팡이가</b><br/>
        월급, 비상금, 남는 돈 관리 방식까지<br/>
        딱 맞게 추천해드려요!
      </div>

      <div style={{flex:1}}/>
      <div style={{padding:'0 22px 28px'}}>
        <PrimaryButton bg="#fff" onClick={onNext}>함께하기</PrimaryButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 02 — Industry select
// ─────────────────────────────────────────────────────────
function IndustryScreen({ value, setValue, onNext, onBack }) {
  const items = [
    {k:'food', label:'일반 음식점'},
    {k:'cafe', label:'카페/ 베이커리'},
    {k:'retail', label:'도소매업'},
    {k:'service', label:'서비스업'},
    {k:'manuf', label:'제조업'},
    {k:'search', label:'검색하기'},
  ];
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', display:'flex', flexDirection:'column'}}>
      <div style={{height:T.safeTop}}/>
      <div style={{padding:'4px 8px 0'}}>
        <BackChevron onBack={onBack}/>
      </div>

      <div style={{padding:'4px 24px 0', textAlign:'center'}}>
        <div style={{fontWeight:800, fontSize:22, letterSpacing:'-.045em', color:T.ink, lineHeight:1.35}}>
          사장님의 업종을 선택해 주세요
        </div>
        <div style={{marginTop:10, fontSize:13, color:T.muted, letterSpacing:'-.04em', lineHeight:1.5}}>
          업종에 맞는 평균 고정비와 지출 패턴을<br/>자동으로 세팅해 드립니다.
        </div>
      </div>

      <div style={{padding:'30px 24px 0', flex:1}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          {items.map(it => {
            const active = value === it.k;
            return (
              <button key={it.k} className="press" onClick={() => setValue(it.k)} style={{
                height:104, borderRadius:14,
                background: active ? T.brand : T.surface2,
                border: active ? `2px solid ${T.brand}` : '2px solid transparent',
                color: active ? '#fff' : T.ink2,
                fontWeight:700, fontSize:15, letterSpacing:'-.04em',
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'all .18s ease',
                boxShadow: active ? '0 8px 20px rgba(95,121,255,.28)' : 'none',
              }}>{it.label}</button>
            );
          })}
        </div>
        <div style={{marginTop:18, textAlign:'center', fontSize:11, color:T.muted2, letterSpacing:'-.04em', lineHeight:1.55}}>
          홈택스 사업장 정보를 바탕으로 미리 선택해 두었어요!<br/>수정이 가능합니다
        </div>
      </div>

      <div style={{padding:'0 22px 28px'}}>
        <PrimaryButton onClick={onNext} disabled={!value}>희망 월급 설정하기</PrimaryButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 03 — Salary (income amount + ratio)
// ─────────────────────────────────────────────────────────
function SalaryScreen({ value, setValue, onNext, onBack }) {
  const [amount, setAmount] = useState(value && value.amount || '');
  const [ratio, setRatio] = useState(value && value.ratio || null);
  const ratios = [
    {k:'safe', label:'안정적으로', sub:'매출의\n50-60%'},
    {k:'balanced', label:'밸런스있게', sub:'매출의\n60-70%'},
    {k:'aggressive', label:'공격적으로', sub:'매출의\n70-80%'},
  ];
  function bump(n) {
    const cur = Number(String(amount).replace(/[^0-9]/g,'')) || 0;
    setAmount((cur + n*10000).toLocaleString('en-US'));
  }
  function reset() { setAmount(''); }
  function commit() {
    setValue({amount, ratio});
    onNext();
  }
  const showBubble = !!amount;
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', display:'flex', flexDirection:'column'}}>
      <div style={{height:T.safeTop}}/>
      <div style={{padding:'4px 8px 0'}}><BackChevron onBack={onBack}/></div>

      <div style={{padding:'4px 24px 0', textAlign:'center'}}>
        <div style={{fontWeight:800, fontSize:22, letterSpacing:'-.045em', color:T.ink, lineHeight:1.35}}>
          대략적인 월 평균 매출과<br/>받고 싶은 비율을 알려주세요
        </div>
        <div style={{marginTop:10, fontSize:13, color:T.muted, letterSpacing:'-.04em', lineHeight:1.5}}>
          희망 금액과 실제 흐름을 함께 보고, 사장님에게<br/>맞는 월급을 추천해드릴게요.
        </div>
      </div>

      <div className="scrolly" style={{flex:1, padding:'26px 24px 0'}}>
        {/* income input */}
        <div style={{fontWeight:700, fontSize:13, letterSpacing:'-.04em', color:T.ink}}>대략적으로 월 평균 이만큼 벌어요</div>
        <div style={{
          marginTop:8, height:62, borderRadius:12, border:`1px solid ${T.line2}`, background:'#fff',
          display:'flex', alignItems:'center', padding:'0 16px',
        }}>
          <input
            value={amount}
            onChange={e => {
              const n = e.target.value.replace(/[^0-9]/g,'');
              setAmount(n ? Number(n).toLocaleString('en-US') : '');
            }}
            placeholder="얼마를 버시나요?"
            inputMode="numeric"
            style={{flex:1, border:0, outline:0, background:'transparent',
              fontFamily:'inherit', fontSize:18, fontWeight:600, letterSpacing:'-.04em', color:T.ink}}
          />
          {amount && <span style={{fontSize:14, color:T.muted}}>원</span>}
        </div>

        <div style={{display:'flex', gap:6, justifyContent:'center', marginTop:12}}>
          <PillChip onClick={() => bump(100)}>+100만원</PillChip>
          <PillChip onClick={() => bump(50)}>+50만원</PillChip>
          <PillChip onClick={() => bump(10)}>+10만원</PillChip>
          <PillChip onClick={reset}>정정</PillChip>
        </div>

        {/* ratio */}
        <div style={{marginTop:24, fontWeight:700, fontSize:13, letterSpacing:'-.04em', color:T.ink}}>희망하는 월급 비중</div>
        <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
          {ratios.map(r => {
            const active = ratio === r.k;
            return (
              <button key={r.k} className="press" onClick={() => setRatio(r.k)} style={{
                height:130, borderRadius:12,
                background: active ? T.brand : T.surface2,
                border:'2px solid transparent',
                color: active ? '#fff' : T.muted,
                padding:'14px 8px', textAlign:'center',
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', gap:8,
                transition:'all .18s ease',
              }}>
                <div style={{fontWeight:800, fontSize:15, letterSpacing:'-.04em',
                  color: active ? '#fff' : T.ink}}>{r.label}</div>
                <div style={{fontSize:12, fontWeight:500, letterSpacing:'-.04em', whiteSpace:'pre-line', lineHeight:1.45,
                  color: active ? 'rgba(255,255,255,.85)' : T.muted}}>{r.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* character + bubble */}
      <div style={{position:'relative', height: showBubble ? 110 : 80}}>
        {showBubble && (
          <div style={{position:'absolute', left:24, top:14, right:120}}>
            <Bubble bg={T.bubble} color={T.muted}>
              {`입력한 금액이 그대로 확정되는 건 아니에요.\n데이터 기반으로 조정해드려요!`}
            </Bubble>
          </div>
        )}
        <img src="assets/img-9da587cc4ccb.png" className="nodrag float" style={{
          position:'absolute', right:18, bottom:-2, height: showBubble ? 100 : 92, pointerEvents:'none',
        }}/>
      </div>

      <div style={{padding:'0 22px 28px'}}>
        <PrimaryButton onClick={commit} disabled={!amount || !ratio}>딱맞는 월급 찾으러 가기</PrimaryButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Personality Q definitions
// ─────────────────────────────────────────────────────────
const QUESTIONS = [
  { id:'income', step:1, title:'요즘 수입, 어느 쪽에 더 가까운가요?',
    options: [
      {k:'flex', label:'들쑥날쑥해요', img:'assets/img-f8776e666fd0.png', tagOn:'income_flex'},
      {k:'steady', label:'어느 정도\n일정해요', img:'assets/img-720033c5005e.png', tagOn:'income_steady'},
    ]},
  { id:'consume', step:2, title:'돈을 쓸때 나는…',
    options: [
      {k:'save', label:'필요한 만큼만\n쓰는 편', img:'assets/img-0e51931bcd8e.png', tagOn:'consume_save'},
      {k:'spend', label:'사고 싶은 건\n사는 편', img:'assets/img-248b23f6c896.png', tagOn:'consume_spend'},
    ]},
  { id:'risk', step:3, title:'수익과 안정 중 더 중요한 건?',
    options: [
      {k:'avoid', label:'안정이 더\n중요해요', img:'assets/img-38064fd39c25.png', tagOn:'risk_avoid'},
      {k:'seek', label:'수익이 더\n중요해요', img:'assets/img-f569cf785b04.png', tagOn:'risk_seek'},
    ]},
  { id:'stress', step:4, title:'돈 때문에 불안했던 적이 있나요?',
    options: [
      {k:'high', label:'자주 있어요', img:'assets/img-45a69417262f.png', tagOn:'stress_high'},
      {k:'low', label:'거의 없어요', img:'assets/char-5.png', tagOn:'stress_low'},
    ]},
  { id:'control', step:5, title:'내 지출은 내가 잘 통제하고 있나요?',
    options: [
      {k:'low', label:'잘 못해요', img:'assets/img-f173d64a7512.png', tagOn:'control_low'},
      {k:'high', label:'완벽하게 해요', img:'assets/char-4.png', tagOn:'control_high'},
    ]},
  { id:'payment', step:6, title:`사업 소득도 '월급처럼' 매달 일정한 금액을 받는 것, 어떻게 생각하세요?`,
    options: [
      {k:'steady', label:'안정돼서 좋다', img:'assets/char-1.png', tagOn:'pay_steady'},
      {k:'perf', label:'상황에 맞게\n유연한 게 좋아요', img:'assets/char-2.png', tagOn:'pay_perf'},
    ]},
];

function QuestionScreen({ q, value, onAnswer, onBack, traits }) {
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', display:'flex', flexDirection:'column'}}>
      <div style={{height:T.safeTop}}/>
      <div style={{padding:'4px 8px 0'}}><BackChevron onBack={onBack}/></div>

      <div style={{padding:'8px 24px 0'}}>
        <StepDots current={q.step}/>
      </div>

      <div style={{padding:'18px 24px 0'}}>
        <div style={{fontWeight:700, fontSize:14, color:T.ink, letterSpacing:'-.04em', marginBottom:10}}>
          나만의 성향 조립 중
        </div>
        <TraitChips traits={traits}/>
      </div>

      {/* big blue card with subtle side peek */}
      <div className="slide-r" key={q.id} style={{
        margin:'18px 16px 22px',
        padding:'26px 22px 22px',
        background:T.brand, borderRadius:18, color:'#fff',
        flex:1,
        display:'flex', flexDirection:'column',
        position:'relative', overflow:'hidden',
        boxShadow:'0 12px 28px rgba(95,121,255,.22)',
      }}>
        {/* side peeks (decorative slivers indicating swipeable card) */}
        <div style={{position:'absolute', left:-8, top:'50%', transform:'translateY(-50%)', width:8, height:'80%', borderRadius:'0 12px 12px 0', background:'rgba(255,255,255,.18)'}}/>
        <div style={{position:'absolute', right:-8, top:'50%', transform:'translateY(-50%)', width:8, height:'80%', borderRadius:'12px 0 0 12px', background:'rgba(255,255,255,.18)'}}/>

        <div style={{fontWeight:800, fontSize:19, color:'#fff', letterSpacing:'-.045em', lineHeight:1.4}}>
          {q.title}
        </div>

        <div style={{marginTop:24, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          {q.options.map(opt => {
            const active = value === opt.k;
            return (
              <button key={opt.k} className="press" onClick={() => onAnswer(opt.k, opt.tagOn)} style={{
                height:200, borderRadius:14, padding:'16px 12px 18px',
                background: active ? T.brandSoft : '#fff',
                border:'1px solid rgba(255,255,255,.4)',
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end',
                position:'relative', overflow:'hidden',
                boxShadow: active ? '0 8px 16px rgba(0,0,0,.15)' : '0 2px 6px rgba(0,0,0,.05)',
                transition:'all .18s ease',
              }}>
                <div style={{position:'absolute', top:14, left:0, right:0, height:120, display:'flex', alignItems:'center', justifyContent:'center'}}>
                  {opt.img ?
                    <img src={opt.img} className="nodrag" style={{maxHeight:118, maxWidth:'80%', objectFit:'contain'}}/> :
                    <div style={{fontSize:60}}>{opt.emoji}</div>}
                </div>
                <div style={{
                  fontWeight:700, fontSize:14,
                  color: active ? '#fff' : T.ink,
                  letterSpacing:'-.04em', whiteSpace:'pre-line', textAlign:'center', lineHeight:1.35,
                }}>{opt.label}</div>
              </button>
            );
          })}
        </div>

        <div style={{marginTop:18, textAlign:'center', color:'rgba(255,255,255,.85)', fontSize:13, fontWeight:500, letterSpacing:'-.04em'}}>
          선택하면 자동으로 이어져요
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Network error overlay (kept)
// ─────────────────────────────────────────────────────────
function NetworkErrorModal({ onRetry }) {
  return (
    <div className="fadein" style={{
      position:'absolute', inset:0, background:'rgba(0,0,0,.5)',
      display:'flex', alignItems:'center', justifyContent:'center', zIndex:50,
    }}>
      <div className="pop" style={{
        width:260, background:'#fff', borderRadius:14, padding:'24px 20px 18px',
        boxShadow:'0 6px 28px rgba(0,0,0,.18)', textAlign:'center',
      }}>
        <div style={{fontWeight:700, fontSize:15, letterSpacing:'-.04em'}}>네트워크에 접속할 수 없습니다.</div>
        <div style={{fontSize:13, color:'#7A7A7A', marginTop:6, letterSpacing:'-.04em'}}>네트워크 연결 상태를 확인해주세요</div>
        <button onClick={onRetry} className="press" style={{
          marginTop:18, width:156, height:42, borderRadius:50, background:T.brand,
          color:'#fff', fontWeight:700, fontSize:14, letterSpacing:'-.04em',
        }}>다시 시도</button>
      </div>
    </div>
  );
}

// expose
Object.assign(window, {
  T, BackChevron, PrimaryButton, OutlineButton, PillChip, Bubble,
  TRAIT_LABELS, TraitChips, StepDots,
  IntroScreen, IndustryScreen, SalaryScreen, QuestionScreen,
  QUESTIONS, NetworkErrorModal,
  // backwards-compat for screens-b.jsx until rewritten
  C: { primary:T.brand, primarySoft:T.brandSoft, teal:T.teal, lime:T.lime,
       ink:T.ink, muted:T.muted, muted2:T.muted2, line:T.line, line2:T.line2,
       chip:T.chipDark, soft:T.surface1, bgTinted:'#EDEFF7' },
  TopBar: function({onBack,label}){ return <div style={{height:T.safeTop+44, paddingTop:T.safeTop, paddingLeft:8, display:'flex', alignItems:'center'}}><BackChevron onBack={onBack}/><div style={{flex:1, textAlign:'center', fontSize:13, fontWeight:600, color:T.muted, letterSpacing:'-.04em'}}>{label}</div><div style={{width:40}}/></div>; },
});
