import React, { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
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

interface IFormTouched {
  streetAddress: boolean;
  city: boolean;
  postCode: boolean;
  country: boolean;
}

const INITIAL_FORM_TOUCHED = {
  streetAddress: false,
  city: false,
  postCode: false,
  country: false,
};

const InvoiceForm = (props: Props) => {
  const [formData, setFormData] = useState<IFormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<IFormData>(INITIAL_FORM_DATA);
  const [formTouched, setFormTouched] =
    useState<IFormTouched>(INITIAL_FORM_TOUCHED);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const trimmedValue = value.trim();
    setFormData((prevFormData: IFormData) => ({
      ...prevFormData,
      [name]: trimmedValue,
    }));
    if (formTouched[name as keyof IFormTouched]) {
      validateField(name);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (formTouched[name as keyof IFormTouched] !== true) {
      setFormTouched((prevFormTouched: IFormTouched) => ({
        ...prevFormTouched,
        [name]: true,
      }));
    }
    validateField(name);
  };

  const touchAllFields = () => {
    let localFormTouched: IFormTouched = INITIAL_FORM_TOUCHED;
    Object.keys(localFormTouched).forEach(function (key: string) {
      localFormTouched[key as keyof IFormTouched] = true;
    });
    setFormTouched({ ...localFormTouched });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    touchAllFields();
    validate();
    console.log(formData);
  };

  const resetForm = () => {
    setFormTouched(INITIAL_FORM_TOUCHED);
    setFormErrors(INITIAL_FORM_DATA);
    setFormData(INITIAL_FORM_DATA);
  };

  const validateStreetAddress = () => {
    const value = formData.streetAddress;
    if (value === "") {
      setFormErrors((prevFormErrors: IFormData) => ({
        ...prevFormErrors,
        streetAddress: "can't be empty",
      }));
    } else if (value.length < 10) {
      setFormErrors((prevFormErrors: IFormData) => ({
        ...prevFormErrors,
        streetAddress: "Street Address should have more than 10 characters",
      }));
    } else {
      setFormErrors((prevFormErrors: IFormData) => ({
        ...prevFormErrors,
        streetAddress: "",
      }));
    }
  };

  const validateCity = () => {
    const value = formData.city;
    if (value === "") {
      setFormErrors((prevFormErrors: IFormData) => ({
        ...prevFormErrors,
        city: "can't be empty",
      }));
    } else {
      setFormErrors((prevFormErrors: IFormData) => ({
        ...prevFormErrors,
        city: "",
      }));
    }
  };

  const validatePostCode = () => {
    const value = formData.postCode;
    if (value === "") {
      setFormErrors((prevFormErrors: IFormData) => ({
        ...prevFormErrors,
        postCode: "can't be empty",
      }));
    } else if (value.length < 5) {
      setFormErrors((prevFormErrors: IFormData) => ({
        ...prevFormErrors,
        postCode: "Post Code should have more than 5 characters",
      }));
    } else {
      setFormErrors((prevFormErrors: IFormData) => ({
        ...prevFormErrors,
        postCode: "",
      }));
    }
  };

  const validateCountry = () => {
    const value = formData.country;
    if (value === "") {
      setFormErrors((prevFormErrors: IFormData) => ({
        ...prevFormErrors,
        country: "can't be empty",
      }));
    } else {
      setFormErrors((prevFormErrors: IFormData) => ({
        ...prevFormErrors,
        country: "",
      }));
    }
  };

  const validateField = (field: string) => {
    switch (field) {
      case "streetAddress":
        validateStreetAddress();
        break;
      case "city":
        validateCity();
        break;
      case "postCode":
        validatePostCode();
        break;
      case "country":
        validateCountry();
        break;

      default:
        break;
    }
  };

  const validate = () => {
    validateStreetAddress();
    validateCity();
    validatePostCode();
    validateCountry();
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
        <input
          type="text"
          value={formData.streetAddress}
          name="streetAddress"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {formErrors.streetAddress && (
          <ErrorText>{formErrors.streetAddress}</ErrorText>
        )}
      </FormControl>
      <div style={{ display: "flex", gap: "1rem" }}>
        <FormControl>
          <Label>City</Label>
          <input
            type="text"
            value={formData.city}
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {formErrors.city && <ErrorText>{formErrors.city}</ErrorText>}
        </FormControl>
        <FormControl>
          <Label>Post Code</Label>
          <input
            type="text"
            value={formData.postCode}
            name="postCode"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {formErrors.postCode && <ErrorText>{formErrors.postCode}</ErrorText>}
        </FormControl>
        <FormControl>
          <Label>Country</Label>
          <input
            type="text"
            value={formData.country}
            name="country"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {formErrors.country && <ErrorText>{formErrors.country}</ErrorText>}
        </FormControl>
      </div>
      <div style={{ display: "flex" }}>
        <button type="button" onClick={resetForm}>
          Discard
        </button>
        <button style={{ marginLeft: "auto" }}>Save and Send</button>
      </div>
    </form>
  );
};

export default InvoiceForm;
