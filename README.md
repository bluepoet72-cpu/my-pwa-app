# Mini App Template

이 폴더를 복사해서 새로운 미니 앱을 만들 수 있는 템플릿입니다.

---

## 빠른 시작

1. **아이콘 생성하기**
   - `icons/generate-icons.html` 파일을 브라우저에서 열기
   - "아이콘 생성" 버튼 클릭
   - 다운로드된 `icon-192.png`와 `icon-512.png`를 `icons/` 폴더에 저장

2. **앱 커스터마이징**
   - `index.html` 파일에서 `[CUSTOMIZE]` 주석이 있는 부분만 수정
   - `manifest.webmanifest`에서 앱 이름과 색상 수정

3. **PWA로 설치하기**
   - 웹 서버에서 실행 (로컬 파일은 Service Worker 작동 안 함)
   - 브라우저 주소창의 "설치" 버튼 클릭
   - 또는 Chrome 메뉴 → "앱 설치" 선택

---

## 파일 구조

```
📁 프로젝트 폴더
├── index.html           ← 메인 앱 코드
├── manifest.webmanifest ← PWA 설정 파일
├── sw.js                ← Service Worker (오프라인 지원)
├── icons/               ← 앱 아이콘 폴더
│   ├── icon-192.png     ← 192x192 아이콘
│   ├── icon-512.png     ← 512x512 아이콘
│   └── generate-icons.html ← 아이콘 생성 도구
└── README.md            ← 이 파일
```

---

## 수정할 부분 찾기

`[CUSTOMIZE]` 키워드로 검색하면 수정할 부분을 찾을 수 있습니다.

### HTML (UI)
| 위치 | 설명 |
|------|------|
| `<title>` | 브라우저 탭에 표시되는 제목 |
| `<h1>` | 앱 메인 제목 |
| 카운터 섹션 | 필요없으면 삭제 가능 |
| 메모 섹션 | 필요없으면 삭제 가능 |

### CSS (스타일)
| 위치 | 설명 |
|------|------|
| `body background` | 배경 그라데이션 색상 |
| `button background` | 버튼 기본 색상 |
| `border-color` | 포커스 색상 |
| `.counter-display color` | 카운터 숫자 색상 |
| `.memo-item border-left` | 메모 아이템 강조색 |

### JavaScript (동작)
| 위치 | 설명 |
|------|------|
| `CONFIG.STORAGE_KEYS` | 저장소 키 (앱마다 다르게!) |
| `CONFIG.UNDO_TIMEOUT` | 되돌리기 표시 시간 |
| `CONFIG.EXPORT_PREFIX` | 내보내기 파일명 접두어 |

---

## 코드 구조

### CSS 섹션
```
1. BASE       - 기본 리셋, 폰트
2. LAYOUT     - 전체 레이아웃
3. COMPONENTS - 버튼, 입력창 등
4. SECTIONS   - 기능별 섹션
5. THEME      - 다크모드
6. ANIMATIONS - 애니메이션
```

### JavaScript 섹션
```
1. CONFIG   - 앱 설정값
2. STATE    - 상태 변수
3. STORAGE  - 저장/불러오기
4. UI       - 화면 렌더링
5. EVENTS   - 이벤트 핸들러
6. UTILS    - 유틸리티 함수
7. INIT     - 초기화
```

---

## 새 기능 추가 방법

### 1. 새 버튼 추가
```html
<!-- HTML에 버튼 추가 -->
<button onclick="myNewFunction()">새 버튼</button>
```

```javascript
// Events에 함수 추가
const Events = {
    // ... 기존 코드 ...

    myNewFunction() {
        // 여기에 로직 작성
    }
};

// 전역 함수 연결 추가
function myNewFunction() { Events.myNewFunction(); }
```

### 2. 새 상태 추가
```javascript
const STATE = {
    // ... 기존 코드 ...
    myNewState: 초기값
};
```

### 3. 새 저장 항목 추가
```javascript
const CONFIG = {
    STORAGE_KEYS: {
        // ... 기존 코드 ...
        MY_KEY: 'myKey'
    }
};
```

---

## 포함된 기능

- 카운터 (증가/리셋)
- 메모 관리 (추가/완료/삭제/검색/필터)
- 다크 모드
- 로컬 스토리지 저장
- JSON/TXT 내보내기/가져오기
- 삭제 되돌리기 (Undo)
- **PWA 지원** (홈 화면 설치, 오프라인 작동)

---

## 주의사항

- `CONFIG.STORAGE_KEYS`를 앱마다 다르게 설정하세요
- 같은 키를 사용하면 다른 앱의 데이터와 충돌합니다
- **PWA 기능은 HTTPS나 localhost에서만 작동합니다**
- 파일을 직접 열면 Service Worker가 작동하지 않습니다

---

## 로컬 서버 실행 방법

PWA를 테스트하려면 웹 서버가 필요합니다:

### Python이 있는 경우
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Node.js가 있는 경우
```bash
# npx 사용 (추가 설치 불필요)
npx http-server -p 8000
```

### VS Code 사용 중인 경우
- "Live Server" 확장 프로그램 설치
- index.html 우클릭 → "Open with Live Server"

그 후 `http://localhost:8000`으로 접속하세요.
