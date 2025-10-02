import { ReactNode, useEffect, useState } from "react";
import SearchLayout from "@/components/layout/searchable-layout";
import BookItem from "@/components/common/book-item";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";

// Next 컴포넌트에서 getServerSideProps 또는 getStaticProps 어느것도 export 하지 않으면
// 기본값으로 (Static) prerendered as static content 로 SSG와 같이 빌드단계에서 한 번만 HTML을 생성한다.
// 다만 아래와 같이, 계속 변동되는 브라우저 입력값인 쿼리스트링으로 서버에 데이터를 가져와야 할때는
// React 방식과 동일하게 하면 된다.
// 이렇게 되면 이 컴포넌트에서 사전 렌더링 하는건 데이터가 엮이지 않는 <div>정도일 것이고
// 나중에 쿼리스트링이 입력되면 books를 렌더링 하게 될 것이다.
export default function Search() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  useEffect(() => {
    if (q) {
      (async () => {
        setBooks(await fetchBooks(q as string));
      })();
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
