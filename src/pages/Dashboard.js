import React, { useContext } from 'react'
import { AuthContext } from '../components/Auth';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig/config';
import { Button } from 'reactstrap';

function Dashboard() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/home" />;
  }
  return (
    <div className='App' style={{color: "white"}}>
      <div className='container'>
      <Link className='logButton' to="/home" ><img src="./wysa.png" className="App-logo" alt="logo" /></Link>
        <h4 style={{color:"white"}}>Hey! I'm <span style={{color:"#2aaacd"}}>Wysa</span></h4>
            <br></br>
      {"Display Name: " + currentUser.displayName}
      <h1>Welcome</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p>
      <Button onClick={() => auth.signOut()}>Sign out</Button>
      </div>
    </div>
  );
};

export default Dashboard
