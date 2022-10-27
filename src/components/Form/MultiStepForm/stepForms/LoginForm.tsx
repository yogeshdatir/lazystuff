import React from "react";
import StepFormWrapper from "../StepFormWrapper";

interface Props {}

const LoginForm = (props: Props) => {
  return (
    <StepFormWrapper title="Login">
      <label>Email</label>
      <input type="text" required autoFocus />
      <label>Password</label>
      <input type="password" required />
    </StepFormWrapper>
  );
};

export default LoginForm;
