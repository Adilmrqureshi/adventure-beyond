import { Button } from "@chakra-ui/react";
import { ButtonLink } from "../components/Button";
import { primaryExtraBold, secondary } from "../utils/fonts";
import "./index.css";
export default function Page() {
  return (
    <div className="content center w-full mt-4">
      <div className="content-card center flex-col">
        <h1 className={`mb-2 text-2xl ${primaryExtraBold.className}`}>
          Welcome
        </h1>
        <p className={`mb-6 ${secondary.className}`}>Ready for an adventure?</p>
        <ButtonLink href="/menu">Continue</ButtonLink>
      </div>
    </div>
  );
}
