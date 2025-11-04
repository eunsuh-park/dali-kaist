===========================================
PAGES LAYER (페이지별 기능)
===========================================

FSD 구조에서 Pages Layer는 라우팅과 페이지별 초기화 로직을 관리하는 계층입니다.

폴더 구조:
----------
pages/
├── members/             # 멤버 페이지
│   ├── members.html     # 페이지 HTML
│   └── members.js       # 페이지 초기화 로직
├── publications/        # 출판물 페이지
│   ├── publications.html
│   ├── publications.js
│   └── publications-data.js (→ entities/publication/data.js로 이동 예정)
├── research/            # 연구 페이지
│   ├── research.html
│   └── research.js
├── activity/            # 활동 페이지
│   ├── activity.html
│   └── activity.js
└── contact/             # 연락처 페이지
    └── contact.html

각 페이지의 역할:
--------------
1. members/
   - 멤버 목록 및 상세 정보 표시
   - members.js: 페이지 초기화 및 멤버 상세 뷰 로직
   - 데이터는 entities/member/data.js에서 참조 (향후)

2. publications/
   - 출판물 목록 및 연도별 필터링
   - publications.js: 출판물 로딩 및 표시 로직
   - publications-data.js: 출판물 데이터 (→ entities로 이동 예정)

3. research/
   - 연구 프로젝트 카드 표시
   - research.js: 연구 카드 표시 로직

4. activity/
   - 활동/뉴스 갤러리 표시
   - activity.js: 활동 카드 표시 로직

5. contact/
   - 연락처 정보 표시
   - 현재 빈 페이지 (향후 구현 예정)

주의사항:
---------
- 각 페이지는 독립적으로 동작
- shared 리소스는 상대 경로로 참조 (../../shared/...)
- 데이터는 entities 계층에서 참조 (향후)
- 페이지별 로직은 최소화하고, 가능한 한 entities/features로 분리

