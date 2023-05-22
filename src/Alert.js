import React , {useEffect} from "react";

const Alert=({msg,type,removeAlert,list})=>{
    
    useEffect(()=>{
        setTimeout(() => {
            removeAlert();
        }, 2000);
    },[list])

    return <div className={`alert alert-${type}`}>{msg}</div> 
}

export default Alert;