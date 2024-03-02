import { ChangeEventHandler } from "react";
import { CheckBox, Slider, ToggleLabel } from "./Toggle.styled";
// Tutorial: https://www.youtube.com/watch?v=1W3mAtAT7os
interface IProps {
  onChange?: ChangeEventHandler;
  label?: string;
}

const Toggle = ({ onChange, label }: IProps) => {
  return (
    <ToggleLabel>
      {label}
      <CheckBox type="checkbox" onChange={onChange} defaultChecked />
      <Slider />
    </ToggleLabel>
  );
};

export default Toggle;
