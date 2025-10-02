import type { BookData } from "@/types";

export default async function fetchBookById(
  bookId: number
): Promise<BookData | null> {
  const url = `https://onebite-books-server-main-gules-three.vercel.app/book/${bookId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
