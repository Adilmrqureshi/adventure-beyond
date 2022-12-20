import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ButtonLink } from "../components/Button";
import { primaryExtraBold, secondary } from "../utils/fonts";
import { supabase } from "../utils/supabase";

export default function Home() {
  const toast = useToast();
  const router = useRouter();

  async function login(values: any) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (!error) {
      router.push("/menu");
    } else {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
    }
  }

  async function signUp(values: any) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (!error) {
      router.push("/confirm");
    } else {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
    }
  }
  return (
    <div className="text-center">
      <h1 className={`mb-2 text-2xl ${primaryExtraBold.className}`}>Welcome</h1>
      <p className={`mb-6 ${secondary.className}`}>Ready for an adventure?</p>
      <ButtonLink href="/menu">Continue</ButtonLink>
    </div>
  );
}
