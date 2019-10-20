import styled from "styled-components"

interface HeaderContainerProps {
  isCollapsed?: boolean
}

export const HeaderContainer = styled.div<HeaderContainerProps>`
  display: flex;
  align-items: center;
  padding: ${props => (props.isCollapsed ? "16px 12px" : "16px")};
  border-bottom: 1px solid rgb(77, 92, 118, 0.1);
  position: relative;
`

export const HeaderTitle = styled.div``

export const Logo = styled.img`
  height: 32px;
`

export const LogoMin = styled.img`
  width: 40px;
  height: 32px;
`

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