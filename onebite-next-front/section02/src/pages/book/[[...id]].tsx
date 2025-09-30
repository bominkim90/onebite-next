import { useRouter } from "next/router";

// optional catch All segment = '/' 뒤에 어떠한 값이 오든 안오는 모두 대응
export default function Page() {
  const router = useRouter();
  console.log(router);

  const { id } = router.query;

  return <div>Book - {id} </div>;
}
