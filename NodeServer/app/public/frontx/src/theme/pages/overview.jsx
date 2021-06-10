import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Theme from '..';

export default ()=>{
    const [theme, themes] = useSelector(state => [state.data.theme, state.data.themes]);


    if (!theme){
        return "loading"
    } else {
        return <theme.Container>
                    <theme.Wrapped>
                        <theme.Container>
                            allo
                        </theme.Container>
                    </theme.Wrapped>
            </theme.Container> 
    }
}