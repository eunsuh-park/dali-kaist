===========================================
SHARED UI (공유 UI 컴포넌트)
===========================================

이 폴더는 프로젝트 전역에서 재사용되는 UI 컴포넌트를 관리합니다.

폴더 구조:
----------
ui/
├── nav/                  # 네비게이션 컴포넌트
│   └── nav.js           # 네비게이션 로직 및 템플릿
└── footer/              # 푸터 컴포넌트
    └── footer.js        # 푸터 로직 및 템플릿

각 파일의 역할:
--------------
1. nav/nav.js
   - 상단 네비게이션 바 생성 및 관리
   - getNavTemplate(): 네비게이션 HTML 템플릿 생성
   - getBasePath() 함수 사용 (shared/utils/path-resolver.js)
   - 동적 경로 계산을 통한 링크 생성
   
2. footer/footer.js
   - 하단 푸터 생성 및 관리
   - footerTemplate: 푸터 HTML 템플릿

사용 방법:
----------
HTML 파일에서 다음과 같이 사용:
<script src="../../shared/utils/path-resolver.js"></script>
<script src="../../shared/ui/nav/nav.js"></script>
<script src="../../shared/ui/footer/footer.js"></script>

그리고 HTML에 placeholder 추가:
<div id="nav-placeholder"></div>
<div id="footer-placeholder"></div>

script.js에서 자동으로 로드됩니다.

