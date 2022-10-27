import React from "react";
import StepFormWrapper from "../StepFormWrapper";

interface Props {}

const AddressForm = (props: Props) => {
  return (
    <StepFormWrapper title="Address">
      <label>Street</label>
      <input type="text" required autoFocus />
      <label>City</label>
      <input type="text" required />
      <label>State</label>
      <input type="text" required />
      <label>Pin Code</label>
      <input type="number" required />
    </StepFormWrapper>
  );
};

export default AddressForm;
