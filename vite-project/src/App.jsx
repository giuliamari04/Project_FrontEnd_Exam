import './assets/styles/App.css' 
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from "./pages/Home"
import Dogs from "./pages/Dogs"
import Cats from "./pages/Cats"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import User from "./pages/User"
import Donate from "./pages/Donation"
import Login from "./pages/Login"

import { useEffect } from "react";


function App() {
    //  localStorage.clear();
  // crea admin
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("registeredUser")) || [];
    const adminExists = storedUsers.some(user => user.email === "admin@gmail.com");

    if (!adminExists) {
      const adminUser = {
        username: "admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
        likes:[],
      };
      localStorage.setItem(
        "registeredUser",
        JSON.stringify([...storedUsers, adminUser])
      );
    }
  }, []);

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dogs' element={<Dogs/>}/>
      <Route path='/cats' element={<Cats/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/user' element={<User/>}></Route>
      <Route path='/donate' element={<Donate/>}></Route>

    </Routes>
    <Footer/>
    </BrowserRouter>
    
  )
}

export default App
