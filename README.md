# 🌿 Veganer

> 비건을 위한 식당 정보·리뷰·커뮤니티 통합 플랫폼

비건 식당을 검색하고, 리뷰를 남기고, 같은 관심사를 가진 사람들과
커뮤니티에서 소통할 수 있는 풀스택 웹 서비스입니다.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

---

## 🔗 링크

- **🌐 서비스**: https://veganer.vercel.app (예시)
- **📂 백엔드 레포**: https://github.com/ehddk/veganerserver

---

## 📸 스크린샷

| 메인 페이지 | 식당 상세 |
|---|---|
| ![main](./docs/main.png) | ![detail](./docs/detail.png) |

| AI 챗 인터페이스 | 리뷰 작성 |
|---|---|
| ![chat](./docs/chat.png) | ![review](./docs/review.png) |

---

## ✨ 주요 기능

- 🍽️ **식당 정보 조회** — 카테고리·검색·지도 기반 탐색
- ⭐ **리뷰 시스템** — 별점, 이미지 첨부, 수정/삭제
- 📌 **스크랩** — 마음에 드는 식당 북마크 + 마이페이지 목록
- 💬 **커뮤니티 게시판** — Quill 에디터 기반 글쓰기, 댓글
- 🤖 **AI 챗봇** — Groq API(Llama 3.1)로 비건 관련 질의응답
- 🗺️ **지도 연동** — Leaflet 기반 식당 위치 표시
- 🔐 **OAuth 인증** — Supabase Auth

---

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Styled-Components
- **Form**: react-hook-form
- **Editor**: react-quill-new

### Backend
- **Runtime**: Node.js + Express
- **Database**: PostgreSQL (Supabase 호스팅)
- **ORM**: 사용 안 함 (raw SQL with `pg`)
- **Auth**: Supabase Auth (OAuth)
- **Storage**: Supabase Storage

### External APIs
- **Groq API**: AI 챗봇 (Llama 3.1 모델)
- **Naver Search API**: 식당 이미지·블로그 후기

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **DB/Storage**: Supabase

---

## 🏗 시스템 아키텍처

```
