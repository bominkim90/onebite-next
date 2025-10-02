import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchBookById from "@/lib/fetch-book-by-id";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    // 정적 사전 렌더링에서 -> 동적 라우팅(params)을 갖는 페이지 HTML 을 만들때는
    // 미리 getStaticPaths안에 params를 입력해두어야 한다.
    // 등록되지 않은 경로로 들어올때 fallback 옵션으로 다양하게 대체 할 수 있다.
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true, // true(SSR + 데이터 없는 fallback상태 페이지 먼저), false(404 페이지), "blocking"(SSR 방식)
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const bookId = context.params!.id;
  const book = await fetchBookById(Number(bookId));

  if (!book) {
    return {
      notFound: true, // data가 없을 시 404 페이지로 이동시키고 싶다면
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요"
          />
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  }
  if (!book) return "데이터가 존재하지 않습니다";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
