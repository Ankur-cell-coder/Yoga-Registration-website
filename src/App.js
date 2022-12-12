import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';
import React, { useEffect, useState } from "react";
import {auth} from "./firebase";


function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home name={userName} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


