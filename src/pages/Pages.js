import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Dashboard from './Dashboard';
import Onboarding from './Onboarding';
import { AuthProvider } from '../components/Auth';


const Pages = () => {

    return (
        <>

        <AuthProvider>
        <Routes>
            <Route path="*" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/onboarding" element={<Onboarding/>} />        
        </Routes>
        </AuthProvider>
        </>

        // <>
        //     <img src="./wysa.png" className="App-logo" alt="logo" />
        //     Edit and save to reload.
        // login
        // signup
        // nickname
        // sleep analysis
        // result
        // final page
        // </>
    )
}

export default Pages