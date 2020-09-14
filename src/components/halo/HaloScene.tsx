import styled from 'styled-components'
import React, { FunctionComponent } from 'react'
import HaloWheel from './HaloWheel'

const StyledHaloScene = styled.div`
  border: 1px solid;
  position: relative;
  width: 210px;
  height: 140px;
  margin: 40px auto;
  perspective: 1000px;
`

const HaloScene: FunctionComponent = () => {
  return (
    <StyledHaloScene>
      <HaloWheel />
    </StyledHaloScene>
  )
}

export default HaloScene
