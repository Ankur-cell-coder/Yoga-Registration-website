import React, { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {db} from '../firebase';

function MainPage() {
  const location=useLocation();

    const navigate = useNavigate();
    const navigateToHome =()=>{
        navigate("/home",{state:{id:1,name:location.state.name}});
    };
  return (
    <div>
        <h1>To Choose Slot please Click here.</h1>
        <button onClick={navigateToHome}>Choose Slot</button>

        <br/>
        <br/>


        <h1>Your Current Slot is </h1>
      <h1>{location.state.name}</h1> 
       
       
    </div>
  )
}



export default MainPage