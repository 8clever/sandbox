import { MenuItemProps } from "./MenuItem"

export const PUBLIC = {
  PROFILE: "profile",
  SETTINGS: "settings"
}

export const getUrl = (path: string, root?: string) => {
  if (!root) return `/${path}`
  return `/${root}/${path}`
}

export const generateRelativePath = (items: MenuItemProps[], root?: MenuItemProps) => {
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