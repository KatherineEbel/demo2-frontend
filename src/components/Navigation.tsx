import React, { FunctionComponent } from 'react'
import { useApp } from '../providers/AppProvider'
import { Button, Classes, Drawer, Icon, Position } from '@blueprintjs/core'
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
  const { setCurrentRoute } = appState
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
        <Button
          icon="home"
          intent="primary"
          onClick={() => setCurrentRoute('/')}
        />
        <NavTree setRoute={setCurrentRoute} handleSelect={handleClose} />
      </div>
    </Drawer>
  )
}
