import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Modal,
  Radio,
} from "semantic-ui-react";

const options = [
  { key: 1, text: "Male", value: "Male" },
  { key: 2, text: "Female", value: "Female" },
  { key: 3, text: "Others", value: "Others" },
];

const EditModal = ({ data, open, setOpen, handleEdit }) => {
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
    id: Joi.number(),
    radioGroup1: Joi.string().allow(""),
    radioGroup2: Joi.string().allow(""),
    radioGroup3: Joi.string().allow(""),
    radioGroup4: Joi.string().allow(""),
    radioGroup5: Joi.string().allow(""),
    radioGroup6: Joi.string().allow(""),
    date: Joi.date(),
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
    defaultValues: data,
    resolver: joiResolver(formSchema),
  });
  const checkbox = watch("checkbox");
  //   console.log(errors);
  const onSubmit = (data) => {
    handleEdit(data.id, data);
    setOpen(false);
  };
  const handleSetValue = (key, value) => {
    setValue(key, value);
    clearErrors(key);
  };

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Edit data</Modal.Header>
        <Modal.Content>
          <Modal.Description>
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
                      checked={value}
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
                      checked={value}
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

              {/* Day picker */}

              <Form.Field>
                <Controller
                  control={control}
                  name="date"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      type="date"
                      value={value}
                      onChange={(e, { value }) => onChange(value)}
                    />
                  )}
                />
              </Form.Field>

              {/* Day picker */}

              <Button
                type="button"
                onClick={() => handleSetValue("firstName", "Shahin")}
              >
                Set First Name
              </Button>
              <br></br>

              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button primary type="submit">
                  Update
                </Button>
              </div>
            </Form>
          </Modal.Description>
        </Modal.Content>
        {/* <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Update"
            labelPosition="right"
            icon="checkmark"
            // onClick={handleUpdate}
            positive
          />
        </Modal.Actions> */}
      </Modal>
    </div>
  );
};

export default EditModal;
