export type IOptimizerInput =
  | Buffer
  | Uint8Array
  | Uint8ClampedArray
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array
  | string

export interface ISize {
  width: number
  height: number
}

export interface IRect extends ISize {
  top: number
  left: number
}
