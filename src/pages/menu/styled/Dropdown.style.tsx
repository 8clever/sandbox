import styled from "styled-components"

export const Anchor = styled.div`
  position: relative;
`

export const Dropdown = styled.div`
  background: #f9fafb;
  box-shadow: 0px 4px 16px rgba(0, 78, 155, 0.1);
  border-radius: 8px;
  position: absolute;
  min-width: 210px;
  z-index: 10;
  bottom: 8px;
  border-radius: 6px;
`

interface DropdownItemProps {
  separator?: boolean
}

export const DropdownItem = styled.div<DropdownItemProps>`
  border-radius: 3px;
  padding: 12px 16px;
  font-size: 13px;
  line-height: 16px;
  color: #67758d;
  background: #ffffff;
  margin-bottom: ${props => (props.separator ? "1px" : 0)};
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s;

  :hover {
    opacity: 1;
  }

  display: flex;
  align-content: space-between;
`

export const DropdownTitle = styled.div``

export const DropdownBadge = styled.div`
  color: #d22643;
`
