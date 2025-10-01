import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import fetchBookById from "@/lib/fetch-book-by-id";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const bookId = context.params!.id; // params는 무조건 있을거다 단언
  const book = await fetchBookById(Number(bookId));
  return {
    props: {
      book,
    },
  };
};

// optional catch All segment = '/' 뒤에 어떠한 값이 오든 안오는 모두 대응
export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) return "데이터가 존재하지 않습니다";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
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
  );
}
