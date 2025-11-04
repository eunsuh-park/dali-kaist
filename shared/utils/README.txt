===========================================
SHARED UTILS (유틸리티 함수)
===========================================

이 폴더는 프로젝트 전역에서 사용되는 유틸리티 함수를 관리합니다.

파일 목록:
----------
utils/
├── path-resolver.js     # 경로 해결 로직
└── helpers.js           # 범용 헬퍼 함수 (향후 추가)

각 파일의 역할:
--------------
1. path-resolver.js
   - getBasePath(): 현재 페이지 위치에 따라 상대 경로 계산
   - file:// 및 http:// 프로토콜 모두 지원
   - URL 인코딩된 경로 디코딩 지원
   - 반환값:
     * app/index.html에서: '' (빈 문자열)
     * pages/xxx/xxx.html에서: '../../'
     * shared/ui/nav/nav.js에서: '../../../'

2. helpers.js (향후 추가 예정)
   - formatDate(): 날짜 포맷팅
   - truncateText(): 텍스트 자르기
   - debounce/throttle(): 성능 최적화 함수
   - DOM 조작 헬퍼 함수
   - URL 파라미터 파싱 등

사용 방법:
----------
path-resolver.js는 nav.js에서 사용됩니다.
HTML 파일에서 nav.js를 로드하기 전에 path-resolver.js를 먼저 로드해야 합니다:

<script src="../../shared/utils/path-resolver.js"></script>
<script src="../../shared/ui/nav/nav.js"></script>

주의사항:
---------
- path-resolver.js는 nav.js보다 먼저 로드되어야 함
- getBasePath() 함수는 전역 스코프에서 사용 가능해야 함

