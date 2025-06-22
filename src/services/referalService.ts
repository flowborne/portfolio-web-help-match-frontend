import { RequestBody, RequestHeaders } from "~types/httpHook";


type RequestFunction = <T>(
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: RequestBody | RequestBody[] | null ,
  headers?: RequestHeaders,
  isAuthRequest?: boolean,
  isBinaryResponse?: boolean
) => Promise<T>;

export const postReferalLink= async (
    request: RequestFunction,
  ) => {
    try {
      const data = await request(
        `/help/api/auth/invite`,
        'POST',
      );
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  