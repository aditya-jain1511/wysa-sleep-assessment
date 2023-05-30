import React, { useContext } from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { FaArrowDown } from 'react-icons/fa';

import "../css/loginform.css"
import { auth } from '../firebaseConfig/config';
import { AuthContext } from '../components/Auth';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {

    const onlogin = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        auth.signInWithEmailAndPassword(email.value, password.value)
        .catch((error) => {
            console.log(error);
        })   
      };
      const { currentUser } = useContext(AuthContext);
      if (currentUser) {
        return <Navigate to="/dashboard" />;
      }
  return (
    <div className='App'>
        <Link className='logButton' to="/home" ><img src="./wysa.png" className="App-logo" alt="logo" /></Link>
            <br></br>
            <h4 style={{color:"white"}}>Hey! I'm <span style={{color:"#2aaacd"}}>Wysa</span></h4>
            <p style={{color:"white", margin:"0px"}}>Our conversations are private &</p>
            <p style={{color:"white", margin:"0px"}}>anonymous, Just login and</p>
            <p style={{color:"white", margin:"0px"}}>we're good to go.</p>
            <br></br>
            <h3 style={{color: "white"}}>Login</h3>
            <br></br>
            <div className="container">
                <div className='row align-items-center'>
                    <div className="col align-self-center">
                    <Form className='form-login' onSubmit={onlogin}>
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

export default Login
