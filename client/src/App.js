import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import './App.css';
import LoginSignup from './Pages/LoginSignup';
import Signup from './Pages/Signup';
import Dasboard from './Pages/Dashboard';
import Group from './Pages/Groups';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dasboard />} />} />
        <Route path='/group' element={<Group />} />
      </Routes>
    </div>
  );
}

export default App;
