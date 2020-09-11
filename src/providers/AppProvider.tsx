import React, { useEffect, useState } from 'react'
import { Props } from '../types'
import { createCtx } from './createCtx'
import { MessageType, RequestFunc } from '../websockets'

type ContextProps = {
  routeResult: string
  setRouteResult: (route: string) => void
  // mongoTargets: string[]
  // setMongoTargets: (target: any) => void
  readyState: number
  // setReadyState: (state: number) => void
  // webSocket: WebSocket
  // setWebSocket: (socket: WebSocket) => void
  webSocketId: string
  // setWebSocketId: (id: string) => void
  jwt: string
  setJwt: (jwt: string) => void
  request: RequestFunc
}

const [useApp, CtxProvider] = createCtx<ContextProps>()

const AppProvider = ({ children }: Props) => {
  const targets: any[] = []
  const [routeResult, setRouteResult] = useState('/')
  // const [mongoTargets, setMongoTargets] = useState(targets)
  const [readyState, setReadyState] = useState(0)
  const [webSocket, setWebSocket] = useState<WebSocket>(null)
  const [webSocketId, setWebSocketId] = useState()
  const [jwt, setJwt] = useState<string>('^vAr^')

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
        console.log(event)
        let tjo = JSON.parse(event.data)
        switch (tjo['type'] as MessageType) {
          case MessageType.WSConnectSuccess:
            setWebSocketId(tjo['data'])
            break
          case MessageType.WSVerifiedJwt:
            setJwt(tjo['data'])
            request(tjo['data'], MessageType.ValidateJwt, 'noop')
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
      request(jwt, MessageType.RegisterClient, 'noop')
    }
  }

  useEffect(() => {
    if (!webSocket)
      setWebSocket(new WebSocket('wss://demo2.kathyebel.dev:1200/ws'))
    if (webSocket && readyState === 0) {
      configureWebSocket()
      heartbeat()
    }
  }, [webSocket, readyState])
  return (
    <CtxProvider
      value={{
        routeResult,
        setRouteResult,
        // mongoTargets,
        // setMongoTargets,
        request,
        readyState,
        webSocketId,
        jwt
      }}
    >
      {children}
    </CtxProvider>
  )
}

export { useApp, AppProvider }
