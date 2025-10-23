import BookItem from "@/components/book-item";
import style from "./page.module.css";
import type { BookData } from "@/types";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

// 라우트 세그먼트 옵션
// export const dynamic = "force-dynamic"; // 강제로 '동적' 렌더링 페이지

// (SEO 최적화) Meta 데이터 설정 방법
// 'metadata' 변수를 export 해주면 자동 설정 됨
export const metadata: Metadata = {
  title: "한입 북스",
  description: "한입 북스에 등록된 도서를 만나보세요",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요",
    images: ["/thumbnail.png"],
  },
};

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } } // static 라우트 적용시 풀라우트캐시가 적용이 됨 => 그래도 revalidate 옵션으로 인해 3초마다 재갱신 될 수 있음
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>

        {/* Suspense는 비동기 데이터(fetch) 가 “렌더링 중에 아직 안 왔을 때”
          스트리밍(Streaming) 으로 페이지 일부를 먼저 보여주기 위한 구조입니다.
          하지만 만약 이 페이지가 정적으로 생성된다면(SSG),
          fetch가 빌드 시점에 이미 완료된 상태로 HTML이 생성됩니다.
          따라서 로딩 중 상태가 존재하지 않아요.
          그럼 <Suspense fallback={...}>은 작동할 여지가 없음. */}
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <RecoBooks />
        {/* </Suspense> */}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <AllBooks />
        {/* </Suspense> */}
      </section>
    </div>
  );
}
