# DARU FE

## 프로젝트

- Next16
- React19
- TS strict
- Tailwind4

## 반드시 지킬 것

- any 금지
- 컴포넌트 fetch 금지
- feature -> api -> client 구조
- Zod 사용
- Query 사용
- 기존 구조 유지
- 관련없는 파일 수정 금지

## 폴더

src/app
src/features
src/components
src/lib

## Page Structure

모든 page route는 다음 구조를 따른다.

page.tsx
store.ts

필요한 경우만
styles.ts
hooks.ts
components/
schema.ts

## Component Structure

재사용 컴포넌트는 PascalCase 폴더를 사용한다.

ProfileMenu/
 ├── index.ts
 ├── ProfileMenu.tsx
 └── styles.ts

React 컴포넌트 안에 긴 Tailwind class를 작성하지 않는다.

정적 스타일은 styles.ts에서 관리한다.

## 완료

lint
build