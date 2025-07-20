# AI Interview

인공지능 기반 면접 연습 플랫폼

## 시작하기

### 필수 요구사항
- Node.js 16.0.0 이상
- npm 8.0.0 이상

### 설치 및 실행

```bash
# 1. React 프로젝트 생성
npx create-react-app ai-interview
cd ai-interview

# 2. 필요한 패키지 설치
npm install react-router-dom styled-components lucide-react

# 3. 개발 서버 시작
npm start
```

### 프로젝트 구조 생성

```bash
# 폴더 구조 생성
mkdir -p src/components/common src/components/home src/components/setup src/components/waiting src/components/interview src/components/result
mkdir -p src/pages src/hooks src/utils src/context src/styles
mkdir -p src/assets/images src/assets/videos src/assets/icons
mkdir -p public/assets/images public/assets/videos

# 기본 파일 생성
touch src/pages/HomePage.js src/pages/SetupPage.js src/pages/WaitingRoomPage.js src/pages/InterviewPage.js src/pages/ResultPage.js
touch src/utils/constants.js src/styles/theme.js src/context/InterviewContext.js
```

### 브라우저에서 확인
```
http://localhost:3000
```

## 📁 주요 파일 구조

```
src/
├── components/      # 재사용 가능한 컴포넌트
├── pages/          # 페이지 컴포넌트 (5개 화면)
├── hooks/          # 커스텀 훅
├── utils/          # 유틸리티 함수
├── context/        # 상태 관리
├── styles/         # 스타일 관련
└── assets/         # 정적 파일
```

## 🎯 주요 기능

- 홈 화면 (모드 선택: 코칭/실전)
- 정보 입력 (산업/직군 선택, 이력서 업로드)
- 면접 대기실 (카메라/마이크/스피커 테스트)
- 면접실 (AI 면접관과 실시간 대화)
- 결과 페이지 (상세 분석 및 피드백)