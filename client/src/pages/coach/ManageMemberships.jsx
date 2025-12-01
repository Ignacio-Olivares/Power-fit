import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Filter } from 'lucide-react';
import Button from '../../components/common/Button';

const ManageMemberships = () => {
  const [activeTab, setActiveTab] = useState('Todas');

  // Datos simulados (Mock Data) basados en la imagen "gestion membresias.png"
  const memberships = [
    {
      id: 1,
      user: "Coach PowerFit",
      plan: "Plan Mensual",
      price: 25000,
      totalClasses: 12,
      remainingClasses: 8,
      startDate: "18/10/2025",
      status: "Activa"
    },
    {
      id: 2,
      user: "Admin PowerFit",
      plan: "Plan Semestral",
      price: 120000,
      totalClasses: 80,
      remainingClasses: 55,
      startDate: "29/08/2025",
      status: "Activa"
    },
    {
      id: 3,
      user: "Valeria Lopez",
      plan: "Plan Mensual",
      price: 25000,
      totalClasses: 12,
      remainingClasses: 3,
      startDate: "03/10/2025",
      status: "Activa"
    },
    {
      id: 4,
      user: "Coach PowerFit",
      plan: "Plan Trimestral",
      price: 65000,
      totalClasses: 40,
      remainingClasses: 10,
      startDate: "03/08/2025",
      status: "Activa"
    },
    {
      id: 5,
      user: "Admin PowerFit",
      plan: "Plan Mensual",
      price: 25000,
      totalClasses: 12,
      remainingClasses: 0,
      startDate: "29/08/2025",
      status: "Vencida"
    },
    {
      id: 6,
      user: "Juan Pérez",
      plan: "Plan Trimestral",
      price: 65000,
      totalClasses: 40,
      remainingClasses: 40,
      startDate: "28/10/2025",
      status: "Pendiente" // Agregado para probar las pestañas
    }
  ];

  // Filtramos las membresías según la pestaña activa
  const filteredMemberships = activeTab === 'Todas' 
    ? memberships 
    : memberships.filter(m => m.status === activeTab.replace('s', '')); // Truco simple para singularizar (Activas -> Activa)

  // Calculamos los contadores para las pestañas
  const counts = {
    Todas: memberships.length,
    Activas: memberships.filter(m => m.status === 'Activa').length,
    Pendientes: memberships.filter(m => m.status === 'Pendiente').length,
    'Por vencer': memberships.filter(m => m.status === 'Por vencer').length,
    Vencidas: memberships.filter(m => m.status === 'Vencida').length,
  };

  const tabs = ['Todas', 'Activas', 'Pendientes', 'Por vencer', 'Vencidas'];

  // Función para obtener el color del badge de estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'Activa': return 'bg-green-500 text-white';
      case 'Pendiente': return 'bg-gray-200 text-gray-600';
      case 'Por vencer': return 'bg-orange-500 text-white';
      case 'Vencida': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Formateador de dinero
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Botón Volver */}
        <div className="mb-6">
          {/* Asumiendo que /coach/panel es la ruta del Dashboard del Coach */}
          <Link to="/coach/panel" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors w-fit">
            <ArrowLeft size={20} />
            Volver al Panel
          </Link>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Membresías</h1>
        </div>

        {/* Panel de Filtros (Fecha) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
            <Calendar size={20} />
            <h3>Filtrar por fecha</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 mb-1">Fecha inicio</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 mb-1">Fecha fin</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Pestañas (Tabs) */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap flex-1 md:flex-none
                ${activeTab === tab 
                  ? 'bg-white shadow-md text-green-600 border border-gray-100' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
            >
              {tab} <span className="text-xs ml-1 opacity-70">({counts[tab]})</span>
            </button>
          ))}
        </div>

        {/* Lista de Tarjetas */}
        <div className="space-y-4">
          {filteredMemberships.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              
              {/* Encabezado de la Tarjeta */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.user}</h3>
                  <p className="text-sm text-gray-500">{item.plan}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              {/* Grilla de Detalles */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                {/* Precio */}
                <div>
                  <span className="block text-xs text-gray-400 font-bold mb-1">Precio</span>
                  <span className="text-lg font-bold text-gray-900">{formatPrice(item.price)}</span>
                </div>

                {/* Clases Totales */}
                <div>
                  <span className="block text-xs text-gray-400 font-bold mb-1">Clases totales</span>
                  <span className="text-lg font-bold text-gray-900">{item.totalClasses}</span>
                </div>

                {/* Clases Restantes (Destacado en verde) */}
                <div>
                  <span className="block text-xs text-gray-400 font-bold mb-1">Clases restantes</span>
                  <span className={`text-lg font-bold ${item.remainingClasses > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.remainingClasses}
                  </span>
                </div>

                {/* Fecha Inicio */}
                <div>
                  <span className="block text-xs text-gray-400 font-bold mb-1">Fecha inicio</span>
                  <span className="text-lg font-bold text-gray-700">{item.startDate}</span>
                </div>

              </div>

              {/* Botón de acción para Pendientes (Opcional, según diseño podría ir aquí) */}
              {item.status === 'Pendiente' && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                  <Button variant="primary" className="text-sm py-2">Aprobar Membresía</Button>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ManageMemberships;