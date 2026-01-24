## 🔗 배포 링크

- **Demo:** [https://realteeth-weather-beige.vercel.app](https://realteeth-weather-beige.vercel.app)
- **GitHub:** [https://github.com/jaekwanAHN/realteeth_weather](https://github.com/jaekwanAHN/realteeth_weather)

<br>

## 프로젝트 실행방법

```
npm run install
npm run dev
```

```

프로젝트 루트 경로에 `.env.local` 파일을 생성해야 합니다.
`.env.example` 파일을 참고하여 아래 환경 변수들을 설정해 주세요.

> **Note:** API 키는 각 서비스 제공자에게 무료로 발급받을 수 있습니다.

# .env.example 파일을 복사하여 .env.local 생성
cp .env.example .env.local

# 생성된 .env.local 파일에 API Key 입력 (메일 첨부)
OPENWEATHER_API_KEY=발급받은_오픈웨더맵_키
KAKAO_API_KEY=발급받은_카카오_키
```

## 구현항 기능에 대한 설명

1.  정밀 주소 검색 (Hybrid Geocoding)<br>
    - 사용자가 입력한 한국 주소(예: "강원도 원주시 반곡동")를 정확한 좌표(위도/경도)로 변환합니다.<br>
    - 변환된 좌표를 기반으로 실시간 날씨 정보를 조회하여 제공합니다.<br>
    - 검색 결과가 없는 경우, 사용자에게 명확한 에러 피드백을 제공합니다.

2.  즐겨찾기 및 상태 유지<br>
    - 상세 화면의 우측 상단 하트 아이콘을 클릭하여 자주 찾는 지역을 최대 6개까지 등록/해제할 수 있습니다.<br>
    - 즐겨찾는 지역은 메인 화면에 표기되며 각 항목의 우측 휴지통 아이콘 클릭으로 즐겨찾기 목록에서 삭제할 수 있습니다.<br>
    - 브라우저를 종료하거나 새로고침해도 즐겨찾기 목록이 유지되도록 처리했습니다 (Local Storage 연동).<br>
    - 즐겨찾기 항목들의 별명을 설정할 수 있습니다. 반응형 디자인으로 모바일 환경에서는 각 항목의 우측에 수정/삭제 버튼이 존재하고 PC 환경에서는 hover시 버튼이 나타납니다.

3.  반응형 UI 및 UX 최적화<br>
    - Skeleton Loading: 데이터가 로딩되는 동안 스켈레톤 UI를 노출하여 CLS를 방지하고 체감 속도를 높였습니다.<br>
    - 모바일과 데스크톱 환경 모두에 최적화된 반응형 레이아웃을 제공합니다.

4.  상세 날씨 정보<br>
    - 현재 기온, 체감 온도, 습도, 풍속 등 상세 정보를 카드 형태로 제공합니다.
      <br>
    - 시간대별 예보 데이터를 3시간 단위로 시각화하여 보여줍니다.

## 기술적 의사결정 및 이유

1. Kakao API & OpenWeatherMap <br>
   - 문제점: 글로벌 API인 OpenWeatherMap은 한국의 행정구역(도/시/동)을 계층적으로 정확히 인식하지 못하는 한계가 있었습니다. 특히 '반곡동(세종)'과 '반곡동(원주)' 같은 동명의 지역을 구분하지 못해 엉뚱한 날씨를 보여주는 치명적인 문제가 발생했습니다.
   - 해결책: **주소 검색(Geocoding)은 국내 데이터에 강한 'Kakao Local API'**를 사용하고, **날씨 데이터는 'OpenWeatherMap'**을 사용하는 이원화 전략을 채택했습니다.<br>
   - 결과: 사용자가 "원주시 반곡동"을 입력하면 Kakao API가 정확한 좌표를 반환하고, 이를 통해 정확한 지역의 날씨를 가져올 수 있게 되었습니다.

2. Zustand를 이용한 전역 상태 관리 <br>
   - 이유: 즐겨찾기 기능처럼 전역에서 접근해야 하는 데이터 관리를 위해 상태 관리 라이브러리가 필요했습니다. Redux는 보일러플레이트가 너무 많다고 판단하여, 더 직관적이고 가벼운 Zustand를 선택했습니다.<br>
   - 활용: persist 미들웨어를 사용하여 별도의 로직 구현 없이 손쉽게 로컬 스토리지와 상태를 동기화했습니다.

3. Next.js App Router & Server Components<br>
   - 이유: 초기 로딩 속도와 SEO(검색 엔진 최적화)를 위해 최신 Next.js의 App Router 방식을 채택했습니다. 메타데이터 생성(generateMetadata)을 통해 카카오톡 공유 시 미리보기가 올바르게 나오도록 처리했습니다.

4. Next.js 15 Server Actions<br>
   - 이유: API Key가 클라이언트 번들에 노출되는 보안 문제를 근본적으로 해결하고, CORS 이슈를 방지하기 위해 도입했습니다.
   - 적용: 클라이언트에서 직접 외부 API를 호출하지 않고, 서버 액션을 통해 Proxy 패턴으로 데이터를 안전하게 요청합니다.
5. Jest
   - 이유: 현 과제에서는 E2E 대비 비용이 더 크다고 판단하여 cypress를 선택하지 않고 기능 테스트를 우선적으로 적용했습니다.
   - 적용: npm run test 로 주요 기능들에 대한 기능 테스트를 실행할 수 있도록하였습니다.

## 사용한 기술 스택

| Category             | Technology                                    |
| -------------------- | --------------------------------------------- |
| **Framework**        | Next.js 15 (App Router)                       |
| **Language**         | TypeScript                                    |
| **Styling**          | Tailwind CSS                                  |
| **State Management** | Zustand (Persist Middleware)                  |
| **Architecture**     | FSD (Feature-Sliced Design)                   |
| **Data Fetching:**   | Tanstack Query (React Query) + Server Actions |
| **API**              | OpenWeatherMap, Kakao Local API               |
| **TEST**             | Jest, React Testing Library                   |
| **Deployment**       | Vercel                                        |
