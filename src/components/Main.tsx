import { useApp } from '../providers/AppProvider'
import React from 'react'
import styled from 'styled-components'

const StyledMain = styled.main`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  font-family: 'Hackman', sans-serif;
`
export const Main = () => {
  const { routeResult } = useApp()
  return <StyledMain>{routeResult}</StyledMain>
}
