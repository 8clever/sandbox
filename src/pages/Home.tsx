import * as React from "react"
import styled, {createGlobalStyle} from "styled-components"
import {Menu, MenuItemProps} from "./menu"
import {Folder} from "./icons/Folder"
import {Router, Switch, Route, Redirect} from "react-router-dom"
import {createBrowserHistory} from "history"

const GlobalStyle = createGlobalStyle`
  
  body {
    margin: 0;
  }
  
  .react-app,
  .switch-wrapper,
  .switch-wrapper > div {
    width: 100vw;
    height: 100vh;
  }
`

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const history = createBrowserHistory()

const menuItems: MenuItemProps[] = [
  {
    id: "one",
    icon: <Folder />,
    title: "Одна строчка",
    path: "group",
    children: [
      {
        id: "hey",
        icon: <Folder />,
        title: "Саб меню",
        path: "first"
      }
    ]
  },
  {
    id: "two",
    icon: <Folder />,
    title: "Государственные программы в три строчки",
    path: "second",
    children: [
      {
        id: "asdflasdf",
        icon: <Folder />,
        title: "Типа тест дропдауна",
        path: "1232323"
      },
      {
        id: "1232323",
        icon: <Folder />,
        title: "Тип еще один тест",
        path: "2323"
      }
    ]
  },
  {
    id: "three",
    icon: <Folder />,
    title: "Государственные программы",
    path: "third"
  },
  {
    id: "settings",
    icon: <Folder />,
    title: "Настройки",
    path: "settings",
    children: [
      {
        id: "1232",
        icon: <Folder />,
        title: "Управление справочниками и классификаторами",
        path: "four"
      }
    ]
  },
  {
    id: "profile",
    icon: <Folder />,
    title: "Профиль",
    path: "profile",
    children: [
      {
        id: "2323",
        icon: <Folder />,
        title: "Входящие ЗНИ",
        path: "zni"
      }
    ]
  }
]

const logoMinUrl = "http://dev.lukoil.gost-group.com/static/media/logo_min.64bf4231.svg";
const logoUrl = "http://dev.lukoil.gost-group.com/static/media/logo.ba3914bc.svg";
const avatarUrl = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/10.png";

export const Home = () => {
  return (
    <Container>
      <GlobalStyle />
      <Menu
        history={history}
        logoUrl={logoUrl}
        logoMinUrl={logoMinUrl}
        avatarUrl={avatarUrl}
        items={menuItems}
      />
      <ContainerColumn>
        <div>
          <Menu 
            history={history}
            logoUrl={logoUrl}
            logoMinUrl={logoMinUrl}
            avatarUrl={avatarUrl}
            items={menuItems}
            horizontal
          />
        </div>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/group/first"
              render={() => {
                return "Home page"
              }}
            />
            <Route
              exact
              path="/second"
              render={() => {
                return "Element first"
              }}
            />
            <Redirect to="/second" />
          </Switch>
        </Router>
      </ContainerColumn>
    </Container>
  )
}