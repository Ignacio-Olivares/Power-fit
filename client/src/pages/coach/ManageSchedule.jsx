import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Plus, X, Save } from 'lucide-react';
import Button from '../../components/common/Button';

const ManageSchedule = () => {
  // Estado para controlar el modo de edición
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // Datos simulados idénticos a tu imagen "horario.png"
  const [schedule, setSchedule] = useState([
    {
      id: 1, day: "Lunes", date: "1 de diciembre",
      classes: [
        { id: 101, name: "Baile Entretenido", time: "18:00-19:00" },
        { id: 102, name: "Step", time: "19:00-20:00" }
      ]
    },
    {
      id: 2, day: "Martes", date: "2 de diciembre",
      classes: [
        { id: 201, name: "Localizado", time: "18:00-19:00" },
        { id: 202, name: "Fit Salsa", time: "19:00-20:00" }
      ]
    },
    {
      id: 3, day: "Miércoles", date: "3 de diciembre",
      classes: [
        { id: 301, name: "Step", time: "18:00-19:00" },
        { id: 302, name: "Baile Entretenido", time: "19:00-20:00" },
        { id: 303, name: "Taller Bachata", time: "20:00-21:00" }
      ]
    },
    {
      id: 4, day: "Jueves", date: "4 de diciembre",
      classes: [
        { id: 401, name: "Fit Salsa", time: "18:00-19:00" },
        { id: 402, name: "Localizado", time: "19:00-20:00" }
      ]
    },
    {
      id: 5, day: "Viernes", date: "5 de diciembre",
      classes: [
        { id: 501, name: "Baile Entretenido", time: "18:00-19:00" },
        { id: 502, name: "Step", time: "19:00-20:00" },
        { id: 503, name: "Taller Bachata", time: "20:00-21:00" }
      ]
    },
    {
      id: 6, day: "Sábado", date: "6 de diciembre",
      classes: [
        { id: 601, name: "Localizado", time: "10:00-11:00" },
        { id: 602, name: "Fit Salsa", time: "11:00-12:00" },
        { id: 603, name: "Megafit", time: "18:30-19:30" }
      ]
    },
    {
      id: 7, day: "Domingo", date: "7 de diciembre",
      classes: [
        { id: 701, name: "Taller Bachata", time: "17:00-18:00" }
      ]
    }
  ]);

  // Manejo de la autenticación para editar (Figura 38)
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "12345") { // Contraseña del documento
      setIsEditMode(true);
      setShowAuthModal(false);
      setPasswordInput("");
    } else {
      alert("Contraseña incorrecta");
    }
  };

  // Simulación de eliminar una clase
  const handleDeleteClass = (dayId, classId) => {
    if (window.confirm("¿Seguro que deseas eliminar esta clase?")) {
      setSchedule(schedule.map(day => {
        if (day.id === dayId) {
          return { ...day, classes: day.classes.filter(c => c.id !== classId) };
        }
        return day;
      }));
    }
  };

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

        {/* Encabezado y Botón Modificar */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Horario Semanal</h1>
          
          {isEditMode ? (
            <div className="flex justify-center gap-3">
              <Button onClick={() => setIsEditMode(false)} className="bg-gray-500 hover:bg-gray-600 flex items-center gap-2">
                <Save size={18} /> Guardar Cambios
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                <Plus size={18} /> Agregar Clase
              </Button>
            </div>
          ) : (
            <Button onClick={() => setShowAuthModal(true)} variant="primary" className="flex items-center gap-2 mx-auto">
              <Edit2 size={18} /> Modificar Horario
            </Button>
          )}
        </div>

        {/* Grilla de Horarios (4 columnas en PC como la imagen) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schedule.map((day) => (
            <div key={day.id} className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${isEditMode ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-200'}`}>
              
              <h3 className="font-bold text-gray-800 mb-1">{day.day} {day.date}</h3>
              <div className="h-px w-full bg-gray-100 mb-4"></div>

              <div className="space-y-3">
                {day.classes.length > 0 ? (
                  day.classes.map((cls) => (
                    <div key={cls.id} className="flex justify-between items-start group">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{cls.name}</p>
                        <p className="text-xs text-gray-500">{cls.time}</p>
                      </div>
                      
                      {/* Botón Eliminar (Solo en modo edición) */}
                      {isEditMode && (
                        <button 
                          onClick={() => handleDeleteClass(day.id, cls.id)}
                          className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">Sin clases programadas</p>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* MODAL DE AUTENTICACIÓN (Figura 38) */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full animate-slide-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Ingresa la contraseña</h3>
                <button onClick={() => setShowAuthModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              
              <p className="text-gray-500 text-sm mb-6">
                Se requiere una contraseña para modificar el horario.
              </p>

              <form onSubmit={handleAuthSubmit}>
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Contraseña</label>
                  <input 
                    type="password" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="•••••"
                    autoFocus
                  />
                </div>
                <Button variant="primary" className="w-full justify-center">
                  Confirmar
                </Button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageSchedule;