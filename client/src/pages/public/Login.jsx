import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const Login = () => {
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      correo: formData.email,
      password: formData.password
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        // Guardar los datos del usuario para usar en toda la app
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.nombre);
        localStorage.setItem("userEmail", data.correo);
        localStorage.setItem("userApellido", data.apellido);

        // Redirigir al dashboard del usuario
        navigate("/user/dashboard");
      } else {
        alert(data.error || "Credenciales incorrectas");
      }

    } catch (error) {
      console.error("Network error:", error);
      alert("No se pudo conectar con el servidor");
    }
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

      {/* Tarjeta de Login */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 border border-gray-100">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Powerfit Copiapó</h1>
          <p className="text-gray-500 text-sm mt-1">Accede a tu cuenta o crea una nueva</p>
        </div>

        {/* Pestañas */}
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

          {/* Correo */}
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
              required
            />
          </div>

          {/* Contraseña */}
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
              required
            />
          </div>

          {/* Botón */}
          <Button type="submit" variant="primary" className="w-full py-3 mt-4">
            Iniciar Sesión
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Login;
