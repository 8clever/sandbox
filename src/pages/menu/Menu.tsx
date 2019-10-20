import * as React from "react"
import {MenuItemProps} from "./MenuItem"
import {History} from "history"
import { 
  ContainerVertical 
} from "./styled/menu.style"
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Body } from "./Body";

export interface MenuProps {
  history: History
  items: MenuItemProps[]
  logoUrl: string
  logoMinUrl: string
  avatarUrl?: string
  defaultSection?: string
}

interface MenuContextValue {
  props: MenuProps
  collapsed: {
    value: boolean;
    set: (value: boolean) => void;
  },
  section: {
    value: string | number | null;
    set: (value: string | number | null) => void;
  }
}

export const MenuContext = React.createContext<MenuContextValue | null>(null);

export const Menu = (props: MenuProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)
  const [sectionId, setSection] = React.useState<string | number | null>(
    props.defaultSection || null
  )

  const menuContext: MenuContextValue = {
    props,
    collapsed: {
      value: isCollapsed,
      set: setIsCollapsed
    },
    section: {
      value: sectionId,
      set: setSection
    }
  }
  
  return (
    <ContainerVertical isCollapsed={isCollapsed}>
      <MenuContext.Provider value={menuContext}>
        <Header />
        <Body />
        <Footer />
      </MenuContext.Provider>
    </ContainerVertical>
  )
}
