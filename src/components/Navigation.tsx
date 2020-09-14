import React, { FunctionComponent, useEffect } from 'react'
import { Dashboard } from './Dashboard'
import { navigate, useRoutes } from 'hookrouter'
import { useApp } from '../providers/AppProvider'
import { Button, Classes, Drawer, Icon, Position } from '@blueprintjs/core'

interface INavigationProps {
  open: boolean
  handleClose: (boolean) => void
}

export const Navigation: FunctionComponent<INavigationProps> = ({
  open,
  handleClose
}) => {
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
    <Drawer
      position={Position.LEFT}
      canEscapeKeyClose
      isOpen={open}
      size={Drawer.SIZE_SMALL}
      className={Classes.DARK}
      canOutsideClickClose
      onClose={() => handleClose(false)}
    >
      <div className={Classes.DRAWER_HEADER}>
        <Icon icon="code" iconSize={40} intent="warning" />
      </div>
      <div className={Classes.DRAWER_BODY}>
        <Button icon="home" intent="primary" onClick={() => handleRoute('/')} />
        <h3 className="section-title">React</h3>
        <h3 className="section-title">CSS</h3>
        <h3 className="section-title">Auth</h3>
        <h3 className="section-title">OS</h3>
        <h3 className="section-title">Network</h3>
        <h3 className="section-title">Defensive</h3>
        <h3 className="section-title">Offensive</h3>
        <h3 className="section-title">Microservices</h3>
        <h3 className="section-title">Go Concurrency</h3>
      </div>
    </Drawer>
  )
}
