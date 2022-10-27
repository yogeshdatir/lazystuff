import React from "react";
import StepFormWrapper from "../StepFormWrapper";

interface ILoginData {
  email: string;
  password: string;
}

interface Props {
  formData: ILoginData;
  updateFormData: (formFields: Partial<ILoginData>) => void;
}

const LoginForm = ({ formData, updateFormData }: Props) => {
  return (
    <StepFormWrapper title="Login">
      <label>Email</label>
      <input
        type="text"
        required
        autoFocus
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
      />
      <label>Password</label>
      <input
        type="password"
        required
        value={formData.password}
        onChange={(e) => updateFormData({ password: e.target.value })}
      />
    </StepFormWrapper>
  );
};

export default LoginForm;
