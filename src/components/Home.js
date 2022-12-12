import React,{useState} from 'react'
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";


function Home(props) {
    const location=useLocation();
    var val=location.state.name;
   const [data,setData]=useState({
    slot:"6-7AM",
    amount:"500",
    date:"",
    age:"",
    email:val,
   });

   const {
    slot,
    amount,
    date,
    age,
    email
   } =data

  const handleChange =(e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }
  
  const handleSubmit = async e =>{
    e.preventDefault();
    const res= await fetch('https://yoga-form-bde99-default-rtdb.firebaseio.com/userDataRecords.json',{
    method:"POST",
    headers : {
       "Content-Type":"application/json",
    },
    body:JSON.stringify({
        slot,
        amount,
        date,
        age,
        email
    }),
});

  if(res){
    setData({
        slot:"6-7AM",
        amount:"500",
        date:"",
        age:"",
        email:"",
    });
    alert("Data Stored");
  }
  else
  alert("please fill data");
    
  };

  return (
    
     <Home1>
          <div className='form'>
        <h1>Make Payment</h1>
        <form onSubmit={handleSubmit}>

           <label htmlFor="name">Email</label><br />
            <input
            type="text"
            style={{ height: "30px", width: "300px", marginBottom: "20px" }}
            id="name"
            name="email"
            value={email}
            onChange={handleChange}
            required
            />
            <br/>

            <label htmlFor="name">Pick Slot</label><br />
            <input
            type="text"
            style={{ height: "30px", width: "300px", marginBottom: "20px",marginTop:"10px"}}
            id="name"
            name="slot"
            value={slot}
            onChange={handleChange}
            required
            />
            <br/>

            <label htmlFor="name">Amount</label><br />
            <input
            type="text"
            style={{ height: "30px", width: "300px", marginBottom: "20px",marginTop:"10px"}}
            id="name"
            name="amount"
            value={amount}
            onChange={handleChange}
            required
            />
            <br/>

            <label htmlFor="name">Date</label><br />
            <input
            type="text"
            style={{ height: "30px", width: "300px", marginBottom: "20px" }}
            id="name"
            name="date"
            value={date}
            onChange={handleChange}
            required
            />
            <br/>

            <label htmlFor="name">Age</label><br />
            <input
            type="text"
            style={{ height: "30px", width: "300px", marginBottom: "20px" }}
            id="name"
            name="age"
            value={age}
            onChange={handleChange}
            required
            />
            <br/>

           
          <button
           type="submit" 
           style={{ fontsize: "20px", color: "white", height: "40px", width: "100%", marginBottom: "20px", backgroundColor: "#3498DB", border: "none" }} 
           onClick={handleSubmit}
            >
            Submit
          </button>

           
        </form>
       </div> 
     

    </Home1>
      
  );
}

export default Home;

const Home1=styled.div`
width: 100%;
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
  margin-top:5px;
 

.form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    padding: 20px;
    color: #4A4A4A;
    font-weight: bold;
    font-family: 'IBM Plex Sans Thai Looped', sans-serif;
}


   
`; 

