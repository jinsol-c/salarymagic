// screens-mypage.jsx — 마이페이지 (M-00 my home)

const { useState: useMyState } = React;

function MyAvatarCircle({ size = 56, src, fallback }) {
  // Circular avatar with subtle border. If no src, render a soft placeholder block.
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%',
      background:'#E5E7F0', overflow:'hidden', flex:'0 0 auto',
      display:'flex', alignItems:'center', justifyContent:'center',
      border:'1px solid rgba(0,0,0,.06)',
    }}>
      {src ? (
        <img src={src} className="nodrag" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
      ) : (
        fallback
      )}
    </div>
  );
}

// Store-front line drawing for placeholder shop icon
const ICON_STOREFRONT = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M7 14V28H29V14" stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M5 14L8 8H28L31 14" stroke="#1A1A1A" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M11 14V28M15 14V28M19 14V28M23 14V28" stroke="#1A1A1A" strokeWidth="1.1"/>
    <path d="M13 25H17V28H13z" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
    <text x="18" y="24" fontSize="3.2" textAnchor="middle" fill="#1A1A1A" fontWeight="700" fontFamily="SUIT,sans-serif">노래방</text>
  </svg>
);

// Chevron right (›)
const MP_CHEV = (color = '#A0A0A0') => (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
    <path d="M1 1L7 7L1 13" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Refresh / spin icon
const MP_REFRESH = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M12 3v3h-3" stroke="#7A7A7A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 11V8h3" stroke="#7A7A7A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.5 6A4.5 4.5 0 0 0 3.5 5M2.5 8a4.5 4.5 0 0 0 8 1" stroke="#7A7A7A" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
  </svg>
);

// Inline section icons for the bottom settings list
function SettingsIcon({ kind }) {
  const stroke = '#1A1A1A';
  switch (kind) {
    case 'account': // 계좌 연결 관리 — card-with-plug
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="14" height="10" rx="1.6" stroke={stroke} strokeWidth="1.4"/>
          <path d="M3 9h14" stroke={stroke} strokeWidth="1.4"/>
          <path d="M19 12v4a3 3 0 0 1-3 3h-2" stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="14" cy="19" r="1.2" fill={stroke}/>
        </svg>
      );
    case 'mydata': // 마이데이터 서비스 — clipboard-with-check
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="4" width="14" height="17" rx="2" stroke={stroke} strokeWidth="1.4"/>
          <rect x="9" y="2.5" width="6" height="3" rx="1" stroke={stroke} strokeWidth="1.4" fill="#fff"/>
          <path d="M8.5 12l2 2 4-4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 17h7" stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );
    case 'usage': // 데이터 활용 내역 — graph
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 20h18" stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M5 17l4-5 4 3 5-7" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="18" cy="8" r="1.2" fill={stroke}/>
        </svg>
      );
    case 'notice': // 공지사항 — megaphone
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 10v4l11 4V6L5 10z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M5 10H4a1.5 1.5 0 0 0-1.5 1.5v1A1.5 1.5 0 0 0 4 14h1" stroke={stroke} strokeWidth="1.4"/>
          <path d="M19 8v8" stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M8 15l1.5 4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );
    case 'policy': // 약관 및 정책 — doc
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 3h8l4 4v14H6V3z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M14 3v4h4" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M9 12h6M9 16h6M9 8h2" stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );
    case 'version': // 버전 정보 — stacked layers
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 8l9-4 9 4-9 4-9-4z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M3 12l9 4 9-4" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M3 16l9 4 9-4" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
      );
    case 'leave': // 탈퇴 — person with arrow
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="10" cy="8" r="3" stroke={stroke} strokeWidth="1.4"/>
          <path d="M3.5 20c.7-3.2 3.4-5 6.5-5 1.5 0 2.9.4 4 1.2" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <path d="M16 13l5 5M21 13l-5 5" stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );
    default: return null;
  }
}

function MyPageRowCard({ children, onClick, padding = '14px 14px' }) {
  return (
    <button onClick={onClick} className="press" style={{
      display:'flex', alignItems:'center', gap:12, width:'100%',
      padding, background:'#fff',
      border:`1px solid ${T.line}`, borderRadius:14,
      textAlign:'left',
    }}>
      {children}
    </button>
  );
}

function StoreCard({ icon, src, name, bizNum, address, onClick }) {
  return (
    <MyPageRowCard onClick={onClick}>
      <MyAvatarCircle size={56} src={src} fallback={icon}/>
      <div style={{flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:6}}>
        <StoreField label="사업자명" value={name}/>
        <StoreField label="사업자번호" value={bizNum}/>
        <StoreField label="주소" value={address}/>
      </div>
      <div style={{flex:'0 0 auto', paddingLeft:6}}>{MP_CHEV()}</div>
    </MyPageRowCard>
  );
}
function StoreField({ label, value }) {
  return (
    <div style={{display:'flex', alignItems:'baseline', gap:8, fontSize:12, letterSpacing:'-.04em', minWidth:0}}>
      <div style={{flex:'0 0 64px', color:'#6B7280', fontWeight:600}}>{label}</div>
      <div style={{flex:1, color:T.ink, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{value}</div>
    </div>
  );
}

function SectionTitle({ children, action }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:8, padding:'0 18px', marginBottom:10}}>
      <div style={{fontSize:15, fontWeight:800, color:T.ink, letterSpacing:'-.045em'}}>{children}</div>
      {action}
    </div>
  );
}

function MyPageScreen({ onBack, onNav }) {
  const [refreshing, setRefreshing] = useMyState(false);

  function spin() {
    setRefreshing(true);
    setTimeout(()=>setRefreshing(false), 900);
  }

  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'#fff', overflow:'hidden'}}>
      <div className="scrolly" style={{position:'absolute', inset:0, paddingBottom:24, overflowY:'auto'}}>
        {/* header */}
        <div style={{paddingTop:T.safeTop, height:T.safeTop+50, display:'flex', alignItems:'center', padding:`${T.safeTop}px 8px 0 8px`}}>
          <BackChevron onBack={onBack}/>
          <div style={{flex:1, fontWeight:800, fontSize:18, color:T.ink, letterSpacing:'-.045em'}}>마이페이지</div>
        </div>

        {/* greeting */}
        <div style={{padding:'10px 18px 6px', display:'flex', alignItems:'center', gap:14}}>
          <MyAvatarCircle size={66} src="assets/char-3.png"/>
          <div>
            <div style={{fontSize:18, fontWeight:800, color:T.ink, letterSpacing:'-.045em'}}>반가워요! 우사장님</div>
            <div style={{marginTop:8, display:'inline-block', padding:'4px 10px', borderRadius:9999, background:T.brand, color:'#fff', fontSize:10, fontWeight:800, letterSpacing:'.06em'}}>BEGINNER</div>
          </div>
        </div>

        {/* stores */}
        <div style={{marginTop:18}}>
          <SectionTitle
            action={
              <button onClick={spin} className="press" aria-label="새로고침" style={{display:'flex', alignItems:'center', justifyContent:'center', width:24, height:24}}>
                <div style={{display:'flex'}} className={refreshing ? 'spin' : ''}>{MP_REFRESH}</div>
              </button>
            }
          >운영 중인 매장 2개</SectionTitle>
          <div style={{padding:'0 16px', display:'flex', flexDirection:'column', gap:10}}>
            <StoreCard
              icon={ICON_STOREFRONT}
              name="노래야 노래야 코인노래방 외대점"
              bizNum="1111-111-1111"
              address="외대역앞길 34 15-1 지하 1층"
            />
            <StoreCard
              src="assets/char-4.png"
              name="노래야 노래야 코인노래방 고려대점"
              bizNum="1111-111-1112"
              address="외대역앞길 34 15-1 지하 1층"
            />
          </div>
        </div>

        {/* membership */}
        <div style={{marginTop:24}}>
          <SectionTitle>멤버십 정보</SectionTitle>
          <div style={{padding:'0 16px'}}>
            <button className="press" style={{
              width:'100%', textAlign:'left',
              background:'linear-gradient(180deg, #6B82FF 0%, #5F79FF 100%)',
              borderRadius:14, padding:'16px 16px 18px',
              color:'#fff', display:'flex', alignItems:'center', gap:10,
              boxShadow:'0 8px 20px rgba(95,121,255,.28)',
            }}>
              <div style={{flex:1}}>
                <div style={{display:'inline-block', padding:'4px 10px', borderRadius:9999, background:'rgba(255,255,255,.18)', color:'#fff', fontSize:10, fontWeight:800, letterSpacing:'.06em', border:'1px solid rgba(255,255,255,.35)'}}>BEGINNER</div>
                <div style={{marginTop:8, fontSize:18, fontWeight:800, letterSpacing:'-.045em'}}>무료 이용 멤버십</div>
                <div style={{marginTop:14, height:1, background:'rgba(255,255,255,.22)'}}/>
                <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:4, fontSize:12, fontWeight:500, letterSpacing:'-.03em'}}>
                  <MembershipLine label="멤버십 시작" value="2026년 5월 16일"/>
                  <MembershipLine label="결제수단" value="카카오뱅크 국민 체크카드"/>
                  <MembershipLine label="다음 결제일" value="2026년 6월 16일"/>
                </div>
              </div>
              <div style={{paddingLeft:6}}>
                {MP_CHEV('#fff')}
              </div>
            </button>
          </div>
        </div>

        {/* member info */}
        <div style={{marginTop:22}}>
          <SectionTitle>회원 정보</SectionTitle>
          <div style={{padding:'0 16px'}}>
            <MyPageRowCard padding="14px 14px">
              <MyAvatarCircle size={50} src="assets/char-3.png"/>
              <div style={{flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:5}}>
                <StoreField label="고객명" value="우사장"/>
                <StoreField label="이메일" value="SalaryRUP***@gmail.com"/>
                <StoreField label="연락처" value="+82 010-****-2337"/>
              </div>
              <div style={{flex:'0 0 auto', paddingLeft:6}}>{MP_CHEV()}</div>
            </MyPageRowCard>
          </div>
        </div>

        {/* divider gray block */}
        <div style={{height:14, background:'#F4F5F9', marginTop:22}}/>

        {/* settings list */}
        <div style={{padding:'6px 0 16px'}}>
          {[
            {k:'account',  label:'계좌 연결 관리'},
            {k:'mydata',   label:'마이데이터 서비스 이용 현황'},
            {k:'usage',    label:'데이터 활용 내역'},
            {k:'notice',   label:'공지사항'},
            {k:'policy',   label:'약관 및 정책'},
            {k:'version',  label:'버전 정보'},
            {k:'leave',    label:'개인신용정보 삭제 및 서비스 탈퇴'},
          ].map(item => (
            <button key={item.k} className="press" style={{
              width:'100%', display:'flex', alignItems:'center', gap:14,
              padding:'14px 22px', background:'transparent',
              textAlign:'left',
            }}>
              <div style={{width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto'}}>
                <SettingsIcon kind={item.k}/>
              </div>
              <div style={{flex:1, fontSize:14, fontWeight:600, color:T.ink, letterSpacing:'-.04em'}}>{item.label}</div>
              <div style={{flex:'0 0 auto'}}>{MP_CHEV()}</div>
            </button>
          ))}
        </div>

        <div style={{height:30}}/>
      </div>
    </div>
  );
}

function MembershipLine({ label, value }) {
  return (
    <div style={{display:'flex', alignItems:'baseline', gap:6}}>
      <div style={{minWidth:70, color:'rgba(255,255,255,.78)'}}>{label}</div>
      <div style={{color:'#fff', fontWeight:600}}>: {value}</div>
    </div>
  );
}

Object.assign(window, { MyPageScreen });
