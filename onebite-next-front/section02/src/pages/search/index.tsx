import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  const { q } = router.query;

  return (
    <>
      <h1>Search</h1>

      <p>쿼리스트링 : {q}</p>
    </>
  );
}
