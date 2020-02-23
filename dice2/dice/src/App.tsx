import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from './logo';
import { Provider } from 'react-redux';
import store from './store';
import Game from './game/game';
import Home from './game/home'
function App() {
  const [click, setclick] = useState<any>([[],[]])
  const checkWin = () =>{
    if(click[0][1] === click[1][1]){
     return  "You have been destined for greatness"
    }
  }
  return (
    <Provider store={store}> 
      <Container>
        <Home />
        <Game />
        {/* <Logo /> 
        <h1>Roll your life here</h1>
  
        <Users />
        {checkWin()}
          <div>
            <Dice /> 
          </div>
          <Click /> */}
      </Container>
    </Provider>
  );
}


export const Container = styled.div`
  width:70%;
  margin:auto;
`;


export default App;
