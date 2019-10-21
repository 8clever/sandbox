import styled from "styled-components"

interface MenuItemContainerProps {
  active?: boolean
}

export const MenuItemContainer = styled.div<MenuItemContainerProps>`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 13px 16px 13px 17px;
  display: flex;
  cursor: pointer;
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  align-items: center;
  border-radius: 3px;
  color: ${props => (props.active ? "#d22643" : "#4d5c76")};
  transition: all 0.3s;

  ${props => (props.active ? "background: rgba(255, 255, 255, 0.7);" : "")}

  svg {
    transition: all 0.3s;
    opacity: 0.5;
  }

  :active {
    color: #d22643;
    background: rgba(255, 255, 255, 0.7);
  }

  :hover {
    background: rgba(255, 255, 255, 0.55);
    border-radius: 3px;
    svg {
      opacity: 1;
    }
  }
`

export const MenuItemIconContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
`

export const MenuItemTitleContainer = styled.div`
  width: 150px;
  margin-left: 16px;
  overflow: hidden;
`

export const MenuItemTooltip = styled.div`
  transition: all 0.3s;
  position: absolute;
  background-color: #4d5c76;
  opacity: 0.8;
  box-shadow: 0px 4px 8px rgba(77, 92, 118, 0.15);
  border-radius: 3px;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;

  padding: 12px 16px;
  z-index: 1000;

  color: #ffffff;
`
