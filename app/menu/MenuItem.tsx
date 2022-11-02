import Link from "next/link";
import React from "react";

import "./menu.css";

function MenuItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <div className="card">
      <Link className="w-full center" href={href}>
        {children}
      </Link>
    </div>
  );
}

export default MenuItem;
