import styled from "@emotion/styled";

export const Dropdown = styled.div`
  width: 200px;
  position: relative;

  font-family: "Nunito", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  user-select: none;

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

export const SelectBox = styled.div<any>`
  min-height: 56px;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
  border-radius: 5px;
  padding: 18px 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  box-sizing: border-box;
`;

export const ArrowIcon = styled.img<any>`
  width: 9px;
  margin-left: auto;
  transition: all 0.2s ease-out;
  transform: ${(props: any) =>
    props.isActive ? "rotate(180deg)" : "rotate(0)"};
`;

export const OptionsBox = styled.div<any>`
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
  border-radius: 5px;

  position: absolute;
  top: 107%;
  width: 100%;
  overflow: auto;

  /* TODO: add animation for height and hide scroll till animation completes. */
  max-height: ${(props: any) => (props.isActive ? "164px" : 0)};
  padding: ${(props: any) => (props.isActive ? "10px 0" : 0)};
`;

export const OptionItem = styled.option<any>`
  padding: 4px 24px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props: any) =>
    props.selectedOption ? "#bfbfbf" : "transparent"};

  &:hover {
    background-color: ${(props: any) =>
      props.selectedOption ? "#bfbfbf" : "#e4e4e4"};
  }
  box-sizing: border-box;
`;
