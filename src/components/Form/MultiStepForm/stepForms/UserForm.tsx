import React from "react";
import StepFormWrapper from "../StepFormWrapper";

interface Props {}

const UserForm = (props: Props) => {
  return (
    <StepFormWrapper title="User Form">
      <label>First Name</label>
      <input type="text" required autoFocus />
      <label>Last Name</label>
      <input type="text" required />
      <label>Age</label>
      <input type="number" min={1} required />
    </StepFormWrapper>
  );
};

export default UserForm;
