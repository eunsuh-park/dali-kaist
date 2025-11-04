# FSD (Feature-Sliced Design) 구조 개선 제안

## 현재 구조

```
dali-kaist/
├── app/                    # App Layer (진입점 & 전역 설정)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── components/         # 전역 컴포넌트 (nav, footer)
│   └── css/                # 전역 스타일
├── pages/                  # Pages Layer (페이지별 기능)
│   ├── members/
│   ├── publications/
│   ├── research/
│   ├── activity/
│   └── contact/
└── images/                 # 공유 리소스
```

## FSD 계층 구조 개선 제안

### 1. **Shared Layer 추가** (공유 리소스)
```
shared/
├── ui/                     # 공유 UI 컴포넌트
│   ├── nav/               # 네비게이션 (현재 app/components/nav.js)
│   ├── footer/            # 푸터 (현재 app/components/footer.js)
│   └── go-top/            # Go to Top 버튼
├── assets/                 # 공유 에셋
│   ├── images/            # 이미지 (현재 images/)
│   └── fonts/             # 폰트
├── styles/                 # 공유 스타일
│   ├── global.css         # 전역 스타일 (현재 app/styles.css의 일부만)
│   │                       # - CSS 변수 (:root)
│   │                       # - 기본 리셋 (*, body, html)
│   │                       # - 기본 타이포그래피 (h1, h2, p 등)
│   │                       # - 공통 레이아웃 (.section, .container 등)
│   └── variables.css       # CSS 변수만 분리 (선택적)
└── utils/                  # 유틸리티 함수
    ├── path-resolver.js   # 경로 해결 로직
    │                       # - 현재 app/components/nav.js의 getBasePath() 함수 분리
    │                       # - 현재 페이지 위치에 따라 상대 경로 계산
    │                       # - file:// 및 http:// 프로토콜 모두 지원
    └── helpers.js         # 범용 헬퍼 함수
                            # - 날짜 포맷팅 (formatDate)
                            # - 텍스트 처리 (truncateText)
                            # - 디바운스/스로틀 함수
                            # - DOM 조작 헬퍼
                            # - URL 파라미터 파싱 등
```

### 2. **Entities Layer 추가** (비즈니스 엔티티)
```
entities/
├── member/                # 멤버 엔티티
│   ├── model.js           # 멤버 데이터 모델 및 로직
│   │                       # - 데이터 구조 정의 (schema)
│   │                       # - 데이터 로드 함수 (load)
│   │                       # - 데이터 검증 함수 (validate)
│   ├── data.js            # 멤버 데이터 (현재 pages/members/members.js의 memberDetails)
│   ├── member-card.js     # 멤버 카드 UI 컴포넌트
│   └── member-detail.js   # 멤버 상세 컴포넌트
├── publication/           # 출판물 엔티티
│   ├── model.js           # 출판물 데이터 모델 및 로직
│   ├── data.js            # 출판물 데이터 (현재 pages/publications/publications-data.js)
│   └── publication-card.js # 출판물 카드 UI 컴포넌트
├── research/              # 연구 엔티티
│   ├── model.js           # 연구 데이터 모델
│   └── research-card.js   # 연구 카드 UI 컴포넌트
└── activity/              # 활동 엔티티
    ├── model.js           # 활동 데이터 모델
    └── activity-card.js   # 활동 카드 UI 컴포넌트
```

**Entities 개념 설명:**
- DB의 엔티티와 유사하지만, 프론트엔드에서는 **데이터 모델 + UI 컴포넌트**를 함께 관리
- 비즈니스 도메인 객체 (Member, Publication, Research, Activity)
- 각 엔티티는 독립적으로 관리되며, 재사용 가능한 컴포넌트를 포함

**데이터 관리 방법:**
1. **현재 방식 (정적 JSON/JS 파일):**
   - Excel → JSON 변환: `convert_excel_to_json.py` 유지
   - 변환된 데이터를 `entities/xxx/data.js`에 저장
   - 코드는 변경 없이 데이터만 업데이트

2. **향후 확장 (API 연동 시):**
   - `model.js`의 `load()` 함수만 수정하면 됨
   - 현재: JSON 파일에서 로드
   - 향후: API 호출로 변경 가능
   ```javascript
   // entities/publication/model.js
   export const publicationModel = {
     async load() {
       // 현재: return publicationsData;
       // 향후: return fetch('/api/publications').then(r => r.json());
     }
   }
   ```

### 3. **Features Layer 추가** (기능 단위) - 향후 필요 시 추가
```
features/
├── member-list/           # 멤버 목록 기능
│   ├── member-list.js
│   └── member-list.css
├── publication-list/      # 출판물 목록 기능
│   ├── publication-list.js
│   └── publication-list.css
└── publication-year-filter/  # 출판물 연도별 필터 (현재 groupByYear 기능)
    ├── publication-year-filter.js
    └── publication-year-filter.css
```

**참고:**
- 현재는 Features Layer가 **필수는 아닙니다**
- 이미 구현된 필터링 기능:
  - Publications: `filterArticles()` (Type 필터링), `groupByYear()` (연도별 그룹화)
  - Members: sidebar-menu를 통한 카테고리 필터링 (#professor, #phd 등)
- Features Layer는 **여러 페이지에서 공통으로 사용**되거나 **복잡한 기능**이 필요할 때 추가
- 현재 구조에서는 페이지별 로직이 충분히 단순하므로 생략 가능

### 4. **Pages Layer 개선** (페이지 라우팅)
```
pages/
├── members/
│   ├── members.html       # 페이지 진입점
│   └── members.js         # 페이지 초기화 로직만
├── publications/
│   ├── publications.html
│   └── publications.js
└── ...
```

## 권장 마이그레이션 순서

### Phase 1: Shared Layer 분리 (우선순위: 높음)
1. `app/components/` → `shared/ui/` 이동
   - `nav.js` → `shared/ui/nav/`
   - `footer.js` → `shared/ui/footer/`
2. `images/` → `shared/assets/images/` 이동
3. 공유 스타일 분리 (`app/css/` → `shared/styles/`)
   - `app/styles.css`의 전역 스타일만 → `shared/styles/global.css`
   - CSS 변수, 기본 리셋, 기본 타이포그래피 등
4. 경로 해결 로직 분리
   - `app/components/nav.js`의 `getBasePath()` → `shared/utils/path-resolver.js`

### Phase 2: Entities Layer 추가 (우선순위: 중간)
1. 각 페이지의 데이터 모델을 `entities/`로 이동
   - `pages/members/members.js`의 `memberDetails` → `entities/member/data.js`
   - `pages/publications/publications-data.js` → `entities/publication/data.js`
   
2. 데이터 모델 로직 추가
   - 각 엔티티에 `model.js` 생성 (데이터 구조, 로드, 검증 함수)

3. 재사용 가능한 컴포넌트를 `entities/`로 이동
   - 멤버 카드 → `entities/member/member-card.js`
   - 출판물 카드 → `entities/publication/publication-card.js`

### Phase 3: Features Layer 추가 (우선순위: 낮음 - 향후 필요 시)
**현재는 생략 가능합니다.** 다음 조건이 충족될 때 추가를 고려하세요:
- 여러 페이지에서 공통으로 사용되는 기능
- 복잡한 필터링/검색 기능이 필요할 때
- 재사용 가능한 기능 단위가 명확할 때

1. 페이지별 기능을 `features/`로 분리
   - 멤버 목록 → `features/member-list/`
   - 출판물 목록 → `features/publication-list/`
   - 출판물 연도 필터 → `features/publication-year-filter/`

## 현재 구조의 장점
- ✅ 이미 `app/`과 `pages/` 계층이 분리되어 있음
- ✅ 페이지별로 기능이 모듈화되어 있음
- ✅ 경로 구조가 명확함

## 개선이 필요한 부분
- ⚠️ 공유 컴포넌트가 `app/`에 섞여 있음 → `shared/`로 분리 필요
- ⚠️ 비즈니스 로직이 페이지에 섞여 있음 → `entities/`로 분리 필요
- ⚠️ 데이터 모델이 페이지별로 분산됨 → `entities/`로 통합 필요
- ⚠️ 전역 스타일이 페이지별 스타일과 혼재 → `shared/styles/`로 분리 필요
- ⚠️ 경로 해결 로직이 컴포넌트에 포함됨 → `shared/utils/`로 분리 필요

## 다음 단계 제안

### 즉시 적용 가능 (Phase 1)
1. `shared/` 폴더 생성
   - `shared/ui/` - 공유 UI 컴포넌트
   - `shared/assets/images/` - 공유 이미지
   - `shared/styles/` - 공유 스타일
   - `shared/utils/` - 유틸리티 함수

2. `app/components/` → `shared/ui/` 이동
3. `images/` → `shared/assets/images/` 이동
4. 전역 스타일 분리 (`app/styles.css` → `shared/styles/global.css`)
5. 경로 해결 로직 분리 (`nav.js`의 `getBasePath()` → `shared/utils/path-resolver.js`)

### 중기 개선 (Phase 2)
1. `entities/` 폴더 생성 및 데이터 모델 분리
   - 각 엔티티별 폴더 구조 생성
   - 데이터와 컴포넌트 분리
   - 모델 로직 추가

### 장기 개선 (Phase 3 - 선택적)
1. `features/` 폴더 생성 (필요 시에만)
   - 공통 기능이 복잡해지거나 여러 페이지에서 재사용될 때
   - 현재는 생략 가능

## 참고
- FSD 공식 문서: https://feature-sliced.design/
- 현재는 정적 사이트이므로, 위 구조는 향후 확장성을 고려한 제안입니다.

