import React from 'react'
import Add from '../img/add.png'
import { createUserWithEmailAndPassword, signInWithPopup, GithubAuthProvider, updateProfile } from 'firebase/auth'
import { auth, googleprovider, githubProvider, storage, db } from '../firebase'
import { useState } from 'react'
import GoogleImg from '../img/google.png'
import GithubImg from '../img/github.png'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        console.log('here');
        console.log(res.user);
        getDownloadURL(storageRef).then( async (downloadURL) => {
          try{
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            })
  
            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate("/")
          }catch(err){
            console.log(err)
            setErr(true)
          }
        });
      })


    } catch (error) {
      console.error(error)
      setErr(true);
    }
  
  }

  const handleGoogleSubmit = async() => {
    await signInWithPopup(auth, googleprovider);
  }

  const handleGithubSubmit = async() => {
    try{
      const res = await signInWithPopup(auth, githubProvider);

      const credential = GithubAuthProvider.credentialFromResult(res);
      const token = credential.accessToken
      // console.log(res.user);
    }catch(err){
      console.error(err);
    }

  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Stoppie Chat</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit} onChange={()=>setErr(false)}>
                <input type="text" placeholder="username" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <label htmlFor="file" style={{cursor: "pointer"}}>
                    <img src={Add} alt="" />
                    <span>Add an image</span>
                </label>
                <input type="file" id="file" style={{display: "none"}}/>
                <button>Sign up</button>
                <div className="signinOptions" style={{display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px"}}>
                  <img src={GoogleImg} alt="Google Signup" onClick={handleGoogleSubmit} style={{cursor: "pointer", width: "24px"}}/>
                  <img src={GithubImg} alt="Github Signup" onClick={handleGithubSubmit} style={{cursor: "pointer", width: "24px"}}/>
                </div>
                { err && <span style={{color: "red", textAlign: "center"}}>Something went wrong</span>}
            </form>
            <p>You already have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register