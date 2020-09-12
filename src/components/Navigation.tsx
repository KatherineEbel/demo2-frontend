import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Dashboard } from './Dashboard'
import { navigate, useRoutes } from 'hookrouter'
import { useApp } from '../providers/AppProvider'

const StyledNavigation = styled.nav`
  padding: 0.5rem;
  max-width: calc(100vw - 20rem);

  .section-title {
    margin-top: 1rem;
    height: 1.5rem;
    line-height: 1.5rem;
  }
`
export const Navigation: FunctionComponent = () => {
  const appState = useApp()
  const routes = {
    '/': () => <Dashboard />
  }
  const handleRoute = r => {
    navigate(r)
    appState.setRouteResult(routeResult)
  }
  const routeResult = useRoutes(routes)

  useEffect(() => {
    handleRoute('/')
  }, [])
  return (
    <StyledNavigation className="navigation">
      <Button type="nav-level-1" text="Home" onClick={() => handleRoute('/')} />
      <h3 className="section-title">React</h3>
      <h3 className="section-title">CSS</h3>
      <h3 className="section-title">Auth</h3>
      <h3 className="section-title">OS</h3>
      <h3 className="section-title">Network</h3>
      <h3 className="section-title">Defensive</h3>
      <h3 className="section-title">Offensive</h3>
      <h3 className="section-title">Microservices</h3>
      <h3 className="section-title">Go Concurrency</h3>
    </StyledNavigation>
  )
}
