import styled from "styled-components"

interface CollapseButtonProps {
  isCollapsed?: boolean
}

export const CollapseButton = styled.button<CollapseButtonProps>`
  border-radius: 40px;
  border: none;
  width: 24px;
  height: 24px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(77, 92, 118, 0.1);
  position: absolute;
  z-index: 10;
  right: ${props => (props.isCollapsed ? "-12px" : "-32px")};
  cursor: pointer;
  color: #4d5c76;
  outline: 0;

  svg {
    margin-left: -10px;
    margin-top: -3px;
    transition: all 0.3s;
    opacity: 0.5;
  }

  :hover {
    svg {
      opacity: 1;
    }
  }
`
