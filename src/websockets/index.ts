export enum MessageType {
  GetJWT = 'get-jwt',
  ValidateJwt = 'validate-jwt',
  WSConnectSuccess = 'websocket-connect-success',
  WSVerifiedJwt = 'ws-verified-jwt',
  RegisterClient = 'register-client',
  ClientWebSocketId = 'client-websocket-id'
}

export type RequestFunc = (
  jwt: string,
  type: MessageType,
  data: any
) => Promise<void>
