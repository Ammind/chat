import './style/App.css';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import UserRegister from './components/UserRegister';
import { UserProvider, useUser } from './components/UserContext';

function AppRoutes() {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/chat" /> : <UserRegister />} />
      <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;

