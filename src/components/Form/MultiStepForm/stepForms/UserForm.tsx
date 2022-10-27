import React from "react";
import StepFormWrapper from "../StepFormWrapper";

interface IUserData {
  firstName: string;
  lastName: string;
  age: string;
}

interface Props {
  formData: IUserData;
  updateFormData: (formFields: Partial<IUserData>) => void;
}

const UserForm = ({ formData, updateFormData }: Props) => {
  return (
    <StepFormWrapper title="User Form">
      <label>First Name</label>
      <input
        type="text"
        required
        autoFocus
        value={formData.firstName}
        onChange={(e) => updateFormData({ firstName: e.target.value })}
      />
      <label>Last Name</label>
      <input
        type="text"
        required
        value={formData.lastName}
        onChange={(e) => updateFormData({ lastName: e.target.value })}
      />
      <label>Age</label>
      <input
        type="text"
        required
        value={formData.age}
        onChange={(e) => updateFormData({ age: e.target.value })}
      />
    </StepFormWrapper>
  );
};

export default UserForm;
