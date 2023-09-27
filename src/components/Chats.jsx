import React from 'react'
import Userimg from '../img/user.jpg'

const Chats = () => {
  return (
    <div className='chats'>
      <div className="userChat">
        <img src={Userimg} alt="" />
        
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={Userimg} alt="" />
        
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={Userimg} alt="" />
        
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats