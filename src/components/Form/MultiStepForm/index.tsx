import React, { FormEvent, useState } from "react";
import useMultiStepForm from "./hooks/useMultiStepForm";
import AddressForm from "./stepForms/AddressForm";
import UserForm from "./stepForms/UserForm";
import LoginForm from "./stepForms/LoginForm";

interface Props {}

interface IFormData {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  email: string;
  password: string;
}

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  pinCode: "",
  email: "",
  password: "",
};

const MultiStepForm = (props: Props) => {
  const [multiStepFormData, setMultiStepFormData] =
    useState<IFormData>(INITIAL_DATA);

  const updateMultiStepFormData = (formFields: Partial<IFormData>) => {
    setMultiStepFormData((prevFormData: IFormData) => ({
      ...prevFormData,
      ...formFields,
    }));
  };

  const { currentStepIndex, step, steps, back, next, isFirstStep, isLastStep } =
    useMultiStepForm([
      <UserForm
        formData={multiStepFormData}
        updateFormData={updateMultiStepFormData}
      />,
      <AddressForm
        formData={multiStepFormData}
        updateFormData={updateMultiStepFormData}
      />,
      <LoginForm
        formData={multiStepFormData}
        updateFormData={updateMultiStepFormData}
      />,
    ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();
    alert(`FormData: ${JSON.stringify(multiStepFormData)}`);
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: "0.5rem",
        maxWidth: "max-content",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
          }}
        >
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
