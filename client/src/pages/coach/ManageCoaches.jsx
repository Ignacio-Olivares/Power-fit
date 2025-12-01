import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, User } from 'lucide-react';
import Button from '../../components/common/Button';

const ManageCoaches = () => {
  // Datos simulados basados en la imagen "coaches.png"
  const coaches = [
    {
      id: 1,
      name: "Gabriela Sosa",
      bio: "Coach profesional especializada en baile entretenido con más de 5 años de experiencia.",
      specialties: ["baile entretenido"]
    },
    {
      id: 2,
      name: "Javier Ortiz",
      bio: "Entrenador multidisciplinario enfocado en fitness y baile.",
      specialties: ["localizado", "step", "baile entretenido"]
    },
    {
      id: 3,
      name: "Cristian Rivera",
      bio: "Especialista en ritmos latinos y baile social.",
      specialties: ["fit salsa", "taller de bachata"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Botón Volver */}
        <div className="mb-6">
          <Link to="/coach/panel" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors w-fit">
            <ArrowLeft size={20} />
            Volver al Panel
          </Link>
        </div>

        {/* Encabezado y Botón Crear */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Coaches</h1>
          
          <Link to="/coach/create-coach">
            <Button variant="primary" className="flex items-center gap-2 shadow-lg">
              <Plus size={20} /> Crear Nuevo Coach
            </Button>
          </Link>
        </div>

        {/* Grilla de Coaches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div key={coach.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              
              {/* Nombre e Icono */}
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar simulado */}
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <User size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{coach.name}</h3>
              </div>

              {/* Biografía */}
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Bio</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {coach.bio}
                </p>
              </div>

              {/* Especialidades (Tags) */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Especialidades</p>
                <div className="flex flex-wrap gap-2">
                  {coach.specialties.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ManageCoaches;