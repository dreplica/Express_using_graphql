export interface upload{
    img1:Array<string|number>
    img2:Array<string|number>
}
export type stater = {user:string;points:number; target:Number;id?:number}
export interface watch {
    data: Array<stater>;
    watch:stater;
    images:upload;
    start:undefined | boolean;
    
}


export type action = {
    type:string;
    payload?:object|string|stater|watch['images']; 
    number?:number
}
const stateType : watch ={
    data:[],
    watch:{user:"",points:0,target:0},
    images:{img1:[],img2:[]},
    start:undefined,
} 


const Reducer = (state = stateType,action:action):watch =>{
    switch(action.type){
        case 'login':
            return {
                ...state,
                data:state.data.concat(action.payload as stater)
            }
        case 'gotPoint':
            return {
                ...state,
                data:state.data.map((user)=>user.id === (action.number as number)?{...user,points:user.points + 1}:user)
            }
        case 'watch':
            console.log(action.payload)
            console.log("here is watch",state.data.filter(user=>action?.number === user.id))
            return {
                ...state,
                watch:{...action.payload as stater}, 
            }
        case 'start':
            return {
                ...state,
                start:true,
            }
        // case 'click':
        //     return {
        //         ...state,
        //         images:{...action.payload as watch['images']}
        //     }
        default:
            return state
    }
}

export default Reducer;