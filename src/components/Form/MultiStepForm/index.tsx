import React, { FormEvent } from "react";
import useMultiStepForm from "./hooks/useMultiStepForm";
import AddressForm from "./stepForms/AddressForm";
import UserForm from "./stepForms/UserForm";
import LoginForm from "./stepForms/LoginForm";

interface Props {}

const MultiStepForm = (props: Props) => {
  const {
    currentStepIndex,
    step,
    steps,
    back,
    next,
    goTo,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm([<UserForm />, <AddressForm />, <LoginForm />]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: "0.5rem",
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
