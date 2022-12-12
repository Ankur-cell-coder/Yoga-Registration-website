import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styled from "styled-components";
import InputControl from "./InputControl";
import { auth } from "../firebase";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/mainpage",{state:{id:1,name:values.email}});
        
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <Signup1>
    <div className='container'>
      <div className='innerBox'>
        <h1 className='heading'>Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className='footer'>
          <b className='error'>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
    </Signup1>
  );
}

export default Signup;

const Signup1=styled.div`
.container {
    height: 100%;
    min-height: 14vh;
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
