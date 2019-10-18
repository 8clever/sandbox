import styled from "styled-components"

interface FooterProps {
  isCollapsed?: boolean
}

export const Footer = styled.div<FooterProps>`
  padding: ${props => (props.isCollapsed ? "16px 16px 12px 16px" : "16px")};
  border-top: 1px solid rgb(77, 92, 118, 0.1);
  display: flex;
  justify-content: space-between;
  flex-direction: ${props => (props.isCollapsed ? "column" : "row")};
`

interface AvatarContainerProps {
  active?: boolean
}

export const AvatarContainer = styled.img<AvatarContainerProps>`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  border: 2px solid ${props => (props.active ? "#d22643" : "#c4c4c4")};
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  align-content: center;

  :hover {
    border: 2px solid #d22643;
  }
`

interface FooterMenuProps {
  isCollapsed?: boolean
}

export const FooterMenu = styled.div<FooterMenuProps>``

interface FooterButtonProps {
  active?: boolean
}

export const FooterButton = styled.button<FooterButtonProps>`
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  opacity: ${props => (props.active ? 1 : 0.5)};
  cursor: pointer;
  transition: all 0.3s;
  color: ${props => (props.active ? "#D22643" : "#4d5c76")};
  outline: 0;

  svg {
    margin-left: -2px;
    margin-top: 2px;
    width: 24px;
    height: 24px;
  }

  :hover {
    opacity: 1;
  }

  :active {
    color: #d22643;
  }
`
