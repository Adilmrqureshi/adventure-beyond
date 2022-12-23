import { Form, Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import { Role } from "@prisma/client";
import { TextInput } from "./TextInput";
import { BulletedTextInput } from "./BulletedTextInput";
import Button from "./Button";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { BulletedSelectInput } from "./BulletedSelectInput";

export type Values = {
  name: string;
  age: number;
  height: string;
  role: Role | "";
  appearance: string;
  clothing: string;
  gait: string;
  location: string;
  nation: string;
  ideal: string;
  flaw: string;
  dream: string;
};

const REQUIRED_MESSAGE = "This field is required";

let schema = yup.object().shape({
  name: yup.string().required(REQUIRED_MESSAGE),
  age: yup.number().required(REQUIRED_MESSAGE).positive().integer(),
  height: yup.string().required(REQUIRED_MESSAGE),
  role: yup.string().required(REQUIRED_MESSAGE).oneOf(Object.values(Role)),
  appearance: yup.string().required(REQUIRED_MESSAGE),
  clothing: yup.string().required(REQUIRED_MESSAGE),
  gait: yup.string().required(REQUIRED_MESSAGE),
  location: yup.string().required(REQUIRED_MESSAGE),
  nation: yup.string().required(REQUIRED_MESSAGE),
  ideal: yup.string().required(REQUIRED_MESSAGE),
  flaw: yup.string().required(REQUIRED_MESSAGE),
  dream: yup.string().required(REQUIRED_MESSAGE),
});

const RoleAccordion = () => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            Fighter
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          The Fighter takes charge to meet challenges up close. They are weapon
          masters and martial artists, relying on their physical might to
          overcome foes.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            Invoker
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          The Invoker is a battle mage, relying on the force of their ideals.
          They conjure protective wards, invigorate allies in a pinch, and smite
          enemies with radianc
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            Ranger
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          The Ranger is an outlander, hunter, and skilled navigator, thriving on
          the fringes of civilization. They keep faithful pets and have a
          special bond with beasts.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            Naturalist
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          The Naturalist channels their connection with nature to manipulate the
          elements, commune with animals, and even transform themselves into
          wild beasts.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            Doctor
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          The Doctor is a magic scientist who tinkers with the forces of life
          and death. They reverse (or advance) the effects of damage, disease,
          and decay.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            Spy
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          The Spy is a crafty agent of stealth and subterfuge. They are master
          assassins and experts in the use of magical gadgets, chemicals, traps,
          disguises, and forgeries.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            Magician
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          The Magician specializes in conjuration and psychic manipulation. From
          parlor tricks to elaborate deceptions, they are master illusionists,
          capable of twisting the mind.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            Wizard
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          The Wizard is a powerful spellcaster with a diverse set of magical
          abilities. At the height of their power, they can travel to other
          worlds and transcend their mortal selves.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const CustomToolTip = (props: { title: string; label: React.ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoOutlineIcon />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{props.title}</PopoverHeader>
        <PopoverBody>{props.label}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const CharacterSheet = (props: {
  initialValues: Values;
  onSubmit: (values: Values) => void;
  disabled?: boolean;
}) => {
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={props.initialValues}
        validationSchema={schema}
        onSubmit={props.onSubmit}
      >
        {(formik) => (
          <Form>
            <TextInput
              disabled={props.disabled}
              name="name"
              label="My name is:"
            />
            <TextInput
              disabled={props.disabled}
              name="age"
              marginTop={4}
              label="My age is:"
            />
            <TextInput
              disabled={props.disabled}
              name="height"
              marginTop={4}
              label="My height is:"
            />
            <BulletedSelectInput
              disabled={props.disabled}
              name="role"
              marginTop={4}
              label="I'm the party's:"
              help={
                <CustomToolTip
                  title="Role"
                  label={
                    <div>
                      <p className="mb-4">
                        Your role gives you a unique set of abilities and is a
                        big part of your character’s identity. Choose wisely.{" "}
                      </p>{" "}
                      <RoleAccordion />
                    </div>
                  }
                />
              }
              number={1}
            />
            <BulletedTextInput
              disabled={props.disabled}
              help={
                <CustomToolTip
                  title="Appearance: face, body and vibes"
                  label="E.g. scales,
                worn scars, rack of muscles,
                sharp teeth, large pointy ears, sleepy mood, sparkling gaze"
                />
              }
              name="appearance"
              marginTop={4}
              label="When people see me they first notice my:"
              number={2}
            />
            <BulletedTextInput
              disabled={props.disabled}
              name="clothing"
              marginTop={4}
              label="I wear:"
              help={
                <CustomToolTip
                  title="Clothing"
                  label="E.g. a patterned hijab, fingerless gloves, a fancy hat, a charmed necklace"
                />
              }
              number={3}
            />
            <TextInput
              disabled={props.disabled}
              name="gait"
              marginTop={4}
              label="and I move with:"
            />
            <BulletedTextInput
              disabled={props.disabled}
              name="location"
              marginTop={4}
              label="I'm from:"
              help={
                <CustomToolTip
                  title="Place of origin"
                  label="E.g. a great metropolis, a remote village,
                a frontier town,
                a lonely island,
                a capital city"
                />
              }
              number={4}
            />
            <TextInput
              disabled={props.disabled}
              name="nation"
              marginTop={4}
              label="where my people are known for:"
            />
            <BulletedTextInput
              disabled={props.disabled}
              name="ideal"
              marginTop={4}
              label="My ideal is:"
              help={
                <CustomToolTip
                  title="Ideal: guides your actions"
                  label="E.g. order, justice,
                  power,
                  honor,
                  pleasure,
                  capitalism,
                  generosity"
                />
              }
              number={5}
            />
            <BulletedTextInput
              disabled={props.disabled}
              name="flaw"
              marginTop={4}
              label="However my flaw is:"
              help={
                <CustomToolTip
                  title="Flaw"
                  label="E.g. fearful, megalomaniac,
                  reckless,
                  vain,
                  thief,
                  greed,
                  foolish"
                />
              }
              number={6}
            />
            <BulletedTextInput
              disabled={props.disabled}
              name="dream"
              marginTop={4}
              label="My dream is:"
              help={
                <CustomToolTip
                  title="A big dream"
                  label="E.g. returning to my home town as a renowned hero, becoming tremendously wealthy,
                  becoming the chairman of my local masjid"
                />
              }
              number={7}
            />
            {!props.disabled && (
              <div className="w-full flex" style={{ marginTop: "2rem" }}>
                <Button
                  variant="primary"
                  style={{ marginRight: "1rem", backgroundColor: "black" }}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    formik.resetForm();
                    router.back();
                  }}
                  style={{ marginLeft: "1rem" }}
                  type="button"
                >
                  Cancel
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
