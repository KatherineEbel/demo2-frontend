import styled from 'styled-components'
import React, { useState } from 'react'
import { useApp } from '../providers/AppProvider'
import { MessageType, VOID_JWT } from '../websockets'
import { Alignment, Button, InputGroup, Navbar } from '@blueprintjs/core'
import { Navigation } from './Navigation'

const StyledContentHeader = styled.div`
  min-height: 3rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: row;
  span {
    margin: 0 8px 0 8px;
  }
  .app {
    &-label {
      font-family: 'Hackman-Bold', sans-serif;
    }
    &-italic {
      font-style: italic;
    }
  }
  .bp3-button {
    margin-left: 8px;
  }

  .bp3-input-group:last-of-type {
    margin-left: 8px;
  }
`
export default () => {
  const { webSocketId, request, authorized, logOut } = useApp()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async () => {
    await request(
      VOID_JWT,
      MessageType.GetJWT,
      JSON.stringify({
        email: btoa(email),
        password: btoa(password)
      })
    )
    setEmail('')
    setPassword('')
  }
  return (
    <StyledContentHeader>
      <Navbar fixedToTop className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Button
            fill={false}
            large
            icon="menu-open"
            onClick={() => setDrawerOpen(true)}
          />
          <Navbar.Heading>
            <span className="app-label">Client Id: </span>
            <span className="app-italic">{webSocketId}</span>
            <span className="app-label">Interacting with:</span>
            <span className="app-italic">??</span>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {!authorized ? (
            <>
              <InputGroup
                type="email"
                leftIcon="envelope"
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
              />
              <InputGroup
                type="password"
                leftIcon="lock"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                text="Log In"
                type="button"
                intent="primary"
                onClick={handleLogin}
              />
            </>
          ) : (
            <Button
              text="Log Out"
              type="button"
              intent="primary"
              onClick={logOut}
            />
          )}
        </Navbar.Group>
      </Navbar>
      <Navigation open={drawerOpen} handleClose={setDrawerOpen} />
    </StyledContentHeader>
  )
}
