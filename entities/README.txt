===========================================
ENTITIES LAYER (비즈니스 엔티티)
===========================================

FSD 구조에서 Entities Layer는 비즈니스 도메인 객체를 관리하는 계층입니다.
DB의 엔티티와 유사하지만, 프론트엔드에서는 데이터 모델 + UI 컴포넌트를 함께 관리합니다.

폴더 구조:
----------
entities/
├── member/               # 멤버 엔티티
│   ├── data.js          # 멤버 데이터
│   ├── model.js         # 멤버 데이터 모델 (향후 추가)
│   ├── member-card.js   # 멤버 카드 컴포넌트 (향후 추가)
│   └── member-detail.js # 멤버 상세 컴포넌트 (향후 추가)
├── publication/          # 출판물 엔티티
│   ├── data.js          # 출판물 데이터
│   ├── model.js         # 출판물 데이터 모델 (향후 추가)
│   └── publication-card.js # 출판물 카드 컴포넌트 (향후 추가)
├── research/             # 연구 엔티티
│   ├── model.js         # 연구 데이터 모델 (향후 추가)
│   └── research-card.js # 연구 카드 컴포넌트 (향후 추가)
└── activity/             # 활동 엔티티
    ├── model.js         # 활동 데이터 모델 (향후 추가)
    └── activity-card.js # 활동 카드 컴포넌트 (향후 추가)

각 엔티티의 역할:
--------------
1. member/
   - 멤버 데이터 및 관련 컴포넌트 관리
   - data.js: 현재 pages/members/members.js의 memberDetails를 이동

2. publication/
   - 출판물 데이터 및 관련 컴포넌트 관리
   - data.js: 현재 pages/publications/publications-data.js를 이동

3. research/
   - 연구 프로젝트 데이터 및 관련 컴포넌트 관리

4. activity/
   - 활동/뉴스 데이터 및 관련 컴포넌트 관리

데이터 관리:
----------
현재 방식 (정적 JSON/JS 파일):
- Excel → JSON 변환: convert_excel_to_json.py 사용
- 변환된 데이터를 entities/xxx/data.js에 저장
- 코드는 변경 없이 데이터만 업데이트

향후 확장 (API 연동 시):
- model.js의 load() 함수만 수정
- 현재: JSON 파일에서 로드
- 향후: API 호출로 변경 가능

주의사항:
---------
- 각 엔티티는 독립적으로 관리됨
- 엔티티 간 의존성은 최소화해야 함
- 데이터 모델과 UI 컴포넌트를 함께 관리하여 재사용성 향상

