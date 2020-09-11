import React from 'react'
import ReactJson from 'react-json-view'
import styled from 'styled-components'
import { useApp } from '../providers/AppProvider'

const StyledDashboard = styled.div`
  .react-json-view {
    padding: 10px;
  }
`
export const Dashboard = ({ data }) => {
  return (
    <StyledDashboard>
      <ReactJson
        src={data}
        theme="summerfruit:inverted"
        iconStyle="triangle"
        collapsed
      />
    </StyledDashboard>
  )
}
