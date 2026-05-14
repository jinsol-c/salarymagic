// screens-bank.jsx — 저금통 (017_Bank)
const { useState: useBankState } = React;

// small bank glyphs (colored circle + monogram) — placeholder for real logos
function BankGlyph({ kind }) {
  if (kind === 'kakao') {
    return (
      <div style={{width:30, height:30, borderRadius:8, background:'#FFE602', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}>
        <span style={{fontWeight:900, fontSize:13, color:'#3A1D1D', letterSpacing:'-.04em'}}>K</span>
      </div>
    );
  }
  if (kind === 'shinhan') {
    return (
      <div style={{width:30, height:30, borderRadius:'50%', background:'#0046B4', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}>
        <span style={{fontWeight:900, fontSize:13, color:'#fff', letterSpacing:'-.04em'}}>S</span>
      </div>
    );
  }
  if (kind === 'pos') {
    return (
      <div style={{width:30, height:30, borderRadius:6, background:'#0091D5', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}>
        <span style={{fontWeight:900, fontSize:9, color:'#fff', letterSpacing:'-.02em'}}>POS</span>
      </div>
    );
  }
  if (kind === 'naver') {
    return (
      <div style={{width:30, height:30, borderRadius:'50%', background:'#03C75A', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}>
        <span style={{fontWeight:900, fontSize:13, color:'#fff'}}>N</span>
      </div>
    );
  }
  return null;
}

function GearIcon({ size = 18 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 22 22" fill="none">
      <path d="M11 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke={T.muted2} strokeWidth="1.4"/>
      <path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.6 4.6l1.4 1.4M16 16l1.4 1.4M4.6 17.4 6 16M16 6l1.4-1.4" stroke={T.muted2} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function MoreDots() {
  return (
    <svg width="4" height="14" viewBox="0 0 4 14" fill="none">
      <circle cx="2" cy="2" r="1.3" fill={T.muted2}/>
      <circle cx="2" cy="7" r="1.3" fill={T.muted2}/>
      <circle cx="2" cy="12" r="1.3" fill={T.muted2}/>
    </svg>
  );
}

// progress bar with 0/25/75/100 ticks
function PiggyProgress({ pct = 85, goalLabel = '목표 1,500만원' }) {
  return (
    <div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>저금통 적립률</div>
        <div style={{padding:'4px 11px', borderRadius:9999, background:'#D5E641', color:'#1A1A1A', fontSize:11, fontWeight:800, letterSpacing:'-.04em'}}>
          {goalLabel}
        </div>
      </div>
      <div style={{marginTop:10, position:'relative', height:10, borderRadius:5, background:'#EAEDF5'}}>
        <div style={{position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`, background:T.brand, borderRadius:5}}/>
        <div style={{position:'absolute', left:`${pct}%`, top:-4, width:18, height:18, borderRadius:'50%', background:'#fff', border:`3px solid ${T.brand}`, transform:'translateX(-50%)', boxShadow:'0 2px 4px rgba(0,0,0,.18)'}}/>
      </div>
      <div style={{marginTop:6, display:'flex', justifyContent:'space-between', fontSize:10, color:T.muted2, fontWeight:600, letterSpacing:'-.03em'}}>
        <span>0%</span><span>25%</span><span>75%</span><span>100%</span>
      </div>
    </div>
  );
}

// transaction list row
function TxRow({ glyph, name, date, amount }) {
  const negative = amount < 0;
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, padding:'10px 0'}}>
      <BankGlyph kind={glyph}/>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:13, color:T.ink, fontWeight:700, letterSpacing:'-.04em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{name}</div>
        <div style={{marginTop:2, fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>{date}</div>
      </div>
      <div style={{fontSize:14, color: negative ? T.brand : '#FF5252', fontWeight:800, letterSpacing:'-.04em'}}>
        {negative ? '−' : '+'} {Math.abs(amount).toLocaleString()}
      </div>
      <button className="press" style={{padding:'4px 2px', display:'flex', alignItems:'center'}}>
        <MoreDots/>
      </button>
    </div>
  );
}

function BankScreen({ onBack, onOpenTradeList, onOpenEmergencySetting, onOpenTaxSetting, onOpenPricing, onOpenRecipe, onOpenMenu }) {
  // Header
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:90, overflowY:'auto'}}>
        {/* header */}
        <div style={{paddingTop:T.safeTop, height:T.safeTop+50, display:'flex', alignItems:'center', padding:`${T.safeTop}px 18px 0`}}>
          <div style={{flex:1, fontWeight:800, fontSize:20, color:T.ink, letterSpacing:'-.045em'}}>저금통</div>
          <button onClick={onOpenMenu} className="press" style={{width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center'}} aria-label="메뉴">
            {window.ICON_KEBAB || <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="4" r="1.6" fill={T.ink}/><circle cx="10" cy="10" r="1.6" fill={T.ink}/><circle cx="10" cy="16" r="1.6" fill={T.ink}/></svg>}
          </button>
        </div>

        {/* 저금통 현황 card */}
        <div style={{margin:'4px 16px 0', background:'#fff', borderRadius:14, padding:'18px 18px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)', position:'relative'}}>
          <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
            <div style={{fontWeight:800, fontSize:15, color:T.ink, letterSpacing:'-.04em'}}>저금통 현황</div>
            <button onClick={onOpenTradeList} className="press" style={{width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center'}} aria-label="거래내역"><img src="assets/icon_setting.png" alt="" className="nodrag" style={{width:22, height:22, objectFit:'contain'}}/></button>
          </div>
          <div style={{marginTop:8, fontWeight:800, fontSize:24, color:T.brand, letterSpacing:'-.045em'}}>1,135,500 원</div>
          {/* mascot — overlaps top-right corner */}
          <img src="assets/img24_piggy.png" className="nodrag float" style={{
            position:'absolute', right:14, top:32, width:78, height:78, objectFit:'contain',
            filter:'drop-shadow(0 4px 8px rgba(95,121,255,.18))', pointerEvents:'none',
          }}/>

          <div style={{marginTop:18}}>
            <PiggyProgress pct={68} goalLabel="목표 1,500만원"/>
          </div>

          <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:10}}>
            <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
              <div style={{fontSize:13, color:T.ink, fontWeight:700, letterSpacing:'-.04em'}}>비상금 상자</div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:14, color:T.ink, fontWeight:800, letterSpacing:'-.04em'}}>1,000,000원</div>
                <div style={{marginTop:2, fontSize:10, color:T.muted2, fontWeight:600, letterSpacing:'-.03em'}}>[카카오뱅크] 262555-232222</div>
              </div>
            </div>
            <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
              <div style={{fontSize:13, color:T.ink, fontWeight:700, letterSpacing:'-.04em'}}>세금 상자</div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:14, color:T.ink, fontWeight:800, letterSpacing:'-.04em'}}>135,900원</div>
                <div style={{marginTop:2, fontSize:10, color:T.muted2, fontWeight:600, letterSpacing:'-.03em'}}>[카카오뱅크] 262555-232222</div>
              </div>
            </div>
          </div>

          <div style={{marginTop:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            <button className="press" style={{
              height:46, borderRadius:10, background:T.brand, color:'#fff',
              fontWeight:700, fontSize:13, letterSpacing:'-.04em',
            }}>저금통 채우기</button>
            <button className="press" style={{
              height:46, borderRadius:10, background:'#EDEEF3', color:'#A0A2AD',
              fontWeight:700, fontSize:13, letterSpacing:'-.04em', cursor:'default',
            }}>저금통 깨기</button>
          </div>
        </div>

        {/* Pro 인기 banner */}
        <button onClick={onOpenPricing} className="press" style={{margin:'14px 16px 0', background:'#EEF1FF', borderRadius:14, padding:'14px 16px', border:'1px solid #DCE3FF', display:'flex', alignItems:'center', gap:12, textAlign:'left', width:'calc(100% - 32px)'}}>
          <img src="assets/char-pro.png" className="nodrag" style={{width:54, height:54, objectFit:'contain', flex:'0 0 auto'}}/>
          <div style={{flex:1, minWidth:0}}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <span style={{fontWeight:800, fontSize:14, color:T.brand, letterSpacing:'-.04em'}}>Pro</span>
              <span style={{padding:'2px 9px', borderRadius:9999, border:`1px solid ${T.brand}`, color:T.brand, fontSize:10, fontWeight:800, letterSpacing:'-.04em'}}>인기</span>
            </div>
            <div style={{marginTop:4, fontWeight:800, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>AI가 알아서 굴리는 똑똑한 투자 마법</div>
            <div style={{marginTop:2, fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>Pro 이상 구독제 확인하기</div>
          </div>
        </button>

        {/* 비상금 상자 detail card */}
        <SubBoxCard
          title="비상금 상자"
          amount="1,000,000 원"
          bankLabel="[카카오뱅크] 262555-232222"
          onMore={onOpenEmergencySetting}
          safeBox={{
            title:'세이프존 3개월',
            body:'안정 구간 유지 중이에요. 현재 비상금으로 약 3개월간 수입이 없\n어도 고정비를 유지할 수 있어요.',
          }}
          stats={[
            {label:'이번달 저축액', value:'500,000원'},
            {label:'매출 대비 적립률', value:'4.25%'},
          ]}
          txs={[
            {glyph:'shinhan', name:'{입금자명}', date:'4월 9일', amount:-15000},
            {glyph:'kakao',   name:'5월 비상금 자동이체', date:'4월 10일', amount:-50000},
            {glyph:'pos',     name:'박사장', date:'4월 11일', amount:-100000},
          ]}
        />

        {/* 비상금 키우기 promo */}
        <button onClick={onOpenRecipe} className="press" style={{margin:'14px 16px 0', background:'#fff', borderRadius:14, padding:'14px 16px', border:`1px solid ${T.line}`, display:'flex', alignItems:'center', gap:12, boxShadow:'0 4px 12px rgba(0,0,0,.04)', textAlign:'left', width:'calc(100% - 32px)'}}>
          <img src="assets/char-emergency.png" className="nodrag" style={{width:54, height:54, objectFit:'contain', flex:'0 0 auto'}}/>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontWeight:800, fontSize:13, color:T.ink, letterSpacing:'-.04em'}}>비상금, 더 크게 키우기!</div>
            <div style={{marginTop:4, fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em', lineHeight:1.55}}>
              비상금 상자가 충분히 모였어요!<br/>잠시 쉬고 있는 여유 자금을 투자로 운용해 보세요.
            </div>
          </div>
          <span style={{color:T.muted2, fontWeight:700, fontSize:16}}>›</span>
        </button>

        {/* 세금 상자 detail card */}
        <SubBoxCard
          title="세금 상자"
          amount="1,135,500 원"
          bankLabel="[우리은행] 7777-232222"
          onMore={onOpenTaxSetting}
          showMascot
          goalPill="목표 650만원"
          progressPct={52}
          safeBox={{
            title:'종합소득세 D-14',
            body:'월급술사가 비상금의 30%를 차곡차곡 모아 세금을 준비하고 있\n어요.',
          }}
          metaRows={[
            {label:'세금 신청 일정', value:'2026년 05월 01일 ~ 06월 01일'},
            {label:'예상 세액', value:'6,500,000원'},
          ]}
          txs={[
            {glyph:'shinhan', name:'부가가치세 모으기 4회차', date:'4월 9일', amount:-15000},
            {glyph:'kakao',   name:'종합소득세 모으기 2회차', date:'4월 10일', amount:-50000},
            {glyph:'naver',   name:'박사장', date:'4월 11일', amount:-100000},
          ]}
        />

        <div style={{height:24}}/>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Sub-box detail card (비상금 / 세금)
// ───────────────────────────────────────────────────────────
function SubBoxCard({ title, amount, bankLabel, showMascot, goalPill, progressPct, safeBox, stats, metaRows, txs, onMore }) {
  return (
    <div style={{margin:'14px 16px 0', background:'#fff', borderRadius:14, padding:'18px 18px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)', position:'relative'}}>
      <div style={{fontWeight:800, fontSize:15, color:T.ink, letterSpacing:'-.04em'}}>{title}</div>
      <div style={{marginTop:8, fontWeight:800, fontSize:22, color:T.brand, letterSpacing:'-.045em', whiteSpace:'nowrap'}}>{amount}</div>
      <div style={{marginTop:4, display:'flex', alignItems:'center', gap:6}}>
        <span style={{fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.03em'}}>{bankLabel}</span>
        <button className="press" style={{width:14, height:14, display:'flex'}}><GearIcon size={14}/></button>
      </div>

      {showMascot && (
        <img src="assets/char-tax.png" className="nodrag float-slow" style={{
          position:'absolute', right:16, top:14, width:80, height:80, objectFit:'contain',
        }}/>
      )}

      {goalPill && (
        <div style={{marginTop:14}}>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <div style={{padding:'4px 11px', borderRadius:9999, background:'#D5E641', color:'#1A1A1A', fontSize:11, fontWeight:800, letterSpacing:'-.04em'}}>
              {goalPill}
            </div>
          </div>
          <div style={{marginTop:8, position:'relative', height:10, borderRadius:5, background:'#EAEDF5'}}>
            <div style={{position:'absolute', left:0, top:0, bottom:0, width:`${progressPct}%`, background:T.brand, borderRadius:5}}/>
            <div style={{position:'absolute', left:`${progressPct}%`, top:-4, width:18, height:18, borderRadius:'50%', background:'#fff', border:`3px solid ${T.brand}`, transform:'translateX(-50%)', boxShadow:'0 2px 4px rgba(0,0,0,.18)'}}/>
          </div>
          <div style={{marginTop:6, display:'flex', justifyContent:'space-between', fontSize:10, color:T.muted2, fontWeight:600, letterSpacing:'-.03em'}}>
            <span>0%</span><span>25%</span><span>75%</span><span>100%</span>
          </div>
        </div>
      )}

      {/* safe-zone banner */}
      {safeBox && (
        <div style={{marginTop:14, padding:'12px 14px', background:'#E8F7EF', border:'1px solid #BFE5CC', borderRadius:10}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <span style={{width:18, height:18, borderRadius:'50%', background:'#16A34A', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800}}>✓</span>
            <span style={{fontWeight:800, fontSize:13, color:'#16A34A', letterSpacing:'-.04em'}}>{safeBox.title}</span>
          </div>
          <div style={{marginTop:6, fontSize:12, color:T.ink2, fontWeight:500, letterSpacing:'-.04em', lineHeight:1.55, whiteSpace:'pre-line'}}>
            {safeBox.body}
          </div>
        </div>
      )}

      {stats && (
        <div style={{marginTop:14, padding:'14px 0', background:T.surface1, borderRadius:10, display:'flex'}}>
          {stats.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{flex:1, textAlign:'center'}}>
                <div style={{fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>{s.label}</div>
                <div style={{marginTop:4, fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.04em'}}>{s.value}</div>
              </div>
              {i < stats.length - 1 && <div style={{width:1, background:T.line}}/>}
            </React.Fragment>
          ))}
        </div>
      )}

      {metaRows && (
        <div style={{marginTop:14, display:'flex', flexDirection:'column', gap:8}}>
          {metaRows.map((r, i) => (
            <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <span style={{fontSize:12, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>{r.label}</span>
              <span style={{fontSize:13, color:T.ink, fontWeight:700, letterSpacing:'-.04em'}}>{r.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* 거래 내역 */}
      <div style={{marginTop:16, fontWeight:800, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>거래 내역</div>
      <div style={{marginTop:4}}>
        {txs.map((t, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{height:1, background:T.line, opacity:.6}}/>}
            <TxRow {...t}/>
          </React.Fragment>
        ))}
      </div>

      <button onClick={onMore} className="press" style={{
        marginTop:14, width:'100%', height:46, borderRadius:10, background:T.brand, color:'#fff',
        fontWeight:800, fontSize:14, letterSpacing:'-.04em',
      }}>더보기</button>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// 저금통 거래내역 풀팝업 (017-1)
// ───────────────────────────────────────────────────────────
function BankTradeListPopup({ onClose }) {
  const [period, setPeriod] = useBankState('1개월');
  const [box, setBox] = useBankState('비상금');
  const periods = ['1개월','3개월','6개월','직접 설정'];

  // monthly savings bar data
  const months = [
    {l:'1월', v:90},
    {l:'2월', v:70},
    {l:'3월', v:110},
    {l:'4월', v:130},
    {l:'5월', v:120, active:true},
  ];
  const maxV = 200;
  const yTicks = [200, 150, 100, 50, 0];

  return (
    <div className="fadein" style={{position:'absolute', inset:0, zIndex:60, background:'#F4F5F9'}}>
      {/* close */}
      <button onClick={onClose} className="press" style={{
        position:'absolute', top:T.safeTop, right:14, width:36, height:36, zIndex:5,
        display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', borderRadius:'50%',
      }} aria-label="닫기">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5L17 17M17 5L5 17" stroke={T.ink} strokeWidth="2" strokeLinecap="round"/></svg>
      </button>

      <div className="scrolly" style={{position:'absolute', inset:0, paddingTop:T.safeTop+44, paddingBottom:28, overflowY:'auto'}}>
        <div style={{padding:'0 22px 14px'}}>
          <div style={{fontWeight:800, fontSize:22, color:T.ink, letterSpacing:'-.045em'}}>저금통 거래내역</div>
        </div>

        {/* 월별 저축액 card */}
        <div style={{margin:'0 16px 0', background:'#fff', borderRadius:14, padding:'16px 18px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{fontWeight:800, fontSize:14, color:T.brand, letterSpacing:'-.04em'}}>월별 저축액</div>

          {/* chart */}
          <div style={{marginTop:14, display:'flex', gap:8}}>
            {/* y-axis labels */}
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:160, fontSize:10, color:T.muted2, fontWeight:600, letterSpacing:'-.03em', textAlign:'right'}}>
              {yTicks.map(y => <div key={y}>{y}</div>)}
            </div>
            {/* bars */}
            <div style={{flex:1, position:'relative'}}>
              {/* grid lines */}
              <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                {yTicks.map((_, i) => (
                  <div key={i} style={{height:1, background: i === yTicks.length-1 ? T.line : '#F0F1F5'}}/>
                ))}
              </div>
              <div style={{position:'relative', height:160, display:'flex', alignItems:'flex-end', gap:8, padding:'0 4px'}}>
                {months.map((m, i) => (
                  <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', height:'100%', justifyContent:'flex-end', position:'relative'}}>
                    {m.active && (
                      <div style={{position:'absolute', top:-2, fontSize:10, fontWeight:800, color:T.brand, letterSpacing:'-.04em'}}>120만</div>
                    )}
                    <div style={{
                      width:'72%', height:`${(m.v/maxV)*100}%`,
                      background:T.brand, borderRadius:'4px 4px 0 0',
                    }}/>
                  </div>
                ))}
              </div>
              {/* x labels */}
              <div style={{marginTop:6, display:'flex', gap:8, padding:'0 4px'}}>
                {months.map((m, i) => (
                  <div key={i} style={{flex:1, textAlign:'center', fontSize:11, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>{m.l}</div>
                ))}
              </div>
            </div>
          </div>

          {/* totals row */}
          <div style={{marginTop:18, padding:'14px 0', background:T.surface1, borderRadius:10, display:'flex'}}>
            {[
              {l:'총액', v:'1,135,500원'},
              {l:'비상금 상자', v:'1,000,000원'},
              {l:'세금 상자', v:'135,000원'},
            ].map((s,i,arr) => (
              <React.Fragment key={i}>
                <div style={{flex:1, textAlign:'center', padding:'0 4px'}}>
                  <div style={{fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>{s.l}</div>
                  <div style={{marginTop:6, fontSize:13, fontWeight:800, color:T.ink, letterSpacing:'-.04em'}}>{s.v}</div>
                </div>
                {i < arr.length-1 && <div style={{width:1, background:T.line}}/>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 조회기간 + 계좌선택 + 입출금 내역 card */}
        <div style={{margin:'14px 16px 0', background:'#fff', borderRadius:14, padding:'18px 18px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
          <div style={{fontSize:12, color:T.muted2, fontWeight:700, letterSpacing:'-.04em'}}>조회기간</div>
          <div style={{marginTop:10, display:'flex', gap:8, flexWrap:'wrap'}}>
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

          <div style={{marginTop:18, fontSize:12, color:T.muted2, fontWeight:700, letterSpacing:'-.04em'}}>계좌선택</div>
          <div style={{marginTop:10, display:'flex', gap:8}}>
            <button className="press" style={{
              padding:'9px 14px', borderRadius:9999, background:'#EDEEF3',
              fontSize:12, fontWeight:700, color:T.muted, letterSpacing:'-.04em',
              display:'flex', alignItems:'center', gap:6,
            }}>
              {box} <span style={{fontSize:9}}>▾</span>
            </button>
            <button className="press" style={{
              flex:1, padding:'9px 14px', borderRadius:9999, background:'#EDEEF3',
              fontSize:12, fontWeight:700, color:T.muted, letterSpacing:'-.04em',
              display:'flex', alignItems:'center', justifyContent:'space-between',
            }}>
              <span>카카오뱅크  3333090-3344455</span>
              <span style={{fontSize:9}}>▾</span>
            </button>
          </div>

          <div style={{marginTop:18, fontWeight:800, fontSize:14, color:T.ink, letterSpacing:'-.04em'}}>입출금 내역</div>
          <div style={{marginTop:4}}>
            {[
              {glyph:'shinhan', name:'{입금자명 또는 메모}', date:'4월 9일',  amount:-15000},
              {glyph:'kakao',   name:'종합소득세 모으기 2회차', date:'4월 10일', amount:-50000},
              {glyph:'naver',   name:'박사장',           date:'4월 11일', amount:-100000},
            ].map((t,i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{height:1, background:T.line, opacity:.6}}/>}
                <TxRow {...t}/>
              </React.Fragment>
            ))}
          </div>

          <button className="press" style={{
            marginTop:14, width:'100%', height:46, borderRadius:9999, background:T.brand, color:'#fff',
            fontWeight:800, fontSize:14, letterSpacing:'-.04em',
          }}>더보기</button>
        </div>

        <div style={{height:20}}/>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// 비상금/세금 상자 설정 풀팝업 (026 + 027)
// ───────────────────────────────────────────────────────────
function BankBoxSettingPopup({ initialTab = 'emergency', onClose }) {
  const [tab, setTab] = useBankState(initialTab);
  const [safeMonths, setSafeMonths] = useBankState('5개월');
  const [minMonths, setMinMonths] = useBankState('1개월');
  const [taxEnabled, setTaxEnabled] = useBankState(true);
  const [taxMode, setTaxMode] = useBankState('staged'); // staged | lump

  return (
    <div style={{position:'absolute', inset:0, zIndex:60}}>
      {/* dim backdrop */}
      <div onClick={onClose} className="fadein" style={{position:'absolute', inset:0, background:'rgba(0,0,0,.45)'}}/>

      {/* sheet — rises from bottom */}
      <div className="slide-up" style={{
        position:'absolute', left:0, right:0, bottom:0,
        background:'#F4F5F9',
        borderRadius:'20px 20px 0 0',
        boxShadow:'0 -8px 28px rgba(0,0,0,.22)',
        maxHeight:'88%',
        display:'flex', flexDirection:'column',
      }}>
        {/* drag handle */}
        <div style={{padding:'10px 0 4px', display:'flex', justifyContent:'center', flex:'0 0 auto'}}>
          <div style={{width:42, height:4, borderRadius:2, background:T.line2}}/>
        </div>

        {/* tabs */}
        <div style={{position:'relative', display:'grid', gridTemplateColumns:'1fr 1fr', padding:'4px 16px 0', borderBottom:`1px solid ${T.line}`, flex:'0 0 auto'}}>
          {[
            {k:'emergency', label:'비상금 상자'},
            {k:'tax',       label:'세금 상자'},
          ].map(t => {
            const active = t.k === tab;
            return (
              <button key={t.k} onClick={()=>setTab(t.k)} className="press" style={{
                paddingBottom:12, paddingTop:10,
                fontSize:15, fontWeight: active ? 800 : 600,
                color: active ? T.brand : T.muted2, letterSpacing:'-.04em',
                borderBottom: active ? `2px solid ${T.brand}` : '2px solid transparent',
                marginBottom:-1,
              }}>{t.label}</button>
            );
          })}
          {/* close button absolute top-right */}
          <button onClick={onClose} className="press" aria-label="닫기" style={{
            position:'absolute', top:4, right:8, width:36, height:36,
            display:'flex', alignItems:'center', justifyContent:'center', background:'transparent',
          }}>
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M5 5L17 17M17 5L5 17" stroke={T.ink} strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* body */}
        <div className="scrolly" style={{overflowY:'auto', paddingBottom:28, flex:'1 1 auto'}}>
          {tab === 'emergency' ? (
            <EmergencyBoxPanel safeMonths={safeMonths} setSafeMonths={setSafeMonths} minMonths={minMonths} setMinMonths={setMinMonths}/>
          ) : (
            <TaxBoxPanel taxEnabled={taxEnabled} setTaxEnabled={setTaxEnabled} taxMode={taxMode} setTaxMode={setTaxMode}/>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionCard({ children }) {
  return (
    <div style={{margin:'14px 16px 0', background:'#fff', borderRadius:14, padding:'18px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
      {children}
    </div>
  );
}
function SectionTitle({ children }) {
  return <div style={{fontWeight:800, fontSize:15, color:T.brand, letterSpacing:'-.04em'}}>{children}</div>;
}
function FormRow({ label, value, valueColor }) {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0'}}>
      <span style={{fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>{label}</span>
      <span style={{fontSize:13, color: valueColor || T.ink, fontWeight:700, letterSpacing:'-.04em'}}>{value}</span>
    </div>
  );
}
function ChipDropdown({ value, onChange, options }) {
  // simple read-only chip — visual match for screenshot
  return (
    <button className="press" style={{
      padding:'7px 14px', borderRadius:9999, background:'#EDEEF3',
      fontSize:12, fontWeight:700, color:T.muted, letterSpacing:'-.04em',
      display:'inline-flex', alignItems:'center', gap:6,
    }}>
      {value} <span style={{fontSize:9}}>▾</span>
    </button>
  );
}

function AccountCard() {
  return (
    <>
      <SectionTitle>계좌 관리</SectionTitle>
      <div style={{marginTop:6}}>
        <FormRow label="은행" value="카카오 뱅크"/>
        <FormRow label="계좌명" value="카카오뱅크 주거래 우대통장(저축예금)"/>
        <FormRow label="계좌번호" value="333-262555-232222"/>
      </div>
      <div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:10}}>
        <button className="press" style={{height:46, borderRadius:9999, background:'#E2E7FF', color:T.brand, fontWeight:800, fontSize:13, letterSpacing:'-.04em'}}>변경하기</button>
        <button className="press" style={{height:46, borderRadius:9999, background:T.brand, color:'#fff', fontWeight:800, fontSize:13, letterSpacing:'-.04em'}}>새로 만들기</button>
      </div>
    </>
  );
}

function EmergencyBoxPanel({ safeMonths, setSafeMonths, minMonths, setMinMonths }) {
  return (
    <>
      <SectionCard>
        <AccountCard/>
      </SectionCard>

      <SectionCard>
        <SectionTitle>목표 저축액 설정</SectionTitle>
        <div style={{marginTop:6}}>
          <FormRow label="고정비 (A)" value="월 3,000,000원"/>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0'}}>
            <span style={{fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>세이프존 (B)</span>
            <ChipDropdown value={safeMonths}/>
          </div>
          <FormRow label="목표 저축액 (A*B)" value="15,000,000원"/>
        </div>
      </SectionCard>

      {/* helper line w/ mascot */}
      <div style={{margin:'14px 16px 0', padding:'12px 16px', display:'flex', alignItems:'center', gap:12}}>
        <div style={{flex:1, fontSize:12, color:T.muted, fontWeight:600, letterSpacing:'-.04em', lineHeight:1.55}}>
          지금 설정한 목표 저축액은<br/>안정적으로 유지할 수 있을 것으로 보여요.
        </div>
        <img src="assets/char-pro.png" className="nodrag" style={{width:60, height:60, objectFit:'contain', flex:'0 0 auto'}}/>
      </div>

      <SectionCard>
        <SectionTitle>최소 유지 금액 설정</SectionTitle>
        <div style={{marginTop:6}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0'}}>
            <span style={{fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>세이프존</span>
            <ChipDropdown value={minMonths}/>
          </div>
          <FormRow label="최소 유지 금액" value="월 3,000,000원"/>
        </div>
      </SectionCard>
    </>
  );
}

function TaxBoxPanel({ taxEnabled, setTaxEnabled, taxMode, setTaxMode }) {
  return (
    <>
      {/* header strip with toggle + mascot */}
      <div style={{margin:'18px 16px 0', padding:'4px 4px', display:'flex', alignItems:'center', gap:12}}>
        <div style={{flex:1}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <span style={{fontWeight:800, fontSize:15, color:T.brand, letterSpacing:'-.04em'}}>세금 대비금 설정</span>
            <button onClick={()=>setTaxEnabled(v=>!v)} className="press" style={{
              width:44, height:24, borderRadius:9999,
              background: taxEnabled ? T.brand : '#D8DAE3',
              position:'relative', transition:'background .2s',
            }}>
              <span style={{
                position:'absolute', top:2, left: taxEnabled ? 22 : 2,
                width:20, height:20, borderRadius:'50%', background:'#fff',
                transition:'left .2s', boxShadow:'0 1px 3px rgba(0,0,0,.18)',
              }}/>
            </button>
          </div>
          <div style={{marginTop:8, fontSize:12, color:T.muted, fontWeight:600, letterSpacing:'-.04em', lineHeight:1.55}}>
            지금은 종합소득세를 준비하는 중. 예상 세액에<br/>딱 맞춰 비상금의 일부 금액을 따로 보관하고 있어요.
          </div>
        </div>
        <img src="assets/char-tax.png" className="nodrag" style={{width:74, height:74, objectFit:'contain', flex:'0 0 auto'}}/>
      </div>

      <SectionCard>
        <AccountCard/>
      </SectionCard>

      <SectionCard>
        <SectionTitle>세금 모으기 방식</SectionTitle>
        <div style={{marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          {[
            {k:'staged', label:'차곡차곡 모으기'},
            {k:'lump',   label:'한 번에 모으기'},
          ].map(o => {
            const active = o.k === taxMode;
            return (
              <button key={o.k} onClick={()=>setTaxMode(o.k)} className="press" style={{
                height:46, borderRadius:9999,
                background: active ? T.brand : '#E2E7FF',
                color: active ? '#fff' : T.brand,
                fontWeight:800, fontSize:13, letterSpacing:'-.04em',
              }}>{o.label}</button>
            );
          })}
        </div>
      </SectionCard>

      {/* bullet list */}
      <div style={{margin:'14px 22px 0', display:'flex', flexDirection:'column', gap:6}}>
        {[
          'AI가 자동으로 세금 신청일정을 확인해요.',
          '세금 신청일 3개월 전 세금 모으기를 시작해요.',
          '사장님의 매출과 지출 내역을 기반으로 AI가 자동으로 예상 세액을 계산해요.',
          '예상 세액을 3개월로 나누어 딱 맞는 금액을 세금 계좌로 자동이체 해줘요.',
          '예상 세액은 정확하지 않으므로 금액이 남거나 부족할 수 있습니다.',
          '부족한 세금은 당사가 보장하지 않습니다.',
        ].map((t, i, arr) => (
          <div key={i} style={{display:'flex', alignItems:'flex-start', gap:6, fontSize:12, color: i === arr.length-1 ? T.brand : T.ink2, fontWeight: i === arr.length-1 ? 800 : 500, letterSpacing:'-.04em', lineHeight:1.55}}>
            <span style={{flex:'0 0 auto', marginTop:6, width:3, height:3, borderRadius:'50%', background: i === arr.length-1 ? T.brand : T.ink2}}/>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </>
  );
}

Object.assign(window, { BankScreen, BankTradeListPopup, BankBoxSettingPopup });
