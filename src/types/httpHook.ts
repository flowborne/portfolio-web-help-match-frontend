import { RegisterData } from "./auth"


export type RequestBody =
  | string[]
  | File
  | FormData
  | {
      [key: string]:
        | string
        | number
        | boolean
        | null
        | undefined
        | string[]
        | number[]
        | RegisterData
        | Record<string, unknown>
        | { url: string }[]
    }

    export interface RequestHeaders {
      [key: string]: string
    }
    
export interface UseHTTPReturn {
  loading: boolean
  request: <T>(
    url: string,
    method?: string,
    body?:
      | RequestBody
      | RegisterData
      | RequestBody[]
      | null,

    headers?: RequestHeaders,
    isAuthRequest?: boolean,
    isBinaryResponse?: boolean,
    disableLoading?: boolean
  ) => Promise<T>
  error: string | null
  clearError: () => void
}


