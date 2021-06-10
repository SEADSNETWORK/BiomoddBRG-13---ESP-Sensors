import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { Grid, Col, Row, Theme} from '../theme'
import { io } from "socket.io-client";
import Spectrum from '../components/spectrum'

const Game = ()=>{
    const theme = useSelector(state => state.data.theme);
    const [gameSettings, setGameSettings] = useState(undefined);
    const [returnData, setReturnData] = useState(undefined);
    let socket;

    useEffect(()=>{
        if (!gameSettings && socket){
          socket.emit("/gamesettings");
        }
      })


    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
        socket = io("http://localhost:2200/", { transports: ["websocket"] });
    } else {
        socket= io();
    }

    socket.on("/gamesettings", (settings)=>{
        if (!gameSettings){
          setGameSettings(settings);  
        }
      })
  
      socket.on("/push", (results)=>{
  
          console.log(results)
  
          setReturnData(results.map(r=><>
              {JSON.stringify(r)} <br/>
          </>))
      } )

    if (!theme){
        return null;
    }

    return <Row center="xs">
    <Col xs={12} sm={8} md={6}>
    <theme.Container>
      <br/><br/>
      <theme.Wrapped>
        <theme.Container>
          <theme.Title>
              GAME
          </theme.Title>
          <br/>

          <theme.SubTitle>
            Simple version
          </theme.SubTitle>
          <theme.Text>
            Proof of concept game version with simulated data - will be updated as the development progresses
            <br/>
            <a href="https://docs.google.com/document/d/1EDprQQhg2VJHW0SUoAcNhATV1XVfRxaYFhYVQjl9Rd8/edit" target="_blank">
              --> Game concept master
            </a>
            <br/><br/>
            {gameSettings?<Spectrum socket={socket} /> : "LOADING" }
            
          </theme.Text>
        </theme.Container>
      </theme.Wrapped>
    </theme.Container>
  </Col>
  </Row>
}

export default Game;


