
import React from "react";
import { generateRelativePath, getUrl, PUBLIC } from "./helper.functions";
import {MenuItem, BackButton} from "./MenuItem"
import {Scrollbars} from "react-custom-scrollbars";
import { useResizeObserver } from "../../effects/useResizeObserver"
import { MenuContext } from "./Menu";
import { BodyContainer, AbsoluteContainer, BodyHorizontalContainer, ShadowLeft, ShadowRight } from "./styled/body.style";
import { SpringSystem } from "rebound";

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
              return (
                <MenuItem 
                  tooltip={isCollapsed}
                  active={activeMenuId === i.id} 
                  key={idx} {...p} 
                />
              )
            })}
          </div>
        </Scrollbars>
      </AbsoluteContainer>
    </BodyContainer>
  )
}

const springSystem = new SpringSystem();

export const BodyHorizontal = () => {
  const [ activeMenuId, setActiveMenuId ] = React.useState<string | number>();
  const [ disabled, setDisabled ] = React.useState(false);
  const ctx = React.useContext(MenuContext);
  const { props } = ctx;
  const sections = props.items;
  const pathObj = generateRelativePath(props.items);
  const [ width, height, refCallback ] = useResizeObserver();
  const scrollbars = React.useRef<Scrollbars>();
  const shadowLeft = React.useRef<HTMLDivElement>();
  const shadowRight = React.useRef<HTMLDivElement>();
  const [ spring ] = React.useState(springSystem.createSpring())
  let disabledTimeout = null;

  React.useEffect(() => {
    const defaultState = props.history.location
    const setMenu = (url: string) => {
      const menu = pathObj.find(obj => obj.url.includes(url))
      setActiveMenuId(menu.section.id)
    }

    setMenu(defaultState.pathname)
    const off = props.history.listen(state => {
      setMenu(state.pathname)
    });

    spring.addListener({
      onSpringUpdate: spring => {
        const v = spring.getCurrentValue();
        scrollbars.current.scrollLeft(v);
        clearTimeout(disabledTimeout);
        setDisabled(true);
        disabledTimeout = setTimeout(() => {
          setDisabled(false);
        }, 10);
      }
    });

    return () => {
      off();
      spring.destroy();
    }
  }, []);

  

  return (
    <BodyHorizontalContainer >
      <AbsoluteContainer ref={refCallback}>
        <Scrollbars
          ref={scrollbars}
          onWheel={(e) => {
            const left = scrollbars.current.getScrollLeft();
            spring.setEndValue(left + e.deltaY);
          }}
          onUpdate={values => {
            const { scrollLeft, scrollWidth, clientWidth } = values;
            const shadowLeftOpacity = 1 / 20 * Math.min(scrollLeft, 20);
            const rightScroll = scrollWidth - clientWidth;
            const shadowRightOpacity = 1 / 20 * (rightScroll - Math.max(scrollLeft, rightScroll - 20));
            shadowLeft.current.style.opacity = shadowLeftOpacity.toFixed();
            shadowRight.current.style.opacity = shadowRightOpacity.toFixed();
          }}
          renderThumbHorizontal={() => <div />}
          renderTrackHorizontal={() => <div />}
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHide
          style={{
            width,
            height
          }}>
          <div style={{
            display: "flex",
            justifyItems: "start",
            height: 65
          }}>
            {sections.map((i, idx) => {
              if (Object.values(PUBLIC).includes(String(i.id))) {
                return null
              }

              const p = {
                ...i,
                disabled,
                onClick: () => {
                  if (i.children) {
                    return;
                  }
                  props.history.push(getUrl(i.path));
                }
              }

              if (i.children) {
                p.dropdownItems = i.children.map(ch => {
                  const active = activeMenuId === ch.id;
                  p.active = p.active || active;

                  return {
                    ...ch,
                    active,
                    disabled,
                    onClick: () => {
                      props.history.push(getUrl(ch.path, i.path));
                    }
                  }
                })
              }

              return (
                <MenuItem 
                  key={idx} 
                  {...p} 
                />
              )
            })}
          </div>
        </Scrollbars>
        <ShadowLeft ref={shadowLeft} />
        <ShadowRight ref={shadowRight} />
      </AbsoluteContainer>
    </BodyHorizontalContainer>
  )
}