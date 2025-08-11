import React, { useEffect, useState } from 'react'
// import UserSelected from '../components/UserSelected'
import UserSpisok from '../components/UserSpisok'
import '../style/ChatPage.css'
import ChatWindow from './ChatWindow'
// import UserRegister from '../components/UserRegister'
import { useContext } from 'react'
import { UserContext } from '../components/UserContext';

 const message_form = {
  from: '',
  to: '',
  text: '',
}


const СhatPage = () => {

  

  const API_allUsers = 'https://6889c9984c55d5c739538a2a.mockapi.io/api/usersAPI'
  const API_messages = 'https://6889c9984c55d5c739538a2a.mockapi.io/api/messagesAPI'


  const [allUsers, setAllUsers] = useState([])
  // const [user, setUser] = useState(null)
  const [activeUser, setActiveUser] = useState(null)
  const [error, setError] = useState("");
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const [form, setForm] = useState(message_form)
  const [resultPoisk, setResultPoisk] = useState([])
  // const [showChatOnly, setShowChatOnly] = useState(false);
  const { userRegister, user, setUser, showChatOnly,  } = useContext(UserContext);





  useEffect(() => {
    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
    }
  }, [user])

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm(prev => ({...prev, from: user.login, to: activeUser.login,  [name]: value}))
    } 
    

   const handleSend = (e) => {
    e.preventDefault()


    fetch(API_messages, {
      method:'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then((message) => {
      addMessage(message)
      setForm(message_form)
      setText('')
    })
    .catch((err) => {
        setError(err.message);
      })
  }

  useEffect(() => {
  const savedUser = localStorage.getItem('loggedUser')
  if (savedUser) {
    setUser(JSON.parse(savedUser))
  }

  const fetchMessages = () => {
    fetch(API_messages)
    .then((res) => {
      if (!res.ok) throw new Error('Error')
        return res.json()
    })
    .then((data) => {
      setMessages(data)
    })
    .catch((err) => {
      setError(err.message);
    });
  }

  
  const interval = setInterval(fetchMessages, 1000); // обновлять каждые 2 сек

  return () => clearInterval(interval); // очистить при выходе
  },[])


  const addMessage = (message) => {
    setMessages(prev => [...prev, message ])
  }
 

  useEffect(() => {
    fetch(API_allUsers)
      .then((res) => {
        if (!res.ok) throw new Error('Error')
        return res.json()
      })
      .then((data) => {
        const sorted = data.sort((a, b) => a.id - b.id);
        setAllUsers(sorted);
        setAllUsers(data)
      })
      .catch((err) => {
        setError(err.message);
      })
  }, [setAllUsers])



  // const userRegister = (formRegister) => {
  //   fetch(API_allUsers, {
  //     method:'POST',
  //     headers:{'Content-type':'application/json'},
  //     body: JSON.stringify(formRegister)
  //   })
  //   .then ((res) => {
  //     if (!res.ok) throw new Error('Error')
  //       return res.json()
  //   })
  //   .then(data => {
  //     setAllUsers(prev => [...prev, data])
  //   })
  //   .catch((err) => {
  //       setError(err.message);
  //   })
  // }

  const poisk = (e) => {
    const value = e.target.value.toLowerCase()

    
    if(value ==='') {
      setResultPoisk([])
    } else {
      const filteredPoisk = allUsers.filter(
      aU => 
        aU.login.toLowerCase().includes(value) ||
        aU.nick.toLowerCase().includes(value)
    )
    const filteredUsers = filteredPoisk.filter(u => u.id !== user?.id)

    setResultPoisk(filteredUsers)
    }
  }

  const handleUser = (u) => {
    setActiveUser(u)
  }



  if (error) return <p>Помилка: {error}</p>



  return (
    <div className='СhatPage'>
      <div className='СhatPageContainer'>

        <div className='Okna'>
          {!showChatOnly &&(
          <div className={`СhatPageUserSpisok ${showChatOnly ? 'hide-on-mobile' : ''}`}>
            <input 
              type='text'
              onChange={poisk}
              placeholder='Пошук'
            />
          <ul>
            {resultPoisk.map((fp,id)=>(
              <li key={id} onClick={() => handleUser(fp)}>
                {fp.nick}
              </li>
            ))}
          </ul>           
            <p><UserSpisok user={user} allUsers={allUsers} activeUser={activeUser} setActiveUser={setActiveUser} messages={messages} /></p>
          </div>
            )}
            {activeUser && (
              <div className='OknaChat'>
                <ChatWindow user={user} activeUser={activeUser} messages={messages} addMessage={addMessage} handleSend={handleSend} text={text} setText={setText} form={form} handleChange={handleChange} setActiveUser={setActiveUser}/>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default СhatPage
