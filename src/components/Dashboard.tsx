import React from 'react'
import ReactJson from 'react-json-view'
import styled from 'styled-components'
import { useApp } from '../providers/AppProvider'

const StyledDashboard = styled.div`
  max-width: 80%;
  flex: 1;
`
export const Dashboard = () => {
  const appData = useApp()
  return (
    <StyledDashboard>
      <ReactJson
        src={appData}
        style={{ overflow: 'hidden', padding: '10px' }}
        // theme="summerfruit:inverted"
        theme="pop"
        iconStyle="triangle"
        collapsed
        collapseStringsAfterLength={70}
      />
    </StyledDashboard>
  )
}
