import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

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

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Bạn chọn tài khoản nào ?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push("/")}>
            <div className="group flex-row w-44 mx-auto">
              <div
                className="
                    w-44
                    h-44
                    rounded-md
                    flex
                    items-center
                    justify-center
                    boder-2
                    border-transparent
                    group-hover:cursor-pointer
                    group-hover:border-red-400
                    overflow-hidden
                    "
              >
                <img
                  src="/images/account_320px.png"
                  alt="Profile"
                  className="bg-green-400"
                />
              </div>

              <div
                className="
                mt-4
                text-gray-400
                text-2xl
                text-center
                group-hover:text-white
              "
              >
                {user?.currentUser?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
