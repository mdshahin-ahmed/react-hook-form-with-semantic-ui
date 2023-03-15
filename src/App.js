import { Controller, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form, Input, Button, Checkbox } from "semantic-ui-react";

function App() {
  const formSchema = Joi.object({
    firstName: Joi.string()
      .required()
      // .label("firstName")
      .messages({
        "string.empty": "First name can not be empty.",
      })
      .min(3)
      .max(10),
    lastName: Joi.string()
      .allow("")
      .messages({
        "string.empty": "Last name can not be empty",
      })
      .min(5)
      .max(15),
    checkbox: Joi.boolean(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm({
    mode: "onSubmit",
    shouldFocusError: true,
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      checkbox: false,
    },
    resolver: joiResolver(formSchema),
  });
  // console.log(errors);
  const checkbox = watch("checkbox");

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleSetValue = (key, value) => {
    setValue(key, value);
    clearErrors(key);
  };

  return (
    <div className="App">
      <h1>Welcome</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { value, onChange } }) => (
            <>
              <Input
                label="Enter Your Name"
                placeholder="Enter First Name"
                value={value}
                onChange={(e, { value }) => {
                  onChange(value);
                }}
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </>
          )}
        />
        <br></br>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { value, onChange } }) => (
            <>
              <Input
                label="Enter Your Name"
                placeholder="Enter Last Name"
                value={checkbox ? value : ""}
                disabled={!checkbox}
                onChange={(e, { value }) => {
                  onChange(value);
                }}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </>
          )}
        />
        <br></br>
        <br></br>
        <Controller
          control={control}
          name="checkbox"
          render={({ field: { value, onChange } }) => (
            <Checkbox
              value={value}
              onChange={(e, { value }) => {
                onChange(!value);
              }}
            />
          )}
        />
        <br></br>
        <Button
          type="button"
          onClick={() => handleSetValue("firstName", "Shahin")}
        >
          Set First Name
        </Button>
        {/* <Button
          type="button"
          onClick={() => handleSetValue("lastName", "Ahmed")}
        >
          Set Last Name
        </Button> */}
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
