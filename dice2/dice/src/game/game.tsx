import React, {MouseEvent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { stater, watch } from '../reducers';
import { Dispatch } from 'redux';
import Rolling from './image'

interface props {
    user:string;
    target:number;
    point:number;
}

const Game:React.FC<{}> = () => {
    const [count, setCount] = useState<number>(30)
    useEffect(() => {
        let counting:number;
        if(count >=1){
            counting = setInterval(_=>{setCount(count - 1)},1000)
        }
      return () => {
        clearInterval(counting)
      };
    }, [count,setCount])
  return (  
    <>
    {(count >=1 )&& <h1>...Game Starts in {count}</h1>}
    {(count === 0) && <Rolling />}
    </>
  );
}

// const log = (args:stater)=>(dispatch:Dispatch)=>dispatch({type:'watch',payload:args})
// const mapStateToProps = (state:watch) =>({
//   data:state.data
// })
// export default connect(mapStateToProps,{watch:log})(Game)

export default Game