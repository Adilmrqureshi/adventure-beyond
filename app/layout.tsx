"use client";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { primaryExtraBold } from "../utils/fonts";
import "./index.css";

export default function RootLayout({ children }: { children: any }) {
  return (
    <html>
      <head>
        <>Adventure beyond</>
      </head>
      <body className="body">
        <header className="header">
          <div
            className={`w-full h-full center text-4xl ${primaryExtraBold.className}`}
          >
            Adventure beyond
            <div
              className="border rounded-full w-10 h-10 center"
              style={{ position: "absolute", right: 10, cursor: "pointer" }}
              onClick={() => signOut()}
            >
              <FontAwesomeIcon
                className="w-5 h-5"
                color="black"
                size="xs"
                icon={faArrowRightFromBracket}
              />
            </div>
          </div>
        </header>
        <SessionProvider>
          <Auth>
            <div className="inner-layout">{children}</div>
          </Auth>
        </SessionProvider>
      </body>
    </html>
  );
}

const Auth = (props: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin/");
    },
  });

  if (status === "loading") {
    return <div>Loading or not authenticated...</div>;
  }

  return <div>{props.children}</div>;
};
