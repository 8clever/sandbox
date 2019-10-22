import styled from "styled-components";

export const BodyHorizontalContainer = styled.div`
  position: relative;
  display: flex;
  justify-self: stretch;
  width: 100%;
  height: 100%;
  border-left: 1px solid #EDEFF1;
  border-right: 1px solid #edeff1;
`;

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
export const ShadowLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 10px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
`

export const ShadowRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 10px;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
`