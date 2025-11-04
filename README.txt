===========================================
DALI Lab @ KAIST - 프로젝트 구조
===========================================

이 프로젝트는 FSD (Feature-Sliced Design) 아키텍처를 기반으로 구성되었습니다.

프로젝트 구조:
--------------
dali-kaist/
├── app/                  # App Layer - 애플리케이션 진입점
├── pages/                # Pages Layer - 페이지별 기능
├── entities/             # Entities Layer - 비즈니스 엔티티
├── shared/               # Shared Layer - 공유 리소스
├── images/              # (레거시) → shared/assets/images/로 이동됨
└── convert_excel_to_json.py  # 데이터 변환 스크립트

FSD 계층 설명:
-------------
1. app/ - 애플리케이션 진입점
   - index.html: 메인 홈페이지
   - styles.css: 앱 전용 스타일
   - script.js: 전역 스크립트

2. pages/ - 페이지별 기능
   - members/, publications/, research/, activity/, contact/
   - 각 페이지의 HTML과 초기화 로직

3. entities/ - 비즈니스 엔티티
   - member/, publication/, research/, activity/
   - 데이터 모델과 UI 컴포넌트

4. shared/ - 공유 리소스
   - ui/: 공유 UI 컴포넌트 (nav, footer)
   - assets/: 공유 에셋 (images)
   - styles/: 공유 스타일
   - utils/: 유틸리티 함수

각 폴더의 상세 설명은 각 폴더의 README.txt 파일을 참조하세요.

주의사항:
---------
- 이미지 경로는 shared/assets/images/를 기준으로 함
- 스크립트 로드 순서: path-resolver.js → nav.js/footer.js → script.js
- 데이터는 entities 계층에서 관리

