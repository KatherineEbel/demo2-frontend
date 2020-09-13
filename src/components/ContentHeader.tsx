import styled from 'styled-components'
import React, { useState } from 'react'
import { Button } from './Button'
import { useApp } from '../providers/AppProvider'
import { MessageType, VOID_JWT } from '../websockets'

const StyledContentHeader = styled.div`
  min-height: 3rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: row;
  .app {
    &-label {
      font-family: 'Hackman-Bold', sans-serif;
    }
    &-italic {
      font-style: italic;
    }
  }
  .login-inputs {
    position: absolute;
    right: 5px;
    max-width: 35rem;
    display: flex;
    flex-direction: row;

    .text-link-btn {
      display: inline-block;
    }
    input {
      text-indent: 0.5rem;
      color: #cbcbcd;
      transition: border-color 150ms, box-shadow 150ms ease-out;
      border-radius: 4px;
      border: 1px solid #f4f4f5;
      &:last-of-type {
        margin-left: 5px;
      }
    }
    &:hover {
      color: #171718;
      box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1),
        0 3px 24px rgba(48, 51, 51, 0.09);
    }
  }
`
export default () => {
  const { webSocketId, setUser, request } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async () => {
    setUser({ email, password })
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
      <div className="ws-client-id">
        <span className="app-label">Client Id: </span>
        <span className="app-italic">{webSocketId}</span>
        <span className="app-label">Interacting with:</span>
        <span className="app-italic">??</span>
      </div>
      <div className="login-inputs">
        <input
          type="text"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          text="Log In"
          type="button"
          classes={['text-link-btn']}
          onClick={handleLogin}
        />
      </div>
    </StyledContentHeader>
  )
}
