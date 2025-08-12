import './style/App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import UserRegister from './components/UserRegister';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserRegister />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;