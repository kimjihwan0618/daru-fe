# 프로젝트 구조

## 디렉터리 책임

```text
src/
  app/                  # route, layout, Route Handler, 페이지 조립
    (page)/             # 화면 페이지 route group, URL에는 포함되지 않음
      hooks/            # app 화면 영역에서 공유하는 page-level hook
      <domain-page>/
        page.tsx        # 페이지 엔트리
        store/          # 페이지에서 호출하는 서비스별 slice 집합
          index.ts      # slice public export
          <service>-slice.ts
        hooks/          # 해당 페이지에서 호출하는 API hook 집합
          index.ts
        type/           # 해당 페이지에서 쓰는 데이터 타입
          index.ts
        styles.ts       # 페이지 전용 스타일이 있을 때만 작성
    api/                # Route Handler 전용
  components/
    ui/                 # 도메인과 무관한 공통 UI
    layout/             # Header, Footer 등 공통 레이아웃
  features/
    <feature>/
      api.ts            # 해당 feature의 API 함수
      model.ts          # Zod schema, type, 상수
      hooks/            # API 호출이 없는 feature 내부 UI hook
      components/       # feature 전용 UI
  lib/
    api/                # 공통 HTTP client와 응답 규약
    query-keys.ts       # Query Key Factory
```

## app 페이지 폴더 규칙

- `src/app` 아래의 화면 페이지는 `src/app/(page)` route group 아래에 둔다.
- `(page)`는 Next.js route group이므로 URL path에 포함되지 않는다. 예: `src/app/(page)/login/page.tsx`는 `/login`이다.
- 도메인 페이지 폴더는 `page.tsx`, `store/`, `hooks/`, `type/` 구성을 기본으로 한다.
- Next.js App Router 예약 파일 `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx`는 프레임워크 규칙에 따라 소문자를 유지한다.
- `app/api`의 Route Handler 폴더는 화면 페이지와 역할이 다르므로 `(page)` 아래로 옮기지 않는다.
- `store/`는 페이지에서 호출하는 서비스별 slice를 모아두는 용도다.
- `store/index.ts`는 각 서비스별 slice의 public export만 담당한다.
- slice 파일 이름은 `<service>-slice.ts` 형식을 사용한다. 예: `auth-slice.ts`, `briefing-slice.ts`, `page-slice.ts`.
- `store/`에는 서버 상태를 복제하지 않는다. 선택 UI, 탭, 모달, 임시 입력처럼 페이지 UI 상태만 관리한다.
- `hooks/`는 해당 페이지에서 호출하는 API hook 또는 page-level hook을 모아두는 용도다.
- `hooks/index.ts`는 page-level hook의 public export만 담당한다.
- `type/`은 해당 페이지에서만 쓰는 데이터 타입을 모아두는 용도다.
- `type/index.ts`는 페이지 타입의 public export만 담당한다.
- 페이지 전용 스타일이 있으면 같은 라우트 폴더에 `styles.ts`를 추가한다. 스타일이 없으면 빈 파일을 만들지 않는다.

## 배치 기준

- 페이지는 데이터를 직접 가공하지 않고 feature 컴포넌트를 조립한다.
- `components/ui`는 비즈니스 용어와 API를 알지 못해야 한다.
- 특정 도메인에서만 쓰는 컴포넌트는 해당 `features` 아래에 둔다.
- 여러 페이지가 공유하는 레이아웃만 `components/layout`에 둔다.
- 여러 페이지에서 재사용되기 시작한 로직이나 UI는 페이지 폴더에 두지 말고 해당 `features` 또는 `components`로 승격한다.
- 파일 하나가 여러 책임을 갖기 시작하면 역할별로 분리한다. 단, 작은 컴포넌트를 의미 없이 파일로 쪼개지 않는다.
