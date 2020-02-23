import React, { useRef, MouseEvent, useState } from 'react';
import { connect } from 'react-redux';
import { stater, watch } from '../reducers';
import { Dispatch } from 'redux';
import styled from 'styled-components';

interface userObj {
    user:string;
    target:number;
    point:number;
}

const Home:React.FC<{login:(args:stater)=>void,data:stater[]}> = ({login,data}) => {
    const [targ, setTarg] = useState<string>("2")
    const [register, setregister] = useState(0)
    const username = useRef<HTMLInputElement>(null)
    const handleSubmit = (e:MouseEvent) =>{
        e.preventDefault();
        const user:stater = {
            user:username.current?.value as string,
            target:parseInt(targ), 
            points:0,
            id:data.length
        }
        login(user)
        setregister(register + 1)
        console.log(user)
    }
  return ( 
    <>
    {register !== 4 && 
    <Form>
        <input type='text' ref={username} placeholder='enter your game name'/>

        <label>select Number 2 - 12 ({targ})</label>
            <select onChange={(e)=>setTarg(e.target.value)}>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
            </select>
            {/* <input type='range' min='2' value={targ} max='12' /> */}
        
        <br/>
        <button type='button' onClick={handleSubmit}>Enter Game</button>
    </Form>}
    </>
  );
}

const log = (args:stater)=>(dispatch:Dispatch)=>dispatch({type:'login',payload:args})
const mapState = (state:watch)=>({
    data:state.data
})
export default connect(mapState,{login:log})(Home)

// export default Home

export const Form = styled.div`
    width:200px;
    position:relative;
    top:35vh;
    left:40%;
    padding:20px;
    background:rgb(6, 220, 248);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

        input{
            width:100%;
            padding:5px;
            border:0px;
            background:white;
            height:30px;
        }
        label{
            width:100%;
            padding:15px;
        }
        select{
            width:90%;
            height:30px;
            overflow-y:scroll;
        }
`