===========================================
PUBLICATION ENTITY (출판물 엔티티)
===========================================

출판물 데이터 및 관련 컴포넌트를 관리하는 엔티티입니다.

파일 목록:
----------
publication/
├── data.js                 # 출판물 데이터 (현재 pages/publications/publications-data.js에서 이동)
├── model.js                # 출판물 데이터 모델 (향후 추가)
└── publication-card.js     # 출판물 카드 컴포넌트 (향후 추가)

각 파일의 역할:
--------------
1. data.js
   - publicationsData 배열: 모든 출판물 데이터
   - 구조:
     [
       {
         Title: string,
         URL: string,
         Type: string,
         Date: string,
         Summary: string,
         ...
       }
     ]
   - 현재 pages/publications/publications-data.js를 복사

2. model.js (향후 추가)
   - 출판물 데이터 구조 정의 (schema)
   - 데이터 로드 함수 (load)
   - 데이터 검증 함수 (validate)
   - 연도별 그룹화 함수 (groupByYear)
   - 타입 필터링 함수 (filterArticles)

3. publication-card.js (향후 추가)
   - 출판물 카드 UI 생성 함수
   - 재사용 가능한 컴포넌트

데이터 구조:
-----------
publicationsData[] = {
  Title: string,           // 논문 제목
  URL: string,            // 논문 링크
  Type: string,           // 출판물 타입 (Article 등)
  Date: string,           // 출판 날짜
  Date2: string,          // 대체 날짜
  Summary: string,        // 논문 요약
  Recommentation: string, // 추천 수
  ...
}

데이터 관리:
----------
- Excel → JSON 변환: convert_excel_to_json.py 사용
- 변환된 데이터를 data.js에 저장
- 코드는 변경 없이 데이터만 업데이트

사용 방법:
----------
// pages/publications/publications.js에서
// entities/publication/data.js를 import하여 사용
// const publicationsData = await publicationModel.load();

주의사항:
---------
- publications-data.js는 현재 pages/publications/에도 존재
- 향후 pages/publications/publications-data.js는 삭제하고 
  entities/publication/data.js만 사용

