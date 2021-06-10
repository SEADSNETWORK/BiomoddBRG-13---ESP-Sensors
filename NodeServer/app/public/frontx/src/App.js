import React, {useEffect} from 'react';
import Theme, {OverviewPage} from './theme'
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import Store from "./Store";
import { createBrowserHistory } from 'history';
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS as DATA_ACTIONS } from "./reducers/DataReducer"
import sanityclient from './client';
import Server from './components/server'
import Nav from './components/nav'

import { Grid, Col, Row} from './theme'
import Game from './components/game'


import './assets/fonts/'
import BuilderTheme from './services/Buildertheme'
import Home from './components/Home'

const DataHelper = () => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!data.client && dispatch){
      const cli = sanityclient(dispatch);
      dispatch({ type: DATA_ACTIONS.SET_CLIENT, client: cli});
    } 

    if (!data.theme && dispatch ){
      const builder = new BuilderTheme();
      dispatch({type: DATA_ACTIONS.SET_THEME, theme: new BuilderTheme()})
      // dispatch({type: DATA_ACTIONS.SET_THEMES, themes: [new BuilderTheme()]})
    }

  })
  return (
    null
  )
}


const App =()=>{
  const history = createBrowserHistory()
  const theme = new BuilderTheme();

  return (
    <Provider store={Store}>
    <DataHelper />
      <Router history={history}>

        <Grid>

        

        <Nav />
        
      
        <span>
       
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/overview" component={OverviewPage} />
              <Route exact path="/server" component={Server} />
              <Route exact path="/game" component={Game} />
              
              <Route component={Home}/>
            </Switch>
        </span>

        </Grid>
      </Router>
  </Provider>
  );
}

export default App;
