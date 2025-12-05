import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const CreateCoach = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    biografia: '',
    especialidades: ''
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
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.email,
      password: formData.password,
      bibliografia: formData.biografia,
      especialidad: formData.especialidades
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/coaches/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Rol": localStorage.getItem("userRol") || "usuario"   // ← 🔥 IMPORTANTE
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Coach creado exitosamente");
        navigate('/coach/coaches');
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        
        <div className="mb-6">
          <Link to="/coach/coaches" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors w-fit">
            <ArrowLeft size={20} />
            Volver a Coaches
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
          
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Crear Nuevo Coach</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                <input 
                  type="text" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido *</label>
                <input 
                  type="text" 
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
              <input 
                type="tel" 
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña *</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Biografía</label>
              <textarea 
                name="biografia"
                rows="4"
                value={formData.biografia}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Especialidades (separadas por coma)</label>
              <input 
                type="text" 
                name="especialidades"
                placeholder="Ej: Baile entretenido, Step, Localizado"
                value={formData.especialidades}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <Button variant="primary" type='submit' className="w-full py-3 text-lg mt-4">
              Crear Coach
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoach;
