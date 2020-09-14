import React from 'react'
import styled from 'styled-components'
import { Navigation } from './Navigation'
import { Main } from './Main'
import ContentHeader from './ContentHeader'
import { Console } from './Console'
import { CommandInterpreter } from './CommandInterpreter'

const StyledApp = styled.div`
  //background: #101e41;
  //color: whitesmoke;
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: 20rem 1fr;
  padding: 10px;
  .navigation-header {
    padding: 0.2rem;
  }
`

export const App = () => {
  return (
    <StyledApp>
      <div className="navigation-header" />
      <ContentHeader />
      <Navigation />
      <Main />
      <Console />
      <CommandInterpreter />
    </StyledApp>
  )
}
