import React from "react";
import type { AppProps } from "next/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { primaryExtraBold } from "../utils/fonts";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import "../styles/form.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());

  // const signOut = async () => {
  //   console.log("hello");

  //   const { error } = await supabaseClient.auth.signOut();
  //   if (!error) {
  //     router.push("/");
  //   }
  // };
  return (
    <>
      <header className="header">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
          className={`w-full h-full center text-4xl ${primaryExtraBold.className}`}
        >
          Adventure beyond
          {/* <div
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
          </div> */}
        </div>
      </header>
      <div className="inner-layout">
        <div className="content center w-full mt-4">
          <div className="content-card center">
            <SessionContextProvider
              supabaseClient={supabaseClient}
              initialSession={pageProps.initialSession}
            >
              <ChakraProvider>
                <AuthWrapper>
                  <Component {...pageProps} />
                </AuthWrapper>
              </ChakraProvider>
            </SessionContextProvider>
          </div>
        </div>
      </div>
    </>
  );
}

const AuthWrapper = (props: { children: any }) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  if (!user)
    return (
      <Auth
        redirectTo={process.env.VERCEL_URL}
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        socialLayout="horizontal"
      />
    );
  return props.children;
};
