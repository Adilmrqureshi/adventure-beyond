import * as React from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Button, { ButtonLink } from "../components/Button";
import { primaryExtraBold, secondary } from "../utils/fonts";

export default function Home() {
  const router = useRouter();
  const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());

  const signOut = async () => {
    console.log("hello");

    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      router.push("/");
    }
  };

  return (
    <div className="text-center">
      <h1 className={`mb-2 text-2xl ${primaryExtraBold.className}`}>Welcome</h1>
      <p className={`mb-6 ${secondary.className}`}>Ready for an adventure?</p>
      <ButtonLink href="/characters">Continue</ButtonLink>
      <hr className="h-1 w-full my-4" />
      <Button variant="secondary" onClick={signOut}>
        Logout
      </Button>
    </div>
  );
}
