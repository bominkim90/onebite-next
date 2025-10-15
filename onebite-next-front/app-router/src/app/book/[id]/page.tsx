import { notFound } from "next/navigation";
import style from "./page.module.css";

// generateStaticParams 함수로 return 한 값 이외의 url 파라미터 경로로 진입 시
// 404 페이지로 보내버림
// export const dynamicParams = false;

// url 파라미터를 가져다 쓰는 이러한 동적 페이지를
// 빌드 단계에서 정적페이지로 미리 만들고 캐싱시키고 싶다면 (풀라우트캐시)
// generateStaticParams 함수를 이용할 수 있다
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound(); // "next/navigation"의 내장함수 이용 => 자동으로 404 페이지로 이동
    }
    return <div>오류가 발생하였습니다.</div>;
  }
  const book = await response.json();

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
