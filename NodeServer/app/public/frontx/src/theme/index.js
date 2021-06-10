import React from 'react'
import styled from 'styled-components'
import "./theme.css"
import Overview from './pages/overview'
export {Grid, Col, Row } from 'react-styled-flexboxgrid';
/* 
    - TOAST
    - support multiple themes
    - set basic html (background etc)
    - build in version control
    - Text
    - Title
    - Subtitle
    - Container
    - CollapsibleContainer
    - Button
*/

export const OverviewPage = Overview;

let settings = {
    
};

class Theme {
    constructor() {
        this.colors = {
          primary: "black",
          secondary: "white",
          tertiary: "red"
        };

        this.colors.text = {
            primary: this.colors.secondary,
            secondary: this.colors.primary
        }

        this.defaultWrapWidth = 3;

        this.font = "American Typewriter"

        this.sizes = {
            normal: "1.2em",
            title: "2em",
            subtitle: "1.4em"
        }

        this.medias = {
          em: {
            xs: 0,  
            sm: 48, 
            md: 64, 
            lg: 75
          }, 
          px: {
            xs: 0,  
            sm: 768, 
            md: 1024, 
            lg: 5625
          }
        }

        this.medias.query = {
            onlySmall : `(max-width: ${this.medias.px.sm}px)`,
            largerthansm : `(min-width: ${this.medias.px.sm+1}px)`,
            mdandup : `(min-width: ${this.medias.px.md}px)`,
            smallerthanmd : `(max-width: ${this.medias.px.md-1}px)`
        }

        this.padding = {
            xs: 10,  
            sm: 15, 
            md: 20, 
            lg: 30
        };
    }
    
    /**
     * HELPERS
     */
    get defaultWrap(){
        return `solid ${this.colors.primary} ${this.defaultWrapWidth}px`
    }

    get defaultFont(){
        return `font-family : ${this.font}; font-size: ${this.sizes.normal};`
    }

    get styled(){
        return styled;
    }

    responsive(pre, values, post){
        return `
            ${pre}: ${values.xs}${post};

            @media only screen and (min-width: ${this.medias.px.sm}px) {
                ${pre}: ${values.sm}${post};
            }

            @media only screen and (min-width: ${this.medias.px.md}px) {
                ${pre}: ${values.md}${post};
            }        

            @media only screen and (min-width: ${this.medias.px.lg}px) {
                ${pre}: ${values.lg}${post};
            }        
        `
    }
    
    /**
     * COMPONENTS
     */
    /**
     * wrapping
     */
    get Wrapped(){
        return ({children})=><EmptyDiv content={`border : ${this.defaultWrap}; background: white;`}>{children}</EmptyDiv>
    }

    get Container(){
        return ({children})=><EmptyDiv content={this.responsive("padding", this.padding, 'px')}>{children}</EmptyDiv>
    }

    get Text(){
        return ({children})=><EmptySpan content={this.defaultFont}>{children}</EmptySpan>
    }

    // get Container(){
    //     return styled.div`
    //         padding: ${this.padding}
    //     `
    // }

    // /**
    //  * typography
    //  */
    // get Text(){
    //     return styled.p`
    //         ${this.defaultFont}
    //     `
    // }

    get Title(){
        return styled.div`
            ${this.defaultFont}
            font-size: ${this.sizes.title}; 
        `
    }

    get SubTitle(){
        return styled(this.Title)`
            font-size: ${this.sizes.subtitle}; 
        `
    }

    // /**
    //  * grid
    //  */
    // get Grid(){
    //     return styled(Grid_)`
    //         margin: 0px;
    //         padding: 0px;
    //         width: 100%;
    //     `
    // }

    // get Row(){return Row_};
    // get Col(){return Col_};
}

const Wrapped = styled.div`
    border: ${props=>props.border}
`

const EmptyDiv = styled.div`
    ${props=>props.content}
    
`

const EmptySpan = styled.span`
    ${props=>props.content}
`


export default Theme;