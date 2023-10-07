import { signOut } from "next-auth/react";
import React from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            src="/images/account_320px.png"
            alt="Profile"
            className="bg-green-400 w-8 h-8"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {currentUser?.currentUser?.name}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={() => signOut()}
        className="px-3 text-center text-white text-sm hover:underline"
      >
        Đăng xuất
      </div>
    </div>
  );
};

export default AccountMenu;
