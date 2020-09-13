export const VOID_JWT = '^jWt^'

export enum MessageType {
  GetJWT = 'get-jwt',
  ValidateJwt = 'validate-jwt',
  WSVerifiedJwt = 'ws-verified-jwt',
  JwtToken = 'jwt-token',
  JwtValid = 'jwt-valid',
  InvalidCredentials = 'invalid-credentials',
  ClientWebSocketId = 'client-websocket-id',
  FatClientList = 'fat-client-list'
}

export type RequestFunc = (
  jwt: string,
  type: MessageType,
  data: any
) => Promise<void>
