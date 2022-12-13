import { getDatabase, ref, onValue, get, child, set} from "firebase/database";
import React, { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {db} from '../firebase';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()


function MainPage() {
  const location=useLocation();
  var val=location.state.name;
   const dbRef=ref(db);
    var userinfo;
    var req_val="";
    const [data,setData]=useState("");

    const notify = () => {
      toast.success( 'Please Chosse a slot',{position:toast.POSITION.TOP_CENTER});
    }
     const warnify = () => {
       toast.warn('Your Current Slot is:-'+req_val,{position:toast.POSITION.TOP_CENTER})
       toast.warn('Please visit next month to enroll a new slot',{position:toast.POSITION.TOP_CENTER})
       
     }

    get(child(dbRef,'userDataRecords')).then((snapshot)=>{
      if(snapshot.exists()){
       userinfo=snapshot.val();
       let a=Object.keys(userinfo);
       a.forEach((i) => {
        if(val==userinfo[i].email)
        {
          req_val=userinfo[i].slot;
        }
       
      });
     
      }
      else
      {
        console.log("No data available");
      }
    }).catch((error)=>{
      console.log(error);
    });
   
  
    const navigate = useNavigate();
    const navigateToHome =()=>{
        // console.log(req_val);
        if(req_val=="6-7AM"||req_val=="7-8AM"||req_val=="8-9AM"||req_val=="5-6PM")
        {
         warnify();
        }
        else{
        navigate("/home",{state:{id:1,name:location.state.name}});
        notify();
        }
    };
    
  return (
    <div>
        <h1>To Choose Slot please Click here.</h1>
        <button onClick={navigateToHome}>Choose Slot</button>
        <br/>
        <br/>
        
        <h1>Your Current Slot is </h1>
        <h1>{req_val}</h1>
        
       
       
    </div>
  )
}



export default MainPage