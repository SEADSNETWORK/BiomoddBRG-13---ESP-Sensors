import React from 'react';
import { useSelector } from "react-redux";
import { Grid, Col, Row, Theme} from '../theme'
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.svg'

const Nav = ()=>{
    const theme = useSelector(state => state.data.theme);

    if (!theme){
        return null;
    }

    return <Row center="xs">

        <Col xs={8} sm={2}>
            <NavLink to="/">
            <img src={Logo} style={{width: "100%"}}/>
            </NavLink>
        </Col>
        <Col xs={12} sm={10}>
            <br/><br/>
            <NavLink to="/">
            <theme.Title style={{color: "white", fontSize: "4em"}}>
                &nbsp;BIOMODD [BRG<sup>13</sup>]
            </theme.Title>
            </NavLink>
            <theme.Container>
            <theme.Text>
                <NavLink to="/game" style={{color: "white"}}>
                &nbsp;&nbsp;&nbsp;-> TEST GAME
                </NavLink>
                <NavLink to="/server" style={{color: "white"}}>
                &nbsp;&nbsp;&nbsp;-> TEST SERVER
                </NavLink>
                <NavLink to="/" style={{color: "white"}}>
                &nbsp;&nbsp;&nbsp;-> HOME
                </NavLink>
            </theme.Text>
            </theme.Container>
            

        </Col>

       
    </Row>

}

export default Nav;


{/* <theme.Container>
            <br/><br/>
            <theme.Wrapped>
              <theme.Container>
                <theme.Title>
                    GoTo
                </theme.Title>
                <theme.Text>
                  <ul>
                    <li onClick={getScroller(newsref)}>
                      -> news
                    </li>
                    <li onClick={getScroller(gameref)}>
                      -> game
                    </li>
                    <li onClick={getScroller(restref)}>
                      -> store and retrieve data (RESTful)
                    </li>
                    <li onClick={getScroller(socketref)}>
                      -> store and retrieve data (WEBSOCKET)
                    </li>
                  </ul>
                </theme.Text>
              </theme.Container>
            </theme.Wrapped>
          </theme.Container> */}