import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "./InputControl";
import {auth} from '../firebase'
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigate("/home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <Login1>
    <div className='container'>
      <div className='innerBox'>
        <h1 className='heading'>Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className='footer'>
          <b className='error'>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
    </Login1>
  );
}

export default Login;

const Login1=styled.div`
.container {
    height: 10%;
    min-height: 24vh;
    width: 100%;
    background: linear-gradient(to right, #9900ff, #cc80ff);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .innerBox {
    min-width: 480px;
    height: fit-content;
    width: fit-content;
    background-color: #fff;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    padding: 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .footer {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .footer .error {
    font-weight: bold;
    font-size: 0.875rem;
    color: #ff3300;
    text-align: center;
  }
  
  .footer button {
    outline: none;
    border: none;
    background-color: #9900ff;
    color: #fff;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
    padding: 10px 16px;
    width: 100%;
    transition: 100ms;
    cursor: pointer;
  }
  
  .footer button:disabled {
    background-color: gray !important;
  }
  
  .footer button:hover {
    background-color: #aa2aff;
  }
  
  .footer p {
    font-weight: 700;
    color: #000;
  }
  
  .footer p span a {
    font-weight: bold;
    color: #9900ff;
    letter-spacing: 1px;
    font-size: 1rem;
    text-decoration: none;
  }
`;

