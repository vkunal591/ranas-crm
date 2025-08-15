"use client";

import Link from "next/link";

const Wrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-infobg pt-[70px] ml-[17%]">
      <div className="p-4 pt-2 min-h-screen">{children}</div>
      <p className="flex text-sm p-5 gap-1 text-gray-500 bg-whiteBg justify-center items-center">
        {/* Copywrite © {new Date().getFullYear()}
        <strong className="text-gray-800"> Silk India</strong>. */}
        © 2025 | Powered by SilkIndia | Developed by
        <strong className="underline text-gray-800">
          <Link href={"https://vxtry.com/"} target="_blank">
            {"VXTRY"}
          </Link>
        </strong>
        Industry
        {/* . All Rights Reserved */}
      </p>
    </div>
  );
};

export default Wrapper;
