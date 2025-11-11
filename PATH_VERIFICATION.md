# 경로 검증 문서

## 경로 계산 로직 검증

### 1. app/index.html에서의 경로
**현재 위치**: `dali-kaist/app/index.html`
- `getBasePath()` 반환값: `../`
- 예상 결과:
  - `../shared/utils/path-resolver.js` ✅
  - `../shared/ui/nav/nav.js` ✅
  - `${basePath}app/index.html` = `../app/index.html` ✅
  - `${basePath}shared/assets/images/svg/logo.svg` = `../shared/assets/images/svg/logo.svg` ✅

### 2. pages/xxx/xxx.html에서의 경로
**현재 위치**: `dali-kaist/pages/members/members.html`
- `getBasePath()` 반환값: `../../`
- 예상 결과:
  - `../../shared/utils/path-resolver.js` ✅
  - `../../shared/ui/nav/nav.js` ✅
  - `${basePath}app/index.html` = `../../app/index.html` ✅
  - `${basePath}pages/members/members.html` = `../../pages/members/members.html` (자기 자신, 사용 안 함)
  - `${basePath}shared/assets/images/svg/logo.svg` = `../../shared/assets/images/svg/logo.svg` ✅

### 3. CSS 파일 경로
**app/styles.css**에서:
- `@import url('../../shared/styles/global.css')` ✅
- `url('../../shared/assets/images/main_bg.jpg')` ✅

### 4. 이미지 경로
**pages/members/members.html**에서:
- `src="../../shared/assets/images/members/jeong-nam_kim.jpg"` ✅

**pages/members/members.js**에서:
- `image: '../../shared/assets/images/members/jeong-nam_kim.jpg'` ✅

**pages/publications/publications.js**에서:
- `img.src = '../../shared/assets/images/members/jeong-nam_kim.jpg'` ✅

## 경로 계산 테스트 시나리오

### 시나리오 1: app/index.html에서 nav.js 로드
1. HTML: `app/index.html`
2. 스크립트 로드: `../shared/utils/path-resolver.js` → `../shared/ui/nav/nav.js`
3. `getBasePath()` 실행 (HTML 파일 기준):
   - `relativePath = 'app/index.html'`
   - `basePath = '../'`
4. nav.js에서 생성된 링크:
   - 홈: `../app/index.html` ✅
   - Publications: `../pages/publications/publications.html` ✅
   - 로고: `../shared/assets/images/svg/logo.svg` ✅

### 시나리오 2: pages/members/members.html에서 nav.js 로드
1. HTML: `pages/members/members.html`
2. 스크립트 로드: `../../shared/utils/path-resolver.js` → `../../shared/ui/nav/nav.js`
3. `getBasePath()` 실행 (HTML 파일 기준):
   - `relativePath = 'pages/members/members.html'`
   - `basePath = '../../'`
4. nav.js에서 생성된 링크:
   - 홈: `../../app/index.html` ✅
   - Publications: `../../pages/publications/publications.html` ✅
   - 로고: `../../shared/assets/images/svg/logo.svg` ✅

## 주의사항

⚠️ **중요**: `getBasePath()`는 **HTML 파일의 위치**를 기준으로 계산됩니다.
- `window.location.pathname`은 현재 열려있는 HTML 파일의 경로를 반환
- nav.js가 `shared/ui/nav/nav.js`에 있더라도, `getBasePath()`는 HTML 파일 기준으로 계산
- 따라서 nav.js 내부에서 `getBasePath()`를 호출하면 HTML 파일의 위치를 기준으로 올바른 경로를 반환

## 확인 필요 사항

1. ✅ path-resolver.js의 basePath 계산 로직
2. ✅ nav.js의 경로 사용
3. ✅ 모든 HTML 파일의 스크립트 경로
4. ✅ 모든 CSS 파일의 import 경로
5. ✅ 모든 이미지 경로
6. ✅ publications.js의 이미지 경로

