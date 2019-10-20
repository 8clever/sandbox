import styled from "styled-components";

interface MenuBodyContainerProps {
  isCollapsed?: boolean
}

export const BodyContainer = styled.div<MenuBodyContainerProps>`
  position: relative;
  justify-self: stretch;
  height: 100%;
  width: 100%;
  ${props => (props.isCollapsed ? "padding: 0 4px 0 3px" : "")}
`

export const AbsoluteContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`