"use client";

import { createPortal } from "react-dom";
import style from "./modal.module.css";
import { ReactNode, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  /* React의 createPortal은 
    **“컴포넌트를 현재 부모 트리 밖의 DOM 노드에 렌더”**하는 기능이에요.
    쉽게 말하면: “리액트 트리상으로는 자식인데, 실제 DOM 구조에서는 다른 곳(예: body 끝)에 렌더해줘.”
  */
  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={() => router.back()}
      onClick={(e) => {
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className={style.modal}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
