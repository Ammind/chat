import React, { useEffect, useRef } from 'react'
import '../style/ChatWindow.css'
import { useContext } from 'react'
import { UserContext } from '../components/UserContext';

const ChatWindow = ({user, allUsers, messages, activeUser, handleSend, text, setText, form, handleChange,setActiveUser}) => {

    const { showChatOnly, setShowChatOnly,   } = useContext(UserContext);
  

const chatRef = useRef(null);

      const filteredMessages = messages.filter(
        msg =>
        (msg.from === user.login && msg.to === activeUser.login) ||
        (msg.from === activeUser.login && msg.to === user.login)
    )

// При первом рендере — скролл в самый низ
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [activeUser, filteredMessages.length]);



useEffect(() => {
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);
  return () => window.removeEventListener('resize', setVh);
}, []);

    if (!user || !activeUser) return null;
  

  return (
    <div className="messege">
    <div className="nick">
      {showChatOnly && (
        <button onClick={() => {
            setShowChatOnly(false)
            setActiveUser(null)
          }}>← Назад</button>
      )}
      <p>{activeUser.nick}</p>
    </div>

    <div className="messages-wrapper"
    ref={chatRef}
      style={{
        height: "400px",
        overflowY: "auto",
        // border: "1px solid #ccc"
      }}
      >
      {filteredMessages.map((msg, index) => (
        <p
          key={index}
          className={`messages ${msg.from === user.login ? 'you' : 'he'}`}
        >
          {msg.text}
        </p>
      ))}
      {/* <div ref={bottomRef} /> */}
    </div>

    <div className="poleVvoda">
      <input
        name="text"
        value={form.text}
        onChange={handleChange}
        placeholder="Напишите сообщение..."
      />
      <button onClick={handleSend}>↑</button>
    </div>
  </div>
  );
}

export default ChatWindow
