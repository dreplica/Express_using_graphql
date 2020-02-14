import { authType } from "./Authactions";
import { Dispatch } from "redux";

export interface actionType{
    type: string|boolean;
    payload?: any[]|string;
    isLoading?: boolean;
    error?: string;
}

export const starting = (): actionType => ({
    type: authType.STARTING,
})

export const login = (payload: string): actionType => ({
    type: authType.LOGIN,
    payload
    
})

export const register = (payload:string): actionType => ({
    type: authType.REGISTER,
    payload
    
})
export const error = (payload: string): actionType => ({
    type: authType.ERROR,
    payload
    
})
 const isLoading = (payload:boolean):actionType=> ({
    type: authType.LOADING,
    isLoading:payload
    
})



export const getTokenFromLocal = () => {
    return (dispatch: any) => {
        try { 
            
            dispatch(isLoading(true))
            dispatch(starting())
            dispatch(isLoading(false))
        } catch (error) {
            dispatch(error(error.message))
        }
    }
}
export const getTokenFromRegister = (token:string) => {
    return (dispatch:(args:actionType)=>actionType) => {
        try{
            dispatch(isLoading(true))
            dispatch(register(token))
            dispatch(isLoading(false))
            console.log("has returned token",token)
            // return token;
         } catch (erro) {
            dispatch(error(erro.message))
        }
    }
}
export const getTokenFromLogin = (token:any) => {
    return (dispatch:(args:actionType)=>actionType)  => {
        try{
            dispatch(isLoading(true))
            dispatch(login(token))
            dispatch(isLoading(false))
             } catch (error) {
            dispatch(error(error.message))
        }
    }
}