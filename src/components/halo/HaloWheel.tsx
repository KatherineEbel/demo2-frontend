import styled from 'styled-components'
import React, { FunctionComponent, useContext } from 'react'
import HaloCell from './StyledHaloCell'
import { HaloContext } from '../../providers/HaloProvider'

interface IStyledHaloWheelProps {
  HaloZoomCss: string
  HaloAngleCss: string
}

const StyledHaloWheel = styled.div<IStyledHaloWheelProps>`
  width: 100%;
  height: 100%;
  margin-left: 1rem;
  position: absolute;
  transform: ${props => props.HaloZoomCss} ${props => props.HaloAngleCss};
  transform-style: preserve-3d;
`
const HaloWheel: FunctionComponent = () => {
  const { count, angleCSS, zoomCSS, cells } = useContext(HaloContext)
  return (
    <StyledHaloWheel HaloZoomCss={zoomCSS} HaloAngleCss={angleCSS}>
      {count > 0 &&
        cells.map((cell, idx) => (
          <HaloCell content={idx + 1} transform={cell} />
        ))}
    </StyledHaloWheel>
  )
}
export default HaloWheel
