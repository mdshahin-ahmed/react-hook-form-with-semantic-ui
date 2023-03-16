import "./App.css";
import { Controller, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Dropdown,
  Radio,
  Grid,
  Container,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import CardStyle from "./components/CardStyle";

const options = [
  { key: 1, text: "Male", value: "Male" },
  { key: 2, text: "Female", value: "Female" },
  { key: 3, text: "Others", value: "Others" },
];

const fetchLocalStorageData = () => {
  const formData = localStorage.getItem("formData");
  if (formData) {
    return JSON.parse(localStorage.getItem("formData") || "");
  } else {
    return [];
  }
};

function App() {
  const [datas, setDatas] = useState(fetchLocalStorageData());
  // console.log(datas);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(datas));
  }, [datas]);

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
      .when("checkbox", {
        is: true,
        then: Joi.required(),
        otherwise: Joi.allow(""),
      })
      // .allow("")
      // .messages({
      //   "string.empty": "Last name can not be empty",
      // })
      .min(5)
      .max(15),
    checkbox: Joi.boolean(),
    radio: Joi.boolean(),
    gender: Joi.string().required(),
    // radioGroup: Joi.string().allow(""),
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
      radio: false,
      gender: "",
      // radioGroup: "",
    },
    resolver: joiResolver(formSchema),
  });
  // console.log(errors);
  const checkbox = watch("checkbox");

  const onSubmit = (data) => {
    setDatas([...datas, { ...data, id: datas.length }]);
    // console.log(data);
  };

  const handleSetValue = (key, value) => {
    setValue(key, value);
    clearErrors(key);
  };

  const handleDelete = (id) => {
    const deletedData = datas.filter((data) => data.id !== id);
    setDatas(deletedData);
  };

  const handleEdit = (id, editData) => {
    const oldData = datas.filter((data) => data.id !== id);
    console.log(oldData);
    // const newData = { ...oldData, editData };
    setDatas([...oldData, editData]);
    // console.log(id);
    // console.log(editData);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Welcome</h1>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
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
                {errors.firstName && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    {errors.firstName.message}
                  </p>
                )}
              </>
            )}
          />
        </Form.Field>
        <Form.Field>
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
                {errors.lastName && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    {errors.lastName.message}
                  </p>
                )}
              </>
            )}
          />
        </Form.Field>
        <Form.Field>
          <Controller
            control={control}
            name="checkbox"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                label="Checkbox For Last Name"
                value={value}
                onChange={(e, { value }) => {
                  onChange(!value);
                }}
              />
            )}
          />
        </Form.Field>
        <Form.Field>
          <Controller
            control={control}
            name="gender"
            render={({ field: { value, onChange } }) => (
              <div>
                <Dropdown
                  fluid
                  search
                  selection
                  value={value}
                  onChange={(e, { value }) => {
                    onChange(value);
                  }}
                  options={options}
                />
                {errors.gender && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    {errors.gender.message}
                  </p>
                )}
              </div>
            )}
          />
        </Form.Field>
        <Form.Field>
          <Controller
            control={control}
            name="radio"
            render={({ field: { value, onChange } }) => (
              <Radio
                toggle
                value={value}
                onChange={(e, { value }) => onChange(!value)}
              />
            )}
          />
        </Form.Field>
        {/* <Form.Group>
          <Form.Field>
            <Controller
              control={control}
              name="radioGroup"
              render={({ field: { value, onChange } }) => (
                <Radio
                  label="One"
                  value="one"
                  onChange={(e, { value }) => onChange(value)}
                />
              )}
            />
          </Form.Field>
          <Form.Field>
            <Controller
              control={control}
              name="radioGroup"
              render={({ field: { value, onChange } }) => (
                <Radio
                  label="Tow"
                  value="two"
                  onChange={(e, { value }) => onChange(value)}
                />
              )}
            />
          </Form.Field>
          <Form.Field>
            <Controller
              control={control}
              name="radioGroup"
              render={({ field: { value, onChange } }) => (
                <Radio
                  label="Three"
                  value="three"
                  onChange={(e, { value }) => onChange(value)}
                />
              )}
            />
          </Form.Field>
          <Form.Field>
            <Controller
              control={control}
              name="radioGroup"
              render={({ field: { value, onChange } }) => (
                <Radio
                  label="Four"
                  value="four"
                  onChange={(e, { value }) => onChange(value)}
                />
              )}
            />
          </Form.Field>
        </Form.Group> */}
        <Button
          type="button"
          onClick={() => handleSetValue("firstName", "Shahin")}
        >
          Set First Name
        </Button>
        <br></br>
        {/* <Button
          type="button"
          onClick={() => handleSetValue("lastName", "Ahmed")}
        >
          Set Last Name
        </Button> */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Button primary type="submit">
            Submit
          </Button>
        </div>
      </Form>

      {/* render data  */}

      <Container style={{ marginTop: "50px" }}>
        <Grid>
          <Grid.Row>
            {datas
              .sort((a, b) => a.id - b.id)
              .map((data, index) => (
                <CardStyle
                  key={index}
                  data={data}
                  index={index}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
