// screens-recipe-details.jsx — 머니 레시피 카테고리 상세 화면 (020/021/022/023)
const { useState: useRDetailState } = React;

// ─────────────────────────────────────────────────────────
// shared atoms
// ─────────────────────────────────────────────────────────
function DetailHeader({ title, onBack }) {
  return (
    <div style={{paddingTop:T.safeTop, height:T.safeTop+50, display:'flex', alignItems:'center', padding:`${T.safeTop}px 8px 0 8px`}}>
      <BackChevron onBack={onBack}/>
      <div style={{flex:1, fontWeight:800, fontSize:18, color:T.ink, letterSpacing:'-.045em'}}>{title}</div>
    </div>
  );
}

function DetailCard({ title, children }) {
  return (
    <div style={{margin:'14px 16px 0', background:'#fff', borderRadius:14, padding:'18px 18px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
      <div style={{fontWeight:800, fontSize:16, color:T.ink, letterSpacing:'-.045em'}}>{title}</div>
      <div style={{marginTop:12, height:1, background:T.line}}/>
      <div style={{marginTop:6}}>{children}</div>
    </div>
  );
}

// product/info row: name (bold) + subtitle (muted) + optional right slot
function InfoRow({ name, sub, nameColor, subColor, right }) {
  return (
    <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10, padding:'10px 0'}}>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:13, color: nameColor || T.ink, fontWeight:700, letterSpacing:'-.04em', lineHeight:1.45}}>{name}</div>
        {sub && <div style={{marginTop:3, fontSize:12, color: subColor || T.muted2, fontWeight:600, letterSpacing:'-.04em', lineHeight:1.45}}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// simple link/text row (no subtitle, full-width clickable feel)
function LinkRow({ label }) {
  return (
    <div style={{padding:'12px 0', fontSize:13, color:T.ink, fontWeight:600, letterSpacing:'-.04em'}}>{label}</div>
  );
}

function TossAdCard() {
  return (
    <div style={{margin:'14px 16px 0', background:'#fff', borderRadius:14, padding:'16px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <span style={{fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>사업자 대출, 동종업계 대비 낮은 이율로 시작하기</span>
        <span style={{padding:'2px 9px', borderRadius:9999, border:`1px solid ${T.brand}`, color:T.brand, fontSize:10, fontWeight:800, letterSpacing:'-.03em'}}>AD</span>
      </div>
      <button className="press" style={{
        marginTop:14, width:'100%', height:42, borderRadius:9999, background:'#EEF1FF',
        color:T.brand, fontSize:13, fontWeight:800, letterSpacing:'-.04em',
      }}>지금 토스에서 확인하기</button>
    </div>
  );
}

function TossInsuranceAdCard() {
  return (
    <div style={{margin:'14px 16px 0', background:'#fff', borderRadius:14, padding:'16px 18px', boxShadow:'0 4px 12px rgba(0,0,0,.04)'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <span style={{fontSize:13, color:T.ink2, fontWeight:600, letterSpacing:'-.04em'}}>맞춤 보험료 할인 최대 10%, 내 보험 분석 받기</span>
        <span style={{padding:'2px 9px', borderRadius:9999, border:`1px solid ${T.brand}`, color:T.brand, fontSize:10, fontWeight:800, letterSpacing:'-.03em'}}>AD</span>
      </div>
      <button className="press" style={{
        marginTop:14, width:'100%', height:42, borderRadius:9999, background:'#EEF1FF',
        color:T.brand, fontSize:13, fontWeight:800, letterSpacing:'-.04em',
      }}>지금 토스에서 확인하기</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 020 — 대출
// ─────────────────────────────────────────────────────────
function LoanScreen({ onBack }) {
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:80, overflowY:'auto'}}>
        <DetailHeader title="대출" onBack={onBack}/>

        <DetailCard title="개인사업자 상품">
          <InfoRow
            name="{상품명 1줄이상 줄바꿈 생략처리 없음}"
            sub="(최소 ~ 최대 이자율) / (최대 대출 금액)"
            nameColor={T.muted2} subColor={T.muted2}
          />
          <InfoRow name="카카오뱅크 개인사업자부동산 담보대출" sub="연 2.66% ~ 7.85% / 최대 10억원" nameColor={T.brand}/>
          <InfoRow name="카카오뱅크 개인사업자 보증서 대출" sub="연 1.82% ~ 5.22% / 최대 1억원" nameColor={T.brand}/>
          <InfoRow name="카카오뱅크 개인사업자 신용대출" sub="연 3.27% ~ 13.84% / 최대 3억원" nameColor={T.brand}/>
        </DetailCard>

        <TossAdCard/>

        <DetailCard title="대출 갈아타기">
          <InfoRow name="주택담보대출 갈아타기" sub="연 3.28% ~ 5.27% / 최대 10" nameColor={T.brand}/>
          <InfoRow name="신용대출 갈아타기" sub="연 4.23% ~ 12.83% / 최대 3억원" nameColor={T.brand}/>
          <InfoRow name="전월세보증금 대출 갈아타기" sub="연 1.82% ~ 5.22% / 최대 5억원" nameColor={T.brand}/>
          <InfoRow name="개인사업자 대출 갈아타기" sub="연 3.27% ~ 13.84% / 최대 3억원" nameColor={T.brand}/>
        </DetailCard>

        <DetailCard title="내게 맞는 대출 찾기">
          <LinkRow label="신용대출 비교하기"/>
          <LinkRow label="사업자 전용 대출 비교하기"/>
          <LinkRow label="사장님 정책자금 대출 찾기"/>
        </DetailCard>

        <DetailCard title="대출 관리">
          <LinkRow label="내 신용정보"/>
          <LinkRow label="대출 이자 계산기"/>
          <LinkRow label="대출 공시금리 조회하기"/>
        </DetailCard>

        <div style={{height:20}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 021 — 투자 (with tabs 통장/저축/투자/연금)
// ─────────────────────────────────────────────────────────
function InvestScreen({ onBack }) {
  const [tab, setTab] = useRDetailState('savings'); // 통장/저축/투자/연금
  const tabs = [
    {k:'account',  label:'통장'},
    {k:'savings',  label:'저축'},
    {k:'invest',   label:'투자'},
    {k:'pension',  label:'연금'},
  ];

  const bankItems = [
    {name:'{[은행사명]상품명 1줄이상 줄바꿈 생략처리 없음}', sub:'(최소 ~ 최대 이자율)', muted:true},
    {name:'[제주은행]MZ플랜적금', sub:'연 3.15% ~5.15%'},
    {name:'[제주은행] J정기예금', sub:'연 2.0% ~ 3.1%'},
    {name:'[토스뱅크] 먼저 이자받는 정기예금', sub:'연 2.7% ~ 3.0%'},
    {name:'[다올저축은행]Fi쌈짓돈II통장', sub:'연 1.0% ~ 5.0%'},
    {name:'[KB저축은행]kiwi파킹통장', sub:'연 1.3% ~ 2.5%'},
  ];

  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:80, overflowY:'auto'}}>
        <DetailHeader title="투자" onBack={onBack}/>

        {/* tabs */}
        <div style={{display:'flex', padding:'0 22px', gap:18, borderBottom:`1px solid ${T.line}`, position:'relative'}}>
          {tabs.map(t => {
            const active = t.k === tab;
            return (
              <button key={t.k} onClick={()=>setTab(t.k)} className="press" style={{
                paddingBottom:12, paddingTop:8,
                fontSize:14, fontWeight: active ? 800 : 600,
                color: active ? T.brand : T.muted2, letterSpacing:'-.04em',
                borderBottom: active ? `2px solid ${T.brand}` : '2px solid transparent',
                marginBottom:-1,
              }}>{t.label}</button>
            );
          })}
        </div>

        {/* tab content */}
        {tab === 'account' && (
          <DetailCard title="통장">
            {bankItems.map((it, i) => (
              <InfoRow key={i} name={it.name} sub={it.sub}
                nameColor={it.muted ? T.muted2 : T.ink}/>
            ))}
          </DetailCard>
        )}

        {tab === 'savings' && (
          <DetailCard title="저축">
            {bankItems.map((it, i) => (
              <InfoRow key={i} name={it.name} sub={it.sub}
                nameColor={it.muted ? T.muted2 : T.ink}/>
            ))}
          </DetailCard>
        )}

        {tab === 'invest' && (
          <DetailCard title="투자">
            <InfoRow name="펀드" sub="여러 투자 자산을 하나로 묶은 투자 상품"/>
            <InfoRow name="증권사 금융상품 투자" sub="원금이 보장되는 채권, rP, 발행어음"/>
          </DetailCard>
        )}

        {tab === 'pension' && (
          <DetailCard title="연금">
            <InfoRow name="노란우산공제" sub="사장님들의 퇴직금"/>
          </DetailCard>
        )}

        <div style={{height:20}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 022 — 보험
// ─────────────────────────────────────────────────────────
function InsuranceFeePill({ kind }) {
  const isPaid = kind === 'paid';
  return (
    <span style={{
      padding:'4px 11px', borderRadius:9999, border:`1px solid ${isPaid ? T.brand : '#A8B5FF'}`,
      color: isPaid ? T.brand : '#7A8DFF',
      fontSize:11, fontWeight:800, letterSpacing:'-.03em',
      background:'#fff', whiteSpace:'nowrap',
    }}>{isPaid ? '납입완료' : '납입예정'}</span>
  );
}

function InsuranceScreen({ onBack }) {
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:80, overflowY:'auto'}}>
        <DetailHeader title="보험" onBack={onBack}/>

        <DetailCard title="5월 보험료">
          <InfoRow
            name="{가입한 보험료}" sub="{[보험사] 보험 상품명}"
            nameColor={T.muted2} subColor={T.muted2}
            right={<InsuranceFeePill kind="paid"/>}
          />
          <InfoRow
            name="32,850원" sub="[현대해상] 다중이용업소 화재배상책임보험"
            nameColor={T.brand}
            right={<InsuranceFeePill kind="paid"/>}
          />
          <InfoRow
            name="40,950원" sub="[근로복지공단] 자영업자 고용 보험"
            nameColor={T.brand}
            right={<InsuranceFeePill kind="upcoming"/>}
          />
        </DetailCard>

        <TossInsuranceAdCard/>

        <DetailCard title="개인 사업자 상품">
          <InfoRow
            name="{상품명 1줄이상 줄바꿈 생략처리 없음}" sub="(보험 설명 문구)"
            nameColor={T.muted2} subColor={T.muted2}
          />
          <InfoRow name="영업배상책임보험" sub="손님이 매장 내에서 다치거나 물품이 파손되었을 경우 배상 책임을 보장해줘요."/>
          <InfoRow name="단체상해보험" sub="직원이 있다면 필수! 직원이 일하는 중 다쳤을 때 치료비와 위로금을 보상해줘요."/>
          <InfoRow name="사업주 실손의료보험" sub="사업주 본인이 아플 경우, 입통원비, 약값 등 실비 보장형 보험이에요."/>
          <InfoRow name="소득보장보험" sub="사고나 질병으로 인해 일정기간 영업을 못하는 경우 손실 소득을 보장해줘요."/>
          <InfoRow name="재해휴업손실보험" sub="화재나 재해로 인한 휴업일 동안 발생한 손실의 일부를 보상받을 수 있어요."/>
          <InfoRow name="온라인 자영업자 전용 보험" sub="배송 상품 분실, 파손, 재고 피해, 소비자 분쟁에 대비할 수 있어요."/>
        </DetailCard>

        <DetailCard title="내게 맞는 보험 찾기">
          <LinkRow label="사업자 전용 보험 비교하기"/>
          <LinkRow label="새로운 사장님 보험이 필요한가요?"/>
          <LinkRow label="숨은 보험금 조회하기"/>
        </DetailCard>

        <div style={{height:20}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 023 — 카드
// ─────────────────────────────────────────────────────────
function CardScreen({ onBack }) {
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#F4F5F9'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:80, overflowY:'auto'}}>
        <DetailHeader title="카드" onBack={onBack}/>

        <DetailCard title="사장님을 위한 신용카드">
          <InfoRow name="{[카드사명] 카드명}" sub="{최대 혜택}" nameColor={T.muted2} subColor={T.muted2}/>
          <InfoRow name="[카카오뱅크] 개인사업자 삼성카드" sub="최대 37만원 혜택" nameColor={T.brand}/>
          <InfoRow name="[카카오뱅크] BUSINESS 현대카드" sub="최대 34만원 혜택" nameColor={T.brand}/>
          <InfoRow name="[카카오뱅크] BUSINESS 현대카드 PRIME" sub="최대 35만원 혜택" nameColor={T.brand}/>
          <InfoRow name="[삼성카드] 삼성 iD SELECT ALL 카드" sub="최대 92.6만원 혜택" nameColor={T.brand}/>
          <InfoRow name="[신한카드] Biz Plan" sub="최대 63.3만원 상당 혜택" nameColor={T.brand}/>
        </DetailCard>

        <DetailCard title="사장님을 위한 체크카드">
          <InfoRow name="[KB국민카드] KB국민 Youth Club 체크카드" sub="6개 영역(멤버십, 통신 등)최대 50%할인" nameColor={T.brand}/>
          <InfoRow name="[신한카드] 국민행복 체크" sub="디지털구독 50% 할인" nameColor={T.brand}/>
          <InfoRow name="[신한카드] 신한 후불 기후동행 체크카드" sub="후불 기후동행카드 서비스 제공" nameColor={T.brand}/>
        </DetailCard>

        <DetailCard title="카드 관리">
          <LinkRow label="사업용 신용카드 등록하러 가기"/>
          <LinkRow label="신용카드 혜택 비교하기"/>
          <LinkRow label="예상 최대 한도 보러가기"/>
        </DetailCard>

        <div style={{height:20}}/>
      </div>
    </div>
  );
}

Object.assign(window, { LoanScreen, InvestScreen, InsuranceScreen, CardScreen });
