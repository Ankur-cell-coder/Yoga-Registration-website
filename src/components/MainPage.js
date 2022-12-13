import { getDatabase, ref, onValue, get, child, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from '../firebase';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()


function MainPage() {
  const location = useLocation();
  var val = location.state.name;
  const dbRef = ref(db);
  var userinfo;
  var req_val = "";
  const [users, setUsers] = useState({});

  const notify = () => {
    toast.success('Please Chosse a slot', { position: toast.POSITION.TOP_CENTER });
  }
  const warnify = () => {
    toast.warn('Please visit next month to enroll a new slot', { position: toast.POSITION.TOP_CENTER })

  }



  useEffect(() => {
    get(child(dbRef, 'userDataRecords')).then((snapshot) => {
      if (snapshot.exists()) {
        userinfo = snapshot.val();
        setUsers({ ...snapshot.val() });
      }
      else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.log(error);
    });

  }, []);


  const navigate = useNavigate();
  const navigateToHome = () => {
    if (req_val == "6-7AM" || req_val == "7-8AM" || req_val == "8-9AM" || req_val == "5-6PM") {
      warnify();
    }
    else {
      navigate("/home", { state: { id: 1, name: location.state.name } });
      notify();
    }
  };

  return (
    <div>
      <h1>To Choose Slot please Click here.</h1>
      <button onClick={navigateToHome}>Choose Slot</button>
      <br />
      <br />

      <h1>Your Current Slot is </h1>

      {
        Object.keys(users).map((item, i) => (
          <div key={i}>
            {(() => {
              if (users[item].email == val) {
                return (
                  <div className="input-label">{users[item].slot}</div>
                )
              }
            })()}

          </div>
        ))
      }

    </div>
  )
}



export default MainPage