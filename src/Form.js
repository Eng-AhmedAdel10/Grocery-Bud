import React ,{useRef} from 'react'

const Form = ({name,handleName,handleSubmit,isEditing}) => {

    const inputRef=useRef(null);

    if(isEditing)
    {
        inputRef.current.focus();
    }

    return <form className="form-control">

        <input 
        className="input-text"
        type="text" 
        ref={inputRef} 
        placeholder="e.g. eggs" 
        value={name} 
        onChange={(e)=>handleName(e.target.value)} 
        />

        <input
        className="submit-btn" 
        type="submit" 
        value={isEditing ? "Edit" : "Submit"} 
        onClick={(e)=>{
            e.preventDefault()
            handleSubmit();
        }} 
        />

    </form>
    
}


export default Form
