import { getDatabase, ref, onValue, get, child, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from '../firebase';
import styled from "styled-components";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()


function MainPage() {
  const location = useLocation();
  var val = location.state.name;
  const dbRef = ref(db);
  var userinfo;
  var req_val = "No Slot Choosen";
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
        userinfo = snapshot.val();


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

    Object.keys(users).map((item, i) => (
      <div key={i}>
        {(() => {
          if (users[item].email == val) {
            req_val = users[item].slot;
          }
        })()}

      </div>
    ))

    // console.log(req_val);
    if (req_val == "6-7AM" || req_val == "7-8AM" || req_val == "8-9AM" || req_val == "5-6PM") {
      warnify();
    }
    else {
      navigate("/home", { state: { id: 1, name: location.state.name } });
      notify();
    }
  };

  return (
    <Main1>
      <div className="content1" style={{ border: '1px solid red' ,borderLeft:'none',borderRight:'none'}}>
        <h1>To Choose Slot please Click here.</h1>
        <button className="slotbtn" onClick={navigateToHome}>CHOOSE SLOT</button>
        <br />
        <br />
      </div>

      <div className="content1" style={{ border: '1px solid red',borderLeft:'none',borderRight:'none' }}>
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

      <div className="content" style={{ border: '1px solid red',borderLeft:'none',borderRight:'none'}}>
        <h1>Terms and Conditions:-</h1>
        <div className="points">
        <li>
          <span>In a month you can choose slot only once and no updation is possible.</span>
          <br />
        </li>
        <li>
          <span>You have to choose any of the four available slots.</span>
          <br />
        </li>
        <li>
          <span>Your age must be between 18 to 65 year.</span>
          <br />
        </li>
        <li>
          <span>You have to pay for whole month regarding on which day you have enrolled.</span>
          <br />
        </li>
        <li>
          <span>You have to pay a fixed amount of 500.</span>
        </li>
        </div>
        
      </div>

    </Main1>
  );
}



export default MainPage

const Main1 = styled.div`
.body{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  color:#f4b947;
}

.content{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  padding:10px;
  margin:20px;
}

.content1{
  margin:20px;
  border:none;
  padding:30px;
}
.slotbtn{
  width:400px;
  height:30px;
  font-size:12px;
  letter-spacing:2px;
}
.input-label{
  font-size:26px;
  letter-spacing:2px;

}

.points{
  display:flex;
  align-items:flex-start;
  justify-content:left;
  flex-direction:column;
  
}

`;

