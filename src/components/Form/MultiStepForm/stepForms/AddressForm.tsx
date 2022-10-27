import React from "react";
import StepFormWrapper from "../StepFormWrapper";

interface IAddressData {
  street: string;
  city: string;
  state: string;
  pinCode: string;
}

interface Props {
  formData: IAddressData;
  updateFormData: (formFields: Partial<IAddressData>) => void;
}

const AddressForm = ({ formData, updateFormData }: Props) => {
  return (
    <StepFormWrapper title="Address">
      <label>Street</label>
      <input
        type="text"
        required
        autoFocus
        value={formData.street}
        onChange={(e) => updateFormData({ street: e.target.value })}
      />
      <label>City</label>
      <input
        type="text"
        required
        value={formData.city}
        onChange={(e) => updateFormData({ city: e.target.value })}
      />
      <label>State</label>
      <input
        type="text"
        required
        value={formData.state}
        onChange={(e) => updateFormData({ state: e.target.value })}
      />
      <label>Pin Code</label>
      <input
        type="text"
        required
        value={formData.pinCode}
        onChange={(e) => updateFormData({ pinCode: e.target.value })}
      />
    </StepFormWrapper>
  );
};

export default AddressForm;
