import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users } from 'lucide-react';
import Button from '../../components/common/Button';

import fotoBaile from '../../assets/images/baile.jpeg';
import fotoLocalizado from '../../assets/images/localizado.jpeg';
import fotoStep from '../../assets/images/step.jpeg';  

const Classes = () => {
  // Datos completos basados en la Figura 13
  const classesData = [
    {
      id: 1,
      title: "Baile Entretenido",
      image: fotoBaile,
      schedules: [
        { day: "Lunes", time: "18:00 - 19:00", spots: 8 },
        { day: "Miércoles", time: "19:00 - 20:00", spots: 5 }, // Rojo en imagen
        { day: "Viernes", time: "18:00 - 19:00", spots: 12 }
      ]
    },
    {
      id: 2,
      title: "Localizado",
      image: fotoStep,
      schedules: [
        { day: "Martes", time: "18:00 - 19:00", spots: 10 },
        { day: "Jueves", time: "19:00 - 20:00", spots: 7 }, // Rojo en imagen
        { day: "Sábado", time: "10:00 - 11:00", spots: 15 }
      ]
    },
    {
      id: 3,
      title: "Step",
      image: fotoStep,
      schedules: [
        { day: "Lunes", time: "19:00 - 20:00", spots: 6 }, // Rojo en imagen
        { day: "Miércoles", time: "18:00 - 19:00", spots: 9 },
        { day: "Viernes", time: "19:00 - 20:00", spots: 4 } // Rojo en imagen
      ]
    },
    {
      id: 4,
      title: "Fit Salsa",
      image: fotoLocalizado,
      schedules: [
        { day: "Martes", time: "19:00 - 20:00", spots: 11 },
        { day: "Jueves", time: "18:00 - 19:00", spots: 8 },
        { day: "Sábado", time: "11:00 - 12:00", spots: 13 }
      ]
    },
    {
      id: 5,
      title: "Taller Bachata",
      image: fotoLocalizado,
      schedules: [
        { day: "Miércoles", time: "20:00 - 21:00", spots: 10 },
        { day: "Viernes", time: "20:00 - 21:00", spots: 6 }, // Rojo en imagen
        { day: "Domingo", time: "17:00 - 18:00", spots: 14 }
      ]
    },
    {
      id: 6,
      title: "Megafit",
      image: fotoBaile,
      schedules: [
        { day: "Sábado", time: "18:30 - 19:30", spots: 20 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Botón Volver */}
        <div className="mb-8">
          <Link to="/user/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors w-fit">
            <ArrowLeft size={20} />
            Volver al Menú
          </Link>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Nuestras Clases
          </h1>
          <p className="text-gray-500">
            Horarios y cupos disponibles
          </p>
        </div>

        {/* Grilla de Clases (3 columnas en escritorio) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classesData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
              
              {/* Imagen de Cabecera */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </div>

              {/* Lista de Horarios */}
              <div className="p-6 flex-grow">
                <div className="space-y-4">
                  {item.schedules.map((schedule, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                      
                      {/* Día y Hora */}
                      <div>
                        <span className="block font-bold text-gray-800 text-sm">{schedule.day}</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Clock size={12} /> {schedule.time}
                        </div>
                      </div>

                      {/* Cupos y Botón */}
                      <div className="flex flex-col items-end gap-2">
                        {/* Lógica de color para cupos: Rojo si son menos de 8 (según referencia visual), Verde si son más */}
                        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full
                          ${schedule.spots < 8 ? 'bg-red-500 text-white' : 'bg-transparent text-gray-600'}
                        `}>
                          <Users size={12} /> {schedule.spots} cupos
                        </div>
                        
                          <Link 
                            to="/user/classes/booking" 
                            state={{ schedule: schedule, classTitle: item.title }}
                          >
                            <Button variant="primary" className="text-xs px-4 py-1 h-auto">
                              Reservar
                            </Button>
                          </Link>
                      </div>

                    </div>
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

export default Classes;