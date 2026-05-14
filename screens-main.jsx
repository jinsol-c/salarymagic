// screens-main.jsx — post-onboarding app: home, book (장부), report, filter sheets
const { useState: useMainState, useEffect: useMainEffect, useRef: useMainRef } = React;

// ─────────────────────────────────────────────────────────
// Bottom nav (4 tabs)
// ─────────────────────────────────────────────────────────
function NavIcon({ k, active }) {
  const map = {
    home:   ['assets/nav-home-off.svg',   'assets/nav-home-on.svg'],
    book:   ['assets/nav-book-off.svg',   'assets/nav-book-on.svg'],
    salary: ['assets/nav-salary-off.svg', 'assets/nav-salary-on.svg'],
    piggy:  ['assets/nav-save-off.svg',   'assets/nav-save-on.svg'],
  };
  const src = map[k] && map[k][active ? 1 : 0];
  if (!src) return null;
  return <img src={src} alt="" className="nodrag" style={{width:46, height:46, objectFit:'contain', display:'block'}}/>;
}

function BottomNav({ current, onNav }) {
  const items = [
    {k:'home',   label:'홈'},
    {k:'book',   label:'장부'},
    {k:'salary', label:'월급'},
    {k:'piggy',  label:'저금통'},
  ];
  return (
    <div style={{
      position:'absolute', left:0, right:0, bottom:0,
      paddingBottom:14, paddingTop:4,
      background:'#fff', borderTop:`1px solid ${T.line}`,
      display:'flex', justifyContent:'space-around', alignItems:'flex-start',
      zIndex:20,
    }}>
      {items.map(it => {
        const active = it.k === current;
        return (
          <button key={it.k} onClick={() => onNav(it.k)} className="press" style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:0,
            padding:'2px 6px', minWidth:62,
          }}>
            <NavIcon k={it.k} active={active}/>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Header bar (장부 / 분석 리포트 etc)
// ─────────────────────────────────────────────────────────
function PageHeader({ title, onBack, right }) {
  return (
    <div style={{
      paddingTop: T.safeTop, height: T.safeTop + 50,
      display:'flex', alignItems:'center', padding:`${T.safeTop}px 8px 0 8px`,
    }}>
      {onBack ? (
        <BackChevron onBack={onBack}/>
      ) : (
        <div style={{width:40, height:40, marginLeft:8, display:'flex', alignItems:'center', fontWeight:800, fontSize:20, color:T.ink, letterSpacing:'-.045em'}}>{title}</div>
      )}
      {onBack && (
        <div style={{flex:1, fontWeight:800, fontSize:18, color:T.ink, letterSpacing:'-.045em', marginLeft:2}}>
          {title}
        </div>
      )}
      <div style={{flex: onBack ? 0 : 1}}/>
      <div style={{display:'flex', alignItems:'center', gap:4, paddingRight:12}}>
        {right}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main / Home
// ─────────────────────────────────────────────────────────
const ALERTS = [
  { kind:'ok',    text:'신한카드에서 1,000,000원 입금되었어요' },
  { kind:'ok',    text:'임대료 지급 3일 전이에요' },
  { kind:'warn',  text:'카드 결제일이 다가오고 있어요' },
];

function AlertBadge({ kind }) {
  if (kind === 'warn') {
    return (
      <div style={{width:24, height:24, borderRadius:'50%', background:'#FFF3CC', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}>
        <span style={{color:'#E5A700', fontWeight:900, fontSize:14, lineHeight:1}}>!</span>
      </div>
    );
  }
  if (kind === 'alert') {
    return (
      <div style={{width:24, height:24, borderRadius:'50%', background:'#FF4D52', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}>
        <span style={{color:'#fff', fontWeight:900, fontSize:14, lineHeight:1}}>!</span>
      </div>
    );
  }
  return (
    <div style={{width:24, height:24, borderRadius:'50%', background:'#E2E7FF', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}>
      <svg width="13" height="11" viewBox="0 0 13 11"><path d="M1 5.5L4.5 9L12 1.5" stroke={T.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
    </div>
  );
}

const MAIN_CHAR_IMG = 'assets/character_01_main.png';
function MainScreen({ onNav, characterKey, onOpenWeekReport, onOpenRecipe, onOpenMyPage }) {
  const ch = { ...CHARACTERS[characterKey], img: MAIN_CHAR_IMG };
  const [alertIdx, setAlertIdx] = useMainState(0);
  useMainEffect(() => {
    const t = setInterval(() => setAlertIdx(i => (i + 1) % ALERTS.length), 3000);
    return () => clearInterval(t);
  }, []);
  const alert = ALERTS[alertIdx];

  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9', overflow:'hidden'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:90, overflowY:'auto'}}>
        {/* hero blue area */}
        <div style={{background:T.brand, paddingTop:T.safeTop, paddingBottom:30}}>
          <div style={{padding:'8px 22px 0', display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
            <div>
              <div style={{color:'#fff', fontWeight:800, fontSize:26, letterSpacing:'-.045em'}}>우사장 님</div>
              <div style={{color:'rgba(255,255,255,.85)', marginTop:4, fontSize:13, fontWeight:500, letterSpacing:'-.04em'}}>
                잠자는 자산을 깨울 시간입니다
              </div>
            </div>
            <button onClick={onOpenMyPage} aria-label="마이페이지" className="press" style={{width:42, height:42, padding:0, borderRadius:'50%', background:'#fff', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid rgba(255,255,255,.4)', cursor:'pointer'}}>
              <img src="assets/char-3.png" className="nodrag" style={{width:'100%', height:'100%', objectFit:'cover'}}/>
            </button>
          </div>

          {/* status card */}
          <div style={{margin:'16px 18px 0', background:'#fff', borderRadius:14, padding:'14px 16px 16px', boxShadow:'0 6px 18px rgba(0,0,0,.10)'}}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <div style={{padding:'3px 10px', borderRadius:9999, background:'#16A34A', color:'#fff', fontSize:11, fontWeight:800, letterSpacing:'-.04em', display:'inline-flex', alignItems:'center', gap:4}}>
                <span style={{width:6, height:6, borderRadius:'50%', background:'#A6F4C5', display:'inline-block'}}/>
                안정
              </div>
              <div style={{fontSize:13, color:T.ink, fontWeight:500, letterSpacing:'-.04em'}}>
                지금 월급의 흐름은 <b style={{color:T.brand, fontWeight:800}}>75점</b>으로 읽혀요
              </div>
            </div>
            <div style={{height:1, background:T.line, margin:'12px 0'}}/>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
              <div>
                <div style={{fontSize:13, color:T.ink, fontWeight:700, letterSpacing:'-.04em'}}>다음 월급까지 D-12</div>
                <div style={{marginTop:4, fontSize:11, color:T.muted2, letterSpacing:'-.04em'}}>2026년 05월 25일</div>
              </div>
              <div style={{fontWeight:800, fontSize:22, color:T.ink, letterSpacing:'-.045em'}}>2,000,000원</div>
            </div>
          </div>
        </div>

        {/* alerts pill */}
        <div style={{padding:'14px 16px 0'}}>
          <div style={{
            background:'#fff', borderRadius:14, padding:'12px 14px',
            display:'flex', alignItems:'center', gap:10,
            border:`1px solid ${T.line}`,
            boxShadow:'0 2px 6px rgba(0,0,0,.04)',
          }}>
            <div style={{width:28, height:28, borderRadius:'50%', background:'#E2E7FF', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}>
              <svg width="13" height="14" viewBox="0 0 13 14" fill="none"><path d="M6.5 1V2M6.5 12.5C7.05 12.5 7.5 12.05 7.5 11.5H5.5C5.5 12.05 5.95 12.5 6.5 12.5ZM2 10.5H11C11 10.5 10 9.5 10 6.5C10 4.5 8.5 3 6.5 3C4.5 3 3 4.5 3 6.5C3 9.5 2 10.5 2 10.5Z" stroke={T.brand} strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </div>
            <div style={{fontSize:13, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>오늘 주목 할 주요 알림</div>
            <div style={{flex:1}}/>
            <div style={{fontSize:12, fontWeight:700, color:T.muted2, letterSpacing:'-.03em'}}>{alertIdx+1} / {ALERTS.length}</div>
          </div>
          {/* current alert content */}
          <div key={alertIdx} className="fadein" style={{
            marginTop:8,
            background:'#fff', borderRadius:14, padding:'12px 14px',
            display:'flex', alignItems:'center', gap:10,
            border:`1px solid ${T.line}`,
          }}>
            <AlertBadge kind={alert.kind}/>
            <div style={{flex:1, fontSize:13, fontWeight:600, color:T.ink, letterSpacing:'-.04em'}}>{alert.text}</div>
          </div>
        </div>

        {/* net profit card */}
        <div style={{margin:'14px 16px 0', padding:'18px 18px 18px', background:'#fff', borderRadius:14, border:`1px solid ${T.line}`, boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize:13, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>이번 달 순 수익</div>
              <div style={{marginTop:6, fontWeight:800, fontSize:26, color:T.ink, letterSpacing:'-.045em'}}>1,234,567원</div>
              <div style={{marginTop:14, display:'flex', gap:24, alignItems:'flex-end'}}>
                <div>
                  <div style={{fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>매출</div>
                  <div style={{marginTop:2, fontSize:14, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>+500만원</div>
                </div>
                <div style={{width:1, height:24, background:T.line}}/>
                <div>
                  <div style={{fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>지출</div>
                  <div style={{marginTop:2, fontSize:14, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>-240만원</div>
                </div>
              </div>
            </div>
            <div style={{position:'relative', width:96, height:96}}>
              <div className="twinkle" style={{position:'absolute', right:6, top:0, color:'#FFD96A', fontSize:14}}>✦</div>
              <div className="twinkle" style={{position:'absolute', left:0, top:8, color:'#FFD96A', fontSize:11, animationDelay:'.4s'}}>✦</div>
              <img src={ch.img} className="nodrag float" style={{width:90, height:90, objectFit:'contain', filter:'drop-shadow(0 4px 8px rgba(95,121,255,.18))'}}/>
            </div>
          </div>
          <div style={{marginTop:14, padding:'14px 14px', background:T.surface1, borderRadius:10}}>
            <div style={{fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>우 사장님, 자금 관리를 잘하고 계시네요</div>
            <div style={{marginTop:6, fontSize:12, color:T.muted, letterSpacing:'-.04em', lineHeight:1.6}}>
              자금 흐름이 매우 안정적입니다. 월급 일부를 잉여금으로<br/>보내서 자산을 더 키워보는건 어떨까요?
            </div>
          </div>
          <div style={{marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            <button onClick={onOpenWeekReport} className="press" style={{
              height:46, borderRadius:10, background:T.chipDark, color:'#fff',
              fontWeight:700, fontSize:13, letterSpacing:'-.04em',
            }}>흐름 자세히 보기</button>
            <button onClick={() => onNav('book')} className="press" style={{
              height:46, borderRadius:10, background:T.brand, color:'#fff',
              fontWeight:700, fontSize:13, letterSpacing:'-.04em',
            }}>장부 보러가기</button>
          </div>
        </div>

        {/* piggy card */}
        <div style={{margin:'14px 16px 0', padding:'18px 18px 18px', background:'#fff', borderRadius:14, border:`1px solid ${T.line}`, boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{fontSize:13, fontWeight:800, color:T.ink, letterSpacing:'-.04em'}}>저금통</div>
          <div style={{marginTop:8, display:'flex', alignItems:'center', gap:6}}>
            <div style={{fontWeight:800, fontSize:22, color:T.ink, letterSpacing:'-.045em'}}>1,135,500원</div>
            <span style={{color:T.muted2, fontWeight:700, fontSize:18}}>›</span>
          </div>
          <div style={{marginTop:4, fontSize:11, color:T.muted, letterSpacing:'-.04em'}}>세이프존  3개월</div>
          <div style={{marginTop:14, position:'relative'}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:T.muted, fontWeight:600, letterSpacing:'-.04em'}}>
              <span>저금통 달성률</span>
              <span style={{padding:'2px 8px', borderRadius:6, border:`1px solid ${T.brand}`, color:T.brand, fontSize:10, fontWeight:700}}>85%</span>
            </div>
            <div style={{marginTop:6, height:8, borderRadius:4, background:T.surface2, overflow:'hidden'}}>
              <div style={{width:'85%', height:'100%', background:T.brand, borderRadius:4}}/>
            </div>
          </div>
          <div style={{marginTop:14, padding:'14px', background:T.surface1, borderRadius:10}}>
            <div style={{fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>우 사장님, 이 돈 투자해보시는 건 어때요?</div>
            <div style={{marginTop:6, fontSize:12, color:T.muted, letterSpacing:'-.04em', lineHeight:1.6}}>
              충분히 모인 자금은 다시 투자해보세요.<br/>잠들어 있는 돈보다, 움직이는 돈이 더 큰 가치를 만듭니다.
            </div>
          </div>
          <button onClick={onOpenRecipe} className="press" style={{
            marginTop:12, width:'100%', height:46, borderRadius:10, background:T.brand, color:'#fff',
            fontWeight:700, fontSize:13, letterSpacing:'-.04em',
          }}>돈 굴리기 시작하기</button>
        </div>

        <div style={{height:80}}/>
      </div>

      {/* floating chat mascot */}
      <button className="press" aria-label="채팅" style={{position:'absolute', right:14, bottom:90, width:60, height:60, zIndex:15, background:'transparent', padding:0, border:0, cursor:'pointer'}}>
        <img src="assets/img_chat.png" className="nodrag float" style={{width:'100%', height:'100%', objectFit:'contain', filter:'drop-shadow(0 4px 10px rgba(95,121,255,.28))'}}/>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Book / 장부
// ─────────────────────────────────────────────────────────
function HeaderIcons({ items }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:14}}>
      {items.map((it, i) => (
        <button key={i} onClick={it.onClick} className="press" style={{width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center'}}>
          {it.svg}
        </button>
      ))}
    </div>
  );
}

const ICON_SEARCH = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke={T.ink} strokeWidth="1.6"/><path d="M14 14L18 18" stroke={T.ink} strokeWidth="1.6" strokeLinecap="round"/></svg>;
const ICON_BELL = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 14h12c-1-1-1.5-2.5-1.5-5V8a4.5 4.5 0 1 0-9 0v1c0 2.5-.5 4-1.5 5z" stroke={T.ink} strokeWidth="1.6" strokeLinejoin="round"/><path d="M8 16.5h4" stroke={T.ink} strokeWidth="1.6" strokeLinecap="round"/></svg>;
const ICON_USER = <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke={T.ink} strokeWidth="1.5"/><circle cx="11" cy="9" r="2.6" stroke={T.ink} strokeWidth="1.5"/><path d="M5 18C6.5 15.5 8.5 14.5 11 14.5C13.5 14.5 15.5 15.5 17 18" stroke={T.ink} strokeWidth="1.5" strokeLinecap="round"/></svg>;
const ICON_DOWNLOAD = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3v10m0 0l-4-4m4 4l4-4M4 16h12" stroke={T.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ICON_SHARE = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM6 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM14 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" stroke={T.ink} strokeWidth="1.5"/><path d="M8 9.5L12 5.5M8 11.5L12 15.5" stroke={T.ink} strokeWidth="1.5" strokeLinecap="round"/></svg>;
const ICON_KEBAB = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="4" r="1.6" fill={T.ink}/><circle cx="10" cy="10" r="1.6" fill={T.ink}/><circle cx="10" cy="16" r="1.6" fill={T.ink}/></svg>;

function MonthSwitcher({ label, big }) {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 18px 0'}}>
      <button className="press" style={{width:30, height:30, borderRadius:'50%', background:T.surface2, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <svg width="8" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7L7 13" stroke={T.muted} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
      </button>
      <div style={{
        fontWeight: big ? 800 : 700,
        fontSize: big ? 22 : 16,
        color: big ? T.brand : T.ink,
        letterSpacing:'-.04em',
      }}>{label}</div>
      <button className="press" style={{width:30, height:30, borderRadius:'50%', background:'#E2E7FF', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1L7 7L1 13" stroke={T.brand} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
      </button>
    </div>
  );
}

const BOOK_DAYS = [
  // index 0..34, [in, out] in 만원, 0 = empty (out-of-month)
  // april 2026: starts wed (col 3 if sun-first). Use simple grid: rows of 7
  // We'll mark cells with day-of-month and amounts.
];

function buildBookGrid() {
  // 2026 April 1 = Wednesday → col 3 in sun-first
  const cells = [];
  // first row: empty Sun..Tue
  for (let i = 0; i < 3; i++) cells.push({ empty:true });
  for (let d = 1; d <= 30; d++) {
    cells.push({ day: d });
  }
  // pad to 35
  while (cells.length % 7 !== 0) cells.push({ empty:true, trailing:true });
  // pad May days for trailing row
  let mayD = 1;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].trailing) { cells[i] = { day: mayD++, faded:true }; }
  }
  // populate amounts roughly per the screenshot
  const sample = {
    1:[1000000, -500000], 2:[1000000, -700000], 3:[1000000, -1500000], 4:[1000000, 0], 5:[0, -1000000],
    6:[1000000, -500000], 7:[1000000, -500000],
    8:[1000000, -500000], 9:[1000000, -700000], 10:[1000000, -1500000], 11:[1000000, 0], 12:[0, -1000000],
    13:[1000000, -500000], 14:[1000000, -500000],
    15:[1000000, -500000], 16:[1000000, -700000], 17:[1000000, -1500000], 18:[1000000, 0], 19:[0, -1000000],
    23:[0, -3000000], 30:[0, -2300000],
  };
  cells.forEach(c => {
    if (c.day && !c.faded && sample[c.day]) {
      c.in = sample[c.day][0];
      c.out = sample[c.day][1];
    }
  });
  return cells;
}

function BookScreen({ onNav, onOpenReport, onOpenFilter, onOpenRecipe, onOpenMenu }) {
  const cells = buildBookGrid();
  // group by 7s; compute weekly subtotal "소계"
  const rows = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i+7));
  function weeklyTotal(row) {
    return row.reduce((a, c) => a + (c.in || 0) + (c.out || 0), 0);
  }
  const today = 18;
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:80, overflowY:'auto'}}>
        <PageHeader title="장부" right={<HeaderIcons items={[
          {svg: ICON_KEBAB, onClick: onOpenMenu},
        ]}/>}/>

        <MonthSwitcher label="2026년 4월"/>

        {/* monthly summary */}
        <div style={{margin:'14px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{fontWeight:800, fontSize:14, color:T.brand, letterSpacing:'-.04em'}}>월간 요약</div>
          <div style={{marginTop:14, display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
            <div style={{fontSize:13, color:T.ink, fontWeight:600, letterSpacing:'-.04em'}}>총 수입</div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:14, fontWeight:700, color:'#FF5252', letterSpacing:'-.04em'}}>+ 5,200,000원</div>
              <div style={{marginTop:2, fontSize:10, color:T.muted2, letterSpacing:'-.03em'}}>전월 대비 12.2%</div>
            </div>
          </div>
          <div style={{marginTop:10, display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
            <div style={{fontSize:13, color:T.ink, fontWeight:600, letterSpacing:'-.04em'}}>총 지출</div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:14, fontWeight:700, color:T.muted2, letterSpacing:'-.04em'}}>- 2,750,000원</div>
              <div style={{marginTop:2, fontSize:10, color:T.muted2, letterSpacing:'-.03em'}}>전월 대비 6.5%</div>
            </div>
          </div>
          <div style={{height:1, background:T.line, margin:'14px 0'}}/>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.04em'}}>합계</div>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <span style={{padding:'3px 10px', borderRadius:9999, border:`1px solid ${T.brand}`, color:T.brand, fontSize:11, fontWeight:700, letterSpacing:'-.03em'}}>정산완료</span>
              <span style={{fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.04em'}}>2,234,567원</span>
            </div>
          </div>
          <button onClick={onOpenReport} className="press" style={{
            marginTop:14, width:'100%', height:46, borderRadius:10, background:T.brand, color:'#fff',
            fontWeight:700, fontSize:13, letterSpacing:'-.04em',
          }}>분석 리포트 보기</button>
        </div>

        {/* alert banner */}
        <div style={{margin:'12px 18px 0', padding:'14px 16px', background:'#FFF7E6', border:'1px solid #FFE3A5', borderRadius:14}}>
          <div style={{display:'flex', alignItems:'center', gap:8, fontWeight:800, fontSize:13, color:'#A35E00', letterSpacing:'-.04em'}}>
            <span style={{width:18, height:18, borderRadius:'50%', background:'#F8C24E', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:11}}>!</span>
            구조 개선 필요
          </div>
          <div style={{marginTop:6, fontSize:12, color:T.ink2, letterSpacing:'-.04em', lineHeight:1.55}}>
            수익 변동이 있어 월급 유지가 불안정해질 수 있어요
          </div>
          <div style={{marginTop:8, textAlign:'center'}}>
            <button onClick={onOpenRecipe} className="press" style={{fontSize:12, color:T.ink2, fontWeight:600, letterSpacing:'-.04em', textDecoration:'underline'}}>
              대출 알아보기
            </button>
          </div>
        </div>

        {/* tabs (달력/목록) + 필터 */}
        <div style={{margin:'18px 16px 6px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
          <div style={{display:'flex', background:'#1F2024', borderRadius:9999, padding:3}}>
            <div style={{padding:'7px 18px', borderRadius:9999, background:'#fff', color:T.ink, fontWeight:800, fontSize:13, letterSpacing:'-.04em'}}>달력</div>
            <div style={{padding:'7px 18px', color:'#fff', fontWeight:600, fontSize:13, letterSpacing:'-.04em'}}>목록</div>
          </div>
          <button onClick={onOpenFilter} className="press" style={{
            padding:'7px 14px', borderRadius:9999, border:`1px solid ${T.line2}`, background:'#fff',
            display:'flex', alignItems:'center', gap:5,
            fontSize:12, fontWeight:600, color:T.ink2, letterSpacing:'-.04em',
          }}>
            필터 <span style={{fontSize:9}}>▼</span>
          </button>
          <div style={{flex:1}}/>
          <button className="press" style={{width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center'}}>{ICON_SEARCH}</button>
        </div>

        {/* calendar */}
        <div style={{margin:'4px 16px 0', background:'#fff', borderRadius:14, padding:'14px 12px 14px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 6px 8px'}}>
            <div style={{fontWeight:800, fontSize:18, color:T.brand, letterSpacing:'-.04em'}}>2026년 4월</div>
            <div style={{display:'flex', gap:6}}>
              <button className="press" style={{width:26, height:26, borderRadius:'50%', background:'#E2E7FF', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="6" height="11" viewBox="0 0 8 14"><path d="M7 1L1 7L7 13" stroke={T.brand} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </button>
              <button className="press" style={{width:26, height:26, borderRadius:'50%', background:'#E2E7FF', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="6" height="11" viewBox="0 0 8 14"><path d="M1 1L7 7L1 13" stroke={T.brand} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </button>
            </div>
          </div>
          {/* weekdays */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:0, fontSize:11, color:T.muted2, fontWeight:700, letterSpacing:'-.04em', textAlign:'center', padding:'4px 0'}}>
            {['일','월','화','수','목','금','토'].map((d,i)=>(
              <div key={d} style={{padding:'4px 0', color: i===0 ? '#FF5252' : i===6 ? '#3AB1F5' : T.muted2}}>{d}</div>
            ))}
          </div>
          {/* rows */}
          {rows.map((row, ri) => {
            const subtotal = weeklyTotal(row);
            return (
              <div key={ri} style={{
                background: ri % 2 === 0 ? '#fff' : '#F7F7F8',
                borderTop: ri === 0 ? `1px solid ${T.line}` : 'none',
                borderBottom:`1px solid ${T.line}`,
                paddingBottom:6,
              }}>
                <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:0}}>
                  {row.map((c, ci) => {
                    if (c.empty) return <div key={ci} style={{minHeight:62}}/>;
                    const isToday = c.day === today && !c.faded;
                    const dayColor = c.faded ? '#C7C7CB' : ci===0 ? '#FF5252' : ci===6 ? '#3AB1F5' : T.ink;
                    return (
                      <div key={ci} style={{padding:'6px 2px 4px', textAlign:'left', minHeight:62}}>
                        <div style={{display:'flex', justifyContent:'center'}}>
                          {isToday ? (
                            <div style={{width:22, height:22, borderRadius:'50%', background:T.brand, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800}}>{c.day}</div>
                          ) : (
                            <div style={{fontSize:11, fontWeight:700, color:dayColor}}>{c.day}</div>
                          )}
                        </div>
                        {!c.faded && c.in ? (
                          <div style={{marginTop:3, fontSize:9, color:'#FF5252', fontWeight:700, textAlign:'center', letterSpacing:'-.04em'}}>
                            +{(c.in/10000).toLocaleString()}만
                          </div>
                        ) : <div style={{marginTop:3, height:11}}/>}
                        {!c.faded && c.out ? (
                          <div style={{fontSize:9, color:T.muted2, fontWeight:700, textAlign:'center', letterSpacing:'-.04em'}}>
                            {(c.out/10000).toLocaleString()}만
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                {/* weekly subtotal row */}
                <div style={{padding:'2px 6px 2px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <span style={{fontSize:9, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>소계</span>
                  <span style={{fontSize:9, fontWeight:700, color: subtotal > 0 ? '#FF5252' : subtotal < 0 ? T.muted2 : T.muted2, letterSpacing:'-.04em'}}>
                    {subtotal === 0 ? '' : (subtotal > 0 ? '+' : '') + (subtotal/10000).toLocaleString() + '만'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{height:30}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Filter bottom sheet
// ─────────────────────────────────────────────────────────
function FilterSheet({ onClose, onOpenPeriod }) {
  const [cats, setCats] = useMainState({income:'biz', expense:'biz', tax:'biz'});
  const [checked, setChecked] = useMainState({income:true, expense:true, tax:true});
  const rows = [
    {k:'income', label:'수입'},
    {k:'expense', label:'지출'},
    {k:'tax', label:'세무'},
  ];
  return (
    <div style={{position:'absolute', inset:0, zIndex:30}}>
      <div onClick={onClose} style={{position:'absolute', inset:0, background:'rgba(0,0,0,.45)'}}/>
      <div className="fadein" style={{
        position:'absolute', left:0, right:0, bottom:0,
        background:'#fff', borderRadius:'20px 20px 0 0',
        padding:'18px 22px 26px',
        boxShadow:'0 -8px 28px rgba(0,0,0,.18)',
      }}>
        <div style={{width:42, height:4, borderRadius:2, background:T.line2, margin:'0 auto 14px'}}/>
        <div style={{fontWeight:800, fontSize:15, color:T.ink, letterSpacing:'-.04em'}}>내역 필터</div>

        <div style={{marginTop:16, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0'}}>
          <span style={{fontSize:13, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>기간</span>
          <button onClick={onOpenPeriod} className="press" style={{display:'flex', alignItems:'center', gap:6, fontSize:13, color:T.ink, fontWeight:600, letterSpacing:'-.04em'}}>
            월간 <span style={{fontSize:10, color:T.muted2}}>›</span>
          </button>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0'}}>
          <span style={{fontSize:13, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>거래수단</span>
          <button className="press" style={{display:'flex', alignItems:'center', gap:6, fontSize:13, color:T.ink, fontWeight:600, letterSpacing:'-.04em'}}>
            모든 거래 수단 <span style={{fontSize:10, color:T.muted2}}>›</span>
          </button>
        </div>

        <div style={{marginTop:8, fontSize:13, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>카테고리</div>
        <div style={{marginTop:10, padding:'8px 12px', background:T.surface1, borderRadius:12}}>
          {rows.map((r, i) => (
            <div key={r.k} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderTop: i ? `1px solid #E8E8EE` : 'none'}}>
              <button onClick={() => setChecked(c => ({...c, [r.k]: !c[r.k]}))} className="press" style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{
                  width:20, height:20, borderRadius:5,
                  background: checked[r.k] ? T.brand : '#fff',
                  border: `1.5px solid ${checked[r.k] ? T.brand : T.line2}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {checked[r.k] && <svg width="11" height="8" viewBox="0 0 12 9"><path d="M1 4.5L4.5 8L11 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
                </div>
                <span style={{fontSize:13, fontWeight:600, color:T.ink, letterSpacing:'-.04em'}}>{r.label}</span>
              </button>
              <div style={{display:'flex', background:'#fff', borderRadius:9999, padding:3}}>
                <button onClick={() => setCats(c => ({...c, [r.k]:'biz'}))} style={{
                  padding:'5px 13px', borderRadius:9999,
                  background: cats[r.k]==='biz' ? T.brand : 'transparent',
                  color: cats[r.k]==='biz' ? '#fff' : T.muted, fontSize:11, fontWeight:700, letterSpacing:'-.04em',
                }}>사업자</button>
                <button onClick={() => setCats(c => ({...c, [r.k]:'all'}))} style={{
                  padding:'5px 13px', borderRadius:9999,
                  background: cats[r.k]==='all' ? T.brand : 'transparent',
                  color: cats[r.k]==='all' ? '#fff' : T.muted, fontSize:11, fontWeight:700, letterSpacing:'-.04em',
                }}>전체</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:18, display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:10}}>
          <button onClick={onClose} className="press" style={{
            height:48, borderRadius:8, background:T.surface2, color:T.muted2,
            fontWeight:700, fontSize:14, letterSpacing:'-.04em',
          }}>취소</button>
          <button onClick={onClose} className="press" style={{
            height:48, borderRadius:8, background:T.brand, color:'#fff',
            fontWeight:700, fontSize:14, letterSpacing:'-.04em',
          }}>적용</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Period sheet (start/end calendar)
// ─────────────────────────────────────────────────────────
function PeriodSheet({ onClose }) {
  const [start, setStart] = useMainState(1);
  const [end, setEnd] = useMainState(22);
  const [picking, setPicking] = useMainState(null); // null | 'start' | 'end'
  const [yearOpen, setYearOpen] = useMainState(false);
  // april 2026 starts wed → 3 leading blanks
  const days = Array.from({length:30}, (_,i) => i+1);
  const fmt = d => `2026년 4월 ${d}일`;
  const years = [2024, 2025, 2026];

  return (
    <div style={{position:'absolute', inset:0, zIndex:35}}>
      <div onClick={onClose} style={{position:'absolute', inset:0, background:'rgba(0,0,0,.55)'}}/>
      <div className="fadein" style={{
        position:'absolute', left:14, right:14, top:'50%', transform:'translateY(-50%)',
        background:'#fff', borderRadius:18,
        padding:'22px 22px 18px',
        maxHeight:'82%', overflowY:'auto',
        boxShadow:'0 12px 30px rgba(0,0,0,.18)',
      }}>
        {/* date dropdowns */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'4px 0'}}>
          <span style={{fontSize:14, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>시작일</span>
          <button onClick={()=>{ setPicking('start'); setYearOpen(false); }} className="press" style={{display:'flex', alignItems:'center', gap:6, fontSize:14, color:T.ink, fontWeight:600, letterSpacing:'-.04em'}}>
            {fmt(start)} <span style={{fontSize:11, color:T.muted2}}>▾</span>
          </button>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0 4px'}}>
          <span style={{fontSize:14, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>종료일</span>
          <button onClick={()=>{ setPicking('end'); setYearOpen(false); }} className="press" style={{display:'flex', alignItems:'center', gap:6, fontSize:14, color:T.ink, fontWeight:600, letterSpacing:'-.04em'}}>
            {fmt(end)} <span style={{fontSize:11, color:T.muted2}}>▾</span>
          </button>
        </div>

        {/* year/month switcher row */}
        <div style={{marginTop:10, position:'relative'}}>
          <button onClick={()=>setYearOpen(v=>!v)} className="press" style={{display:'flex', alignItems:'center', gap:6, fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.04em'}}>
            2026년 4월 <span style={{fontSize:11, color:T.muted2}}>▾</span>
          </button>

          {yearOpen && (
            <div className="fadein" style={{
              position:'absolute', left:0, top:30, zIndex:5,
              background:'#fff', borderRadius:10, padding:'6px 0',
              boxShadow:'0 8px 20px rgba(0,0,0,.18)', border:`1px solid ${T.line}`,
              minWidth:120,
            }}>
              {years.map(y => (
                <button key={y} onClick={()=>setYearOpen(false)} className="press" style={{
                  display:'block', width:'100%', textAlign:'left', padding:'10px 14px',
                  fontSize:14, fontWeight: y===2026?800:600, color: y===2026?T.brand:T.ink, letterSpacing:'-.04em',
                }}>{y}년</button>
              ))}
            </div>
          )}
        </div>

        {/* weekday header */}
        <div style={{marginTop:14, display:'grid', gridTemplateColumns:'repeat(7,1fr)', fontSize:11, color:T.muted2, fontWeight:700, letterSpacing:'.05em', textAlign:'center', padding:'4px 0'}}>
          {['SUN','MON','TUE','WED','THU','FRI','SAT'].map((d)=>(
            <div key={d}>{d}</div>
          ))}
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2}}>
          {[null,null,null,...days].map((d,i)=>{
            if (d === null) return <div key={i} style={{height:38}}/>;
            const isStart = d === start, isEnd = d === end;
            const inRange = d > Math.min(start,end) && d < Math.max(start,end);
            const faded = d > 22; // visually de-emphasize like the screenshot
            return (
              <button key={i} onClick={() => {
                if (picking === 'end') { if (d >= start) setEnd(d); else { setStart(d); setEnd(start); } setPicking(null); }
                else if (picking === 'start') { if (d <= end) setStart(d); else { setStart(end); setEnd(d); } setPicking(null); }
                else {
                  if (start === end) { if (d < start) { setEnd(start); setStart(d); } else setEnd(d); }
                  else { setStart(d); setEnd(d); }
                }
              }} className="press" style={{
                height:38, borderRadius: isStart || isEnd ? '50%' : (inRange ? 0 : '50%'),
                background: isStart || isEnd ? T.brand : (inRange ? '#E2E7FF' : 'transparent'),
                color: isStart || isEnd ? '#fff' : (faded ? '#C7C7CB' : (inRange ? T.brand : T.ink)),
                fontSize:14, fontWeight: isStart || isEnd ? 800 : 500, letterSpacing:'-.04em',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>{d}</button>
            );
          })}
        </div>

        <div style={{marginTop:18, display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:10}}>
          <button onClick={onClose} className="press" style={{
            height:48, borderRadius:8, background:T.surface2, color:T.muted2,
            fontWeight:700, fontSize:14, letterSpacing:'-.04em',
          }}>취소</button>
          <button onClick={onClose} className="press" style={{
            height:48, borderRadius:8, background:T.brand, color:'#fff',
            fontWeight:700, fontSize:14, letterSpacing:'-.04em',
          }}>적용</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Report screen (with tabs)
// ─────────────────────────────────────────────────────────
function ReportScreen({ onBack, characterKey, initialTab, onTabChange, onOpenPricing, onOpenRecipe }) {
  const [tab, setTab] = useMainState(initialTab || 'ai'); // ai | week | month | year
  useMainEffect(() => { if (initialTab && initialTab !== tab) setTab(initialTab); /* eslint-disable-next-line */ }, [initialTab]);
  function pickTab(k) { setTab(k); if (onTabChange) onTabChange(k); }
  const tabs = [
    {k:'ai', label:'AI인사이트'},
    {k:'week', label:'주간'},
    {k:'month', label:'월간'},
    {k:'year', label:'연간'},
  ];
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:80, overflowY:'auto'}}>
        <PageHeader title="분석 리포트" onBack={onBack} right={<HeaderIcons items={[
          {svg: ICON_DOWNLOAD}, {svg: ICON_SHARE},
        ]}/>}/>

        {/* tabs */}
        <div style={{display:'flex', padding:'4px 18px 0', gap:18, borderBottom:`1px solid ${T.line}`, position:'relative'}}>
          {tabs.map(t => {
            const active = t.k === tab;
            return (
              <button key={t.k} onClick={() => pickTab(t.k)} className="press" style={{
                paddingBottom:12, paddingTop:8,
                fontSize:14, fontWeight: active ? 800 : 600,
                color: active ? T.brand : T.muted2, letterSpacing:'-.04em',
                position:'relative', borderBottom: active ? `2px solid ${T.brand}` : '2px solid transparent',
                marginBottom:-1,
              }}>{t.label}</button>
            );
          })}
        </div>

        <MonthSwitcher label="2026년 4월"/>

        {tab === 'ai' && <ReportAITab characterKey={characterKey} onOpenPricing={onOpenPricing} onOpenRecipe={onOpenRecipe}/>}
        {tab === 'week' && <ReportWeekTab/>}
        {tab === 'month' && <ReportPlaceholder label="월간 리포트"/>}
        {tab === 'year' && <ReportPlaceholder label="연간 리포트"/>}

        <div style={{height:24}}/>
      </div>
    </div>
  );
}

function ReportAITab({ characterKey, onOpenPricing, onOpenRecipe }) {
  return (
    <>
      {/* STABLE card */}
      <div style={{margin:'14px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
        <div style={{display:'inline-flex', alignItems:'center', gap:5, padding:'4px 11px', borderRadius:9999, border:'1px solid #16A34A', color:'#16A34A', fontSize:11, fontWeight:800, letterSpacing:'.02em'}}>
          <span style={{width:14, height:14, borderRadius:'50%', background:'#16A34A', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:9}}>✓</span>
          STABLE
        </div>
        <div style={{marginTop:12, fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em', lineHeight:1.7}}>
          이번 달은 예산보다 아껴 썼어요!<br/>
          월 평균 수입 보다 <b style={{color:'#FF5252'}}>+217%</b> 더 벌었어요.<br/>
          지난 달보다 지출을 <b style={{color:T.brand}}>-10%</b> 줄였어요.<br/>
          목표 저축 금액을 <b style={{color:'#FF5252'}}>+120%</b> 달성했어요.<br/>
          저금통에 지난 달보다 <b style={{color:'#FF5252'}}>+13만원</b> 더 쌓였어요.
        </div>
        <div style={{marginTop:14, padding:'14px 14px', background:T.surface1, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontWeight:700, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>이번달 추가 수익 1,820,100원</div>
          <button onClick={onOpenRecipe} className="press" style={{fontSize:12, fontWeight:700, color:T.brand, letterSpacing:'-.04em'}}>투자하기 ›</button>
        </div>
        <button className="press" style={{
          marginTop:12, width:'100%', height:46, borderRadius:10, background:T.brand, color:'#fff',
          fontWeight:700, fontSize:13, letterSpacing:'-.04em',
        }}>상세 분석 리포트 보기</button>
      </div>

      {/* peer card */}
      <div style={{margin:'14px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span style={{width:18, height:18, borderRadius:'50%', background:T.brand, color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11}}>✓</span>
          <span style={{fontWeight:800, fontSize:14, color:T.brand, letterSpacing:'-.04em'}}>주변 상권 분석</span>
        </div>
        <div style={{marginTop:10, fontSize:13, color:T.ink2, fontWeight:500, letterSpacing:'-.04em', lineHeight:1.6}}>
          식재료 원가율이 <b style={{color:'#FF5252'}}>38%</b>로 주변 한식당 업종 평균(32%)보다 높아요
        </div>
        <button onClick={onOpenPricing} className="press" style={{
          marginTop:12, width:'100%', height:42, borderRadius:10, background:T.chipDark, color:'#fff',
          fontWeight:700, fontSize:12, letterSpacing:'-.04em',
        }}>Starter 구독제 이상 보기</button>
      </div>

      {/* donut + 매출/지출/수익 */}
      <div style={{margin:'14px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
        <div style={{fontSize:13, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>이번 달 순 수익</div>
        <div style={{marginTop:4, fontWeight:800, fontSize:24, color:T.ink, letterSpacing:'-.045em'}}>1,234,567원</div>

        <div style={{marginTop:18, position:'relative', display:'flex', justifyContent:'center'}}>
          <div style={{width:200, height:200, borderRadius:'50%', position:'relative',
            background:`conic-gradient(${T.brand} 0 37%, ${T.brandSoft} 37% 77%, #DCE3FF 77% 100%)`,
          }}>
            <div style={{position:'absolute', inset:36, borderRadius:'50%', background:'#fff'}}/>
          </div>
          <div style={{position:'absolute', right:18, top:46, textAlign:'center'}}>
            <div style={{fontSize:11, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>월급</div>
            <div style={{fontSize:14, color:T.ink, fontWeight:800, letterSpacing:'-.04em'}}>37.0%</div>
          </div>
          <div style={{position:'absolute', left:14, top:120, textAlign:'center'}}>
            <div style={{fontSize:11, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>지출</div>
            <div style={{fontSize:14, color:T.ink, fontWeight:800, letterSpacing:'-.04em'}}>40.0%</div>
          </div>
          <div style={{position:'absolute', left:24, top:30, textAlign:'center'}}>
            <div style={{fontSize:11, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>비상금</div>
            <div style={{fontSize:14, color:T.ink, fontWeight:800, letterSpacing:'-.04em'}}>23.0%</div>
          </div>
        </div>

        <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:10}}>
          {[
            {l:'매출', v:'30,000,000원', w:'90%', c:T.brand},
            {l:'지출', v:'10,000,000원', w:'30%', c:'#5DD3C9'},
            {l:'수익', v:'20,000,000원', w:'60%', c:'#C4E427'},
          ].map(r => (
            <div key={r.l} style={{display:'flex', alignItems:'center', gap:10}}>
              <div style={{width:30, fontSize:12, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>{r.l}</div>
              <div style={{flex:1, height:8, borderRadius:4, background:T.surface2, overflow:'hidden'}}>
                <div style={{width:r.w, height:'100%', background:r.c, borderRadius:4}}/>
              </div>
              <div style={{minWidth:96, textAlign:'right', fontSize:12, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 이번 달 주요 알림 */}
      <div style={{margin:'14px 18px 0', background:'#fff', borderRadius:14, padding:'14px 18px 14px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontSize:13, fontWeight:800, color:T.ink, letterSpacing:'-.04em'}}>이번 달 주요 알림</div>
          <span style={{color:T.muted2, fontSize:11}}>∨</span>
        </div>
        <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:8}}>
          {[
            {kind:'ok',   text:'종합소득세 신고일 까지 D-4'},
            {kind:'ok',   text:'월세 납부 기한 D-2'},
            {kind:'warn', text:'확인되지 않은 지출 2건이 발생 했습니다'},
          ].map((a,i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'10px 12px', borderRadius:10,
              background: a.kind==='warn' ? '#FFF7E6' : '#E8F7EF',
              border: `1px solid ${a.kind==='warn' ? '#FFE3A5' : '#BFE5CC'}`,
            }}>
              <span style={{
                width:18, height:18, borderRadius:'50%',
                background: a.kind==='warn' ? '#F8C24E' : '#16A34A',
                color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900,
              }}>{a.kind==='warn' ? '!' : '✓'}</span>
              <span style={{fontSize:12, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>{a.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 현금흐름 위험 경보 */}
      <div style={{margin:'14px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span style={{width:18, height:18, borderRadius:'50%', background:'#FF4D52', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900}}>!</span>
          <span style={{fontWeight:800, fontSize:14, color:'#FF4D52', letterSpacing:'-.04em'}}>현금흐름 위험 경보</span>
        </div>
        <div style={{marginTop:8, fontSize:13, color:T.ink2, fontWeight:500, letterSpacing:'-.04em', lineHeight:1.55}}>
          다음 달 카드 결제일에 <b style={{color:'#FF4D52'}}>잔액부족</b>이 예상돼요
        </div>
        <button onClick={onOpenRecipe} className="press" style={{
          marginTop:12, width:'100%', height:42, borderRadius:10, background:T.chipDark, color:'#fff',
          fontWeight:700, fontSize:12, letterSpacing:'-.04em',
        }}>대출 알아보기</button>
      </div>

      {/* 이상 패턴 감지 */}
      <div style={{margin:'14px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span style={{width:18, height:18, borderRadius:'50%', background:'#F5C04E', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900}}>!</span>
          <span style={{fontWeight:800, fontSize:14, color:'#C68A0E', letterSpacing:'-.04em'}}>이상 패턴 감지</span>
        </div>
        <div style={{marginTop:8, fontSize:13, color:T.ink2, fontWeight:500, letterSpacing:'-.04em', lineHeight:1.55}}>
          배달앱 수수료가 <b style={{color:'#FF4D52'}}>전월 대비 23%</b> 증가했어요. 플랫폼 요율을 확인해보세요.
        </div>
        <button onClick={onOpenPricing} className="press" style={{
          marginTop:12, width:'100%', height:42, borderRadius:10, background:T.chipDark, color:'#fff',
          fontWeight:700, fontSize:12, letterSpacing:'-.04em',
        }}>Starter 구독제 이상 보기</button>
      </div>

      {/* floating ↑ button */}
      <div style={{display:'flex', justifyContent:'flex-end', padding:'10px 18px 0'}}>
        <div style={{width:38, height:38, borderRadius:'50%', background:T.brand, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14, boxShadow:'0 4px 10px rgba(95,121,255,.3)'}}>↑</div>
      </div>
    </>
  );
}

function ReportWeekTab() {
  const inWeeks = [
    {l:'3주 전', v:200, label:'200만'},
    {l:'2주 전', v:187, label:'187만'},
    {l:'1주 전', v:220, label:'220만'},
    {l:'이번주', v:293, label:'293만', active:true},
  ];
  const outWeeks = [
    {l:'3주 전', v:80,  label:'80만'},
    {l:'2주 전', v:141, label:'141만'},
    {l:'1주 전', v:50,  label:'50만'},
    {l:'이번주', v:35,  label:'35만', active:true},
  ];
  const inMax = 320, outMax = 160;

  return (
    <>
      {/* hero greeting */}
      <div style={{padding:'10px 22px 0'}}>
        <div style={{fontWeight:800, fontSize:28, color:T.ink, letterSpacing:'-.045em'}}>우사장 님</div>
        <div style={{marginTop:4, fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>이번 주, 돈의 흐름을 확인해보세요!</div>
      </div>

      {/* week range card */}
      <div style={{margin:'12px 18px 0', background:'#fff', borderRadius:14, padding:'14px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <button className="press" style={{width:26, height:26, borderRadius:'50%', background:T.surface2, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="6" height="11" viewBox="0 0 8 14"><path d="M7 1L1 7L7 13" stroke={T.muted} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
          </button>
          <div style={{fontWeight:700, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>2026년 4월 1일 ~ 4월 7일</div>
          <button className="press" style={{width:26, height:26, borderRadius:'50%', background:'#E2E7FF', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="6" height="11" viewBox="0 0 8 14"><path d="M1 1L7 7L1 13" stroke={T.brand} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
          </button>
        </div>
        <div style={{marginTop:14, fontSize:12, color:T.ink2, fontWeight:500, letterSpacing:'-.04em', lineHeight:1.6}}>
          이번주는 주간 평균 예산보다 10% 더 아껴 썼어요!<br/>
          저축과 저금통에 각각 5%씩 추가 적립할 수 있어요. 아낀 금액만큼 돈을 불려 보세요.
        </div>
        <div style={{marginTop:12, padding:'12px 14px', background:T.surface1, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontSize:13, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>이번주 아낀 금액 82,100원</div>
          <button className="press" style={{fontSize:12, fontWeight:700, color:T.brand, letterSpacing:'-.04em'}}>투자하기 ›</button>
        </div>
      </div>

      {/* 2-col bars: 수입 / 지출 */}
      <div style={{margin:'12px 18px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        {[
          {title:'이번 주 수입', data:inWeeks,  max:inMax,  total:'293만원',  totalColor:T.brand},
          {title:'이번 주 지출', data:outWeeks, max:outMax, total:'-13만원',  totalColor:'#C4E427'},
        ].map((g, gi) => (
          <div key={gi} style={{background:'#fff', borderRadius:14, padding:'14px 14px 14px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{fontSize:13, fontWeight:800, color:T.ink, letterSpacing:'-.04em'}}>{g.title}</div>
              <span style={{color:T.muted2, fontSize:14}}>›</span>
            </div>
            <div style={{marginTop:14, display:'flex', alignItems:'flex-end', gap:6, height:120}}>
              {g.data.map((b,i) => (
                <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4}}>
                  <div style={{fontSize:9, color:T.muted, fontWeight:700, letterSpacing:'-.04em'}}>{b.label}</div>
                  <div style={{
                    width:'100%', height:`${(b.v/g.max)*86}px`,
                    background: b.active ? (gi===0 ? T.brand : '#C4E427') : '#E8EAF2',
                    borderRadius:'5px 5px 0 0',
                  }}/>
                  <div style={{fontSize:9, fontWeight: b.active ? 800 : 600, color: b.active ? T.ink : T.muted2, letterSpacing:'-.04em'}}>{b.l}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:8, textAlign:'center', fontWeight:800, fontSize:18, color:g.totalColor, letterSpacing:'-.04em'}}>{g.total}</div>
          </div>
        ))}
      </div>

      {/* 이번 주 월급 적립액 (donut) */}
      <div style={{margin:'12px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontSize:13, fontWeight:800, color:T.ink, letterSpacing:'-.04em'}}>이번 주 월급 적립액</div>
          <span style={{color:T.muted2, fontSize:14}}>›</span>
        </div>
        <div style={{marginTop:12, display:'flex', alignItems:'center', gap:18}}>
          <div style={{width:100, height:100, borderRadius:'50%', flex:'0 0 auto',
            background:`conic-gradient(${T.brand} 0 80%, #E2E7FF 80% 100%)`,
            position:'relative',
          }}>
            <div style={{position:'absolute', inset:18, borderRadius:'50%', background:'#fff'}}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:800, fontSize:24, color:T.brand, letterSpacing:'-.045em', textAlign:'right'}}>165만원</div>
            <div style={{marginTop:4, fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em', textAlign:'right'}}>남은 예산 35만원</div>
            <div style={{marginTop:8, height:1, background:T.line}}/>
            <div style={{marginTop:10, fontSize:12, color:T.ink2, fontWeight:600, letterSpacing:'-.04em', textAlign:'right'}}>오늘은 10만원 적립했어요</div>
            <div style={{marginTop:8, display:'flex', justifyContent:'flex-end'}}>
              <button className="press" style={{padding:'6px 14px', border:`1px solid ${T.line2}`, borderRadius:9999, fontSize:11, fontWeight:700, color:T.ink2, letterSpacing:'-.04em'}}>내역보기</button>
            </div>
          </div>
        </div>
      </div>

      {/* 저금통 잔액 */}
      <div style={{margin:'12px 18px 0', padding:'18px 20px', background:T.brand, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <span style={{color:'#fff', fontWeight:700, fontSize:14, letterSpacing:'-.04em', opacity:.92}}>저금통 잔액</span>
        <span style={{color:'#fff', fontWeight:800, fontSize:20, letterSpacing:'-.045em'}}>165만원 ›</span>
      </div>

      {/* category bars + STABLE */}
      <div style={{margin:'12px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontSize:13, fontWeight:800, color:T.ink, letterSpacing:'-.04em'}}>이번 주 월급 적립액</div>
          <span style={{color:T.muted2, fontSize:14}}>›</span>
        </div>
        <div style={{marginTop:14, display:'flex', flexDirection:'column', gap:12}}>
          {[
            {l:'식재료',     w:'72%', v:'32만원'},
            {l:'임대료',     w:'62%', v:'28만원'},
            {l:'배달수수료', w:'30%', v:'14만원'},
          ].map(r => (
            <div key={r.l} style={{display:'flex', alignItems:'center', gap:10}}>
              <div style={{width:64, fontSize:12, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>{r.l}</div>
              <div style={{flex:1, height:8, borderRadius:4, background:T.surface2, overflow:'hidden'}}>
                <div style={{width:r.w, height:'100%', background:T.brand, borderRadius:4}}/>
              </div>
              <div style={{minWidth:48, textAlign:'right', fontSize:12, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>{r.v}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:14, padding:'10px 14px', background:'#E8F7EF', borderRadius:10, border:'1px solid #BFE5CC', display:'flex', alignItems:'center', gap:8}}>
          <span style={{display:'inline-flex', alignItems:'center', gap:5, padding:'3px 9px', borderRadius:9999, border:'1px solid #16A34A', background:'#fff', color:'#16A34A', fontSize:10, fontWeight:800, letterSpacing:'.02em'}}>
            <span style={{width:11, height:11, borderRadius:'50%', background:'#16A34A', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:8}}>✓</span>
            STABLE
          </span>
          <span style={{fontSize:12, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>이번주 월급 적립은 안정적이에요</span>
        </div>
      </div>

      <div style={{display:'flex', justifyContent:'flex-end', padding:'10px 18px 0'}}>
        <div style={{width:38, height:38, borderRadius:'50%', background:T.brand, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14, boxShadow:'0 4px 10px rgba(95,121,255,.3)'}}>↑</div>
      </div>
    </>
  );
}

function ReportPlaceholder({ label }) {
  return (
    <div style={{margin:'40px 18px 0', padding:'40px 18px', background:'#fff', borderRadius:14, textAlign:'center', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
      <div style={{fontSize:32, marginBottom:10, opacity:.4}}>📊</div>
      <div style={{fontSize:13, color:T.muted, fontWeight:600, letterSpacing:'-.04em'}}>{label} 준비 중</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Category drawer (right slide-in menu)
// ─────────────────────────────────────────────────────────
function CategoryDrawer({ onClose, onNavigate }) {
  const sections = [
    {
      label:'바로가기',
      items:[
        {k:'main',   label:'홈'},
        {k:'book',   label:'장부'},
        {k:'salary_main', label:'월급'},
        {k:'bank',   label:'저금통'},
        {k:'recipe', label:'머니 레시피'},
      ],
    },
    {
      label:'고객지원',
      items:[
        {k:'_faq',     label:'자주 묻는 질문'},
        {k:'_inquiry', label:'1:1 문의'},
        {k:'_notice',  label:'공지사항'},
      ],
    },
    {
      label:'계정',
      items:[
        {k:'_profile',  label:'내 정보'},
        {k:'_alarm',    label:'알림 설정'},
        {k:'_logout',   label:'로그아웃', muted:true},
      ],
    },
  ];

  return (
    <div style={{position:'absolute', inset:0, zIndex:40}}>
      <div onClick={onClose} className="fadein" style={{position:'absolute', inset:0, background:'rgba(0,0,0,.45)'}}/>
      <div className="slide-r" style={{
        position:'absolute', top:0, right:0, bottom:0, width:'78%',
        background:'#fff', boxShadow:'-8px 0 28px rgba(0,0,0,.18)',
        display:'flex', flexDirection:'column',
      }}>
        {/* header strip */}
        <div style={{paddingTop:T.safeTop, padding:`${T.safeTop}px 16px 0 18px`, height:T.safeTop+50, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.04em'}}>카테고리</div>
          <button onClick={onClose} className="press" aria-label="닫기" style={{width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M5 5L17 17M17 5L5 17" stroke={T.ink} strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="scrolly" style={{flex:1, overflowY:'auto', padding:'10px 0 24px'}}>
          {sections.map((s, si) => (
            <div key={si} style={{padding:'8px 0', borderTop: si > 0 ? `1px solid ${T.line}` : 'none'}}>
              <div style={{padding:'8px 22px 6px', fontSize:11, color:T.muted2, fontWeight:700, letterSpacing:'.02em'}}>{s.label}</div>
              {s.items.map(it => (
                <button key={it.k} onClick={() => onNavigate && onNavigate(it.k)} className="press" style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  width:'100%', padding:'12px 22px',
                  fontSize:14, fontWeight:600,
                  color: it.muted ? T.muted2 : T.ink, letterSpacing:'-.04em',
                  background:'transparent', border:0, textAlign:'left',
                }}>
                  <span>{it.label}</span>
                  <span style={{color:T.muted2, fontWeight:700, fontSize:14}}>›</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// expose
// ─────────────────────────────────────────────────────────
Object.assign(window, {
  BottomNav, MainScreen, BookScreen, ReportScreen,
  FilterSheet, PeriodSheet, CategoryDrawer,
  ICON_KEBAB, ICON_SEARCH, ICON_BELL, ICON_USER,
});
