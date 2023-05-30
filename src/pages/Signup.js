import React, { useState } from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { FaArrowDown } from 'react-icons/fa';
import "../firebaseConfig/config"
import "../css/loginform.css"
import { auth } from '../firebaseConfig/config';
import { Link, Navigate } from 'react-router-dom';

const Signup = () => {
    const [currentUser, setCurrentUser] = useState(null);    
    const signup = (e) => {
        e.preventDefault();    
        const { email, password, username } = e.target.elements;
        auth.createUserWithEmailAndPassword(email.value, password.value)
        .then(() => {
            if(auth.currentUser){
                auth.currentUser.updateProfile({
                    displayName: username.value
                }).then(function () {
                    console.log("Updated");
                    setCurrentUser(true);
                }).catch((error) => {
                    console.log("Error: " + error)
                })
            };
        })
        .catch((error) => {
            console.log(error);
        })     
    };
    if (currentUser) {
        return <Navigate to="/onboarding" />;
    }
  return (
    <div className='App'>
        <Link className='logButton' to="/home" ><img src="./wysa.png" className="App-logo" alt="logo" /></Link>
            <br></br>
            <h4 style={{color:"white"}}>Hey! I'm <span style={{color:"#2aaacd"}}>Wysa</span></h4>
            <p style={{color:"white", margin:"0px"}}>Our conversations are private &</p>
            <p style={{color:"white", margin:"0px"}}>anonymous, Just choose a nickname and signup and</p>
            <p style={{color:"white", margin:"0px"}}>we're good to go.</p>
            <br></br>
            <h3 style={{color: "white"}}>Signup</h3>
            <br></br>
            <div className="container">
                <div className='row align-items-center'>
                    <div className="col align-self-center">
                    <Form className='form-login' onSubmit={signup}>
                        <FormGroup floating className='input-container'>
                            <Input id="username" name="username" placeholder="username" type="username" style={{borderRadius: "50px"}}/>
                            <Label for="username">
                                Choose a Nickame...
                            </Label>
                        </FormGroup>
                        {' '}
                        <FormGroup floating className='input-container'>
                            <Input id="email" name="email" placeholder="Email" type="email" style={{borderRadius: "50px"}}/>
                            <Label for="email">
                                Email
                            </Label>
                        </FormGroup>
                        {' '}
                        <FormGroup floating className='input-container'>
                            <Input id="password" name="password" placeholder="Password" type="password" style={{borderRadius: "50px"}}/>
                            <Label for="password">
                                Password
                            </Label>
                        </FormGroup>
                        {' '}
                        <div className='submit-container'>
                            <button type="submit" className="submit-button">
                                <FaArrowDown className="arrow-icon" />
                            </button>
                        </div>
                    </Form>
                    </div>
                </div>
            </div>
            <br></br>
            <p style={{fontSize:"0.7rem", color:"white", margin:"0px"}}>By continuing, I confirm I am 13 or older and accept the</p>
            <p style={{fontSize:"0.7rem", color:"white", margin:"0px"}}><Link to='/'>Terms of Service</Link> and <Link to='/'>Privacy Policy</Link></p>
        </div>
  )
}

export default Signup
