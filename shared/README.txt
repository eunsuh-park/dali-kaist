===========================================
SHARED LAYER (공유 리소스)
===========================================

FSD (Feature-Sliced Design) 구조에서 Shared Layer는 프로젝트 전역에서 
공유되는 리소스를 관리하는 계층입니다.

폴더 구조:
----------
shared/
├── ui/                    # 공유 UI 컴포넌트
│   ├── nav/              # 네비게이션 컴포넌트
│   └── footer/           # 푸터 컴포넌트
├── assets/                # 공유 에셋
│   └── images/           # 이미지 파일
├── styles/                # 공유 스타일
│   ├── global.css        # 전역 스타일
│   └── css/              # 컴포넌트별 CSS
└── utils/                 # 유틸리티 함수
    ├── path-resolver.js  # 경로 해결 로직
    └── helpers.js        # 범용 헬퍼 함수 (향후 추가)

각 폴더의 역할:
--------------
1. ui/ - 공유 UI 컴포넌트
   - 여러 페이지에서 재사용되는 UI 컴포넌트
   - nav: 상단 네비게이션 바
   - footer: 하단 푸터

2. assets/ - 공유 에셋
   - images/: 프로젝트 전역에서 사용하는 이미지 파일
   - fonts/: 폰트 파일 (향후 추가 가능)

3. styles/ - 공유 스타일
   - global.css: CSS 변수, 기본 리셋, 기본 타이포그래피
   - css/: 컴포넌트별 스타일 (nav.css, footer.css 등)

4. utils/ - 유틸리티 함수
   - path-resolver.js: 현재 페이지 위치에 따른 상대 경로 계산
   - helpers.js: 범용 헬퍼 함수 (날짜 포맷팅, 텍스트 처리 등)

주의사항:
---------
- Shared Layer의 파일은 프로젝트 전역에서 사용되므로 변경 시 주의 필요
- 다른 계층(app, pages, entities)에서 shared 리소스를 참조할 때는 
  상대 경로를 올바르게 설정해야 함

