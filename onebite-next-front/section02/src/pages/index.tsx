// App.tsx 컴포넌트가 아니라면, 이렇게 css파일을 그대로 불러오는걸 Next.js에서는 막고 있다.
// import "./index.css";
// 대채 방안 => CSS Module
import style from "./index.module.css";

export default function Home() {
  // className들을 객체 형태로 담아줌
  console.log(style);

  return (
    <>
      <h1 className={style.h1}>인덱스</h1>

      <h2 className={style.h2}>부제목</h2>
    </>
  );
}
