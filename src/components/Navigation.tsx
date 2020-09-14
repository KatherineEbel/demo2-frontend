import React, { FunctionComponent, useEffect } from 'react'
import { Dashboard } from './Dashboard'
import { navigate, useRoutes } from 'hookrouter'
import { useApp } from '../providers/AppProvider'
import { Button, Classes, Drawer, Icon, Position } from '@blueprintjs/core'
import Halo from './halo/Halo'
import NavTree from './NavTree'

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
    '/': () => <Dashboard />,
    '/halo': () => <Halo />
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
        <NavTree setRoute={handleRoute} handleSelect={handleClose} />
      </div>
    </Drawer>
  )
}
