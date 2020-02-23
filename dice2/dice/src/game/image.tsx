import React, { useState, MouseEvent, useEffect } from 'react';
import one from '../dicer/one.png'
import two from '../dicer/two.png'
import tre from '../dicer/tre.png'
import four from '../dicer/four.png'
import five from '../dicer/five.png'
import six from '../dicer/six.png'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { upload, watch, stater } from '../reducers';

const img:string[] = [one,two,tre,four,five,six]
interface props{
    watch:stater;
    data:stater[];
    watchlog:(arg:stater)=>void;
    getpoint:(arg:number)=>void;
}

const Rolling:React.FC<props> = ({watch,data,watchlog,getpoint}) => {
    const [imgState, setimgState] = useState<string[]>([])
    const [next, setnext] = useState(0)
    useEffect(() => {
        watchlog(data[next]);
    }, [next])
    const data_length = data.length;
    const handleClick = (e:MouseEvent) =>{
        const random = Math.floor(Math.random()*6);
        const random2 = Math.floor(Math.random()*6);
        const value:string[] = [img[random] as string,img[random2] as string]
        const total = (random + 1 ) + (random2 + 1);

        if(watch.target === total){
            getpoint(watch.id as number)
        }

        setimgState(value)
        if(next < (data_length-1)){
            setnext(next + 1);
            // watchlog(data[next]);
            return
        }
        setnext(0)
    }
  return (
    <>
    <h3>current user = {watch.user} next: {next}  length:{data.length}</h3>
    <div>
        <img src={imgState[0] as string} alt=''/>
        <img src={imgState[1] as string} alt=''/>
    </div>
    <button onClick={handleClick}>Roll</button>
    </>
  );
}

const getImages = (payload:upload)=>(dispatch:Dispatch)=>{
    dispatch({type:'click',payload})
}
const log = (args:stater)=>(dispatch:Dispatch)=>dispatch({type:'watch',payload:args})

const getPoint = (args:number)=>(dispatch:Dispatch)=>{
    dispatch({type:'gotPoint',number:args})
}
const mapStateToProps = (state:watch)=>({
    watch:state.watch,
    data:state.data
})

export default connect(mapStateToProps,{
                        uploadImages:getImages,
                        watchlog:log,
                        getpoint:getPoint})(Rolling)