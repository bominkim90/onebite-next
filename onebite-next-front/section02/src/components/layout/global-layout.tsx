import { ReactNode } from "react";
import Link from "next/link";
import style from "./global-layout.module.css";

interface PropsGlobalLayout {
  children: ReactNode;
}

export default function GlobalLayout({ children }: PropsGlobalLayout) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">📚 ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @bomin</footer>
    </div>
  );
}
