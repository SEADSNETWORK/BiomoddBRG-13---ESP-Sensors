import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Theme from '../theme/';
import {Grid, Col, Row } from 'react-styled-flexboxgrid';
import makeConnector from '../services/TableauConnector';


const tableau = window.tableau;

const Button = ({text, onClick})=>{
    return <button onClick={onClick} style={{padding: "5px", background: "inherit", textTransform: "uppercase", width: "100%", border: "3px solid black", background: "black", color: "white", fontSize: "79%"}}>{text}</button>
}

export default ()=>{
    const [theme, themes] = useSelector(state => [state.data.theme, state.data.themes]);
    const [tc, setTc] = useState(null);

    useEffect(() => {
        if (!tc){
            let newTc = makeConnector();
            newTc.init();
            setTc(newTc);    
        }
    });   

    if (!theme){
        return "loading"
    } else {
        return <Grid style={{}}>
                <br/><br/>
                <theme.Container>
                    <theme.Wrapped>
                        <theme.Container>
                            <theme.Text>
                                <b>Connectors</b>
                                <br /><br />
                                {tc?<Row>
                                    <Col xs={12} sm={4}>
                                        <Button text="go" onClick={()=>{
                                            tc.submit()
                                        }} />
                                    </Col>
                                </Row>:null}
                            </theme.Text>
                        </theme.Container>
                    </theme.Wrapped>
            </theme.Container> 
        </Grid>
         
    }
}