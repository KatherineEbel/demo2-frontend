import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

type ButtonProps = {
  type: string
  route?: string
  text: string
  classes?: string[]
  icon?: string
  isDown?: boolean
  onClick?: (value?: string) => void
  indicator?: string
  rs?: number
}

const StyledButton = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  color: aliceblue;
  //color: #05050f;
  height: 1.5rem;
  margin-right: 5px;
  &:hover {
    cursor: pointer;
    //background: #05050F;
  }
  &:first-of-type {
    margin-left: 5px;
  }

  ${({ type }) =>
    type === 'button' &&
    `
    border: 1px solid aliceblue;
    border-radius: 2px;
    height: 2rem;
    vertical-align: top;
    padding: .2rem;
    &:hover {
      color: #111D27;
      background: aliceblue;
    }
  `}
  ${({ type }) =>
    type === 'nav-level-one' &&
    `
    text-indent: 1.5rem;
    border-left: 2px solid transparent;
    text-align: center;
    line-height: 1.5rem;
    &:hover {
      border-left: 2px solid #05050F; 
    }
  `}

  //border: 1px solid #05050F;
  ${({ type }) =>
    type === 'keyboard-indicator' &&
    `
    border: 1px solid aliceblue;
    border-radius: 2px;
    display: inline-block;
    line-height: 1.6rem;
    padding-left: .2rem;
    padding-right: .2rem;
  `}
  
  ${({ isDown }) =>
    isDown &&
    `
     background: #05050F;
  `}
`

export const Button: FunctionComponent<ButtonProps> = ({
  type,
  route,
  text,
  classes,
  icon,
  isDown,
  onClick,
  indicator = 'none',
  rs = 0
}) => {
  const handleClick = () => {
    switch (type) {
      case 'nav-level-one':
        route && onClick(route)
        break
      case 'tab':
      case 'slanted-tab':
        onClick(text)
        break
      default:
        onClick()
    }
  }
  return (
    <StyledButton
      className={`styled-button ${classes}`}
      icon={icon}
      onClick={handleClick}
      type={type}
      isDown={isDown}
    >
      {icon && <div className="icon" />}
      {text && <div className="text">{text}</div>}
      {indicator === 'ws' && <div className="btn-indicator-ws">{rs}</div>}
    </StyledButton>
  )
}
