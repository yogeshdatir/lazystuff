import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import { ReactComponent as CheckedIcon } from "../../assets/icons8-done.svg";
import { CheckedIconContainer, Label } from "./Checkbox.styled";

const Checkbox = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <CheckboxInput
        name="custom-checkbox"
        label={"Check me out!"}
        checked={checked}
        onChange={handleChange}
        checkedIcon={<CheckedIcon />}
        circular
      />
    </div>
  );
};

interface ICheckboxInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string | number;
  checkedIcon?: ReactNode;
  circular?: boolean;
}

const CheckboxInput = ({
  label,
  checkedIcon,
  circular,
  ...rest
}: ICheckboxInputProps) => {
  return (
    <Label>
      {checkedIcon && (
        <CheckedIconContainer circular={circular}>
          {rest.checked ? checkedIcon : null}
        </CheckedIconContainer>
      )}
      <input type="checkbox" {...rest} hidden={!!checkedIcon} />
      <span>{label}</span>
    </Label>
  );
};

export default Checkbox;
