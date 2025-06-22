import { RegisterData } from "~types/auth";
import { RequestBody, RequestHeaders } from "~types/httpHook";

type RequestFunction = <T>(
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?:
      | RequestBody
      | RequestBody[]
      |RegisterData
      | null,
    headers?: RequestHeaders,
    isAuthRequest?: boolean,
    isBinaryResponse?: boolean
  ) => Promise<T>


  export const postLogin = async (
    request: RequestFunction, 
    loginData: { userName: string; password: string; },
) => {
  
    try {
      const data = await request(
        `/help/api/auth/login`,
        'POST',
        loginData
      )
      return data
    } catch (err) {
      console.error( err)
      throw err
    }
  }

  export const postRegister = async (
    request: RequestFunction,
    registerData: RegisterData,
    referralKey?: string
  ) => {
    const headers: Record<string, string> = {}
    if (referralKey) {
      headers['x-referral-key'] = referralKey
    }
  
    try {
      const data = await request(
        '/help/api/auth/register',
        'POST',
        registerData,
        headers
      )
      return data
    } catch (err) {
      console.error(err)
      throw err
    }
  }


  export const getUserData = async (
    request: RequestFunction, 
) => {
    try {
      const data = await request(`/help/api/auth/me`,)
      return data
    } catch (err) {
      console.error( err)
      throw err
    }
  }


    export const postValidateReset = async (
    request: RequestFunction, 
   validateData: { 
       userName: string,
          securityQuestions: {
            question1: string,
            answer1: string,
            question2: string,
            answer2: string,
            question3: string,
            answer3: string
          },
           privateKeyPart: string
     },
) => {
  
    try {
      const data = await request(
        `/help/api/auth/validate-reset`,
        'POST',
       validateData
      )
      return data
    } catch (err) {
      console.error( err)
      throw err
    }
  }

      export const postReset = async (
    request: RequestFunction, 
   resetData: { 
newPassword: string,
resetToken: string
     },
) => {
  
    try {
      const data = await request(
        `/help/api/auth/reset-password`,
        'POST',
       resetData
      )
      return data
    } catch (err) {
      console.error( err)
      throw err
    }
  }

    export const putUser = async (
    request: RequestFunction, 
   requestData: { 
    avatar: string,
     },
) => {
  
    try {
      const data = await request(
        `/help/api/auth/update-profile`,
        'PUT',
      requestData
      )
      return data
    } catch (err) {
      console.error( err)
      throw err
    }
  }
  
    export const getUserDataById = async (
    request: RequestFunction, 
    userId: string
) => {
    try {
      const data = await request(`/help/api/auth/${userId}`,)
      return data
    } catch (err) {
      console.error( err)
      throw err
    }
  }






