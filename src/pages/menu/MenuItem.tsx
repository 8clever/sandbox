import React from "react"
import {
  MenuItemContainer,
  MenuItemIconContainer,
  MenuItemTitleContainer,
  MenuItemTooltip
} from "./styled/MenuItem.style"
import {ButtonBackIcon} from "./icons/ButtonBack"

interface BackButtonProps {
  onClick: () => void
  title: React.ReactNode
}

export const BackButton = (props: BackButtonProps) => {
  return (
    <MenuItemContainer
      style={{
        background: "#FCFDFD"
      }}
      onClick={props.onClick}
    >
      <MenuItemIconContainer>
        <ButtonBackIcon />
      </MenuItemIconContainer>
      <div style={{overflow: "hidden"}}>
        <MenuItemTitleContainer style={{textAlign: "right"}}>
          {props.title}
        </MenuItemTitleContainer>
      </div>
    </MenuItemContainer>
  )
}

export interface MenuItemProps {
  id: string | number
  title: React.ReactNode
  icon?: React.ReactNode
  path: string
  children?: MenuItemProps[]
  active?: boolean
}

export const MenuItem = (props: MenuItemProps) => {
  const [isHover, setIsHover] = React.useState(false)

  return (
    <MenuItemContainer active={props.active} onClick={props.onClick}>
      {isHover ? <MenuItemTooltip>{props.title}</MenuItemTooltip> : null}
      <MenuItemIconContainer
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {props.icon}
      </MenuItemIconContainer>
      <div style={{overflow: "hidden"}}>
        <MenuItemTitleContainer>{props.title}</MenuItemTitleContainer>
      </div>
    </MenuItemContainer>
  )
}
