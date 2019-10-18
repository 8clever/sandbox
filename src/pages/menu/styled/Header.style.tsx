import styled from "styled-components"

interface HeaderProps {
  isCollapsed?: boolean
}

export const Header = styled.div<HeaderProps>`
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
