// import './App.css';
import {BrowserRouter as Router,Link ,Route, Routes, Outlet, redirect} from 'react-router-dom'
import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import { Products } from './components/Products';
import AdminPanel from './components/Admin';
import MainComponent from './components/MainPage';
import { auth } from './utils/Firebase';
import { useState } from 'react';
import { signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  console.log("🚀 ~ App ~ user:", user)
  const handleLogOut = async () => {
    try {
    await signOut(auth, user)
    redirect("/signup")
    setUser(null)
    localStorage.removeItem("user");

    } catch (error) {
      console.log("🚀 ~ handleLogOut ~ error:", error)
      
    }
  }

  
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 p-4 flex justify-between">
          <ul className="flex space-x-6">
          <li> <div className="text-orange-400 font-bold">WebWise</div></li>
          {!localStorage.getItem('user') &&   <li><Link to="/signup" className="text-white">Sign Up</Link></li>}
          {!localStorage.getItem('user') &&  <li><Link to="/login" className="text-white">Sign In</Link></li>}
            {localStorage.getItem('user') &&   <li><Link to="/" className="text-white">Products</Link></li>}
          </ul>
            {localStorage.getItem('user') && <button onClick={handleLogOut} className="text-white mr-3">Log Out</button>}
        </nav>
        <Routes>
          <Route path="/" element={<MainComponent user={user} setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/admin" element={<AdminPanel user={user} />} /> 
       </Routes>
      </div>
    </Router>
  );
}

export default App;
