import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const History = () => {
  // Estado para controlar qué pestaña está activa ('classes' o 'payments')
  const [activeTab, setActiveTab] = useState('classes');

  // Datos simulados: Historial de Clases (Figura 17)
  const classHistory = [
    {
      id: 1,
      title: "Baile Entretenido",
      date: "Lunes - 18:00",
      reservedDate: "26 de octubre de 2025",
      status: "reservada" // Estados: reservada, asistida, no_asistida
    },
    {
      id: 2,
      title: "Step",
      date: "Miércoles - 19:00",
      reservedDate: "23 de octubre de 2025",
      status: "asistida"
    },
    {
      id: 3,
      title: "Fit Salsa",
      date: "Viernes - 18:00",
      reservedDate: "21 de octubre de 2025",
      status: "no_asistida"
    }
  ];

  // Datos simulados: Historial de Pagos (Figura 18)
  const paymentHistory = [
    {
      id: 1,
      amount: 3500,
      description: "Clase - Efectivo",
      date: "26 de octubre de 2025, 00:35",
      status: "pendiente" // Estados: pendiente, pagado, anulado
    },
    {
      id: 2,
      amount: 20000,
      description: "Plan Mensual - Transferencia",
      date: "28 de septiembre de 2025, 10:00",
      status: "pagado"
    }
  ];

  // Función auxiliar para formatear dinero
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  // Función para obtener el color y texto del estado (Clases)
  const getClassStatusBadge = (status) => {
    switch (status) {
      case 'reservada':
        return <span className="flex items-center gap-1 text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full"><Clock size={12}/> Reservada</span>;
      case 'asistida':
        return <span className="flex items-center gap-1 text-xs font-bold bg-green-50 text-green-600 px-3 py-1 rounded-full"><CheckCircle size={12}/> Asistida</span>;
      case 'no_asistida':
        return <span className="flex items-center gap-1 text-xs font-bold bg-red-50 text-red-600 px-3 py-1 rounded-full"><XCircle size={12}/> No Asistida</span>;
      default:
        return null;
    }
  };

  // Función para obtener el color y texto del estado (Pagos)
  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'pendiente':
        return <span className="flex items-center gap-1 text-xs font-bold bg-orange-50 text-orange-600 px-3 py-1 rounded-full"><AlertCircle size={12}/> Pendiente</span>;
      case 'pagado':
        return <span className="flex items-center gap-1 text-xs font-bold bg-green-50 text-green-600 px-3 py-1 rounded-full"><CheckCircle size={12}/> Pagado</span>;
      case 'anulado':
        return <span className="flex items-center gap-1 text-xs font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-full"><XCircle size={12}/> Anulado</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Botón Volver */}
        <div className="mb-8">
          <Link to="/user/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors w-fit">
            <ArrowLeft size={20} />
            Volver al Menú
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Historial</h1>
          <p className="text-gray-500">Historial de clases y pagos</p>
        </div>

        {/* --- CONTROLES DE PESTAÑAS (TABS) --- */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 mb-8 max-w-md mx-auto">
          <button 
            onClick={() => setActiveTab('classes')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2
              ${activeTab === 'classes' ? 'bg-green-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Calendar size={16} /> Clases
          </button>
          <button 
            onClick={() => setActiveTab('payments')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2
              ${activeTab === 'payments' ? 'bg-green-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <DollarSign size={16} /> Pagos
          </button>
        </div>

        {/* --- CONTENIDO CONDICIONAL --- */}
        <div className="space-y-4">
          
          {/* VISTA 1: CLASES */}
          {activeTab === 'classes' && (
            <div className="animate-fade-in space-y-4">
              {classHistory.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="text-green-500" size={18} />
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">{item.date}</p>
                    <p className="text-xs text-gray-400 ml-6 mt-1">Reservado: {item.reservedDate}</p>
                  </div>
                  <div>
                    {getClassStatusBadge(item.status)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VISTA 2: PAGOS */}
          {activeTab === 'payments' && (
            <div className="animate-fade-in space-y-4">
              {paymentHistory.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-bold text-gray-900">{formatPrice(item.amount)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1">Fecha: {item.date}</p>
                  </div>
                  <div>
                    {getPaymentStatusBadge(item.status)}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default History;