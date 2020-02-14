import { authType } from "../ActionCreators/auth/Authactions";
import { actionType } from "../ActionCreators/auth/AuthactionFunc";

export interface Stater{
    auth: string | undefined;
    isLoading: boolean;
    error: string | undefined;
}
const authenticateReducer = (state:Stater = {auth:undefined,isLoading:false,error:""}, action:actionType) => {
    switch (action.type) {
        case authType.STARTING:
            if (localStorage['tok']) {
                return {
                    ...state,
                    auth:JSON.parse(localStorage['tok'])
                }
            }
            return {
                ...state,
                auth: undefined
            }
        case authType.LOGIN:
            localStorage['tok'] = action.payload;
            return {
                ...state,
                auth:action.payload
            }
        case authType.REGISTER:
            localStorage['tok'] = action.payload;
            return {
                ...state,
                auth: action.payload
            }
        case authType.LOADING:
            return {
                ...state,
                isLoading:action.payload
            }
        case authType.ERROR:
            return {
                ...state,
                error:action.payload
            }
        default:
            return state;
    }
}

export default authenticateReducer