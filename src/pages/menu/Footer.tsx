import React from "react";
import {NotifIcon} from "./icons/Notif"
import {Search} from "./icons/Search"
import {Cog} from "./icons/Cog"
import {TripleDot} from "./icons/TripleDot"
import OutsideClickHandler from "react-outside-click-handler"
import { FooterContainer, AvatarContainer, FooterMenu, FooterButton, FooterHorizontalContainer } from "./styled/footer.style";
import { MenuContext } from "./Menu";
import { Anchor, Dropdown, DropdownItem, DropdownShadow } from "./styled/menu.style";
import { PUBLIC } from "./helper.functions";

export const Footer = () => {
  const ctx = React.useContext(MenuContext);
  const [ profileMenu, setProfileMenu ] = React.useState(false);
  const [ tripleDotMenu, setTripleDotMenu ] = React.useState(false);
  const { props } = ctx;
  const isCollapsed = ctx.collapsed.value;

  return (
    <FooterContainer isCollapsed={isCollapsed}>
      <div>
        <OutsideClickHandler
          onOutsideClick={() => {
            setProfileMenu(false)
          }}
        >
          {profileMenu ? (
            <Anchor>
              <Dropdown>
                <DropdownShadow>
                  <DropdownItem
                    onClick={() => {
                      ctx.section.set(PUBLIC.PROFILE)
                    }}
                    separator
                  >
                    Мой профиль
                  </DropdownItem>
                  <DropdownItem>Выйти из системы</DropdownItem>
                </DropdownShadow>
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
                    <DropdownShadow>
                      <DropdownItem separator>Уведомления</DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          ctx.section.set(PUBLIC.SETTINGS)
                        }}
                      >
                        Настройки системы
                      </DropdownItem>
                    </DropdownShadow>
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
            <FooterButton onClick={() => ctx.section.set(PUBLIC.SETTINGS)}>
              <Cog />
            </FooterButton>
          </>
        )}
      </FooterMenu>
    </FooterContainer>
  )
}

export const FooterHorizontal = () => {
  const [ profileMenu, setProfileMenu ] = React.useState(false);
  const ctx = React.useContext(MenuContext);
  const { props } = ctx;

  return (
    <FooterHorizontalContainer>
      <FooterContainer>
        <div>
          <OutsideClickHandler
            onOutsideClick={() => {
              setProfileMenu(false)
            }}
          >
            {props.avatarUrl ? (
              <AvatarContainer
                active={profileMenu}
                onClick={() => {
                  setProfileMenu(!profileMenu)
                }}
                src={props.avatarUrl}
              />
            ) : null}
            {profileMenu ? (
              <Anchor>
                <Dropdown style={{ top: 15, right: -15 }}>
                  <DropdownShadow>
                    <DropdownItem
                      onClick={() => {
                        ctx.section.set(PUBLIC.PROFILE)
                      }}
                      separator
                    >
                      Мой профиль
                    </DropdownItem>
                    <DropdownItem>Выйти из системы</DropdownItem>
                  </DropdownShadow>
                </Dropdown>
              </Anchor>
            ) : null}
          </OutsideClickHandler>
        </div>
        <FooterMenu>
          <FooterButton style={{marginRight: 4}}>
            <NotifIcon />
          </FooterButton>
          <FooterButton style={{marginRight: 4}}>
            <Search />
          </FooterButton>
          <FooterButton onClick={() => ctx.section.set(PUBLIC.SETTINGS)}>
            <Cog />
          </FooterButton>
        </FooterMenu>
      </FooterContainer>
    </FooterHorizontalContainer>
  )
}