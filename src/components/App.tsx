import React from 'react'
import styled from 'styled-components'
import { Main } from './Main'
import ContentHeader from './ContentHeader'
import { Console } from './Console'
import { CommandInterpreter } from './CommandInterpreter'
import HaloProvider from '../providers/HaloProvider'

const StyledApp = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;

  footer {
    flex-grow: 1;
  }
  .content {
    display: flex;
    flex-grow: 15;
    justify-content: space-around;
    align-items: flex-start;
  }
`

export const App = () => {
  return (
    <StyledApp>
      <ContentHeader />
      <HaloProvider>
        <div className="content">
          <Main />
          <Console />
        </div>
        <footer>
          <CommandInterpreter />
        </footer>
      </HaloProvider>
    </StyledApp>
  )
}
