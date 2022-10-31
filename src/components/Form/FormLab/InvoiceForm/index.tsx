import React, { ChangeEvent, FormEvent, useState } from "react";
import { ErrorText, FormControl, Label } from "./InvoiceForm.styled";

interface Props {}

interface IFormData {
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
}

const INITIAL_FORM_DATA = {
  streetAddress: "",
  city: "",
  postCode: "",
  country: "",
};

const InvoiceForm = (props: Props) => {
  const [formData, setFormData] = useState<IFormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<IFormData>(INITIAL_FORM_DATA);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const trimmedValue = value.trim();
    setFormData((prevFormData: IFormData) => ({
      ...prevFormData,
      [name]: trimmedValue,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validate();
    console.log(formData);
  };

  const validate = () => {
    let errors = {};
    Object.keys(formData).forEach((field: string) => {
      // if (formData[field as keyof IFormData] === "") {
      //   errors = {
      //     ...errors,
      //     [field]: "can't be empty",
      //   };
      // }
      switch (field) {
        case "streetAddress": {
          const value = formData[field];
          if (value === "") {
            errors = {
              ...errors,
              [field]: "can't be empty",
            };
          } else if (value.length < 10) {
            errors = {
              ...errors,
              [field]: "Street Address should have more than 10 characters",
            };
          } else {
            errors = {
              ...errors,
              [field]: "",
            };
          }
          break;
        }
        case "city": {
          const value = formData[field];
          if (value === "") {
            errors = {
              ...errors,
              [field]: "can't be empty",
            };
          } else {
            errors = {
              ...errors,
              [field]: "",
            };
          }
          break;
        }
        case "postCode": {
          const value = formData[field];
          if (value === "") {
            errors = {
              ...errors,
              [field]: "can't be empty",
            };
          } else if (value.length < 5) {
            errors = {
              ...errors,
              [field]: "Post Code should have more than 5 characters",
            };
          } else {
            errors = {
              ...errors,
              [field]: "",
            };
          }
          break;
        }
        case "country": {
          const value = formData[field];
          if (value === "") {
            errors = {
              ...errors,
              [field]: "can't be empty",
            };
          } else {
            errors = {
              ...errors,
              [field]: "",
            };
          }
          break;
        }
      }
    });

    if (Object.keys(errors)) {
      setFormErrors((prevFormErrors: IFormData) => {
        return {
          ...prevFormErrors,
          ...errors,
        };
      });
    }
  };

  return (
    <form
      style={{ maxWidth: "max-content" }}
      onSubmit={handleSubmit}
      noValidate
    >
      <h1>New Invoice</h1>
      <h3>Bill From</h3>
      <FormControl>
        <Label>Street Address</Label>
        <input type="text" name="streetAddress" onChange={handleChange} />
        {formErrors.streetAddress && (
          <ErrorText>{formErrors.streetAddress}</ErrorText>
        )}
      </FormControl>
      <div style={{ display: "flex", gap: "1rem" }}>
        <FormControl>
          <Label>City</Label>
          <input type="text" name="city" onChange={handleChange} />
          {formErrors.city && <ErrorText>{formErrors.city}</ErrorText>}
        </FormControl>
        <FormControl>
          <Label>Post Code</Label>
          <input type="text" name="postCode" onChange={handleChange} />
          {formErrors.postCode && <ErrorText>{formErrors.postCode}</ErrorText>}
        </FormControl>
        <FormControl>
          <Label>Country</Label>
          <input type="text" name="country" onChange={handleChange} />
          {formErrors.country && <ErrorText>{formErrors.country}</ErrorText>}
        </FormControl>
      </div>
      <div style={{ display: "flex" }}>
        <button type="button">Discard</button>
        <button style={{ marginLeft: "auto" }}>Save and Send</button>
      </div>
    </form>
  );
};

export default InvoiceForm;
