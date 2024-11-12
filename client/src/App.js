import './App.css';
import { Routes, Route } from 'react-router-dom';

import Admin from './components/Admin';
import Login from './components/Login';

import Home from './components/Home';
import Termini from './components/Termini';
import Kontakt from './components/ContactDialog';



function App() {
  return (
          <Routes>
            <Route path = '/' element={<Termini />} />
            <Route path = '/informacije' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path="/admin/login" element={<Login />} />
          </Routes>

  );
}

export default App;
