import React, { useEffect, useState } from 'react'
import { createCtx } from './createCtx'
import { MessageType, RequestFunc, VOID_JWT } from '../websockets'
import { Props, ReadyState, User } from '../types'

type ContextProps = {
  authorized: boolean
  routeResult: string
  setRouteResult: (route: string) => void
  readyState: number
  webSocketId: string
  jwt: string
  user: User
  setUser: (user: User) => void
  request: RequestFunc
}

const [useApp, CtxProvider] = createCtx<ContextProps>()

const AppProvider = ({ children }: Props) => {
  const [routeResult, setRouteResult] = useState('/')
  const [readyState, setReadyState] = useState(null)
  const [webSocket, setWebSocket] = useState<WebSocket>(null)
  const [webSocketId, setWebSocketId] = useState()
  const [jwt, setJwt] = useState<string>(VOID_JWT)
  const [user, setUser] = useState<User>(null)
  const [authorized, setAuthorized] = useState(false)

  const heartbeat = async () => {
    setTimeout(() => {
      if (readyState !== webSocket.readyState) {
        setReadyState(webSocket.readyState)
      }
      heartbeat()
    }, 1000)
  }

  const request = async (
    jwt: string,
    type: MessageType,
    data: any
  ): Promise<void> => {
    return webSocket.send(JSON.stringify({ jwt, type, data }))
  }

  const configureWebSocket = async () => {
    if (webSocket === null) throw new Error('WebSocket not initialized')
    webSocket.onopen = () => {
      webSocket.onmessage = (event: MessageEvent) => {
        let tjo = JSON.parse(event.data)
        switch (tjo.type as MessageType) {
          case MessageType.ClientWebSocketId:
            setWebSocketId(tjo.data)
            break
          case MessageType.FatClientList:
            console.log(tjo['data'])
            break
          case MessageType.JwtToken:
            setUser({ ...JSON.parse(tjo.data), password: 'hidden' })
            setJwt(tjo.jwt)
            request(tjo.jwt, MessageType.ValidateJwt, 'noop')
            break
          case MessageType.JwtValid:
            if (user != null) {
            }
            const { Valid } = JSON.parse(tjo.data)
            setAuthorized(Valid)
            break
          case MessageType.InvalidCredentials:
            setJwt(VOID_JWT)
            setAuthorized(false)
            break
          default:
            console.log(`Unknown message type: ${tjo['type']}`)
        }
      }
      webSocket.onclose = event => {
        console.log(event)
      }
      webSocket.onerror = event => {
        console.log(event)
      }
    }
  }

  useEffect(() => {
    if (webSocket === null)
      setWebSocket(new WebSocket('wss://demo2.kathyebel.dev:1200/ws'))
    if (webSocket !== null) {
      configureWebSocket()
      heartbeat()
    }
  }, [webSocket])

  const loadStoredJwt = () => {
    const storedJwt = window.localStorage.getItem('demo2-JWT')
    if (storedJwt && !authorized) {
      if (readyState === ReadyState.OPEN) {
        let parsedJwt = JSON.parse(atob(storedJwt.split('.')[1]))
        let exp = new Date(parsedJwt.exp * 1000).toUTCString()
        let now = new Date(Date.now()).toUTCString()
        if (exp > now) {
          setJwt(storedJwt)
          setUser(JSON.parse(localStorage.getItem('User')))
          request(storedJwt, MessageType.ValidateJwt, 'noop')
        }
        if (exp < now) {
          setAuthorized(false)
          localStorage.removeItem('demo2-JWT')
        }
      } else {
        setAuthorized(false)
      }
    }
  }

  useEffect(() => {
    loadStoredJwt()
  }, [readyState])

  useEffect(() => {
    if (authorized && jwt !== VOID_JWT) {
      console.log('User Authorized')
      window.localStorage.setItem('demo2-JWT', jwt)
      user && window.localStorage.setItem('User', JSON.stringify(user))
    }
  }, [authorized])
  return (
    <CtxProvider
      value={{
        authorized,
        routeResult,
        setRouteResult,
        request,
        readyState,
        jwt,
        user,
        webSocketId,
        setUser
      }}
    >
      {children}
    </CtxProvider>
  )
}

export { useApp, AppProvider }
