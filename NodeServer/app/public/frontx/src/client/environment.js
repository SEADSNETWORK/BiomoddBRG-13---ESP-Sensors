export const envi = ()=>{
    const dev = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    const status = (()=>{return `Running ${dev?'local':'server'}`})()
    const printstatus = ()=>{
        console.log(status);
    }

    if (dev){
        document.title = " (local) " + document.title;
    }
    
    return {
        dev,
        status,
        printstatus
    }   
}

export default envi