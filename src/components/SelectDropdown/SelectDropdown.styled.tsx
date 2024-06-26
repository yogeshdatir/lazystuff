import { css, keyframes } from '@emotion/react';
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

  * { box-sizing: border-box}
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

// * Scroll hide animation imitating delay in display of scroll till height animation completes
const hideScroll  = keyframes `
  from, to { overflow: hidden; }
`

export const OptionsBox = styled.div<any>`
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
  border-radius: 5px;

  position: absolute;
  top: 107%;
  z-index: 9999;
  background-color: #fff;
  width: 100%;
  padding: ${(props: any) => (props.isActive ? "10px 0" : 0)};

  // * Added these properties for height animation and to hide scroll till the animation completes
  // * Reference: https://css-tricks.com/hide-scrollbars-during-an-animation/
  overflow: ${(props: any) => (props.isActive ? "auto" : "hidden")};
  transition: all 0.5s ease-out;
  max-height: ${(props: any) => (props.isActive ? "300%" : 0)};
  animation: ${(props: any) => (props.isActive ? css`${hideScroll} 0.5s backwards` : "")};
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
