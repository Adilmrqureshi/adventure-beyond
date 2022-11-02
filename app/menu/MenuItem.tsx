import Link from "next/link";
import React from "react";
import { primaryExtraBold } from "../../utils/fonts";

function MenuItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <div className="card">
      <Link
        className={`w-full center ${primaryExtraBold.className} text-xl`}
        href={href}
      >
        {children}
      </Link>
    </div>
  );
}

export default MenuItem;
