===========================================
APP LAYER (애플리케이션 진입점)
===========================================

FSD 구조에서 App Layer는 애플리케이션의 진입점과 전역 설정을 관리하는 계층입니다.

폴더 구조:
----------
app/
├── index.html           # 애플리케이션 진입점 (홈페이지)
├── styles.css           # 앱 전용 스타일 (페이지별 스타일 포함)
└── script.js            # 전역 스크립트 (컴포넌트 로딩, 네비게이션 등)

각 파일의 역할:
--------------
1. index.html
   - 애플리케이션의 메인 진입점
   - 홈페이지 (About the Lab 섹션 포함)
   - Hero 섹션, About 섹션 포함
   - shared 리소스 로드 (nav, footer, styles)

2. styles.css
   - shared/styles/global.css를 import
   - shared/styles/css/의 컴포넌트 스타일을 import
   - 페이지별 스타일 (hero, about, member-detail 등)
   - 페이지별 스타일은 app 계층에 유지

3. script.js
   - 전역 컴포넌트 로딩 (nav, footer)
   - 네비게이션 활성 링크 하이라이팅
   - Go to Top 버튼 주입 (상세 페이지)
   - 햄버거 메뉴 토글 기능

주의사항:
---------
- index.html은 프로젝트 루트가 아닌 app/ 폴더에 위치
- shared 리소스는 상대 경로로 참조 (../shared/...)
- 페이지별 스타일은 app/styles.css에 유지
- 전역 설정만 app 계층에 위치

