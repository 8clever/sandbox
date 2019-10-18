import React from "react";
import ReactDOM from "react-dom";
import {
  MenuItemContainer,
  MenuItemIconContainer,
  MenuItemTitleContainer,
  MenuItemTooltip
} from "./styled/MenuItem.style"
import {ButtonBackIcon} from "./icons/ButtonBack"
import { useResizeObserver } from "../../effects/useResizeObserver";

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
  children?: MenuItemProps[];
  active?: boolean;
  onClick?: () => void;
}

interface MenuTooltipProps {
  offsetLeft?: number;
  offsetTop?: number;
  children?: React.ReactNode;
  isHover: boolean;
}

export const MenuTooltip = (props: MenuTooltipProps) => {
  const [ id ] = React.useState(String(Math.random()));
  const anchorRef = React.useRef<HTMLDivElement>();

  React.useLayoutEffect(() => {
    if (props.isHover) {
      const $el = document.createElement("div");
      const $body = document.querySelector("body");
      const rect = anchorRef.current.getBoundingClientRect();

      const Tooltip = (
        <MenuItemTooltip style={{
          left: rect.left + (props.offsetLeft || 0),
          top: rect.top + (props.offsetTop || 0)
        }}>
          {props.children}
        </MenuItemTooltip>
      );

      $el.id = id;
      ReactDOM.render(Tooltip, $el);
      $body.appendChild($el);
      return;
    }

    const $el = document.getElementById(id);
    if (!$el) return;
    $el.remove();
  }, [props.isHover]);
  
  return <div ref={anchorRef} />;
}

export const MenuItem = (props: MenuItemProps) => {
  const [isHover, setIsHover] = React.useState(false)

  return (
    <MenuItemContainer active={props.active} onClick={props.onClick}>
      <MenuTooltip 
        offsetLeft={40}
        children={props.title}
        isHover={isHover} />
      <MenuItemIconContainer
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {props.icon}
      </MenuItemIconContainer>
      <div style={{overflow: "hidden"}}>
        <MenuItemTitleContainer>
          {props.title}
        </MenuItemTitleContainer>
      </div>
    </MenuItemContainer>
  )
}
