import Link from "next/link";
import React from "react";
import { primaryBold, primaryRegular } from "../../utils/fonts";

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
        className={`w-full center ${primaryRegular.className} text-xl`}
        href={href}
      >
        {children}
      </Link>
    </div>
  );
}

export default MenuItem;
