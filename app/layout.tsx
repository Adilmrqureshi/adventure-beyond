"use client";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { primaryExtraBold } from "../utils/fonts";
import "./index.css";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";

export default function RootLayout(props: { children: any }) {
  const router = useRouter();

  const signOut = async () => {
    console.log("hello");

    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/");
    }
  };

  return (
    <html>
      <head>
        <>Adventure beyond</>
      </head>
      <body className="background">
        <header className="header">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
            className={`w-full h-full center text-4xl ${primaryExtraBold.className}`}
          >
            Adventure beyond
            <div
              className="border rounded-full w-10 h-10 center"
              style={{ position: "absolute", right: 10, cursor: "pointer" }}
              onClick={signOut}
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
        <div className="inner-layout">
          <ChakraProvider>{props.children}</ChakraProvider>
        </div>
      </body>
    </html>
  );
}
