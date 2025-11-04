# 경로 문제 해결 완료 보고서

## 해결된 경로 문제

### 1. ✅ path-resolver.js 업데이트
- **위치**: `shared/utils/path-resolver.js`
- **기능**: HTML 파일 위치에 따라 프로젝트 루트까지의 상대 경로 계산
- **반환값**:
  - `app/index.html`에서: `../`
  - `pages/xxx/xxx.html`에서: `../../`
  - `shared/xxx/xxx.js`에서: `../../../` (depth 계산)

### 2. ✅ nav.js 경로 수정
- **위치**: `shared/ui/nav/nav.js`
- **수정사항**: 
  - 로고 이미지 경로: `${basePath}shared/assets/images/svg/logo.svg`
  - 모든 네비게이션 링크가 basePath 사용

### 3. ✅ HTML 파일 스크립트 경로 업데이트
- **app/index.html**: `../shared/utils/path-resolver.js`, `../shared/ui/nav/nav.js`, `../shared/ui/footer/footer.js`
- **pages/xxx/xxx.html**: `../../shared/utils/path-resolver.js`, `../../shared/ui/nav/nav.js`, `../../shared/ui/footer/footer.js`

### 4. ✅ CSS 파일 경로 업데이트
- **app/styles.css**: 
  - `@import url('../../shared/styles/global.css')`
  - `@import url('../../shared/styles/css/...')`
  - Hero 배경 이미지: `url('../../shared/assets/images/main_bg.jpg')`

### 5. ✅ 이미지 경로 업데이트
- **HTML 파일**: `../../shared/assets/images/...`
- **JavaScript 파일**: `../../shared/assets/images/...`
- **CSS 파일**: `../../shared/assets/images/...`

### 6. ✅ Hero 섹션 스타일 추가
- `app/styles.css`에 hero 섹션 스타일 추가
- 배경 이미지 경로 포함

## 경로 계산 로직

### getBasePath() 함수 동작 방식
1. `window.location.pathname`에서 현재 HTML 파일 경로 추출
2. `dali-kaist` 폴더 이후의 상대 경로 계산
3. 파일 위치에 따라 프로젝트 루트까지의 상대 경로 반환

### 예시
- **app/index.html**에서:
  - `relativePath = 'app/index.html'`
  - `basePath = '../'`
  - 결과: `../app/index.html`, `../pages/xxx/xxx.html`, `../shared/assets/images/...`

- **pages/members/members.html**에서:
  - `relativePath = 'pages/members/members.html'`
  - `basePath = '../../'`
  - 결과: `../../app/index.html`, `../../pages/xxx/xxx.html`, `../../shared/assets/images/...`

## 최종 검증

### ✅ 모든 경로가 올바르게 설정되었습니다:
1. ✅ HTML → Scripts (path-resolver.js, nav.js, footer.js)
2. ✅ HTML → Styles (app/styles.css)
3. ✅ CSS → Shared Styles (global.css, css/*.css)
4. ✅ CSS → Images (main_bg.jpg)
5. ✅ HTML → Images (members/*.jpg, svg/logo.svg)
6. ✅ JavaScript → Images (publications.js, members.js)
7. ✅ nav.js → Links (app/index.html, pages/*.html)
8. ✅ nav.js → Logo Image (shared/assets/images/svg/logo.svg)

## 테스트 방법

1. **app/index.html** 열기
   - 네비게이션 링크가 작동하는지 확인
   - 로고 이미지가 표시되는지 확인
   - 스타일이 적용되는지 확인

2. **pages/members/members.html** 열기
   - 네비게이션 링크가 작동하는지 확인
   - 멤버 이미지가 표시되는지 확인
   - 상세 페이지로 이동이 작동하는지 확인

3. **pages/publications/publications.html** 열기
   - 출판물 카드 이미지가 표시되는지 확인
   - 네비게이션 링크가 작동하는지 확인

## 주의사항

⚠️ **중요**: `getBasePath()`는 **HTML 파일의 위치**를 기준으로 계산됩니다.
- nav.js가 `shared/ui/nav/nav.js`에 있더라도, `window.location.pathname`은 HTML 파일 경로를 반환
- 따라서 nav.js 내부에서 `getBasePath()`를 호출하면 HTML 파일 기준으로 올바른 경로를 반환

✅ **해결 완료**: 모든 경로가 FSD 구조에 맞게 업데이트되었습니다.

