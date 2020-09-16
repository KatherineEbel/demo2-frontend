import React from 'react'
import styled from 'styled-components'
import TestRestJwtForm from './Forms/TestRestJwtForm'
import { Icon, Intent } from '@blueprintjs/core'
import { useApp } from '../providers/AppProvider'
import { VOID_JWT } from '../websockets'
import SignUp from './Forms/SignUp'

const StyledAdminPanel = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  h3 {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
    span:first-of-type {
      margin-right: 1rem;
    }
  }
  .sign-up-forms {
    display: flex;
  }
`
const AdminPanel = () => {
  const { jwt } = useApp()
  const getIntent = (): Intent => {
    return jwt === VOID_JWT ? 'danger' : 'success'
  }

  type icon = 'lock' | 'unlock'
  const getIcon = (): icon => {
    return jwt === VOID_JWT ? 'lock' : 'unlock'
  }
  return (
    <StyledAdminPanel>
      <h3>
        <span>Admin Panel</span>
        <Icon intent={getIntent()} icon={getIcon()} />
      </h3>
      <SignUp />
      <TestRestJwtForm />
    </StyledAdminPanel>
  )
}

export default AdminPanel
