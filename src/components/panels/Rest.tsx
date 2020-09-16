import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useApp } from '../../providers/AppProvider'
import { BucketMessage } from '../../types'

const StyledRestPanel = styled.div`
  span.danger {
    color: #f55656;
  }
  span.warning {
    color: #f29d49;
  }
  span.success {
    color: #15b371;
  }
`
const RestPanel: FunctionComponent = () => {
  const {
    messageBuckets: { rest }
  } = useApp()
  return (
    <StyledRestPanel>
      {rest.length ? (
        rest.map((m: BucketMessage, i: number) => {
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
    </StyledRestPanel>
  )
}

export default RestPanel
