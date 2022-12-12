import React from "react";
import styled from "styled-components";

function InputControl(props) {
  return (
    <InputControl1>
     <div className='container'>
      {props.label && <label>{props.label}</label>}
      <input type="text" {...props} />
    </div>
    </InputControl1>
   
  );
}

export default InputControl;

const InputControl1=styled.div`
.container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .container label {
    font-weight: 700;
    font-size: 1rem;
    color: #313131;
  }
  
  .container input {
    border-radius: 5px;
    border: 1px solid #dddddd;
    outline: none;
    padding: 10px 15px;
    color: #000;
  }
  
  .container input:hover {
    border-color: #ccc;
  }
  
  .container input:focus {
    border-color: #9900ff;
  }
  `;