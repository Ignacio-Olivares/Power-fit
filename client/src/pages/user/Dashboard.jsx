import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, FileText, History, Wallet, LogOut, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const Dashboard = () => {
  const navigate = useNavigate();

  // Obtener datos reales desde localStorage
  const user = {
    nombre: localStorage.getItem("userName"),
    apellido: localStorage.getItem("userApellido"),
    plan: null  // cambiar luego cuando conectes membresía
  };

  // Redirección si no hay sesión
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      navigate("/login");
    }
  }, [navigate]);

  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    {
      title: "Membresías",
      desc: "Consulta y elige tu plan ideal",
      icon: <CreditCard size={24} />,
      link: "/user/memberships",
      btnText: "Ver Membresías"
    },
    {
      title: "Clases",
      desc: "Horarios y cupos disponibles",
      icon: <Calendar size={24} />,
      link: "/user/classes",
      btnText: "Ver Clases"
    },
    {
      title: "Ficha",
      desc: "Tu información personal y médica",
      icon: <FileText size={24} />,
      link: "/user/profile",
      btnText: "Ver Ficha"
    },
    {
      title: "Historial",
      desc: "Historial de clases y pagos",
      icon: <History size={24} />,
      link: "/user/history",
      btnText: "Ver Historial"
    },
    {
      title: "Mi Membresía",
      desc: "Detalles de tu plan actual",
      icon: <Wallet size={24} />,
      link: "/user/mymembership",
      btnText: "Ver Membresía"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl shrink-0">
              {user.nombre?.charAt(0)}
            </div>
            
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">
                  Bienvenid@ {user.nombre} {user.apellido}
                </h1>

                {user.plan ? (
                  <span className="text-xs text-green-600 font-medium border border-green-200 px-2 py-0.5 rounded-full bg-green-50">
                    {user.plan}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 font-medium border border-gray-200 px-2 py-0.5 rounded-full bg-gray-50">
                    Sin Membresía
                  </span>
                )}
              </div>
              
              <p className="text-gray-500 text-sm">¿Qué deseas hacer hoy?</p>
            </div>
          </div>
          
          <Link to="/">
            <button className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors border border-red-200">
              <LogOut size={18} /> Cerrar Sesión
            </button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-green-500 mb-3 bg-green-50 w-fit p-2 rounded-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                </div>
              </div>

              <p className="text-gray-500 text-sm mb-6 flex-grow">
                {item.desc}
              </p>

              <Link to={item.link}>
                <Button variant="primary" className="w-full">
                  {item.btnText}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Toast */}
        {showToast && (
          <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
            <div className="bg-white p-4 rounded-xl shadow-xl border-l-4 border-green-500 flex items-center gap-3 max-w-sm">
              <div className="text-green-500">
                <CheckCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">¡Bienvenido!</h4>
                <p className="text-xs text-gray-500">Has iniciado sesión correctamente</p>
              </div>
              <button 
                onClick={() => setShowToast(false)} 
                className="ml-4 text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
