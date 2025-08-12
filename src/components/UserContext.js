import { createContext, useContext, useEffect, useState } from 'react'


export const UserContext = createContext()

export function UserProvider({children}) {
  const API_allUsers = 'https://6889c9984c55d5c739538a2a.mockapi.io/api/usersAPI'
    const [allUsers, setAllUsers] = useState([])
    const [user, setUser] = useState(null)
    const [error, setError] = useState("");
    const [showChatOnly, setShowChatOnly] = useState(false);
    

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
    

    const userRegister = (formRegister) => {
  fetch(API_allUsers, {
    method:'POST',
    headers:{'Content-type':'application/json'},
    body: JSON.stringify(formRegister)
  })
  .then ((res) => {
    if (!res.ok) throw new Error('Error')
    return res.json()
  })
  .then(data => {
    setAllUsers(prev => [...prev, data])
  })
  .catch((err) => {
    setError(err.message);
  });
};


    return (
        <UserContext.Provider value={{allUsers, setUser, userRegister, user, error, setShowChatOnly, showChatOnly}}>
            {children}
        </UserContext.Provider>
    )

}

export function useUser() {
  return useContext(UserContext)
}