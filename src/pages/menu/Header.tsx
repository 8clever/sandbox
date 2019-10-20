import React from "react";
import {
  HeaderContainer, 
  HeaderTitle, 
  LogoMin, 
  Logo, 
  CollapseButton, 
} from "./styled/header.style";
import { MenuContext } from "./Menu";
import {ChevronLeft, ChevronRight} from "./icons/Chevron"

export const Header = () => {
  const ctx = React.useContext(MenuContext);
  const { props } = ctx;
  const isCollapsed = ctx.collapsed.value;

  return (
    <HeaderContainer isCollapsed={isCollapsed}>
      <HeaderTitle>
        {isCollapsed ? (
          <LogoMin src={props.logoUrl} />
        ) : (
          <Logo src={props.logoMinUrl} />
        )}
      </HeaderTitle>
      <CollapseButton
        isCollapsed={isCollapsed}
        onClick={() => {
          ctx.collapsed.set(!isCollapsed)
        }}
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </CollapseButton>
    </HeaderContainer>
  )
}