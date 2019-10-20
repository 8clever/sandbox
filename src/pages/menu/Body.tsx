
import React from "react";
import { generateRelativePath, getUrl, PUBLIC } from "./helper.functions";
import {MenuItem, BackButton} from "./MenuItem"
import {Scrollbars} from "react-custom-scrollbars";
import { useResizeObserver } from "../../effects/useResizeObserver"
import { MenuContext } from "./Menu";
import { BodyContainer, AbsoluteContainer } from "./styled/body.style";

export const Body = () => {
  const ctx = React.useContext(MenuContext);
  const [activeMenuId, setActiveMenuId] = React.useState<string | number | null>(null);
  const [width, height, refCallback] = useResizeObserver();
  const { props } = ctx;
  const isCollapsed = ctx.collapsed.value;
  const section = props.items.find(s => s.id === ctx.section.value)
  const sections = section && section.children ? section.children : props.items
  const pathObj = generateRelativePath(props.items)

  React.useEffect(() => {
    const defaultState = props.history.location
    const setMenu = (url: string) => {
      const menu = pathObj.find(obj => obj.url.includes(url))
      ctx.section.set(menu.parent ? menu.parent.id : null)
      setActiveMenuId(menu.section.id)
    }

    setMenu(defaultState.pathname)
    const off = props.history.listen(state => {
      setMenu(state.pathname)
    })

    return off;
  }, []);


  return (
    <BodyContainer>
      <AbsoluteContainer ref={refCallback}>
        <Scrollbars
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHide
          style={{
            width,
            height,
          }}>
          <div style={{
            marginTop: "12px",
            marginLeft: isCollapsed ? 3 : 0,
            marginRight: isCollapsed ? 4 : 0
          }}>
            {section ? (
              <BackButton title={section.title} onClick={() => ctx.section.set(null)} />
            ) : null}
            {sections.map((i, idx) => {
              if (Object.values(PUBLIC).includes(String(i.id))) {
                return null
              }

              const p = {
                ...i,
                onClick: () => {
                  if (i.children) {
                    ctx.section.set(i.id)
                    return
                  }

                  props.history.push(
                    section ? getUrl(i.path, section.path) : getUrl(i.path)
                  )
                }
              }
              return <MenuItem active={activeMenuId === i.id} key={idx} {...p} />
            })}
          </div>
        </Scrollbars>
      </AbsoluteContainer>
    </BodyContainer>
  )
}