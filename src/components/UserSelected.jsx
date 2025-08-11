import React from 'react'
import '../style/UserSelected.css'

const UserSelected = ({user, setUser, allUsers}) => {
const handleChange = (e) => {
    const selectedUser = allUsers.find(u => u.id === e.target.value)
    setUser(selectedUser)
    
  }


  return (
    <div className='UserContainer'>
      <select value={user?.id || ''} onChange={handleChange}>
      <option value=''>Выберите пользователя</option>
      {allUsers.map(u => (
        <option key={u.id} value={u.id}>
          {u.nick}
        </option>
      ))}
    </select>
    </div>
  )
}

export default UserSelected
