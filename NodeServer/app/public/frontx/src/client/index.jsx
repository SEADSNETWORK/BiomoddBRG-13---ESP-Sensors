import sanityClient from '@sanity/client'
import envi from './environment'
import {settings} from './connector_settings.json'
import { ACTIONS as DATA_ACTIONS } from "../reducers/DataReducer"
// import toast from '../services/toast'
import imageUrlBuilder from '@sanity/image-url'

const prevFetched = {};

export const client = (dispatch)=>{
    const environment = envi();
    let _ = settings;
    let news = [];
    const sc = sanityClient({
        projectId: _.projectId,
        dataset: _.dataset,
        token: _.token, // or leave blank to be anonymous user
        ignoreBrowserTokenWarning: true,
        useCdn: false
    })

    const fetch = (query)=>{
        return new Promise((resolve, reject)=>{
            if (prevFetched[query]){
                if (environment.dev){
                    console.log("reused cached query");
                }
                resolve(prevFetched[query]);
            } else {
                sc.fetch(query)
                .then((data)=>{
                    prevFetched[query] = data;
                    resolve(data);
                }).catch(reject);
            }
        })
    }

    const builder = imageUrlBuilder(sc)

    const squareImage = (url, width)=>{
        return builder.image(url).width(width).height(width).url();
    }

    
    if (environment.dev){
        environment.printstatus()
    } 
    // title, description, 
    fetch("*[_type == 'biomoddnews']{title, description, images[]{title, description, 'image':image.asset->url}} | order(_createdAt desc)").then((news)=>{
        dispatch({ type: DATA_ACTIONS.SET_NEWS, news});
    })

    fetch("*[_type == 'biomoddevent']{description, title, moment, available}|order(moment asc)").then((events)=>{
        dispatch({type: DATA_ACTIONS.SET_EVENTS, events});
    })

    fetch("*[_type == 'faq']{title, description}").then((faqs)=>{
        dispatch({type: DATA_ACTIONS.SET_FAQS, faqs})
    })

    return {
        fetch,
        environment,
        squareImage
    }
}



export default client;

