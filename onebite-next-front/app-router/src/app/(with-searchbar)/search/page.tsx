import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

// export const metadata: Metadata = {
//   title: "한입 북스 : 검색어(동적인 값)", // 여기선 동적인 값 불러올 수 없음
// };

// 현재 페이지 메타 데이터를 동적으로 생성하는 역할
// client 컴포넌트에서 props 로 쿼리스트링을 받듯이, 이 함수에서도 받을 수 있다.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `${q} : 한입 북스 검색`,
    description: `${q}의 검색 결과입니다.`,
    openGraph: {
      title: `${q} : 한입 북스 검색`,
      description: `${q}의 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

async function SearchResult({ q }: { q: string }) {
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
