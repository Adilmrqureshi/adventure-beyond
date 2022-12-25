"use client";

import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import Button, { ButtonLink } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { primaryExtraBold, secondary } from "../utils/fonts";
import { supabase } from "../utils/supabase";
import "./index.css";

export default function Page() {
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
    <div className="content center w-full">
      <div className="content-card center flex-col">
        <h1 className={`mb-2 text-2xl ${primaryExtraBold.className}`}>
          Welcome
        </h1>
        <p className={`mb-6 ${secondary.className}`}>Ready for an adventure?</p>
        {/* <ButtonLink href="/menu">Continue</ButtonLink> */}
        <Formik
          initialValues={{ email: "", password: "", confirm: "" }}
          onSubmit={(values) => signUp(values)}
        >
          <Form className="w-full gap-3 flex flex-col p-6 pt-0">
            <TextInput
              label="Email:"
              placeholder="example@email.com"
              name="email"
            />
            <TextInput label="Password:" name="password" type="password" />
            <TextInput label="Confirm:" name="confirm" type="password" />
            <Button style={{ backgroundColor: "black" }} type="submit">
              Sign up
            </Button>
          </Form>
        </Formik>
        <hr className="h-1 w-full" />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => login(values)}
        >
          <Form className="w-full gap-3 flex flex-col p-6">
            <TextInput
              label="Email:"
              placeholder="example@email.com"
              name="email"
            />
            <TextInput label="Password:" name="password" type="password" />
            <Button style={{ backgroundColor: "black" }} type="submit">
              Login
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
