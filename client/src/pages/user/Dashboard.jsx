import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Calendar, FileText, History, Wallet, LogOut, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const Dashboard = () => {
  // 1. DATOS SIMULADOS DEL USUARIO luego cambiados a backend
  // Nota: Cambia "plan" a null o "" para ver cómo se ve el estado "Sin Membresía".
  const user = { 
    nombre: "Valeria", 
    apellido: "López", 
    plan: "Plan Trimestral" 
  };
  
  // 2. Estado para controlar la notificación flotante (Toast)
  const [showToast, setShowToast] = useState(true);

  // 3. Efecto: Ocultar notificación automáticamente a los 4 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);

    return () => clearTimeout(timer); // Limpieza por si el usuario cambia de página rápido
  }, []);

  // 4. Configuración de las tarjetas del menú (Basado en Figura 10 del documento)
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
      link: "/user/my-plan",
      btnText: "Ver Membresía"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- ENCABEZADO DE BIENVENIDA --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            {/* Avatar con inicial */}
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl shrink-0">
              {user.nombre.charAt(0)}
            </div>
            
            <div>
              {/* Contenedor flexible para Nombre + Etiqueta de Plan */}
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">
                  Bienvenid@ {user.nombre} {user.apellido}
                </h1>
                
                {/* LÓGICA CONDICIONAL DE MEMBRESÍA */}
                {user.plan ? (
                  // Opción A: Tiene plan (Verde y muestra el nombre)
                  <span className="text-xs text-green-600 font-medium border border-green-200 px-2 py-0.5 rounded-full bg-green-50">
                    {user.plan}
                  </span>
                ) : (
                  // Opción B: No tiene plan (Gris y dice "Sin Membresía")
                  <span className="text-xs text-gray-400 font-medium border border-gray-200 px-2 py-0.5 rounded-full bg-gray-50">
                    Sin Membresía
                  </span>
                )}
              </div>
              
              <p className="text-gray-500 text-sm">¿Qué deseas hacer hoy?</p>
            </div>
          </div>
          
          {/* Botón Cerrar Sesión */}
          <Link to="/">
            <button className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors border border-red-200">
              <LogOut size={18} /> Cerrar Sesión
            </button>
          </Link>
        </div>

        {/* --- GRILLA DE OPCIONES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
              
              {/* Icono y Título */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-green-500 mb-3 bg-green-50 w-fit p-2 rounded-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-gray-500 text-sm mb-6 flex-grow">
                {item.desc}
              </p>

              {/* Botón de acción */}
              <Link to={item.link}>
                <Button variant="primary" className="w-full">
                  {item.btnText}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* --- NOTIFICACIÓN FLOTANTE (TOAST) --- */}
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