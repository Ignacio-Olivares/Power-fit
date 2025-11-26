import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarPublic from './components/layout/NavbarPublic';
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Dashboard from './pages/user/Dashboard';
import Memberships from './pages/user/Memberships';
import MembershipConfirmation from './pages/user/MembershipConfirmation';
import CoachPanel from "./pages/coach/CoachPanel";
import ManageUsers from './pages/coach/ManageUsers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* GRUPO 1: Rutas Públicas (Usan el Navbar) */}
        <Route element={<NavbarPublic />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* GRUPO 2: Rutas Privadas (Sin Navbar público) */}
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/memberships" element={<Memberships />} />
        <Route path="/user/memberships/confirm" element={<MembershipConfirmation />} />
         
        {/* GRUPO 3: Rutas para Coaches */}
        <Route path="/coach/panel" element={<CoachPanel />} />
        <Route path="/coach/manage-users" element={<ManageUsers />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;