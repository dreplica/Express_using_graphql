interface Authent {
    STARTING: string;
    LOGIN: string;
    REGISTER: string;
    ERROR: string;
    LOADING: string;
}

//i put registered and login seperate so i can know where an action would come from
//incase of errors

const STARTING = 'Starting_browser';
const LOGIN = 'Login';
const REGISTER = 'Register'
const ERROR = "error"
const LOADING = "loading"

export const authType:Authent = {STARTING,LOGIN,REGISTER,ERROR,LOADING}
