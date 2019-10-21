import styled from "styled-components";

export const Anchor = styled.div`
  position: relative;
`

export const Dropdown = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  position: absolute;
  min-width: 210px;
  z-index: 10;
  bottom: 8px;
  border-radius: 6px;
`

export const DropdownShadow = styled.div`
  box-shadow: 0px 4px 16px rgba(0, 78, 155, 0.1);
`

interface DropdownItemProps {
  separator?: boolean
}

export const DropdownItem = styled.div<DropdownItemProps>`
  border-radius: 3px;
  padding: 12px 16px;
  font-size: 13px;
  line-height: 16px;
  color: #67758d;
  background: #ffffff;
  margin-bottom: ${props => (props.separator ? "1px" : 0)};
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s;

  :hover {
    opacity: 1;
  }

  display: flex;
  align-content: space-between;
`

export const DropdownTitle = styled.div``

export const DropdownBadge = styled.div`
  color: #d22643;
`

interface ContainerVerticalProps {
  isCollapsed?: boolean
}

export const ContainerVertical = styled.div<ContainerVerticalProps>`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #f7f9fa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${props => (props.isCollapsed ? "0" : "0 20px")};
  transition: all 0.5s;
  min-width: ${props => (props.isCollapsed ? "64px" : "240px")};
  max-width: ${props => (props.isCollapsed ? "64px" : "240px")};
`

export const ContainerHorizontal = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #f7f9fa;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 65px;
`


