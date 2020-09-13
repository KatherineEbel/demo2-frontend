import React from 'react'
import { Icon, Intent, Tab, Tabs } from '@blueprintjs/core'
import { InterfacePanel } from './panels/Interface'
import styled from 'styled-components'
import { WebSocketPanel } from './panels/WebSocket'
import { RestPanel } from './panels/Rest'
import { useApp } from '../providers/AppProvider'
import { ReadyState } from '../types'

const StyledConsole = styled.div`
  grid-column: 1 / span 2;
  max-width: 100vw;
  .bp3-tab {
    color: aliceblue;
  }
`
export const Console = () => {
  const { readyState } = useApp()
  const intent = (): Intent => {
    switch (readyState) {
      case ReadyState.CONNECTING || ReadyState.CLOSING:
        return Intent.WARNING
      case ReadyState.OPEN:
        return Intent.SUCCESS
      case ReadyState.CLOSED:
        return Intent.DANGER
      case ReadyState.CLOSING:
        return Intent.WARNING
    }
  }
  const handleChange = e => {
    console.log(e)
  }
  return (
    <StyledConsole>
      <Tabs onChange={handleChange} renderActiveTabPanelOnly={true}>
        <Tab id="interface" title="Interface" panel={<InterfacePanel />} />
        <Tab id="rest" title="Rest" panel={<RestPanel />} />
        <Tab id="websocket" title="WebSocket" panel={<WebSocketPanel />}>
          <span> (</span>
          <Icon icon="pulse" intent={intent()} iconSize={20} />
          <span> State: {readyState}</span>)
        </Tab>
      </Tabs>
    </StyledConsole>
  )
}
