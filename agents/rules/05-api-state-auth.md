# API, 상태, 인증 규칙

## API 호출 규칙

컴포넌트에서 직접 `fetch`하지 않는다. 다음 흐름을 지킨다.

```text
Component
  -> page hook (useQuery/useMutation)
  -> feature api.ts
  -> lib/api/client.ts
  -> FastAPI 또는 Next.js mock Route Handler
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
- React Query `useQuery`, `useMutation`은 `src/app/(page)/<domain>/hooks/` 아래에서만 선언한다.
- 화면 영역에서 공유하는 인증 세션 같은 hook은 `src/app/(page)/hooks/` 아래에 둔다.
- `features/**/hooks`에는 API 호출 hook을 두지 않는다. 여러 페이지에서 같은 호출이 필요하면 page hook이 재사용할 순수 helper만 feature에 둔다.
- feature 컴포넌트는 API hook을 직접 호출하지 않고 page에서 받은 data, action, pending 상태를 props로 사용한다.
- HTTP 오류는 `ApiError`로 표준화한다.
- mutation 성공/실패 메시지는 API 응답의 `message`를 Toast로 표시한다.
- 버튼이 mutation을 실행하면 반드시 React Query의 `isPending`을 연결한다.
- pending 중에는 중복 요청을 막고 spinner 또는 loading text를 표시한다.
- Query Key는 문자열을 흩뿌리지 말고 `lib/query-keys.ts`에서 관리한다.
- 조회 화면에는 loading, error, empty, success 상태를 모두 고려한다.
- 레이아웃이 큰 화면의 loading은 spinner 하나보다 Skeleton을 우선한다.
- 현재 mock API의 1초 지연은 `lib/api/client.ts` 한 곳에서만 관리한다. 컴포넌트마다 `setTimeout`을 추가하지 않는다.
- 실제 FastAPI 연동 시 API 함수와 환경변수만 교체하고 컴포넌트 계약은 유지한다.

## 상태 관리 규칙

- 서버 상태: TanStack Query
- 인증 사용자: `AuthProvider`
- 페이지 UI 상태: 해당 페이지의 `store/<service>-slice.ts`
- 단일 컴포넌트 UI 상태: `useState`
- URL로 공유되어야 하는 필터와 탐색 상태: search params
- 파생 가능한 값은 별도 state로 중복 저장하지 않는다.
- `localStorage` 접근은 hydration을 고려해 client boundary 안에서 수행한다.
- 서버 상태를 Context나 전역 store에 복제하지 않는다.

## 인증과 헤더 규칙

- 비로그인 상태에는 로그인 버튼만 표시한다.
- 로그인 상태에는 알림과 프로필 메뉴를 표시하고 로그인 버튼은 숨긴다.
- 사용자 `avatarUrl`이 있으면 이미지를, 없으면 이름 첫 글자를 fallback으로 사용한다.
- 사용자 정보는 `AuthProvider`를 통해 읽고 갱신한다.
- 인증 성공 시 API 응답 user를 저장한 뒤 이동한다.
- 로그아웃 시 저장된 인증 정보를 제거하고 UI를 즉시 비로그인 상태로 갱신한다.
- 민감한 토큰을 `localStorage`에 저장하지 않는다. 실제 인증에서는 HTTP-only cookie를 사용한다.
