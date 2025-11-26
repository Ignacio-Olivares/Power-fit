import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const Register = () => {
  // Estado inicial con los campos requeridos en el documento (Fuente: 478)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
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
    console.log('Registro enviado:', formData);
    // Aquí conectaremos con Django más adelante
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Botón Volver */}
      <div className="absolute top-24 left-4 md:left-8">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors">
          <ArrowLeft size={20} />
          Volver al menú
        </Link>
      </div>

      {/* Tarjeta de Registro (Basada en Figura 9) */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 border border-gray-100">
        
        {/* Encabezado */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Powerfit Copiapó</h1>
          <p className="text-gray-500 text-sm mt-1">Accede a tu cuenta o crea una nueva</p>
        </div>

        {/* Pestañas (Tabs) */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <Link to="/login" className="flex-1 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 text-center">
            Iniciar Sesión
          </Link>
          <button className="flex-1 py-2 text-sm font-semibold bg-white text-gray-900 rounded-md shadow-sm">
            Registrarse
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
            <input 
              type="text" 
              name="nombre"
              placeholder="Juan"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido</label>
            <input 
              type="text" 
              name="apellido"
              placeholder="Pérez"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico o teléfono</label>
            <input 
              type="text" 
              name="email"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <Button variant="primary" className="w-full py-3 mt-2">
            Crear Cuenta
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Register;