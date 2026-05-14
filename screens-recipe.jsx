// screens-recipe.jsx — 머니 레시피 (018_Marketplace)
const { useState: useRecipeState } = React;

// reuse BankGlyph styling for small product icons in lists (rounded-square)
function RGlyph({ kind }) {
  if (kind === 'shinhan') return <div style={{width:32, height:32, borderRadius:8, background:'#0046B4', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}><span style={{fontWeight:900, fontSize:13, color:'#fff'}}>S</span></div>;
  if (kind === 'kbank') return <div style={{width:32, height:32, borderRadius:8, background:'#101C5E', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}><span style={{fontWeight:900, fontSize:9, color:'#fff', letterSpacing:'-.04em'}}>Kbank</span></div>;
  if (kind === 'kakao') return <div style={{width:32, height:32, borderRadius:8, background:'#FFE602', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}><span style={{fontWeight:900, fontSize:13, color:'#3A1D1D'}}>K</span></div>;
  if (kind === 'naver') return <div style={{width:32, height:32, borderRadius:8, background:'#03C75A', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}><span style={{fontWeight:900, fontSize:13, color:'#fff'}}>N</span></div>;
  if (kind === 'kb') return <div style={{width:32, height:32, borderRadius:8, background:'#FFCC00', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}><span style={{fontWeight:900, fontSize:11, color:'#3D2A00'}}>KB</span></div>;
  if (kind === 'digi') return <div style={{width:32, height:32, borderRadius:8, background:'#1A1A1A', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}><span style={{fontWeight:900, fontSize:8, color:'#fff', letterSpacing:'-.04em', lineHeight:1}}>DIGI<br/>LOCA</span></div>;
  if (kind === 'rank1') return <div style={{width:32, height:32, borderRadius:8, background:'#7AE38C', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}><span style={{fontWeight:900, fontSize:13, color:'#fff'}}>1</span></div>;
  if (kind === 'rank3') return <div style={{width:32, height:32, borderRadius:8, background:'#FFB347', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}><span style={{fontWeight:900, fontSize:13, color:'#fff'}}>3</span></div>;
  if (kind === 'rank5') return <div style={{width:32, height:32, borderRadius:8, background:'#E25555', display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}><span style={{fontWeight:900, fontSize:13, color:'#fff'}}>5</span></div>;
  return null;
}

function CategoryButton({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="press" style={{display:'flex', flexDirection:'column', alignItems:'center', gap:6, flex:1, background:'transparent', border:0, cursor:'pointer'}}>
      <div style={{width:46, height:46, borderRadius:12, background:'#fff', boxShadow:'0 2px 6px rgba(0,0,0,.06)', border:`1px solid ${T.line}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
        {icon}
      </div>
      <div style={{fontSize:12, color:T.ink, fontWeight:700, letterSpacing:'-.04em'}}>{label}</div>
    </button>
  );
}

function RecipeSection({ title, onMore, children }) {
  return (
    <div style={{margin:'14px 16px 0', background:'#fff', borderRadius:14, padding:'16px 16px 12px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingBottom:6}}>
        <div style={{fontWeight:800, fontSize:15, color:T.ink, letterSpacing:'-.04em'}}>{title}</div>
        <button onClick={onMore} className="press" style={{padding:4, color:T.muted2, fontSize:16, fontWeight:700, background:'transparent', border:0}}>›</button>
      </div>
      <div style={{display:'flex', flexDirection:'column'}}>{children}</div>
    </div>
  );
}

function ProductRow({ glyph, name, sub, rightTop, rightSub, rightStyle, ctaLabel }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderTop:`1px solid ${T.line}`}}>
      <RGlyph kind={glyph}/>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:13, color:T.ink, fontWeight:700, letterSpacing:'-.04em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{name}</div>
        <div style={{marginTop:2, fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{sub}</div>
      </div>
      {ctaLabel ? (
        <button className="press" style={{
          padding:'7px 14px', borderRadius:9999, border:`1px solid ${T.brand}`,
          color:T.brand, fontSize:11, fontWeight:800, letterSpacing:'-.04em',
          background:'#fff',
        }}>{ctaLabel}</button>
      ) : (
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:13, color: rightStyle === 'green' ? '#16A34A' : T.ink, fontWeight:800, letterSpacing:'-.04em', whiteSpace:'nowrap'}}>{rightTop}</div>
          <div style={{marginTop:2, fontSize:11, color:T.muted2, fontWeight:600, letterSpacing:'-.04em', whiteSpace:'nowrap'}}>{rightSub}</div>
        </div>
      )}
    </div>
  );
}

const ICN_LOAN = (<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="6" width="20" height="14" rx="2" stroke="#3A5BFF" strokeWidth="1.6"/><rect x="6" y="9" width="14" height="2" fill="#3A5BFF"/><rect x="6" y="13" width="9" height="2" fill="#FFB347"/><rect x="6" y="16" width="6" height="2" fill="#E2E7FF"/></svg>);
const ICN_INVEST = (<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="4" y="14" width="3.5" height="7" fill="#3A5BFF"/><rect x="11" y="10" width="3.5" height="11" fill="#FFB347"/><rect x="18" y="6" width="3.5" height="15" fill="#16A34A"/></svg>);
const ICN_INS = (<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 3l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V6l8-3z" stroke="#FFB347" strokeWidth="1.6" fill="#FFE3A5"/><path d="M9 13l3 3 5-6" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>);
const ICN_CARD = (<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="6" width="20" height="14" rx="2" fill="#3A5BFF"/><rect x="3" y="10" width="20" height="3" fill="#1F2A66"/><rect x="6" y="16" width="6" height="2" rx="1" fill="#fff"/></svg>);

function MoneyRecipeScreen({ onBack, onOpenPricing, onOpenLoan, onOpenInvest, onOpenInsurance, onOpenCard, onOpenBank }) {
  const [adIdx, setAdIdx] = useRecipeState(2);
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:90, overflowY:'auto'}}>
        {/* header */}
        <div style={{paddingTop:T.safeTop, height:T.safeTop+50, display:'flex', alignItems:'center', padding:`${T.safeTop}px 8px 0 8px`}}>
          <BackChevron onBack={onBack}/>
          <div style={{flex:1, fontWeight:800, fontSize:18, color:T.ink, letterSpacing:'-.045em'}}>머니 레시피</div>
        </div>

        {/* status pill */}
        <div style={{margin:'0 16px 0', background:'#fff', borderRadius:12, padding:'10px 14px', border:`1px solid ${T.line}`, display:'flex', alignItems:'center', gap:10}}>
          <span style={{padding:'3px 10px', borderRadius:9999, background:'#16A34A', color:'#fff', fontSize:11, fontWeight:800, letterSpacing:'-.04em', display:'inline-flex', alignItems:'center', gap:5}}>
            <span style={{width:6, height:6, borderRadius:'50%', background:'#A6F4C5'}}/> 안정
          </span>
          <span style={{fontSize:12, fontWeight:700, color:T.ink, letterSpacing:'-.04em'}}>투자로 자산을 키워볼 타이밍입니다.</span>
        </div>

        {/* AD carousel */}
        <div style={{margin:'14px 16px 0'}}>
          <div style={{position:'relative', borderRadius:14, overflow:'hidden', background:'linear-gradient(180deg,#A8C0FF 0%, #6F8DDB 100%)', padding:'20px 18px 22px', minHeight:240}}>
            <span style={{position:'absolute', top:14, right:14, padding:'3px 9px', borderRadius:9999, background:'rgba(255,255,255,.85)', color:T.ink2, fontSize:11, fontWeight:800, letterSpacing:'-.03em'}}>AD</span>
            <div style={{color:'#fff', fontWeight:800, fontSize:18, letterSpacing:'-.04em'}}>신한 자산운용</div>
            <div style={{marginTop:4, color:'#fff', fontWeight:800, fontSize:18, letterSpacing:'-.04em'}}>알아서 자라는 자산 마법!</div>

            {/* mock inner offer card */}
            <div style={{marginTop:14, background:'#fff', borderRadius:12, padding:'14px 16px', textAlign:'center'}}>
              <div style={{fontSize:13, color:T.brand, fontWeight:800, letterSpacing:'-.04em'}}>신한마음편한TDF</div>
              <div style={{marginTop:2, fontSize:10, color:T.muted2, fontWeight:600}}>(2035, 2040, 2045)</div>
              <div style={{marginTop:8, fontSize:11, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>
                수탁고 500억 이상 TDF 중 <span style={{color:'#FF5252', fontWeight:800}}>3년 수익률 1위</span>
              </div>
              <div style={{marginTop:6, fontSize:9, color:T.muted2, fontWeight:600, letterSpacing:'-.04em'}}>● 신한자산운용</div>
            </div>
          </div>
          {/* dots */}
          <div style={{display:'flex', justifyContent:'center', gap:6, marginTop:10}}>
            {[0,1,2,3,4].map(i => (
              <span key={i} style={{
                width: i===adIdx?7:5, height: i===adIdx?7:5, borderRadius:'50%',
                background: i===adIdx ? T.brand : T.line2,
              }}/>
            ))}
          </div>
        </div>

        {/* categories */}
        <div style={{margin:'12px 16px 0', display:'flex', gap:8}}>
          <CategoryButton icon={ICN_LOAN}   label="대출" onClick={onOpenLoan}/>
          <CategoryButton icon={ICN_INVEST} label="투자" onClick={onOpenInvest}/>
          <CategoryButton icon={ICN_INS}    label="보험" onClick={onOpenInsurance}/>
          <CategoryButton icon={ICN_CARD}   label="카드" onClick={onOpenCard}/>
        </div>

        {/* 대출 */}
        <RecipeSection title="대출" onMore={onOpenLoan}>
          <ProductRow glyph="shinhan" name="보증서로 대출 받기" sub="카카오뱅크 개인사업자 보증서 대출"
            rightTop="1.82%" rightSub="최대 1억원"/>
          <ProductRow glyph="kbank" name="개인사업자 대출 갈아타기" sub="케이뱅크 개인사업자 신용대출"
            rightTop="연 5.27 ~ 11.5%" rightSub="최대 10억원"/>
          <ProductRow glyph="kakao" name="개인사업자 부동산 담보 대출" sub="카카오뱅크 개인사업자 부동산 담보대출"
            rightTop="연 5.27 ~ 8.9%" rightSub="최대 1.2억원"/>
        </RecipeSection>

        {/* 저금통 잔액 strip */}
        <button onClick={onOpenBank} className="press" style={{margin:'14px 16px 0', padding:'16px 18px', background:T.brand, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'space-between', width:'calc(100% - 32px)', border:0, cursor:'pointer'}}>
          <span style={{color:'#fff', fontWeight:700, fontSize:14, letterSpacing:'-.04em', opacity:.92}}>저금통 잔액</span>
          <span style={{color:'#fff', fontWeight:800, fontSize:18, letterSpacing:'-.045em'}}>165만원 ›</span>
        </button>

        {/* 투자 */}
        <RecipeSection title="투자" onMore={onOpenInvest}>
          <ProductRow glyph="rank1" name="차곡차곡 돈 굴리기" sub="카카오뱅크 개인사업자 통장"
            rightTop="+ 0.18%" rightSub="12개월 후" rightStyle="green"/>
          <ProductRow glyph="rank5" name="미래성장기업에 안정 더하기" sub="NH-Amundi성장주도코리아130증권투자신탁(채권혼합)Ce"
            rightTop="+18.54%" rightSub="6개월 후" rightStyle="green"/>
          <ProductRow glyph="rank3" name="거북이처럼 꾸준한 수익추구" sub="마이다스거북이90증권자투자신탁1호(주식)Ce"
            rightTop="+5.68%" rightSub="6개월 후" rightStyle="green"/>
        </RecipeSection>

        {/* 보험 */}
        <RecipeSection title="보험" onMore={onOpenInsurance}>
          <ProductRow glyph="shinhan" name="배송 실수도 보상 받아요!" sub="온라인 자영업자 전용 보험" ctaLabel="보험료 확인"/>
          <ProductRow glyph="kb"      name="매장에 문제가 생겼을 때" sub="KB 개인사업자 사업장 화재 보험" ctaLabel="보험료 확인"/>
          <ProductRow glyph="naver"   name="오토바이 운전자도 간편 가입" sub="DB손해보험 다이렉트 라이더+보험" ctaLabel="보험료 확인"/>
        </RecipeSection>

        {/* 카드 */}
        <RecipeSection title="카드" onMore={onOpenCard}>
          <ProductRow glyph="shinhan" name="통신비 최대 50%할인 받아요!" sub="KB국민 Youth Club 체크카드" ctaLabel="상품 정보"/>
          <ProductRow glyph="digi"    name="관리비 최대 10% 아끼는 비법" sub="LOCA 365" ctaLabel="상품 정보"/>
          <ProductRow glyph="shinhan" name="주유비 최대 3만원 할인 받아요!" sub="신한카드 Mr.Life" ctaLabel="상품 정보"/>
        </RecipeSection>

        {/* floating ↑ */}
        <div style={{display:'flex', justifyContent:'flex-end', padding:'10px 18px 0'}}>
          <div style={{width:38, height:38, borderRadius:'50%', background:T.brand, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14, boxShadow:'0 4px 10px rgba(95,121,255,.3)'}}>↑</div>
        </div>

        <div style={{height:20}}/>
      </div>
    </div>
  );
}

Object.assign(window, { MoneyRecipeScreen });
