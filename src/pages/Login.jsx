// import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { linkWithPopup, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { auth, googleprovider, githubProvider } from '../firebase';

import GoogleImg from '../img/google.png'
import GithubImg from '../img/github.png'

const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      // console.log(res)
      navigate("/")
    } catch (error) {
      setErr(true);
    }
  
  }

  const handleGoogleSubmit = async (e) => {
    try{
      await signInWithPopup(auth, googleprovider);
      navigate("/")
    }catch(err){
      setErr(true)
      console.log(err)
    }
  }

  const handleGithubSubmit = async(e) => {
    try{
      await signInWithPopup(auth, githubProvider);

      // const credential = GithubAuthProvider.credentialFromResult(res);
      // const token = credential.accessToken
      // console.log(res.user);
      navigate("/")
    }catch(err){
      if(err.code === 'auth/account-exists-with-different-credential'){
        // console.log(googleprovider.credentialFromError(err))
        // const res = await linkWithPopup(auth.currentUser, githubProvider)
        // console.log(res)
        alert(err.customData.email+" is already linked to a user account")
        console.log(err.customData.email)
      }
      setErr(true)
    // console.log({err})
      // console.log(err.email)
    }
  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Stoppie Chat</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit} onChange={() => setErr(false)}>
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <button>Sign in</button>
                <div className="signinOptions" style={{display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px"}}>
                  <img src={GoogleImg} alt="Google Signup" onClick={handleGoogleSubmit} style={{cursor: "pointer", width: "24px"}}/>
                  <img src={GithubImg} alt="Github Signup" onClick={handleGithubSubmit} style={{cursor: "pointer", width: "24px"}}/>
                </div>
                { err && <span style={{color: "red", textAlign: "center"}}>Something went wrong</span>}
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login