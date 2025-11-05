===========================================
SHARED STYLES (공유 스타일)
===========================================

이 폴더는 프로젝트 전역에서 사용되는 스타일을 관리합니다.

폴더 구조:
----------
styles/
├── global.css            # 전역 스타일
└── css/                  # 컴포넌트별 CSS
    ├── nav.css
    ├── footer.css
    ├── sidebar.css
    ├── page-header.css
    ├── publication-cards.css
    ├── chips.css
    ├── activity-gallery.css
    └── go-top.css

각 파일의 역할:
--------------
1. global.css
   - CSS 변수 정의 (:root)
   - 기본 리셋 (*, body, html)
   - 기본 타이포그래피 (h1, h2, h3, h4, p)
   - 공통 레이아웃 클래스 (.section, .container)
   - 전역 설정 (scroll-behavior, min-width 등)

2. css/ 폴더
   - nav.css: 네비게이션 바 스타일
   - footer.css: 푸터 스타일
   - sidebar.css: 사이드바 메뉴 스타일
   - page-header.css: 페이지 헤더 스타일
   - publication-cards.css: 출판물 카드 스타일
   - chips.css: 칩(태그) 스타일
   - activity-gallery.css: 액티비티 갤러리 스타일
   - go-top.css: Go to Top 버튼 스타일

사용 방법:
----------
app/styles.css에서 import하여 사용:
@import url('../../shared/styles/global.css');
@import url('../../shared/styles/css/nav.css');
@import url('../../shared/styles/css/footer.css');
...

주의사항:
---------
- global.css는 다른 모든 CSS 파일보다 먼저 로드되어야 함
- CSS 변수는 :root에 정의되어 전역에서 사용 가능
- 컴포넌트별 CSS는 해당 컴포넌트가 사용되는 페이지에서만 필요

