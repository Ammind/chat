import React, { useState } from 'react'
import '../style/UserRegister.css'
import { Link } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";

const registerform = {
  nick: '',
  login: '',
  password: '',
  avatar: 'https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg?semt=ais_hybrid&w=740&q=80',
}

const log_inform = {
  login: '',
  password: '',
}


const UserRegister = () => {

  const { userRegister, allUsers, setUser } = useContext(UserContext);

  const [register, setRegister] = useState(registerform)
  const [log_in, setLog_in] = useState(log_inform)
  const [authorization, setAuthorization] = useState(true)
  const navigate = useNavigate();

    const handleRegister = (e) => {
        const {name, value} = e.target
        setRegister(prev => ({...prev,  [name]: value}))
  }  

  const submitRegister = (e) => {
    e.preventDefault()
    const isNickTaken = allUsers.some(user => user.login === register.login)
      if (isNickTaken) {
          alert('Цей нікнейм вже зайнятий!')
        return;
      }
    navigate('/chat'); 
    userRegister(register)
    setRegister(registerform);   
  }

  const handleLogin = (e) => {
      const {name, value} = e.target
      setLog_in(prev => ({ ...prev, [name]: value }))
  }

  const submitLogin = (e) => {
    e.preventDefault()

    const filteredUser = allUsers.find (
      aU => 
      (aU.login === log_in.login && aU.password === log_in.password)
    )

    if(filteredUser) {
      <Link to={`/chat`}>Детальніше</Link> 
      setUser(filteredUser)
      setLog_in(log_inform)
      console.log(`${filteredUser}`)
      navigate('/chat');
    } else {
      alert('неправильний логін або пароль')
        return
    }
  }

  const authorization_btn = (authorization) => {
    setAuthorization(false) 
  }

  const register_btn = (authorization) => {
    setAuthorization(true) 
  }

    
  return (
    <div className='UserRegister'>
      <div className='UserRegister_Container' id='register'>
        <div className='btn'>
          <button onClick={()=>(register_btn())} id='register_btn'>Зареєструватися</button>
          <button onClick={()=>(authorization_btn())} id='register_btn'>Вхід</button>
        </div>
      {authorization ? (
        <form onSubmit={submitRegister} className='style_form'>
          <input 
              name='nick'
              value={register.nick}
              placeholder='імя'
              onChange={handleRegister}
              required
          />
          <input 
              name='login'
              value={register.login}
              placeholder='нікнейм'
              onChange={handleRegister}
              required
          />
          <input 
              type="password"
              name='password'
              value={register.password}
              placeholder='пароль'
              onChange={handleRegister}
              required
          />
            <button type='submit'>Зареєструватися</button>
        </form>
          ): (
        <form onSubmit={submitLogin} id='register' className='style_form'>
          <input 
              name='login'
              value={log_in.login}
              placeholder='нікнейм'
              onChange={handleLogin}
              required
          />
          <input 
              type="password"
              name='password'
              value={log_in.password}
              placeholder='пароль'
              onChange={handleLogin}
              required
          />
            <button type='submit'>Вхід</button>
        </form>
        )}
      </div>
    </div>
  )
}

export default UserRegister
 