import React from 'react'
import { useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
import { AuthContext } from '../context/AuthContext'

const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username))
    console.log('here');
    try{
      const querySnapshot = await getDocs(q)
      console.log(querySnapshot)
      querySnapshot.forEach(doc => {
        setUser(doc.data());
        console.log(user)
      });
    }catch(err){
      setErr(true);
    }
  }

  const handleKey = e => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async() => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid+user.uid : user.uid+currentUser.uid
    try {
      const res = await getDocs(db, "chats", combinedId)

      if(!res.exists()){
        await setDoc(doc(db, "chats", combinedId), {messages: []});
      }
    } catch (error) {
      setErr(true)
    }
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input
          type="text"
          placeholder='Find a user'
          onKeyDown={handleKey}
          onChange={(e) => {
            setErr(false);
            setUsername(e.target.value);
          }}
        />
      </div>
      { err && <span>User not found!</span>}
      { user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search