import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";


import InputControl from "./InputControl";
import { auth } from '../firebase'
import styled from "styled-components";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const notify = () => {
    toast.success('Sucessfully Login!', { position: toast.POSITION.TOP_CENTER });
  }
  const warnify = () => {
    toast.warn('EveryField is compulsory!', { position: toast.POSITION.TOP_CENTER })

  }

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      warnify();
      return;
    }
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        notify();
        navigate("/mainpage", { state: { id: 1, name: values.email } });

      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        toast.warn("Email and password not matched correctly!", { position: toast.POSITION.TOP_CENTER })
        return;
      });
  };
  return (
    <Login1>
      <h1 style={{ color: "green" }}>Join With Us For A Healthy Life</h1>

      <div className='container'>
        <div className='innerBox'>
          <h1 className='heading'>LOGIN</h1>

          <InputControl
            label="Email"
            style={{width:"430px"}}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            required
            placeholder="Enter email address"
          />
          <InputControl
            label="Password"
            style={{width:"430px"}}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter Password"
            required
          />

          <div>
            <button disabled={submitButtonDisabled} onClick={handleSubmission}
              style={{ color: "white", background: "black", width: "450px", height: "37px", border: "none" }}
            >
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

const Login1 = styled.div`
.container {
    height: 10%;
    min-height: 14vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .innerBox {
    min-width: 480px;
    height: fit-content;
    width: fit-content;
    background-color: blue;

    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    padding: 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
 
  
  
`;

