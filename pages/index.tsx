import Head from "next/head";
import { signOut, getSession } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <Head>
        <title>Trang chủ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-4xl text-green-500">Film Movie</h1>
        <p className="text-2xl text-gray-500">
          Chào mừng {user?.name} đến với trang web của chúng tôi.
        </p>
        <button className="h-10 w-full bg-white" onClick={() => signOut()}>
          Đăng xuất
        </button>
      </main>
    </>
  );
}
