# 기술 스택과 Next.js 주의사항

## Next.js 16 주의사항

이 프로젝트의 Next.js는 학습 데이터 속 과거 버전과 다를 수 있다. API, convention, 파일 구조를 추측하지 말고 변경 전에 `node_modules/next/dist/docs/`의 관련 문서를 확인한다. deprecated API를 새 코드에 도입하지 않는다.

## 기술 스택

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS 4
- TanStack Query 5
- Zod 4
- Lucide React

새로운 전역 상태관리, CSS 프레임워크, HTTP 클라이언트 라이브러리는 명확한 필요가 없으면 추가하지 않는다.
