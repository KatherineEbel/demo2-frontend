import { useApp } from '../providers/AppProvider'
import React from 'react'
import styled from 'styled-components'

const StyledMain = styled.main`
  font-family: 'Hackman', sans-serif;
`
export const Main = () => {
  const { routeResult } = useApp()
  return <StyledMain>{routeResult}</StyledMain>
}
