import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wallet, Calendar, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import Button from '../../components/common/Button';

const MyMembership = () => {
  // Estado para simular si tiene plan o no
  const [hasActivePlan, setHasActivePlan] = useState(true);

  // Datos simulados del plan activo (Figura 19)
  const activePlan = {
    name: "Plan 2",
    price: 20000,
    totalClasses: 15,
    remainingClasses: 12,
    startDate: "28 de octubre de 2025",
    status: "Activa",
    usageHistory: [
      { id: 1, class: "Baile Entretenido", date: "26/10/2025", time: "18:00 - 19:00" },
      { id: 2, class: "Step", date: "23/10/2025", time: "19:00 - 20:00" },
      { id: 3, class: "Fit Salsa", date: "21/10/2025", time: "18:00 - 19:00" }
    ]
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Encabezado de Navegación */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/user/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors">
            <ArrowLeft size={20} />
            Volver al Menú
          </Link>

          {/* --- BOTÓN DE PRUEBA (Soluciona el warning y sirve para probar) --- */}
          <button 
            onClick={() => setHasActivePlan(!hasActivePlan)}
            className="text-xs flex items-center gap-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition-colors"
          >
            <RefreshCw size={14} />
            {hasActivePlan ? "Simular: Sin Plan" : "Simular: Con Plan"}
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Membresía</h1>
          <p className="text-gray-500">Detalles de tu plan actual</p>
        </div>

        {/* --- CONTENIDO CONDICIONAL --- */}
        {hasActivePlan ? (
          
          // ESTADO 1: CON PLAN (Figura 19)
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-xl text-green-600">
                    <Wallet size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{activePlan.name}</h2>
                    <p className="text-gray-500">{formatPrice(activePlan.price)}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                  {activePlan.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-b border-gray-100 py-6 mb-6">
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Clases totales</span>
                  <span className="text-3xl font-bold text-gray-900">{activePlan.totalClasses}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Clases restantes</span>
                  <span className="text-3xl font-bold text-green-600">{activePlan.remainingClasses}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} />
                Inicio: {activePlan.startDate}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Historial de Uso</h3>
              <div className="space-y-4">
                {activePlan.usageHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500" />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{item.class}</h4>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        ) : (
          
          // ESTADO 2: SIN PLAN (Figura 20)
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center animate-fade-in">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <AlertCircle size={40} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No tienes una membresía activa</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Adquiere un plan ahora para comenzar a reservar tus clases y mejorar tu salud.
            </p>
            <Link to="/user/memberships">
              <Button variant="primary">
                Ver Membresías Disponibles
              </Button>
            </Link>
          </div>

        )}

      </div>
    </div>
  );
};

export default MyMembership;