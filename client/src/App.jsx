import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

function App() {
  return (
    <BrowserRouter>
      {/* El Navbar está fuera de Routes para que aparezca siempre */}
      <Navbar /> 
      
      {/* Agregamos un padding-top (pt-20) para que el contenido no quede oculto tras el navbar fijo */}
      <div className="pt-20"> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;