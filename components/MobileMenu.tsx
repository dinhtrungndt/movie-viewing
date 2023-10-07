import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">
          Trang chủ
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Thể loại
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Phim ngắn
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Phim mới & phổ biến
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Danh sách của tôi
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Theo ngôn ngữ
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
