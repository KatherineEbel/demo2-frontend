import React, { FunctionComponent } from 'react'
import { useApp } from '../../providers/AppProvider'
import { BucketMessage } from '../../types'
import '@blueprintjs/core/lib/scss/variables.scss'
import styled from 'styled-components'

const StyledWebSocketPanel = styled.div`
  span.danger {
    color: #f55656;
  }
  span.warning {
    color: #f29d49;
  }
`
export const WebSocketPanel: FunctionComponent = () => {
  const { messageBuckets } = useApp()
  const { ws } = messageBuckets
  return (
    <StyledWebSocketPanel>
      {ws.length ? (
        ws.map((m: BucketMessage, i: number) => {
          return (
            <div key={i}>
              <span className={m.type}>{m.timeStamp}</span>
              <span>{m.message}</span>
            </div>
          )
        })
      ) : (
        <div>
          <p>No Messages yet.</p>
        </div>
      )}
    </StyledWebSocketPanel>
  )
}
