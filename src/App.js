import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp";
import UsersList from "./pages/usersList";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={ <SignUp/> } />
        <Route path="signup" element={ <SignUp/> } />  
        <Route path="users" element={ <UsersList/> } />  
      </Routes>
  </div>
  );
}

export default App;
