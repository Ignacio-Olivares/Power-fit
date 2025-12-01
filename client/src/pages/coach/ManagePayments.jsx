import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import Button from '../../components/common/Button';

const ManagePayments = () => {
  // Datos simulados idénticos a la imagen "pagos.png"
  const payments = [
    {
      id: 1,
      user: "va dd (Invitado)",
      itemType: "class",
      amount: 3500,
      method: "cash",
      date: "3/11/2025",
      time: "18:47",
      status: "Pendiente"
    },
    {
      id: 2,
      user: "Valeria Lopez (Invitado)",
      itemType: "class",
      amount: 3500,
      method: "cash",
      date: "29/10/2025",
      time: "13:35",
      status: "Pendiente"
    },
    {
      id: 3,
      user: "Valeria Lopez (Invitado)",
      itemType: "class",
      amount: 3500,
      method: "cash",
      date: "29/10/2025",
      time: "13:35",
      status: "Pendiente"
    }
  ];

  // Formateador de dinero
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Botón Volver */}
        <div className="mb-6">
          <Link to="/coach/panel" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors w-fit">
            <ArrowLeft size={20} />
            Volver al Panel
          </Link>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pagos</h1>
        </div>

        {/* Panel de Filtros */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Filtrar por fecha</h3>
          
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Input Inicio */}
            <div className="w-full lg:flex-1">
              <label className="block text-xs font-bold text-gray-500 mb-1">Fecha inicio</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-600" 
              />
            </div>

            {/* Input Fin */}
            <div className="w-full lg:flex-1">
              <label className="block text-xs font-bold text-gray-500 mb-1">Fecha fin</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-600" 
              />
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-3 w-full lg:w-auto">
              <Button variant="primary" className="px-6 py-2 h-[42px] flex items-center justify-center">
                Filtrar
              </Button>
              
              <button className="px-6 py-2 h-[42px] rounded-full font-semibold border border-green-500 text-green-500 hover:bg-green-50 transition-colors flex items-center gap-2 justify-center">
                <Download size={18} /> Exportar
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Pagos */}
        <div className="space-y-4">
          {payments.map((pay) => (
            <div key={pay.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              
              {/* Fila Superior: Usuario y Estado */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{pay.user}</h3>
                  <p className="text-sm text-gray-400">{pay.itemType}</p>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">
                  {pay.status}
                </span>
              </div>

              {/* Fila Inferior: Detalles (Grid 4 columnas) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                {/* Monto */}
                <div>
                  <span className="block text-xs text-gray-400 font-bold mb-1">Monto</span>
                  <span className="text-lg font-bold text-gray-900">{formatPrice(pay.amount)}</span>
                </div>

                {/* Método */}
                <div>
                  <span className="block text-xs text-gray-400 font-bold mb-1">Método</span>
                  <span className="text-lg font-bold text-gray-900 capitalize">{pay.method}</span>
                </div>

                {/* Fecha */}
                <div>
                  <span className="block text-xs text-gray-400 font-bold mb-1">Fecha</span>
                  <span className="text-lg font-bold text-gray-700">{pay.date}</span>
                </div>

                {/* Hora */}
                <div>
                  <span className="block text-xs text-gray-400 font-bold mb-1">Hora</span>
                  <span className="text-lg font-bold text-gray-700">{pay.time}</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ManagePayments;