import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useApp } from '../../providers/AppProvider'
import { Button } from '@blueprintjs/core'

const StyledTestRestJwtForm = styled.form``

const TestRestJwtForm: FunctionComponent = () => {
  const { jwt, updateMessageBucket } = useApp()

  const handleSubmit = async e => {
    e.preventDefault()
    await getRestJwt()
  }
  const getRestJwt = async () => {
    const {
      data: { type }
    } = await axios('https://demo2.kathyebel.dev:1200/rest/test/jwt', {
      headers: { Authorization: `Bearer ${jwt}` }
    })
    switch (type) {
      case 'rest-jwt-token-invalid':
        await updateMessageBucket('rest', 'danger', 'JWT Token Invalid')
        break
      case 'rest-jwt-token-valid':
        await updateMessageBucket('rest', 'success', 'JWT Token Valid!!!')
        break
      default:
        break
    }
  }

  return (
    <StyledTestRestJwtForm>
      <Button
        type="submit"
        intent="primary"
        text="Test Rest JWT :: GET"
        onClick={handleSubmit}
      />
    </StyledTestRestJwtForm>
  )
}

export default TestRestJwtForm
