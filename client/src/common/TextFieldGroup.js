import React from 'react'


const TextFieldGroup = ({type,placeholder,name,onChange,value}) => {
     return (
          <div className="form-group">
               <input
                    className="form-control"
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
               />                                   
            </div>
     )
}



export default TextFieldGroup
