import { Form, Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { Bio, Class, Role } from "@prisma/client";
import { TextInput } from "./TextInput";
import { BulletedTextInput } from "./BulletedTextInput";
import Button from "./Button";

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
            <BulletedTextInput
              disabled={props.disabled}
              name="role"
              marginTop={4}
              label="I'm the party's:"
              number={1}
            />
            <BulletedTextInput
              disabled={props.disabled}
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
              number={5}
            />
            <BulletedTextInput
              disabled={props.disabled}
              name="flaw"
              marginTop={4}
              label="However my flaw is:"
              number={6}
            />
            <BulletedTextInput
              disabled={props.disabled}
              name="dream"
              marginTop={4}
              label="My dream is:"
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
