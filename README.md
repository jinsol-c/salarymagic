# 월급술사 (Salary Sorcerer) — Prototype

소상공인을 위한 월급 관리 / 자금 흐름 코칭 앱의 인터랙티브 프로토타입입니다.
React(브라우저 Babel) + 인라인 JSX로 만든 단일 페이지 프로토타입으로,
별도 빌드 없이 정적 호스팅(예: GitHub Pages)으로 바로 시연할 수 있습니다.

## 실행 방법

### 1) 로컬에서 보기

```bash
# 저장소 폴더에서
python3 -m http.server 8080
# 또는
npx serve .
```

브라우저에서 `http://localhost:8080` 접속.

> `file://` 로 직접 열면 일부 브라우저에서 동작이 제한될 수 있어요.
> 반드시 로컬 서버로 띄워주세요.

### 2) GitHub Pages 로 시연 URL 만들기

1. GitHub에서 새 저장소를 만든다 (예: `salary-sorcerer`).
2. 이 폴더에서:
   ```bash
   git init
   git add .
   git commit -m "feat: 월급술사 프로토타입 초기 커밋"
   git branch -M main
   git remote add origin https://github.com/<YOUR_ID>/<REPO>.git
   git push -u origin main
   ```
3. GitHub 저장소 페이지 → **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)** 선택 후 Save
4. 1~2분 뒤 `https://<YOUR_ID>.github.io/<REPO>/` 주소로 접속하면 끝.

> 시연 URL을 QR 코드로 만들어 휴대폰으로 띄우면 실제 디바이스에서 그대로 동작합니다.

## 파일 구조

```
.
├── index.html               # 진입점
├── tokens.css               # 디자인 토큰
├── app.jsx                  # 라우팅 + 상태머신
├── ios-frame.jsx            # iPhone 베젤 / Stage 스케일러
├── tweaks-panel.jsx         # 우상단 Tweaks(점프 네비) 패널
├── screens-a.jsx            # 온보딩 1단계 (인트로, 업종, 월급, 진단 Q)
├── screens-b.jsx            # 온보딩 2단계 (결과, 계좌 연결, 저금통)
├── screens-main.jsx         # 홈 / 장부 / 분석 리포트
├── screens-salary.jsx       # 월급 화면 (설정 / 지금 받기 / 이력)
├── screens-bank.jsx         # 저금통
├── screens-recipe.jsx       # 머니 레시피 (대출/투자/보험/카드 허브)
├── screens-recipe-details.jsx
├── screens-mypage.jsx       # 마이페이지 (M-00)
└── assets/                  # 캐릭터 PNG, 아이콘 SVG
```

## 주요 화면 / 데모 동선

1. **온보딩** — 인트로 → 업종 → 월급 → 6개 진단 질문 → 결과(캐릭터) → 계좌 연결 → 고정비 → 월급 설정 → 매핑 → AI 결과 → 저금통 설정 → 완료
2. **홈 (H-01)** — 자금 흐름 점수, 이번달 순수익, 저금통 카드
3. **장부 (L-01)** — 캘린더 형태의 입출금 흐름
4. **분석 리포트 (L-04~06)** — AI 인사이트 / 주간·월간·연간 탭
5. **머니 레시피 (M-XX)** — 대출 / 투자 / 보험 / 카드
6. **저금통 (G-01)** — 잉여금·세이프존·세금 박스
7. **월급 (W-XX)** — 설정 / 지금 받기 / 부족 / 수령 이력
8. **마이페이지 (M-00)** — 사업장 / 멤버십 / 회원 정보 / 정책 설정

### 빠른 점프

화면 우상단의 **Tweaks** 토글을 켜면 모든 라우트로 한 번에 점프할 수 있어요.
시연 중 특정 화면만 보여주고 싶을 때 유용합니다.

## 시연 팁

- 데스크탑은 iPhone 베젤이 자동 스케일되어 중앙에 보입니다.
- 모바일은 풀스크린에 가깝게 보이며, 상단 상태바 영역도 포함됩니다.
- 새로고침해도 라우트는 인트로부터 다시 시작합니다 (시연 흐름을 처음부터 보여주기 위함).
