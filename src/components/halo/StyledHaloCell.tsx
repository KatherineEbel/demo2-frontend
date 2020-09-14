import styled from 'styled-components'
import { FunctionComponent } from 'react'
import React from 'react'

interface IStyledHaloCellProps {
  transform: number
}

const StyledHaloCell = styled.div<IStyledHaloCellProps>`
  transform: ${props => props.transform};
  position: absolute;
  width: 190px;
  height: 120px;
  left: 10px;
  top: 10px;
  border: 2px solid black;
  line-height: 116px;
  font-size: 80px;
  font-weight: bold;
  color: white;
  text-align: center;
  background: hsla(188, 25%, 0.83%, 0.2);
  transition: transform 1s, opacity 1s;
`
interface IHaloCellProps {
  transform: number
  content: number
}

const HaloCell: FunctionComponent<IHaloCellProps> = ({
  transform,
  content
}) => {
  return <StyledHaloCell transform={transform}>{content}</StyledHaloCell>
}

export default HaloCell
