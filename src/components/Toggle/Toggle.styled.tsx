import styled from "@emotion/styled";

export const ToggleLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  text-align: right;

  color: grey;

  width: max-content;

  @media (max-width: 540px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #848bab;
  }
`;

export const CheckBox = styled.input`
  position: absolute;
  left: -9999px;
  top: -9999px;

  :checked + span {
    background-image: linear-gradient(225deg, #40db82 0%, #388fe7 98.02%);

    ::before {
      left: calc(100% - 3px);
      transform: translateX(-100%);
    }
  }

  :focus + span {
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.2);
  }

  :focus:checked + span {
    box-shadow: 0 0 5px 3px rgba(24, 144, 255, 0.5);
  }
`;

export const Slider = styled.span`
  display: flex;
  cursor: pointer;
  width: 48px;
  height: 24px;
  border-radius: 48px;
  background-color: #aeb3cb;
  position: relative;
  transition: background-color 0.3s, box-shadow 0.4s;

  ::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    transition: 0.25s;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
  }

  :active:before {
    width: 35px;
  }
`;
