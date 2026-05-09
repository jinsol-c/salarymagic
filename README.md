# 월급술사 온보딩 프로토타입

17개 화면 온보딩 플로우 인터랙티브 프로토타입.

## 실행
`index.html`을 브라우저로 열면 바로 작동합니다. 빌드 도구 필요 없음.

## 배포 (GitHub Pages)
1. 이 폴더를 GitHub 저장소에 push
2. Settings → Pages → Branch: main / root 선택
3. `https://<username>.github.io/<repo>/` 로 접속

## 구조
- `index.html` — 엔트리
- `tokens.css` — 디자인 토큰 (색·타이포·라운드·여백)
- `ios-frame.jsx` — iOS 26 디바이스 프레임
- `screens-a.jsx` — 인트로·업종·월급·성향 질문 6개
- `screens-b.jsx` — 결과·연동·고정비·월급·계좌·AI·저금통
- `app.jsx` — 라우팅 + 상태 + Tweaks 패널
- `tweaks-panel.jsx` — 우측 Tweaks 컨트롤
- `assets/` — 캐릭터·일러스트 PNG

## 사용법
- 우측 **Tweaks** 패널에서 임의 화면으로 점프
- 캐릭터 타입 강제 지정 가능
- 네트워크 에러 모달, 단계 인디케이터 토글
