import React, {useState} from 'react';
import { io } from "socket.io-client";
import { Grid, Col, Row, Theme} from '../theme'
import Input from './Input';
import { useSelector } from "react-redux";


const Server = ()=>{
    const theme = useSelector(state => state.data.theme);
    const [author, setAuthor] = useState("");
    const [device, setDevice] = useState('');
    const [sensor, setSensor] = useState('');
    const [returnData, setReturnData] = useState(undefined);
    let socket;

    console.log(window.location.hostname)

    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
        socket = io("http://localhost:2200/", { transports: ["websocket"] });
    } else {
        socket= io();
    }

    socket.on("/push", (results)=>{
  
        console.log(results)

        setReturnData(results.map(r=><>
            {JSON.stringify(r)} <br/>
        </>))
    } )

    if (!theme){
        return null;
    }

    return <Row align="center">
        <Col xs={12} sm={8} md={6}>
          <theme.Container>
            <br/><br/>
            <theme.Wrapped>
              <theme.Container>
                <theme.Title >
                    Store and retrieve data (RESTFul API)
                </theme.Title>
                <br/>
                <theme.SubTitle>
                  Store data
                </theme.SubTitle>
                <theme.Text>
                  <code style={{fontSize: "1.4em"}}>
                    /push?var1=value1&var2=val2
                  </code>
                  <br/>
                  <b>required fields</b> :  author, device, sensor, value
                  <br/>
                  Example: 
                  <br/>
                  <i>/push?author=Pieter&device=T&sensor=ts&value=22</i>
                </theme.Text>
                <br/><br/>
                <theme.SubTitle>
                  Retrieve data
                </theme.SubTitle>
                <theme.Text>
                  <code style={{fontSize: "1.4em"}}>
                      /data?var1=value1&var2=val2
                  </code>
                  <br/>
                  <b>required fields</b> :  author, device and/or sensor
                  <br/><br/>
                  Example: 
                  <br/>
                  <i>
                    <a href="http://www.biomodd.xyz/data?author=Pieter" target="_blank">
                      /data?author=Pieter
                    </a>
                    </i>
                  <br/>
                  This will select only the data entries that have been added by the author Pieter
                  <br/><br/>
                  Example: 
                  <br/>
                  <i>
                  <a href="http://www.biomodd.xyz/data?device=Test&author=Pieter" target="_blank">
                    /data?device=Test&author=Pieter
                      </a>
                    </i>
                  <br/>
                  This will select only the data entries that have been added by the author Pieter and device "Test"
                  <br/>
                </theme.Text>
              </theme.Container>
            </theme.Wrapped>
          </theme.Container>
        </Col>
        <Col xs={12} sm={8} md={6}>
          <theme.Container>
            <br/><br/>
            <theme.Wrapped>
              <theme.Container>
                <theme.Title >
                    Store and retrieve data (WEBSOCKET)
                </theme.Title>
                <br/>
                <theme.SubTitle>
                  Store data
                </theme.SubTitle>
                <theme.Text>
                    Connect to the socket on this server, and send a message "/push" with an object (js) with the fields:  author, device, sensor, value
                </theme.Text>
                <br/><br/>
                <theme.SubTitle>
                  Retrieve data
                </theme.SubTitle>
                <theme.Text>
                    Connect to the socket on this server, and send a message "/data" with an object (js) with the fields:  author, device and/or sensor,
                    you will get back a list (js) which contains the selection (AND logic).
                </theme.Text>
                <br/><br/>
                <theme.Wrapped>
                    <theme.Container>
                        <Input label="author" value={author} setValue={setAuthor} />
                        <Input label="device" value={device} setValue={setDevice} />
                        <Input label="sensor" value={sensor} setValue={setSensor}/>
                    </theme.Container>
                </theme.Wrapped>
                <br/>
                
                <theme.Text style={{width: "auto"}}>
                    Search for entries <br/> 
                    author: {author?author:"any"}, <br/>
                    device: {device?device:"any"}, <br/>
                    sensor: {sensor?sensor:"any"}
                </theme.Text>
                <br/><br/>
                &nbsp;&nbsp;<button style={{
                    fontSize: "2em",
                    background: "blue",
                    color: "white",
                    paddingLeft: "10px"
                }} onClick={()=>{
                    const rv = {};
                    if (author && author!==''){
                        rv.author = author;
                    }
                    if (device && device!==''){
                        rv.device = device;
                    }
                    if (sensor && sensor!==''){
                        rv.sensor = sensor;
                    }
                    socket.emit("/data", rv)
                }}> GO
                    
                    </button>

                    <br/><br/><br/>

                    <theme.Text>
                    {returnData? returnData:null}
                    </theme.Text>
                

              </theme.Container>
            </theme.Wrapped>
          </theme.Container>
        </Col>
      </Row> 
}

export default Server;


