import React from 'react'
import '../style/UserSpisok.css'
import { useContext } from 'react'
import { UserContext } from '../components/UserContext';

const UserSpisok = ({user, allUsers, activeUser, setActiveUser, messages}) => {

    const { setShowChatOnly  } = useContext(UserContext);
  

  const chatUserLogins = messages
    .filter(m => m.from === user.login || m.to === user.login)
    .map(m => m.from === user.login ? m.to : m.from);

  const uniqueLogins = [...new Set(chatUserLogins)];

  const chatUsers = allUsers.filter(u =>
  uniqueLogins.includes(u.login) && u.login !== user.login
);

    

    const handleUserClick = (u) => {
      setActiveUser(u)
      if (window.innerWidth <= 768) {
      setShowChatOnly(true);
      }
    }


  return (
    <div>
      <ul>
        {chatUsers.map((user,index) => (
            <li key={user.id} onClick={() => handleUserClick(user, index)}
            className={`user ${activeUser?.id === user.id ? 'selected' : ''}`}
            >
                <img src={user.avatar} alt=""/> {user.nick}
            </li>
        ))}
      </ul>
    </div>
  )
}

export default UserSpisok
