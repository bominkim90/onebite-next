import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생하였습니다.</div>;
  }
  const books: BookData[] = await response.json();

  if (books.length === 0) return <div>검색 결과가 존재하지 않습니다.</div>;

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    // Suspense(미완성, 미결) 컴포넌트로 => 비동기 컴포넌트를 감싸면
    // 자동으로 스트리밍 적용이 된다
    // Suspense 컴포넌트의 key 값을 등록해두면 그 key값이 바뀌면 컴포넌트를 아예 새롭게 그리게 함
    <Suspense key={q} fallback={<BookListSkeleton count={1} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}

// searchParams 라는 쿼리스트링을 받을 수 있는 동적 파라미터를 사용 중
// => 자동으로 Dynamic 페이지로 설정됨
// 현재 페이지는 쿼리스트링 같은 동적 값에 의존하고 있기 때문에
// static 페이지로 전환 불가!
// 대신 fetch의 옵션을 cache 시켜서 그나마 캐싱을 시킬 수 있다
