===========================================
SHARED ASSETS (공유 에셋)
===========================================

이 폴더는 프로젝트 전역에서 사용되는 에셋 파일을 관리합니다.

폴더 구조:
----------
assets/
├── images/               # 이미지 파일
│   ├── members/         # 멤버 사진
│   ├── svg/             # SVG 아이콘/로고
│   ├── main_bg.jpg      # 메인 배경 이미지
│   └── contact_bg.jpg   # 연락처 배경 이미지
└── fonts/                # 폰트 파일 (향후 추가 가능)

각 폴더의 역할:
--------------
1. images/
   - members/: 멤버 프로필 사진
   - svg/: 로고 및 아이콘 (logo.svg 등)
   - main_bg.jpg: 홈페이지 히어로 섹션 배경
   - contact_bg.jpg: 연락처 페이지 배경

2. fonts/ (향후 추가 가능)
   - 커스텀 폰트 파일 저장

사용 방법:
----------
CSS에서:
background-image: url('../../shared/assets/images/main_bg.jpg');

HTML에서:
<img src="../../shared/assets/images/members/jeong-nam_kim.jpg">

JavaScript에서:
const logoPath = '../../shared/assets/images/svg/logo.svg';

주의사항:
---------
- 모든 이미지 경로는 shared/assets/images/를 기준으로 함
- 상대 경로는 현재 파일 위치에 따라 조정 필요
- 이미지 파일명은 소문자와 하이픈(-) 사용 권장

