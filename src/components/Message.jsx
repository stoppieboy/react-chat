import React from 'react'
import UserImg from '../img/user.jpg'

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src={UserImg} alt="User Image" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src={UserImg} alt="User Image" />
      </div>
    </div>
  )
}

export default Message