===========================================
MEMBER ENTITY (멤버 엔티티)
===========================================

멤버 데이터 및 관련 컴포넌트를 관리하는 엔티티입니다.

파일 목록:
----------
member/
├── data.js              # 멤버 데이터 (현재 pages/members/members.js에서 이동)
├── model.js             # 멤버 데이터 모델 (향후 추가)
├── member-card.js       # 멤버 카드 컴포넌트 (향후 추가)
└── member-detail.js     # 멤버 상세 컴포넌트 (향후 추가)

각 파일의 역할:
--------------
1. data.js
   - memberDetails 객체: 모든 멤버의 상세 정보
   - 구조:
     {
       'member-id': {
         name: string,
         image: string,
         email: string,
         profileUrl: string,
         description: string,
         skills: string[]
       }
     }
   - 현재 pages/members/members.js의 memberDetails를 복사

2. model.js (향후 추가)
   - 멤버 데이터 구조 정의 (schema)
   - 데이터 로드 함수 (load)
   - 데이터 검증 함수 (validate)
   - 데이터 필터링/정렬 함수

3. member-card.js (향후 추가)
   - 멤버 카드 UI 생성 함수
   - 재사용 가능한 컴포넌트

4. member-detail.js (향후 추가)
   - 멤버 상세 뷰 UI 생성 함수
   - 재사용 가능한 컴포넌트

데이터 구조:
-----------
memberDetails[memberId] = {
  name: string,           // 멤버 이름
  image: string,          // 프로필 사진 경로
  email: string,          // 이메일 주소
  profileUrl: string,     // 프로필 페이지 URL
  description: string,    // 자기소개
  skills: string[]        // 연구 분야/스킬 배열
}

사용 방법:
----------
// pages/members/members.js에서
// entities/member/data.js를 import하여 사용
// const memberDetails = await memberModel.load();

주의사항:
---------
- 이미지 경로는 shared/assets/images/members/를 기준으로 함
- 데이터 구조 변경 시 pages/members/members.js도 함께 업데이트 필요

