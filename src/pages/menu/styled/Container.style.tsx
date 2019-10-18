import React from "react"
import styled from "styled-components"

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
  max-width: ${props => (props.isCollapsed ? "64px" : "260px")};
`

interface MenuBodyContainerProps {
  isCollapsed?: boolean
}
export const MenuBodyContainer = styled.div<MenuBodyContainerProps>`
  margin-top: 12px;
  ${props => (props.isCollapsed ? "padding: 0 4px 0 3px" : "")}
`
