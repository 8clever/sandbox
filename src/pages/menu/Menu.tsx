import * as React from "react"
import {ContainerVertical, MenuBodyContainer} from "./styled/Container.style"
import {Header, HeaderTitle, Logo, LogoMin} from "./styled/Header.style"
import {
  Footer,
  AvatarContainer,
  FooterMenu,
  FooterButton
} from "./styled/Footer.style"
import {CollapseButton} from "./styled/CollapseButton.style"
import {ChevronLeft, ChevronRight} from "./icons/Chevron"
import {MenuItem, MenuItemProps, BackButton} from "./MenuItem"
import {NotifIcon} from "./icons/Notif"
import {Search} from "./icons/Search"
import {Cog} from "./icons/Cog"
import {Dropdown, DropdownItem, Anchor} from "./styled/Dropdown.style"
import {TripleDot} from "./icons/TripleDot"
import OutsideClickHandler from "react-outside-click-handler"
import {History} from "history"
import _ from "lodash"

export interface MenuProps {
  history: History
  items: MenuItemProps[]
  logoUrl: string
  logoMinUrl: string
  avatarUrl?: string
  defaultSection?: string
}

const PUBLIC = {
  PROFILE: "profile",
  SETTINGS: "settings"
}

const getUrl = (path: string, root?: string) => {
  if (!root) return `/${path}`
  return `/${root}/${path}`
}

const generateRelativePath = (items: MenuItemProps[], root?: MenuItemProps) => {
  const paths: Array<{
    section: MenuItemProps
    parent?: MenuItemProps
    url: string
  }> = []
  items.forEach(i => {
    if (!i.path) return
    if (i.children) {
      paths.push(...generateRelativePath(i.children, i))
      return
    }

    paths.push({
      section: i,
      parent: root,
      url: root ? getUrl(i.path, root.path) : getUrl(i.path)
    })
  })
  return paths
}

export const Menu = (props: MenuProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)
  const [profileMenu, setProfileMenu] = React.useState(false)
  const [tripleDotMenu, setTripleDotMenu] = React.useState(false)
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null)
  const [sectionId, setSection] = React.useState<string | number | null>(
    props.defaultSection || null
  )

  let sections = props.items
  const section = sections.find(s => s.id === sectionId)

  if (section && section.children) {
    sections = section.children
  }

  const pathObj = generateRelativePath(props.items)
  React.useEffect(() => {
    const defaultState = props.history.location

    const setMenu = (url: string) => {
      const menu = pathObj.find(obj => obj.url.includes(url))
      setSection(menu.parent ? menu.parent.id : null)
      setActiveMenuId(menu.section.id)
    }

    setMenu(defaultState.pathname)
    const off = props.history.listen(state => {
      setMenu(state.pathname)
    })

    return () => {
      off()
    }
  }, [])

  const HeaderElement = () => (
    <Header isCollapsed={isCollapsed}>
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
          setIsCollapsed(!isCollapsed)
        }}
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </CollapseButton>
    </Header>
  )
  const BodyElement = () => (
    <MenuBodyContainer isCollapsed={isCollapsed}>
      {section ? (
        <BackButton title={section.title} onClick={() => setSection(null)} />
      ) : null}
      {sections.map((i, idx) => {
        if (_.values(PUBLIC).includes(String(i.id))) {
          return null
        }

        const p = {
          ...i,
          onClick: () => {
            if (i.children) {
              setSection(i.id)
              return
            }

            props.history.push(
              section ? getUrl(i.path, section.path) : getUrl(i.path)
            )
          }
        }
        return <MenuItem active={activeMenuId === i.id} key={idx} {...p} />
      })}
    </MenuBodyContainer>
  )

  const FooterElement = () => (
    <Footer isCollapsed={isCollapsed}>
      <div>
        <OutsideClickHandler
          onOutsideClick={() => {
            setProfileMenu(false)
          }}
        >
          {profileMenu ? (
            <Anchor>
              <Dropdown>
                <DropdownItem
                  onClick={() => {
                    setSection(PUBLIC.PROFILE)
                  }}
                  separator
                >
                  Мой профиль
                </DropdownItem>
                <DropdownItem>Выйти из системы</DropdownItem>
              </Dropdown>
            </Anchor>
          ) : null}
          {props.avatarUrl ? (
            <AvatarContainer
              style={{
                marginBottom: isCollapsed ? 8 : 0
              }}
              active={profileMenu}
              onClick={() => {
                setProfileMenu(!profileMenu)
              }}
              src={props.avatarUrl}
            />
          ) : null}
        </OutsideClickHandler>
      </div>
      <FooterMenu isCollapsed={isCollapsed}>
        {isCollapsed ? (
          <>
            <FooterButton style={{marginBottom: 8}}>
              <Search />
            </FooterButton>
            <OutsideClickHandler
              onOutsideClick={() => {
                setTripleDotMenu(false)
              }}
            >
              {tripleDotMenu ? (
                <Anchor>
                  <Dropdown>
                    <DropdownItem separator>Уведомления</DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setSection(PUBLIC.SETTINGS)
                      }}
                    >
                      Настройки системы
                    </DropdownItem>
                  </Dropdown>
                </Anchor>
              ) : null}
              <FooterButton
                active={tripleDotMenu}
                onClick={() => {
                  setTripleDotMenu(!tripleDotMenu)
                }}
              >
                <TripleDot />
              </FooterButton>
            </OutsideClickHandler>
          </>
        ) : (
          <>
            <FooterButton style={{marginRight: 4}}>
              <NotifIcon />
            </FooterButton>
            <FooterButton style={{marginRight: 4}}>
              <Search />
            </FooterButton>
            <FooterButton onClick={() => setSection(PUBLIC.SETTINGS)}>
              <Cog />
            </FooterButton>
          </>
        )}
      </FooterMenu>
    </Footer>
  )

  return (
    <ContainerVertical isCollapsed={isCollapsed}>
      <div>
        <HeaderElement />
        <BodyElement />
      </div>
      <FooterElement />
    </ContainerVertical>
  )
}
