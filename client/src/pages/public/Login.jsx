import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const Login = () => {
  // Estado para manejar los inputs (se usará más adelante para conectar con Django)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí irá la lógica de conexión con el backend más adelante
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Botón Volver (Esquina superior izquierda) */}
      <div className="absolute top-24 left-4 md:left-8"> {/* Top-24 para bajarlo del Navbar fijo */}
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors">
          <ArrowLeft size={20} />
          Volver al menú
        </Link>
      </div>

      {/* Tarjeta de Login (Basada en Figura 8) */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 border border-gray-100">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Powerfit Copiapó</h1>
          <p className="text-gray-500 text-sm mt-1">Accede a tu cuenta o crea una nueva</p>
        </div>

        {/* Pestañas (Tabs) Visuales */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
          <button className="flex-1 py-2 text-sm font-semibold bg-white text-gray-900 rounded-md shadow-sm">
            Iniciar Sesión
          </button>
          <Link to="/register" className="flex-1 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 text-center">
            Registrarse
          </Link>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Campo Correo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo electrónico o teléfono
            </label>
            <input 
              type="text" 
              name="email"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Botón de Acción */}
          <Button variant="primary" className="w-full py-3 mt-4">
            Iniciar Sesión
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Login;