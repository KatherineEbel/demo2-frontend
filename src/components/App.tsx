import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Navigation } from './Navigation'
import { Main } from './Main'
import ContentHeader from './ContentHeader'
import { Console } from './Console'

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
  .console {
    grid-column: 1 / span 2;
    max-width: 100vw;
    .tabs {
      display: flex;
      flex-direction: row;
      .styled-button:first-child {
        margin-left: -3rem;
      }
    }
  }
  .command-interpreter {
    grid-column: 1 / span 2;
    max-width: 100vw;
    border: 1px dashed #ccc;
    border-radius: 2px;
    min-height: 1.5rem;
    max-height: 3rem;
    display: flex;
    flex-direction: row;
    padding: 5px;
    justify-content: right;

    .input {
      width: 100%;
      border-radius: 0;
      text-indent: 1rem;
    }
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
      <div className="console" />
      <div className="command-interpreter">
        <div />
        <div className="controls">
          <input type="text" onChange={() => {}} />
          <Button text="Shift" type="keyboard-indicator" />
          <Button text="<--" type="keyboard-indicator" />
          <Button text="-->" type="keyboard-indicator" />
          <Button text="Enter" type="keyboard-indicator" />
        </div>
      </div>
    </StyledApp>
  )
}
