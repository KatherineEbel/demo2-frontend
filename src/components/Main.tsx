import { useApp } from '../providers/AppProvider'
import React from 'react'
import styled from 'styled-components'

const StyledMain = styled.main`
  padding: 0.5rem;
  max-width: calc(100vw - 20rem);
  .rest,
  .websockets {
    display: flex;
    flex-direction: column;
    padding-left: 0.5rem;
    font-family: 'Hackman-Bold', sans-serif;
  }
  .line-time.success {
    color: #3dcc91;
  }

  .line-time.warning {
    color: #e1ad01;
  }

  .line-string {
    text-indent: 0.5rem;
  }

  .line-time.danger {
    color: #cc3300;
  }
`
export const Main = () => {
  const { routeResult } = useApp()
  return <StyledMain>{routeResult}</StyledMain>
}
