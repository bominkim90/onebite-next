import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";

export default function RootLayout({
  children,
  footer,
  modal,
}: Readonly<{
  children: React.ReactNode;
  footer: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* 배경(기존 페이지) */}
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <footer>{footer}</footer>
        </div>

        {/* 겹쳐 그릴 자리 */}
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
