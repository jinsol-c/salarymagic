// screens-salary.jsx — 월급 탭 (메인 / 설정변경 / 확인 모달)
const { useState: useSalState, useEffect: useSalEffect } = React;

// ─────────────────────────────────────────────────────────
// 월급 메인 (006_Salary)
// ─────────────────────────────────────────────────────────
function SalaryMainScreen({ onNav, onOpenSetting, onOpenNow, onOpenPricing, onOpenMenu, onOpenHistory }) {
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:90, overflowY:'auto'}}>
        {/* header */}
        <div style={{paddingTop:T.safeTop, height:T.safeTop+50, display:'flex', alignItems:'center', padding:`${T.safeTop}px 18px 0`}}>
          <div style={{flex:1, fontWeight:800, fontSize:20, color:T.ink, letterSpacing:'-.045em'}}>월급</div>
          <button onClick={onOpenMenu} className="press" style={{width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center'}} aria-label="메뉴">
            {ICON_KEBAB}
          </button>
        </div>

        {/* 설정된 월급 카드 */}
        <div style={{margin:'8px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{fontWeight:800, fontSize:15, color:T.ink, letterSpacing:'-.04em'}}>설정된 월급</div>
            <button onClick={onOpenSetting} className="press" style={{display:'flex', alignItems:'center', gap:4, fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>
              설정 변경 <span style={{fontSize:11}}>›</span>
            </button>
          </div>

          <div style={{marginTop:14, display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
            <span style={{fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>설정 월급</span>
            <span style={{fontWeight:800, fontSize:22, color:T.ink, letterSpacing:'-.045em'}}>3,000,000원</span>
          </div>
          <div style={{marginTop:10, display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
            <span style={{fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>급여 계좌</span>
            <span style={{fontSize:13, color:T.ink, fontWeight:700, letterSpacing:'-.04em'}}>카카오뱅크 ****1234</span>
          </div>

          <div style={{marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            <div style={{padding:'12px 12px', background:T.surface1, borderRadius:10, textAlign:'center'}}>
              <div style={{fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>월급 유지가능 기간</div>
              <div style={{marginTop:4, fontWeight:800, fontSize:18, color:T.ink, letterSpacing:'-.04em'}}>약 0.5개월</div>
            </div>
            <div style={{padding:'12px 12px', background:T.surface1, borderRadius:10, textAlign:'center'}}>
              <div style={{fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>다음 지급일</div>
              <div style={{marginTop:4, fontWeight:800, fontSize:18, color:T.ink, letterSpacing:'-.04em'}}>25일 (D-12)</div>
            </div>
          </div>

          <button onClick={onOpenNow} className="press" style={{
            marginTop:14, width:'100%', height:46, borderRadius:8, background:T.brand, color:'#fff',
            fontWeight:700, fontSize:14, letterSpacing:'-.04em',
          }}>월급 지급 받기</button>

          <div style={{marginTop:10, display:'flex', alignItems:'center', gap:5, fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>
            <span style={{display:'inline-flex', width:14, height:14, borderRadius:'50%', border:`1px solid ${T.muted2}`, alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:800}}>!</span>
            필요한 만큼 즉시 수령
          </div>
        </div>

        {/* 2칸 그리드: AI 월급추천 / 월급 이력 */}
        <div style={{margin:'12px 18px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          <button onClick={onOpenPricing} className="press" style={{padding:'14px 14px', background:'#EEF1FF', borderRadius:14, border:`1px solid #DCE3FF`, textAlign:'left', display:'block', width:'100%'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <span style={{padding:'2px 8px', borderRadius:9999, border:`1px solid ${T.brand}`, color:T.brand, fontSize:10, fontWeight:800, letterSpacing:'-.03em'}}>Pro</span>
              <span style={{fontSize:18, color:T.muted2, fontWeight:600}}>+</span>
            </div>
            <div style={{marginTop:14, fontWeight:800, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>AI 월급추천</div>
            <div style={{marginTop:4, fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>최적 금액 제안</div>
          </button>
          <button onClick={onOpenHistory} className="press" style={{padding:'14px 14px', background:'#fff', borderRadius:14, border:`1px solid ${T.line}`, textAlign:'left', display:'block', width:'100%'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2.5" width="12" height="13" rx="1.5" stroke={T.ink} strokeWidth="1.4"/><path d="M6 6h6M6 9h6M6 12h4" stroke={T.ink} strokeWidth="1.4" strokeLinecap="round"/></svg>
              <span style={{fontSize:18, color:T.muted2, fontWeight:600}}>+</span>
            </div>
            <div style={{marginTop:14, fontWeight:800, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>월급 이력</div>
            <div style={{marginTop:4, fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>수령 내역 조회</div>
          </button>
        </div>

        {/* 월급 안정성 분석 */}
        <div style={{margin:'12px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 16px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{fontWeight:800, fontSize:15, color:T.ink, letterSpacing:'-.04em'}}>월급 안정성 분석</div>
          <div style={{marginTop:14, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <span style={{fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>이번달 안정성</span>
            <span style={{fontWeight:800, fontSize:24, color:T.ink, letterSpacing:'-.045em'}}>88<span style={{fontSize:14}}>%</span></span>
          </div>
          {/* gradient bar */}
          <div style={{marginTop:10, height:10, borderRadius:5, background:'linear-gradient(to right, #5BD9C9 0%, #6FA8FF 50%, #4A6CFF 100%)', position:'relative'}}>
            <div style={{position:'absolute', left:'88%', top:-4, width:18, height:18, borderRadius:'50%', background:'#fff', border:`3px solid ${T.brand}`, transform:'translateX(-50%)', boxShadow:'0 2px 4px rgba(0,0,0,.2)'}}/>
          </div>
          <div style={{marginTop:6, display:'flex', justifyContent:'space-between', fontSize:10, color:T.muted2, fontWeight:600, letterSpacing:'-.03em'}}>
            <span>0 %</span><span>50 %</span><span>100 %</span>
          </div>

          <div style={{marginTop:14, padding:'14px', background:'#E8F7EF', borderRadius:10, border:'1px solid #BFE5CC'}}>
            <div style={{display:'flex', alignItems:'center', gap:6}}>
              <span style={{width:18, height:18, borderRadius:'50%', background:'#16A34A', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11}}>✓</span>
              <span style={{fontWeight:800, fontSize:13, color:'#16A34A', letterSpacing:'-.04em'}}>안정 - 안정적인 월급 상태입니다</span>
            </div>
            <div style={{marginTop:8, fontSize:12, color:T.ink2, fontWeight:500, letterSpacing:'-.04em', lineHeight:1.55}}>
              현재 월급은 최근 수익 흐름 기준으로 안정적으로 유지 가능한 수준입니다. 잉여 자금 활용이나 비상금 확충을 통해 재무 안정성을 높일 수 있습니다.
            </div>
          </div>
        </div>

        <div style={{height:30}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 월급 설정 변경 (011_Salary_Setting)
// ─────────────────────────────────────────────────────────
function SalarySettingScreen({ onBack, onSaved }) {
  const [amount, setAmount] = useSalState(1500000);
  const [day, setDay] = useSalState(25);
  const [account, setAccount] = useSalState('woori');
  const [showConfirm, setShowConfirm] = useSalState(false);

  const presets = [
    {k:'min', label:'최소', amt:1200000},
    {k:'rec', label:'추천', amt:1500000},
    {k:'max', label:'최대', amt:1800000},
  ];
  const dayChips = [1,5,10,15,20,25,28,30];
  const accounts = [
    {k:'woori', name:'우리은행 메인 계좌', no:'1002-***-987654'},
    {k:'kakao', name:'카카오뱅크 계좌', no:'3333-***-987654'},
    {k:'kb',    name:'국민은행 계좌',     no:'9401-***-987654'},
  ];

  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:30, overflowY:'auto'}}>
        <PageHeader title="월급 설정 변경" onBack={onBack} right={<HeaderIcons items={[{svg:ICON_SEARCH},{svg:ICON_BELL},{svg:ICON_USER}]}/>}/>

        {/* 추천금액 카드 */}
        <div style={{margin:'8px 18px 0', background:'#EEF1FF', borderRadius:14, padding:'16px 18px', border:'1px solid #DCE3FF'}}>
          <span style={{display:'inline-block', padding:'3px 10px', borderRadius:9999, border:`1px solid ${T.brand}`, color:T.brand, fontSize:11, fontWeight:800, letterSpacing:'-.04em'}}>추천금액</span>
          <div style={{marginTop:8, fontWeight:800, fontSize:24, color:T.ink, letterSpacing:'-.045em'}}>1,500,000원</div>
          <div style={{marginTop:2, fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>최근 3개월 수입 패턴 기준</div>
          <div style={{marginTop:10, height:8, borderRadius:4, background:'#DCE3FF', overflow:'hidden'}}>
            <div style={{width:'60%', height:'100%', background:T.brand, borderRadius:4}}/>
          </div>
          <div style={{marginTop:6, display:'flex', justifyContent:'space-between', fontSize:11, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>
            <div><div>최소</div><div style={{fontSize:12, color:T.ink, fontWeight:700, marginTop:2}}>1,200,000원</div></div>
            <div style={{textAlign:'right'}}><div>최대</div><div style={{fontSize:12, color:T.ink, fontWeight:700, marginTop:2}}>1,800,000원</div></div>
          </div>
        </div>

        {/* 월급 금액 선택 */}
        <div style={{margin:'12px 18px 0', background:'#fff', borderRadius:14, padding:'16px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{fontWeight:800, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>월급 금액 선택</div>
          <div style={{marginTop:10, fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>희망 월급 (원)</div>
          <div style={{marginTop:6, display:'flex', alignItems:'center', gap:8, padding:'10px 12px', border:`1px solid ${T.line2}`, borderRadius:10}}>
            <input value={amount.toLocaleString()} onChange={e => setAmount(parseInt(e.target.value.replace(/[^0-9]/g,'') || '0'))} style={{
              flex:1, border:0, outline:'none', fontSize:15, fontWeight:700, color:T.ink, letterSpacing:'-.04em', background:'transparent',
            }}/>
            <button onClick={()=>setAmount(a=>Math.max(0,a-100000))} className="press" style={{width:28, height:28, borderRadius:'50%', background:T.surface1, color:T.muted, fontSize:18, fontWeight:600}}>−</button>
            <button onClick={()=>setAmount(a=>a+100000)} className="press" style={{width:28, height:28, borderRadius:'50%', background:T.brand, color:'#fff', fontSize:16, fontWeight:600}}>+</button>
          </div>
          <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
            {presets.map(p => {
              const active = amount === p.amt;
              return (
                <button key={p.k} onClick={()=>setAmount(p.amt)} className="press" style={{
                  padding:'12px 0', borderRadius:10,
                  background: active ? T.brand : '#fff',
                  border: `1px solid ${active ? T.brand : T.line2}`,
                  color: active ? '#fff' : T.ink,
                  fontWeight:700, letterSpacing:'-.04em', fontSize:12,
                  display:'flex', flexDirection:'column', alignItems:'center', gap:2,
                }}>
                  <span style={{fontSize:11, opacity: active ? .85 : .55}}>{p.label}</span>
                  <span style={{fontSize:13, fontWeight:800}}>{(p.amt/10000)}만원</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 급여일 선택 */}
        <div style={{margin:'12px 18px 0', background:'#fff', borderRadius:14, padding:'16px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{fontWeight:800, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>급여일 선택</div>
          <div style={{marginTop:10, fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>매월 급여 지급일</div>
          <div style={{marginTop:6, display:'flex', alignItems:'center', gap:8, padding:'10px 12px', border:`1px solid ${T.line2}`, borderRadius:10}}>
            <input value={day} onChange={e => setDay(parseInt(e.target.value.replace(/[^0-9]/g,'') || '0'))} placeholder="일자를 입력하세요" style={{
              flex:1, border:0, outline:'none', fontSize:14, fontWeight:600, color:T.ink, letterSpacing:'-.04em', background:'transparent',
            }}/>
            <button onClick={()=>setDay(d=>Math.max(1,d-1))} className="press" style={{width:28, height:28, borderRadius:'50%', background:T.surface1, color:T.muted, fontSize:18, fontWeight:600}}>−</button>
            <button onClick={()=>setDay(d=>Math.min(31,d+1))} className="press" style={{width:28, height:28, borderRadius:'50%', background:T.brand, color:'#fff', fontSize:16, fontWeight:600}}>+</button>
          </div>
          <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8}}>
            {dayChips.map(d => {
              const active = day === d;
              return (
                <button key={d} onClick={()=>setDay(d)} className="press" style={{
                  padding:'10px 0', borderRadius:10,
                  background: active ? T.brand : '#fff',
                  border: `1px solid ${active ? T.brand : T.line2}`,
                  color: active ? '#fff' : T.ink2,
                  fontWeight:700, fontSize:13, letterSpacing:'-.04em',
                }}>{d}일</button>
              );
            })}
          </div>
        </div>

        {/* 급여 계좌 선택 */}
        <div style={{margin:'12px 18px 0', background:'#fff', borderRadius:14, padding:'16px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{fontWeight:800, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>급여 계좌 선택</div>
            <div style={{display:'flex', gap:10, fontSize:11, color:T.muted2, fontWeight:600}}>
              <span>대표계좌지정</span><span>선택삭제</span>
            </div>
          </div>
          <div style={{marginTop:10, display:'flex', alignItems:'center', gap:8}}>
            <div style={{width:18, height:18, borderRadius:4, border:`1.5px solid ${T.line2}`}}/>
            <span style={{fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>전체</span>
          </div>
          <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:8}}>
            {accounts.map(a => {
              const active = account === a.k;
              return (
                <button key={a.k} onClick={()=>setAccount(a.k)} className="press" style={{
                  display:'flex', alignItems:'center', gap:10, padding:'14px 14px',
                  background: active ? '#EEF1FF' : '#fff', border:`1px solid ${active ? T.brand : T.line2}`, borderRadius:10, textAlign:'left',
                }}>
                  <div style={{width:22, height:22, borderRadius:'50%', background: active ? T.brand : '#fff', border:`1.5px solid ${active ? T.brand : T.line2}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {active && <svg width="11" height="8" viewBox="0 0 12 9"><path d="M1 4.5L4.5 8L11 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14, fontWeight:800, color: active ? T.brand : T.ink, letterSpacing:'-.04em'}}>{a.name}</div>
                    <div style={{marginTop:2, fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.03em'}}>{a.no}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <button className="press" style={{
            marginTop:10, width:'100%', padding:'12px 0', border:`1px dashed ${T.line2}`, borderRadius:10,
            background:T.surface1, color:T.muted2, fontSize:13, fontWeight:600, letterSpacing:'-.04em',
            display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
          }}>⊕ 계좌 추가</button>
        </div>

        {/* 하단 액션 */}
        <div style={{margin:'18px 18px 0', display:'flex', flexDirection:'column', gap:8}}>
          <button onClick={()=>setShowConfirm(true)} className="press" style={{
            width:'100%', height:50, borderRadius:30, background:T.brand, color:'#fff', fontWeight:800, fontSize:14, letterSpacing:'-.04em',
          }}>변경사항 저장</button>
          <button onClick={onBack} className="press" style={{
            width:'100%', height:50, borderRadius:30, background:T.surface2, color:T.muted2, fontWeight:700, fontSize:14, letterSpacing:'-.04em',
          }}>취소</button>
        </div>

        <div style={{height:24}}/>
      </div>

      {showConfirm && <SalaryConfirmModal
        amount={amount} day={day}
        accountName={(accounts.find(a=>a.k===account)||accounts[0]).name}
        accountNo={(accounts.find(a=>a.k===account)||accounts[0]).no}
        onCancel={()=>setShowConfirm(false)}
        onSave={()=>{ setShowConfirm(false); onSaved && onSaved(); }}
      />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 월급 설정 확인 팝업 (012)
// ─────────────────────────────────────────────────────────
function SalaryConfirmModal({ amount, day, accountName, accountNo, onCancel, onSave }) {
  return (
    <div style={{position:'absolute', inset:0, zIndex:40}}>
      <div onClick={onCancel} style={{position:'absolute', inset:0, background:'rgba(0,0,0,.45)'}}/>
      <div className="fadein" style={{
        position:'absolute', left:24, right:24, top:'50%', transform:'translateY(-50%)',
        background:'#fff', borderRadius:18, padding:'22px 22px 20px',
        boxShadow:'0 12px 30px rgba(0,0,0,.18)',
      }}>
        <div style={{fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.04em'}}>월급 설정 확인</div>
        <div style={{marginTop:6, fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>아래 내용으로 월급을 설정하시겠습니까?</div>

        <div style={{marginTop:14, padding:'16px 16px', background:T.surface1, borderRadius:10}}>
          <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0'}}>
            <span style={{fontSize:13, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>월급 금액</span>
            <span style={{fontSize:14, color:T.ink, fontWeight:800, letterSpacing:'-.04em'}}>{amount.toLocaleString()}원</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0'}}>
            <span style={{fontSize:13, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>급여일</span>
            <span style={{fontSize:14, color:T.ink, fontWeight:800, letterSpacing:'-.04em'}}>매월 {day}일</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0'}}>
            <span style={{fontSize:13, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>급여 계좌</span>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:14, color:T.ink, fontWeight:800, letterSpacing:'-.04em'}}>{accountName}</div>
              <div style={{marginTop:2, fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.03em'}}>{accountNo}</div>
            </div>
          </div>
        </div>

        <div style={{marginTop:18, display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:10}}>
          <button onClick={onCancel} className="press" style={{
            height:46, borderRadius:8, background:T.surface2, color:T.muted2,
            fontWeight:700, fontSize:14, letterSpacing:'-.04em',
          }}>취소</button>
          <button onClick={onSave} className="press" style={{
            height:46, borderRadius:8, background:T.brand, color:'#fff',
            fontWeight:700, fontSize:14, letterSpacing:'-.04em',
          }}>저장</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 월급 지금 받기 (013_Salary_now / 014_Salary_lack)
// ─────────────────────────────────────────────────────────
function SalaryNowScreen({ onBack, lack = false, onPaid, onFail }) {
  const [amount, setAmount] = useSalState('');
  const setSalary = 2000000;
  const remain = lack ? 0 : 1800000;     // 만원 단위 표기는 따로
  const pct = lack ? 0 : Math.round(remain / setSalary * 100); // 0 ~ 100

  const amountNum = parseInt(amount || '0', 10);
  const overLimit = amountNum > remain;
  const canSubmit = amountNum > 0;
  function handleClaim() {
    if (!canSubmit) return;
    if (overLimit) onFail && onFail();
    else onPaid && onPaid();
  }

  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:30, overflowY:'auto'}}>
        <PageHeader title="월급 지금 받기" onBack={onBack} right={<HeaderIcons items={[{svg:ICON_SEARCH},{svg:ICON_BELL},{svg:ICON_USER}]}/>}/>

        {/* 현재 설정된 월급 헤더 */}
        <div style={{margin:'4px 18px 0', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <span style={{fontSize:13, color:T.brand, fontWeight:700, letterSpacing:'-.04em'}}>현재 설정된 월급</span>
          <button className="press" style={{display:'flex', alignItems:'center', gap:4, fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>
            AI 월급 추천 <span style={{fontSize:11}}>›</span>
          </button>
        </div>
        <div style={{margin:'4px 18px 0', fontWeight:800, fontSize:28, color:T.ink, letterSpacing:'-.045em'}}>
          {setSalary.toLocaleString()}원
        </div>

        {/* 가용금액 카드 */}
        <div style={{margin:'14px 18px 0', background:'#fff', borderRadius:14, padding:'18px 18px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <span style={{fontWeight:800, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>현재 잔여 가용 금액</span>
              {lack ? (
                <span style={{display:'inline-flex', alignItems:'center', gap:4, padding:'3px 9px', borderRadius:9999, background:'#1B1B1B', color:'#fff', fontSize:10, fontWeight:800, letterSpacing:'-.03em'}}>
                  <span style={{width:6, height:6, borderRadius:'50%', background:'#FF5252'}}/> 위험
                </span>
              ) : (
                <span style={{display:'inline-flex', alignItems:'center', gap:4, padding:'3px 9px', borderRadius:9999, background:'#1B1B1B', color:'#fff', fontSize:10, fontWeight:800, letterSpacing:'-.03em'}}>
                  <span style={{width:6, height:6, borderRadius:'50%', background:'#3DD68C'}}/> 안정
                </span>
              )}
            </div>
            <span style={{fontWeight:800, fontSize:18, color:T.ink, letterSpacing:'-.04em'}}>{lack ? 0 : 180}만원</span>
          </div>

          {/* gradient bar */}
          <div style={{marginTop:14, height:8, borderRadius:4, background: lack ? '#F1F1F1' : 'linear-gradient(to right, #5BD9C9 0%, #6FA8FF 50%, #4A6CFF 100%)', position:'relative'}}>
            <div style={{position:'absolute', left:`${pct}%`, top:-3, width:14, height:14, borderRadius:'50%', background: lack ? '#FF4747' : '#fff', border:`2.5px solid ${lack ? '#FF4747' : T.brand}`, transform:'translateX(-50%)', boxShadow:'0 2px 4px rgba(0,0,0,.15)'}}/>
          </div>
          <div style={{marginTop:6, display:'flex', justifyContent:'space-between', fontSize:10, color:T.muted2, fontWeight:600, letterSpacing:'-.03em'}}>
            <span>0 %</span><span>50 %</span><span>100 %</span>
          </div>

          <div style={{marginTop:16, fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>수령 금액</div>
          <div style={{marginTop:6, display:'flex', alignItems:'center', padding:'12px 14px', border:`1px solid ${overLimit ? '#E53E3E' : T.line2}`, borderRadius:10}}>
            <input value={amount ? parseInt(amount,10).toLocaleString() : ''} onChange={e=>setAmount(e.target.value.replace(/[^0-9]/g,''))} placeholder="금액을 입력하세요" style={{
              flex:1, border:0, outline:'none', fontSize:14, fontWeight:600, color:T.ink, letterSpacing:'-.04em', background:'transparent',
            }}/>
            <span style={{fontSize:13, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>원</span>
          </div>
          {!lack && overLimit && (
            <div style={{marginTop:6, fontSize:11, color:'#E53E3E', fontWeight:600, letterSpacing:'-.04em'}}>
              가용 금액({remain.toLocaleString()}원)을 초과했어요. 다시 확인해 주세요.
            </div>
          )}
        </div>

        {lack ? (
          <>
            {/* RISK 알럿 */}
            <div style={{margin:'14px 18px 0', padding:'14px 14px', background:'#FFF1F1', borderRadius:10, border:'1px solid #FFD3D3', display:'flex', gap:10, alignItems:'flex-start'}}>
              <span style={{flexShrink:0, width:18, height:18, borderRadius:'50%', border:'1.5px solid #E53E3E', color:'#E53E3E', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800}}>!</span>
              <div style={{fontSize:12.5, color:'#1B1B1B', fontWeight:600, letterSpacing:'-.04em', lineHeight:1.55}}>
                현재 RISK 상태로 월급 수령이 제한됩니다.<br/>가용 금액이 매우 부족합니다.
              </div>
            </div>

            <div style={{margin:'14px 18px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
              <button onClick={onFail} className="press" style={{
                height:46, borderRadius:10, background:'#1B1B1B', color:'#fff',
                fontWeight:700, fontSize:14, letterSpacing:'-.04em',
              }}>저금통 깨기</button>
              <button onClick={onFail} className="press" style={{
                height:46, borderRadius:10, background:T.brand, color:'#fff',
                fontWeight:700, fontSize:14, letterSpacing:'-.04em',
              }}>대출 알아보기</button>
            </div>
          </>
        ) : (
          <button onClick={handleClaim} disabled={!canSubmit} className="press" style={{
            margin:'14px 18px 0', display:'block', width:'calc(100% - 36px)', height:50, borderRadius:10,
            background: canSubmit ? T.brand : '#C8CEE8', color:'#fff',
            fontWeight:800, fontSize:15, letterSpacing:'-.04em',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
          }}>월급 받기</button>
        )}

        {/* 안내 */}
        <div style={{margin:'18px 18px 0', display:'flex', flexDirection:'column', gap:8}}>
          <div style={{display:'flex', alignItems:'center', gap:6, fontSize:13, color:T.ink, fontWeight:700, letterSpacing:'-.04em'}}>
            <span style={{width:16, height:16, borderRadius:'50%', border:`1.5px solid ${T.muted2}`, color:T.muted2, display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800}}>!</span>
            월급 수령 안내
          </div>
          <ul style={{margin:0, padding:'0 0 0 18px', display:'flex', flexDirection:'column', gap:4, fontSize:12, color:T.muted2, fontWeight:500, letterSpacing:'-.04em', lineHeight:1.55}}>
            <li>설정된 월급 범위 내에서 필요한 만큼 땡겨 받을 수 있습니다.</li>
            <li>가용 금액이 부족하면 수령이 제한될 수 있습니다.</li>
          </ul>
        </div>

        <div style={{height:24}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 지급 완료 / 지급 실패 모달 (015 / 016)
// ─────────────────────────────────────────────────────────
function SalaryPaidModal({ kind = 'ok', onClose }) {
  const ok = kind === 'ok';
  return (
    <div style={{position:'absolute', inset:0, zIndex:50}}>
      <div onClick={onClose} style={{position:'absolute', inset:0, background:'rgba(0,0,0,.45)'}}/>
      <div className="pop" style={{
        position:'absolute', left:24, right:24, top:'50%', transform:'translateY(-50%)',
        background:'#fff', borderRadius:18, padding:'26px 22px 22px',
        boxShadow:'0 12px 30px rgba(0,0,0,.18)', textAlign:'center',
      }}>
        <div style={{position:'relative', height:180, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <img src={ok ? 'assets/character_ok.png' : 'assets/character_fail.png'} className="nodrag" style={{
            height:180, objectFit:'contain',
          }}/>
        </div>
        <div style={{marginTop:8, fontWeight:800, fontSize:18, color:T.ink, letterSpacing:'-.04em'}}>
          {ok ? '지급 완료' : '지급 실패'}
        </div>
        <div style={{marginTop:6, fontSize:13, color:T.muted2, fontWeight:600, letterSpacing:'-.04em', lineHeight:1.55}}>
          {ok
            ? '월급을 안전하게 지급하였습니다.'
            : <>월급이 지급되지 않았어요.<br/>월급 계좌를 다시 확인해 보세요.</>}
        </div>
        <button onClick={onClose} className="press" style={{
          marginTop:18, width:'100%', height:46, borderRadius:10, background:T.brand, color:'#fff',
          fontWeight:800, fontSize:14, letterSpacing:'-.04em',
        }}>확인</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 요금제 풀팝업 (PricingPopup) — AI 월급추천 클릭 시
// ─────────────────────────────────────────────────────────
function PricingPopup({ onClose }) {
  const plans = [
    {
      k:'beginner',
      name:'Beginner', tag:'무료', tagColor:T.muted2,
      sub:'기본 관리 + 협업 관리 부가',
      items:[
        '수입 지출 분석 기반 매출 관리',
        '사장님 월급 지급',
        '비상금 운용 및 기본 리포트',
        '위험 감지 알림 + 대출 추천',
      ],
      cta:'시작하기', ctaStyle:'disabled',
    },
    {
      k:'starter',
      name:'Starter', popular:true, tag:'월 지불', tagColor:T.muted2,
      sub:'자동화 + 인사이트 강화',
      items:[
        'Free 기능 전체 포함',
        'AI 기반 자금 운용(로보어드바이저)',
        '업계 비교 · 상권 분석 리포트',
        '매출 감소시 자동 대출 중개',
      ],
      cta:'시작하기', ctaStyle:'primary',
    },
    {
      k:'booster',
      name:'Booster', tag:'맞춤 견적', tagColor:T.muted2,
      sub:'재무 자동화 + 금융 확장',
      items:[
        'Starter 기능 전체 포함',
        '종합소득세 신고 · 환급 자동화',
        '경정청구 기반 환급 지원',
        'BNPL 월 1회 지원',
      ],
      cta:'문의하기', ctaStyle:'primary',
    },
    {
      k:'master',
      name:'Master', tag:'맞춤 견적', tagColor:T.muted2,
      sub:'자금 유동성 관리형 + 부가 마케팅 관리',
      items:[
        'Pro 기능 전체 포함',
        '선지급 사용수 등록수 및',
        '자사별 사업수 등록수',
        '업무 등록별',
        '마케팅 비용 데이터 분석 안내',
      ],
      cta:'문의하기', ctaStyle:'primary',
    },
  ];

  return (
    <div className="fadein" style={{position:'absolute', inset:0, zIndex:60, background:'#F4F5F9'}}>
      {/* close button */}
      <button onClick={onClose} className="press" style={{
        position:'absolute', top:T.safeTop, right:14, width:36, height:36,
        display:'flex', alignItems:'center', justifyContent:'center', zIndex:5,
        background:'transparent', borderRadius:'50%',
      }} aria-label="닫기">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5L17 17M17 5L5 17" stroke={T.ink} strokeWidth="2" strokeLinecap="round"/></svg>
      </button>

      <div className="scrolly" style={{position:'absolute', inset:0, paddingTop:T.safeTop+44, paddingBottom:28, overflowY:'auto'}}>
        <div style={{padding:'0 22px 14px'}}>
          <div style={{fontWeight:800, fontSize:22, color:T.ink, letterSpacing:'-.045em'}}>요금제</div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:14, padding:'0 18px'}}>
          {plans.map(p => (
            <div key={p.k} style={{
              background:'#fff', borderRadius:14,
              padding:'18px 18px 18px',
              border:`1px solid ${T.line}`,
              boxShadow:'0 4px 12px rgba(0,0,0,.04)',
            }}>
              <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <span style={{fontWeight:800, fontSize:20, color:T.brand, letterSpacing:'-.045em'}}>{p.name}</span>
                  {p.popular && (
                    <span style={{padding:'2px 9px', borderRadius:9999, border:`1px solid ${T.brand}`, color:T.brand, fontSize:11, fontWeight:800, letterSpacing:'-.03em'}}>인기</span>
                  )}
                </div>
                <span style={{fontSize:12, color:T.muted2, fontWeight:700, letterSpacing:'-.04em'}}>{p.tag}</span>
              </div>
              <div style={{marginTop:6, fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>{p.sub}</div>

              <div style={{marginTop:14, display:'flex', flexDirection:'column', gap:9}}>
                {p.items.map((it, i) => (
                  <div key={i} style={{display:'flex', alignItems:'flex-start', gap:8}}>
                    <span style={{
                      flex:'0 0 auto', width:16, height:16, marginTop:2, borderRadius:'50%',
                      background:T.brand, color:'#fff',
                      display:'inline-flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.6L3.6 6L8 1.2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span style={{fontSize:13, color:T.ink2, fontWeight:500, letterSpacing:'-.04em', lineHeight:1.45}}>{it}</span>
                  </div>
                ))}
              </div>

              <button className="press" disabled={p.ctaStyle==='disabled'} style={{
                marginTop:16, width:'100%', height:46, borderRadius:10,
                background: p.ctaStyle==='disabled' ? '#DEDFE5' : T.brand,
                color: p.ctaStyle==='disabled' ? '#9A9CA6' : '#fff',
                fontWeight:800, fontSize:14, letterSpacing:'-.04em',
                cursor: p.ctaStyle==='disabled' ? 'default' : 'pointer',
              }}>{p.cta}</button>
            </div>
          ))}
        </div>

        {/* scroll-to-top FAB */}
        <div style={{display:'flex', justifyContent:'flex-end', padding:'14px 22px 6px'}}>
          <div style={{width:38, height:38, borderRadius:'50%', background:T.brand, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14, boxShadow:'0 4px 10px rgba(95,121,255,.3)'}}>↑</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 월급 수령 이력 (0232_Salary_list)
// ─────────────────────────────────────────────────────────
function SalaryHistoryScreen({ onBack }) {
  const [period, setPeriod] = useSalState('1개월');
  const [sort, setSort]     = useSalState('최신순');
  const periods = ['1개월','3개월','6개월','직접설정'];

  // chip colors for kind
  const KIND_CHIPS = {
    regular:    { label:'정기 월급',     fg:T.brand, bg:'#E2E7FF' },
    advance:    { label:'월급 땡겨받기', fg:'#A88BFF', bg:'#F5F0FF' },
    emergency:  { label:'비상금 사용',   fg:'#E25555', bg:'#FFE9E9' },
  };
  const STATUS_CHIPS = {
    normal:  { label:'정상',    fg:'#16A34A', bg:'#E5F6EC' },
    safe:    { label:'보호모드', fg:'#C68A0E', bg:'#FFF1D6' },
  };

  const rows = [
    { amount:'1,500,000', kind:'regular',   status:'normal', date:'2026년 05월 01일' },
    { amount:'500,000',   kind:'advance',   status:'normal', date:'2026년 04월 15일' },
    { amount:'1,500,000', kind:'regular',   status:'safe',   date:'2026년 03월 25일',
      banner:{ tone:'warn', text:'보호모드로 지급되었습니다. 수입이 예상보다 적어 안전 금액으로 조정되었습니다.' } },
    { amount:'1,500,000', kind:'emergency', status:'safe',   date:'2026년 03월 25일',
      banner:{ tone:'alert', text:'비상금이 사용되었습니다. 수입이 부족하여 보호모드가 활성화 되었을 수 있습니다.' } },
  ];

  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:30, overflowY:'auto'}}>
        <PageHeader title="월급 수령 이력" onBack={onBack}/>

        {/* summary card */}
        <div style={{margin:'4px 16px 0', background:'#fff', borderRadius:14, padding:'16px 16px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
            {[
              {l:'총 수령액', v:'680만원'},
              {l:'정기 월급', v:'4회'},
              {l:'비상금 사용', v:'1회'},
            ].map((s, i) => (
              <div key={i} style={{padding:'14px 8px', borderRadius:10, background:T.surface1, textAlign:'center'}}>
                <div style={{fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>{s.l}</div>
                <div style={{marginTop:6, fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.045em'}}>{s.v}</div>
              </div>
            ))}
          </div>

          <div style={{marginTop:16, fontSize:12, color:T.muted2, fontWeight:700, letterSpacing:'-.04em'}}>조회기간</div>
          <div style={{marginTop:8, display:'flex', gap:8, flexWrap:'wrap'}}>
            {periods.map(p => {
              const active = p === period;
              return (
                <button key={p} onClick={()=>setPeriod(p)} className="press" style={{
                  padding:'7px 14px', borderRadius:9999,
                  border:`1px solid ${active ? T.brand : T.line2}`,
                  background:'#fff',
                  color: active ? T.brand : T.muted,
                  fontSize:12, fontWeight:700, letterSpacing:'-.04em',
                }}>{p}</button>
              );
            })}
          </div>

          <div style={{marginTop:14, fontSize:12, color:T.muted2, fontWeight:700, letterSpacing:'-.04em'}}>계좌선택</div>
          <button className="press" style={{
            marginTop:8, width:'100%', padding:'10px 14px', borderRadius:9999,
            border:`1px solid ${T.line2}`, background:'#fff',
            fontSize:13, fontWeight:600, color:T.ink, letterSpacing:'-.04em',
            display:'flex', alignItems:'center', justifyContent:'space-between',
          }}>
            <span>카카오뱅크  3333090-3344455</span>
            <span style={{fontSize:11, color:T.muted2}}>▾</span>
          </button>
        </div>

        {/* 수령 이력 list card */}
        <div style={{margin:'14px 16px 0', background:'#fff', borderRadius:14, padding:'16px 16px 6px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'baseline', gap:8}}>
              <div style={{fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.045em'}}>수령 이력</div>
              <div style={{fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>총 {rows.length}건</div>
            </div>
            <button className="press" style={{display:'flex', alignItems:'center', gap:4, fontSize:12, color:T.muted, fontWeight:600, letterSpacing:'-.04em'}}>
              {sort} <span style={{fontSize:10}}>▾</span>
            </button>
          </div>

          <div style={{marginTop:6}}>
            {rows.map((r, i) => {
              const kind = KIND_CHIPS[r.kind];
              const status = STATUS_CHIPS[r.status];
              return (
                <div key={i} style={{padding:'14px 0', borderTop: i ? `1px solid ${T.line}` : 'none'}}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:10}}>
                    <div style={{flex:1, minWidth:0, display:'flex', alignItems:'center', flexWrap:'wrap', gap:8}}>
                      <span style={{fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.045em'}}>{r.amount} 원</span>
                      <span style={{padding:'3px 9px', borderRadius:9999, background:kind.bg, color:kind.fg, fontSize:11, fontWeight:800, letterSpacing:'-.03em'}}>{kind.label}</span>
                    </div>
                    <span style={{padding:'3px 11px', borderRadius:9999, background:status.bg, color:status.fg, fontSize:11, fontWeight:800, letterSpacing:'-.03em'}}>{status.label}</span>
                  </div>
                  <div style={{marginTop:4, fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>{r.date}</div>
                  {r.banner && (
                    <div style={{
                      marginTop:10, padding:'10px 12px', borderRadius:10,
                      background: r.banner.tone === 'alert' ? '#FFF0F0' : '#FFF6E5',
                      border: `1px solid ${r.banner.tone === 'alert' ? '#FFCFCF' : '#FFE0A8'}`,
                      display:'flex', alignItems:'flex-start', gap:8,
                    }}>
                      <span style={{
                        flex:'0 0 auto', marginTop:1, width:14, height:14, borderRadius:'50%',
                        background: r.banner.tone === 'alert' ? '#FF6B6B' : '#F4B43A',
                        color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center',
                        fontSize:9, fontWeight:900,
                      }}>{r.banner.tone === 'alert' ? '!' : '!'}</span>
                      <span style={{flex:1, fontSize:11, color: r.banner.tone === 'alert' ? '#A82E2E' : '#9A6B0F', fontWeight:600, letterSpacing:'-.04em', lineHeight:1.55}}>
                        {r.banner.text}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{height:24}}/>
      </div>
    </div>
  );
}

Object.assign(window, { SalaryMainScreen, SalarySettingScreen, SalaryConfirmModal, SalaryNowScreen, SalaryPaidModal, PricingPopup, SalaryHistoryScreen });
