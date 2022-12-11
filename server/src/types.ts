export interface WebSocketPayload {
  type: string,
  payload: object
}

export enum PayloadTypes {
  SET_CURSORS,
  SET_COLOR,
}
