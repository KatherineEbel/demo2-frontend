import React, { useEffect, useState } from 'react'
import { createCtx } from './createCtx'
import { MessageType, RequestFunc, VOID_JWT } from '../websockets'
import {
  BucketMessage,
  BucketMessageType,
  BucketName,
  Props,
  ReadyState,
  User
} from '../types'
import { Dashboard } from '../components/Dashboard'
import Halo from '../components/halo/Halo'
import { navigate, useRoutes } from 'hookrouter'

type AppContextType = {
  authorized: boolean
  currentRoute: string
  setCurrentRoute: (route: string) => void
  routeResult: any
  readyState: number
  webSocketId: string
  jwt: string
  user: User
  request: RequestFunc
  logOut: () => void
  messageBuckets: { [key in BucketName]: BucketMessage[] }
}

const [useApp, CtxProvider] = createCtx<AppContextType>()
const routes = {
  '/': () => <Dashboard />,
  '/halo': () => <Halo />
}

const AppProvider = ({ children }: Props) => {
  const routeResult = useRoutes(routes)
  const [currentRoute, setCurrentRoute] = useState('/halo')
  const [readyState, setReadyState] = useState(0)
  const [webSocket, setWebSocket] = useState<WebSocket>(null)
  const [webSocketId, setWebSocketId] = useState()
  const [jwt, setJwt] = useState<string>(VOID_JWT)
  const [user, setUser] = useState<User>(null)
  const [authorized, setAuthorized] = useState(false)
  const [messageBuckets, setMessageBuckets] = useState<
    {
      [key in BucketName]: BucketMessage[]
    }
  >({ rest: [], ws: [] })

  const updateMessageBucket = async (
    bucket: BucketName,
    type: BucketMessageType,
    message: string
  ): Promise<void> => {
    const d = new Date()
    const timeStamp = `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] `
    const m: BucketMessage = { timeStamp, type, message }
    // const mb = {[bucket]: [m, ...messageBuckets[bucket]]}
    const b = [m, ...messageBuckets[bucket]]
    const buckets = { ...messageBuckets, [bucket]: b }
    setMessageBuckets(buckets)
  }
  const logOut = () => {
    setJwt(VOID_JWT)
    setUser(null)
    setAuthorized(false)
    window.localStorage.removeItem('demo2JWT')
  }
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
            updateMessageBucket('ws', 'warning', 'invalid credentials')
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
    navigate(currentRoute)
  }, [currentRoute])

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
        currentRoute,
        setCurrentRoute,
        routeResult,
        logOut,
        request,
        readyState,
        jwt,
        user,
        webSocketId,
        messageBuckets
        // setUser,
      }}
    >
      {children}
    </CtxProvider>
  )
}

export { useApp, AppProvider }
