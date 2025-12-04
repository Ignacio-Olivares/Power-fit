import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarPublic from './components/layout/NavbarPublic';
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Dashboard from './pages/user/Dashboard';
import Memberships from './pages/user/Memberships';
import ConfirmMembership from './pages/user/ConfirmMembership';
import PaymentMethod from './pages/user/PaymentMethod';
import Classes from './pages/user/Classes';
import ClassBooking from './pages/user/ClassBooking';
import Profile from './pages/user/Profile';
import History from './pages/user/History';
import MyMembership from './pages/user/MyMembership';
import CoachPanel from "./pages/coach/CoachPanel";
import ManageUsers from './pages/coach/ManageUsers';
import ManageMemberships from './pages/coach/ManageMemberships';
import ManageSchedule from './pages/coach/ManageSchedule';
import ManageCoaches from './pages/coach/ManageCoaches';
import CreateCoach from './pages/coach/CreateCoach';
import ManagePayments from './pages/coach/ManagePayments';
import EditCoach from "./pages/coach/EditCoach";

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
        <Route path="/user/memberships/confirm" element={<ConfirmMembership />} />
        <Route path="/user/memberships/payment-method" element={<PaymentMethod />} />
        <Route path="/user/classes" element={<Classes />} />
        <Route path="/user/classes/booking" element={<ClassBooking />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/history" element={<History />} />
        <Route path="/user/mymembership" element={<MyMembership />} />
         
        {/* GRUPO 3: Rutas para Coaches */}
        <Route path="/coach/panel" element={<CoachPanel />} />
        <Route path="/coach/manage-users" element={<ManageUsers />} />
        <Route path="/coach/manage-memberships" element={<ManageMemberships />} />
        <Route path="/coach/schedule" element={<ManageSchedule />} />
        <Route path="/coach/coaches" element={<ManageCoaches />} />
        <Route path="/coach/payments" element={<ManagePayments />} />
        <Route path="/coach/create" element={<CreateCoach />} />
        <Route path="/coach/edit/:id" element={<EditCoach />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;