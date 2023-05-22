import React from 'react';
import {FaTrash,FaEdit} from "react-icons/fa";

 const List = ({list,removeItem,editItem}) => {
    return <>
        <ul className="crocery-container">
            {list.map(item=>{
                const {id,title}=item
                return <li key={id} className="crocery-list"> 
                    <div className="crocery-item">
                    <p className="title">{title}</p>
                    <div className="btn-container">
                        <button className="edit-btn" onClick={()=>editItem(id)}>
                            <FaEdit />
                        </button>
                        <button className="delete-btn" onClick={()=>{removeItem(id)}}>
                            <FaTrash />
                        </button>
                    </div>
                    </div>
                </li>
            })}
        </ul>
    </>
}

export default List;

