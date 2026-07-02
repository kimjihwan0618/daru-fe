# DARU-FE Codex 바이브 코딩 지침

이 파일은 이 저장소에서 작업하는 Codex 및 자동화 에이전트가 항상 따라야 하는 프로젝트 규칙이다.
목표는 빠르게 동작하는 결과를 만들면서도 다음 작업자가 이해하고 확장할 수 있는 구조를 유지하는 것이다.

<!-- BEGIN:nextjs-agent-rules -->

## Next.js 16 주의사항

이 프로젝트의 Next.js는 학습 데이터 속 과거 버전과 다를 수 있다. API, convention, 파일 구조를 추측하지 말고 변경 전에 `node_modules/next/dist/docs/`의 관련 문서를 확인한다. deprecated API를 새 코드에 도입하지 않는다.
<!-- END:nextjs-agent-rules -->

## 1. 제품 맥락

DARU는 사용자의 관심사, 출근 경로, 날씨, 뉴스와 관심 종목을 조합해 매일 아침 3분 브리핑을 제공하는 서비스다.

기능을 만들 때 다음 우선순위를 지킨다.

1. 사용자가 지금 해야 할 행동이 명확한가
2. 정보의 출처와 상태가 신뢰 가능하게 보이는가
3. 비로그인 사용자도 핵심 가치를 체험할 수 있는가
4. 로그인 사용자는 개인화, 저장, 알림의 이점을 얻는가
5. 모바일과 데스크톱 모두에서 핵심 흐름이 유지되는가

## 2. 기본 작업 원칙

- 코드부터 쓰지 말고 관련 페이지, feature, 타입, API 호출 흐름을 먼저 읽는다.
- 사용자의 요청 범위 안에서는 합리적으로 판단하고 끝까지 구현한다.
- 한 번에 전체 구조를 갈아엎지 않는다. 작고 검증 가능한 변경으로 진행한다.
- 이미 존재하는 사용자 코드와 디자인을 보존한다. 관련 없는 파일을 정리하거나 포맷하지 않는다.
- 동작만 하는 임시 코드를 최종 결과로 남기지 않는다. 임시 mock은 교체 지점을 명시한다.
- 과도한 추상화보다 두 번 이상 재사용되는 명확한 추상화를 선호한다.
- 라이브러리를 추가하기 전에 현재 스택으로 해결 가능한지 확인한다.
- 구현 후에는 결과, 변경 파일, 검증 방법을 짧고 구체적으로 보고한다.

## 3. 기술 스택

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS 4
- TanStack Query 5
- Zod 4
- Lucide React

새로운 전역 상태관리, CSS 프레임워크, HTTP 클라이언트 라이브러리는 명확한 필요가 없으면 추가하지 않는다.

## 4. 디렉터리 책임

```text
src/
  app/                  # route, layout, Route Handler, 페이지 조립
  components/
    ui/                 # 도메인과 무관한 공통 UI
    layout/             # Header, Footer 등 공통 레이아웃
  features/
    <feature>/
      api.ts            # 해당 feature의 API 함수
      model.ts          # Zod schema, type, 상수
      hooks/            # React Query 및 feature hook
      components/       # feature 전용 UI
  lib/
    api/                # 공통 HTTP client와 응답 규약
    query-keys.ts       # Query Key Factory
```

배치 기준:

- 페이지는 데이터를 직접 가공하지 않고 feature 컴포넌트를 조립한다.
- `components/ui`는 비즈니스 용어와 API를 알지 못해야 한다.
- 특정 도메인에서만 쓰는 컴포넌트는 해당 `features` 아래에 둔다.
- 여러 페이지가 공유하는 레이아웃만 `components/layout`에 둔다.
- 파일 하나가 여러 책임을 갖기 시작하면 역할별로 분리한다. 단, 작은 컴포넌트를 의미 없이 파일로 쪼개지 않는다.

## 5. API 호출 규칙

컴포넌트에서 직접 `fetch`하지 않는다. 다음 흐름을 지킨다.

```text
Component
  → feature hook (useQuery/useMutation)
  → feature api.ts
  → lib/api/client.ts
  → FastAPI 또는 Next.js mock Route Handler
```

공통 응답 형식:

```json
{
  "success": true,
  "data": {},
  "message": "처리되었습니다.",
  "code": "OPTIONAL_CODE"
}
```

- 모든 응답 data는 Zod schema로 검증한다.
- HTTP 오류는 `ApiError`로 표준화한다.
- mutation 성공/실패 메시지는 API 응답의 `message`를 Toast로 표시한다.
- 버튼이 mutation을 실행하면 반드시 React Query의 `isPending`을 연결한다.
- pending 중에는 중복 요청을 막고 spinner 또는 loading text를 표시한다.
- Query Key는 문자열을 흩뿌리지 말고 `lib/query-keys.ts`에서 관리한다.
- 조회 화면에는 loading, error, empty, success 상태를 모두 고려한다.
- 레이아웃이 큰 화면의 loading은 spinner 하나보다 Skeleton을 우선한다.
- 현재 mock API의 1초 지연은 `lib/api/client.ts` 한 곳에서만 관리한다. 컴포넌트마다 `setTimeout`을 추가하지 않는다.
- 실제 FastAPI 연동 시 API 함수와 환경변수만 교체하고 컴포넌트 계약은 유지한다.

## 6. 상태 관리 규칙

- 서버 상태: TanStack Query
- 인증 사용자: `AuthProvider`
- 단일 컴포넌트 UI 상태: `useState`
- URL로 공유되어야 하는 필터와 탐색 상태: search params
- 파생 가능한 값은 별도 state로 중복 저장하지 않는다.
- `localStorage` 접근은 hydration을 고려해 client boundary 안에서 수행한다.
- 서버 상태를 Context나 전역 store에 복제하지 않는다.

## 7. 인증과 헤더 규칙

- 비로그인 상태에는 로그인 버튼만 표시한다.
- 로그인 상태에는 알림과 프로필 메뉴를 표시하고 로그인 버튼은 숨긴다.
- 사용자 `avatarUrl`이 있으면 이미지를, 없으면 이름 첫 글자를 fallback으로 사용한다.
- 사용자 정보는 `AuthProvider`를 통해 읽고 갱신한다.
- 인증 성공 시 API 응답 user를 저장한 뒤 이동한다.
- 로그아웃 시 저장된 인증 정보를 제거하고 UI를 즉시 비로그인 상태로 갱신한다.
- 민감한 토큰을 `localStorage`에 저장하지 않는다. 실제 인증에서는 HTTP-only cookie를 사용한다.

## 8. 컴포넌트와 스타일 규칙

- 공통 Button, Card, Input, Badge, Skeleton, Toast를 우선 재사용한다.
- 같은 버튼 스타일을 페이지마다 복사하지 않는다.
- `Button`의 `isPending`, `loadingText`, `disabled` 계약을 유지한다.
- 색상과 간격은 현재 DARU navy/blue-gray 디자인 시스템을 따른다.
- Tailwind class가 지나치게 반복되면 공통 컴포넌트로 올린다.
- 임의의 inline style은 SVG 좌표나 동적 값처럼 Tailwind로 표현하기 어려운 경우에만 사용한다.
- 아이콘은 Lucide React를 우선 사용한다.
- 클릭 가능한 요소는 `button` 또는 `a`를 사용하고 키보드 focus를 제공한다.
- 아이콘만 있는 버튼에는 `aria-label`을 작성한다.
- 색상만으로 상태를 구분하지 않는다.
- 모바일을 나중에 보정하지 말고 기본 레이아웃부터 반응형으로 작성한다.

## 9. TypeScript 규칙

- `any`, 무분별한 type assertion, `@ts-ignore`를 사용하지 않는다.
- API 타입을 수동으로 중복 작성하지 말고 Zod schema에서 추론한다.
- null 가능성을 타입에 드러내고 UI에서 fallback을 처리한다.
- 컴포넌트 props는 책임이 드러나는 이름을 사용한다.
- boolean prop은 `is`, `has`, `can`, `should` 접두사를 선호한다.
- 서버 전용 코드와 client 전용 코드를 구분하고 필요한 파일에만 `"use client"`를 선언한다.

## 10. Mock 개발 규칙

- 실제 API가 없을 때는 `app/api`의 Route Handler로 mock endpoint를 만든다.
- mock도 실제 예정 응답 envelope와 schema를 따른다.
- mock data는 컴포넌트 JSX 내부에 대량으로 작성하지 않는다.
- 인위적 지연은 공통 API client에서 development 환경에만 적용한다.
- mock 성공만 구현하지 말고 필요하면 오류 응답을 쉽게 재현할 수 있는 구조를 둔다.
- 실제 API처럼 보이는 가짜 투자 정보에는 mock 또는 예시임을 화면에 표시한다.

## 11. 작업 절차

기능 변경 시 다음 순서를 기본으로 한다.

1. 관련 파일과 현재 데이터 흐름을 확인한다.
2. 사용자 시나리오와 완료 조건을 한 문장으로 정리한다.
3. model/schema와 컴포넌트 계약을 먼저 결정한다.
4. 공통 컴포넌트 재사용 가능성을 확인한다.
5. API → hook → UI 순서로 연결한다.
6. pending, error, empty, success 상태를 구현한다.
7. 모바일과 데스크톱 레이아웃을 확인한다.
8. lint와 production build를 실행한다.
9. 변경 범위 밖 파일이 수정되지 않았는지 확인한다.

## 12. 필수 검증

완료 전 최소한 다음 명령을 통과시킨다.

```bash
npm run lint
npm run build
```

UI 상호작용을 변경했다면 가능할 때 실제 브라우저에서 다음을 확인한다.

- 초기 loading 또는 Skeleton
- 성공 Toast와 실패 Toast
- mutation 버튼의 pending 및 중복 클릭 방지
- 로그인/비로그인 헤더 전환
- 모바일 overflow와 dropdown 위치
- 브라우저 console error 유무

검증이 실패하면 실패 사실을 숨기지 말고 원인과 남은 작업을 보고한다.

## 13. 완료 정의

다음 조건이 모두 충족되어야 완료다.

- 요청한 사용자 흐름이 실제로 동작한다.
- 타입, lint, build가 통과한다.
- API 응답과 UI 상태가 연결되어 있다.
- loading/error/empty 상태가 필요한 위치에 존재한다.
- 공통 요소가 중복 구현되지 않았다.
- 임시 코드와 TODO가 실제 교체 지점을 설명한다.
- README 또는 이 지침에 영향을 주는 구조 변경은 문서에도 반영했다.

## 14. 금지사항

- 컴포넌트에서 직접 API URL 호출
- API 응답을 검증 없이 `as`로 강제 변환
- pending 상태 없는 mutation 버튼
- 오류를 console에만 남기고 사용자에게 숨기기
- 거대한 페이지 컴포넌트에 모든 상태와 UI 몰아넣기
- 동일한 mock data를 여러 파일에 복사
- 이유 없는 dependency 추가
- `node_modules`, `.next`, 생성 파일 직접 수정
- 사용자 요청 없이 전체 디자인 또는 디렉터리 구조 재작성
- lint 오류를 disable 주석으로 덮기
- 검증하지 않고 "완료"라고 보고하기

## 15. Codex 응답 방식

- 작업 시작 시 무엇을 바꿀지 짧게 알린다.
- 진행 중 발견한 구조적 문제는 현재 요청과 관련 있을 때만 함께 해결한다.
- 사용자가 결정해야 하는 중요한 선택이 아니면 합리적으로 판단해 구현을 계속한다.
- 최종 응답은 결과를 먼저 말하고 주요 파일, 검증 결과, 남은 제한사항 순으로 간결하게 작성한다.
- 기술을 사용했다는 사실보다 사용자 경험과 유지보수성이 어떻게 좋아졌는지 설명한다.

## 16. 스타일 시스템 필수 규칙

- 디자인 토큰의 단일 진실 공급원은 `src/app/globals.css`의 Tailwind `@theme`이다.
- JSX 안에 `text-[#...]`, `bg-[#...]`, `border-[#...]` 같은 임의 색상 클래스를 추가하지 않는다.
- 새 색상이 필요하면 용도를 먼저 정의하고 `brand`, `surface`, `ink`, `muted`, `border`, `success`, `danger` 같은 의미 기반 토큰으로 등록한다.
- SVG 좌표, SVG stroke/fill, 런타임 계산값처럼 유틸리티로 표현하기 어려운 값만 inline style 또는 직접 색상값을 허용한다.
- variant 또는 size가 둘 이상인 공통 UI는 `class-variance-authority`의 `cva`와 `VariantProps`로 관리한다.
- 조건부 class와 외부 class 병합에는 `src/lib/cn.ts`의 `cn`을 사용한다. 문자열 직접 연결은 피한다.
- 페이지에서 반복되는 긴 class 묶음은 `components/ui` 또는 기능 내부의 작은 표현 컴포넌트로 올린다.
- class 순서는 수동으로 관리하지 않는다. 변경 후 `npm run format`으로 Prettier와 Tailwind plugin을 실행한다.
- 스타일 변경 완료 조건에는 `npm run format:check`, `npm run lint`, `npm run build` 통과가 포함된다.
- React 컴포넌트 파일에는 Tailwind class 문자열을 직접 작성하지 않는다.
- 컴포넌트별 정적 스타일은 같은 경로의 `컴포넌트명.styles.ts`에서 관리한다.
- 컴포넌트는 `styles.root`, `styles.title`처럼 역할이 드러나는 이름만 참조한다. `div1`, `text2` 같은 순번 기반 이름은 금지한다.
- 상태·variant·size에 따라 달라지는 스타일은 `*.styles.ts`의 CVA variant로 정의한다.
- `*.styles.ts`에는 렌더링, 이벤트, API 호출 같은 컴포넌트 로직을 넣지 않는다.
- 외부에서 전달받은 `className`을 병합해야 하는 공통 UI만 컴포넌트 내부에서 `cn(variant(...), className)`을 사용할 수 있다.

## 17. 컴포넌트와 페이지 파일 구조

- React 컴포넌트 폴더와 파일은 PascalCase로 작성한다. 예: `ToastProvider/ToastProvider.tsx`.
- 재사용 컴포넌트의 기본 구조는 `ComponentName/ComponentName.tsx`, `ComponentName/styles.ts`, `ComponentName/index.ts`이다.
- `styles.ts`가 필요 없는 로직 전용 Provider 또는 컴포넌트에는 빈 스타일 파일을 만들지 않는다.
- `index.ts`는 컴포넌트의 public export만 담당하고 구현 로직이나 스타일을 포함하지 않는다.
- 컴포넌트를 import할 때는 내부 파일이 아니라 폴더의 public entry를 사용한다. 예: `@/components/ui/Button`.
- Next.js App Router 예약 파일 `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx`는 프레임워크 규칙에 따라 소문자를 유지한다.
- 각 페이지 라우트 폴더는 기본적으로 `page.tsx`와 `store.ts`를 가진다.
- 페이지 전용 스타일이 있으면 같은 라우트 폴더에 `styles.ts`를 추가한다. 스타일이 없으면 빈 파일을 만들지 않는다.
- 페이지 상태는 `store.ts`, 페이지 전용 표현은 `components/`, 페이지 전용 훅은 `hooks.ts` 또는 `hooks/`, 검증은 `schema.ts`에 둔다.
- API 서버 상태는 TanStack Query가 소유한다. `store.ts`는 선택 UI, 탭, 모달, 임시 입력처럼 페이지 UI 상태만 관리한다.
- 여러 페이지에서 재사용되기 시작한 로직이나 UI는 페이지 폴더에 두지 말고 해당 `features` 또는 `components`로 승격한다.
