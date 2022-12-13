import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styled from "styled-components";
import InputControl from "./InputControl";
import { auth } from "../firebase";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const notify = () => {
    toast.success('Sucessfully Login!', { position: toast.POSITION.TOP_CENTER });
  }
  const warnify = () => {
    toast.warn('EveryField is compulsory!', { position: toast.POSITION.TOP_CENTER })

  }
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      warnify();
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
        navigate("/mainpage", { state: { id: 1, name: values.email } });
        notify();
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        toast.warn(err.message, { position: toast.POSITION.TOP_CENTER })

      });
  };


  return (
    <Signup1>
      <h1></h1>
      <br />
      <div className='container'>
        <div className='innerBox'>
          <h1 className='heading'>SIGNUP</h1>

          <InputControl
            label="NAME"
            placeholder="Enter your name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <InputControl
            label="EMAIL"
            placeholder="Enter email address"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <InputControl
            label="PASSWORD"
            placeholder="Enter password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />

          <div className='footer'>
            <b className='error'>{errorMsg}</b>
            <button onClick={handleSubmission} disabled={submitButtonDisabled}
              style={{ color: "white", background: "black", width: "500px", height: "35px", margin: "10px", border: "none" }}
            >
              SIGNUP
            </button>
            <p>
              Already have an account ? {""}
              <span>
                <Link to="/">LOGIN</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </Signup1>
  );
}

export default Signup;

const Signup1 = styled.div`
display:flex;
justify-content:center;

.container {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 100%;
    min-height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    
  }
  
  .innerBox {
    margin:50px;
    min-width: 480px;
    height: fit-content;
    width: fit-content;
    background-color: #fff;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 10px;
    background:blue;
    display: flex;
    flex-direction: column;
  }
  
`;
