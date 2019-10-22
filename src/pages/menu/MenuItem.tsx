import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import {
  MenuItemContainer,
  MenuItemIconContainer,
  MenuItemTitleContainer,
  MenuItemTooltip,
  Separator
} from "./styled/menuItem.style"
import {ButtonBackIcon} from "./icons/ButtonBack"
import { useResizeObserver } from "../../effects/useResizeObserver";
import { MenuContext } from "./Menu";
import { Dropdown, DropdownShadow } from "./styled/menu.style";

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
    props.isHover ? createTooltip() : removeTooltip();
    return removeTooltip;

    function removeTooltip () {
      const $el = document.getElementById(id);
      if (!$el) return;
      $el.remove();
    }

    function createTooltip () {
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
    }
  }, [props.isHover]);
  
  return <div ref={anchorRef} />;
}

interface MenuDropdownProps {
  items: MenuItemProps[];
  offsetLeft?: number;
  offsetTop?: number;
  isHover: boolean;
}

export const MenuDropdown = (props: MenuDropdownProps) => {
  const [ $node, setNode ] = React.useState<HTMLDivElement | null>(null);
  const $body = document.querySelector("body");
  const refCallback = useCallback(node => setNode(node), []);

  let Tooltip = () => null;
  if (props.isHover && $node) {
    const rect = $node.getBoundingClientRect();
    Tooltip = () => (
      <Dropdown
        style={{
          background: "rgba(255,255,255,0.7)",
          left: rect.left + (props.offsetLeft || 0),
          top: rect.top + (props.offsetTop || 0)
        }}>
        <DropdownShadow>
          {props.items.map((i, idx) => {
            const ni = props.items[idx + 1];
            return (
              <>
                <MenuItem 
                  key={idx} 
                  {...i} 
                />
                {
                  ni ?
                  <Separator /> :
                  null
                }
              </>
              
            )
          })}
        </DropdownShadow>
      </Dropdown>
    )
  }

  return (
    <div 
      ref={refCallback}
    >
      {
        Tooltip ?
        ReactDOM.createPortal(<Tooltip />, $body)
        : null
      }
    </div>
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
  tooltip?: boolean;
  dropdownItems?: MenuItemProps[];
  disabled?: boolean;
}

export const MenuItem = (props: MenuItemProps) => {
  const [isHoverPure, setIsHover] = React.useState(false);
  const timeout = 300;
  const isHover = props.disabled ? false : isHoverPure;
  let timeoutHover = null;

  return (
    <MenuItemContainer 
      onMouseEnter={() => {
        clearTimeout(timeoutHover);
        setIsHover(true)
      }}
      onMouseLeave={() => {
        timeoutHover = setTimeout(() => {
          setIsHover(false)
        }, timeout);
      }}
      active={props.active} 
      onClick={props.onClick}>

      {
        props.tooltip ?
        <MenuTooltip 
          children={props.title}
          offsetLeft={40}
          isHover={isHover} 
        /> : null
      }

      {
        props.dropdownItems ?
        <MenuDropdown 
          offsetTop={33}
          offsetLeft={-17}
          isHover={isHover}
          items={props.dropdownItems} 
        /> : 
        null
      }
      
      <MenuItemIconContainer children={props.icon} />
      <div style={{overflow: "hidden"}}>
        <MenuItemTitleContainer>
          {props.title}
        </MenuItemTitleContainer>
      </div>
    </MenuItemContainer>
  )
}
