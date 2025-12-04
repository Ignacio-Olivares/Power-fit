import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertCircle, X, Eye } from 'lucide-react';
import Button from '../../components/common/Button';

const ManageMemberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [activeTab, setActiveTab] = useState('Pendientes');
  const [selectedImage, setSelectedImage] = useState(null);

  // Cargar datos
  const fetchMemberships = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/coach/membresias/");
      const data = await res.json();
      setMemberships(data);
    } catch (error) {
      console.error("Error cargando membresías:", error);
    }
  };

  useEffect(() => {
    const loadMemberships = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/coach/membresias/");
        const data = await res.json();
        setMemberships(data);
      } catch {
        console.error("Error cargando membresías");
      }
    };
    loadMemberships();
  }, []);

  // Función Aprobar
  const handleApprove = async (id) => {
    if(!window.confirm("¿Aprobar esta membresía?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/coach/aprobar-membresia/${id}/`, { method: "POST" });
      if (res.ok) {
        alert("Membresía aprobada");
        fetchMemberships();
      }
    } catch {
      alert("Error al aprobar");
    }
  };

  // Función Rechazar (Eliminar)
  const handleReject = async (id) => {
    if(!window.confirm("¿Estás seguro de RECHAZAR y ELIMINAR esta solicitud?")) return;
    try {
      // Asegúrate de que esta ruta exista en tu urls.py backend
      const res = await fetch(`http://127.0.0.1:8000/membresia/eliminar/${id}/`, { method: "DELETE" });
      if (res.ok) {
        alert("Solicitud eliminada");
        // Actualizar estado localmente para rapidez
        setMemberships(prev => prev.filter(m => m.id !== id));
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  // Filtrado
  const filteredList = memberships.filter(m => {
    if (activeTab === 'Todas') return true;
    // Ajuste simple: si tu backend devuelve "Pendiente" (singular), y el tab es "Pendientes" (plural)
    const statusToMatch = activeTab.endsWith('s') ? activeTab.slice(0, -1) : activeTab;
    return m.status === statusToMatch; 
  });

  const tabs = ['Pendientes', 'Activas', 'Todas'];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
        <Link to="/coach/panel" className="flex items-center gap-2 text-gray-600 mb-6">
            <ArrowLeft size={20} /> Volver al Panel
        </Link>
        <h1 className="text-3xl font-bold text-center mb-8">Gestión de Membresías</h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-full font-semibold ${activeTab === tab ? 'bg-green-500 text-white' : 'bg-white text-gray-600 border'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Lista */}
        <div className="max-w-5xl mx-auto space-y-4">
            {filteredList.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-gray-900">{item.user || `Usuario #${item.usuario}`}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                {item.status ? item.status.toUpperCase() : 'ESTADO'}
                            </span>
                        </div>
                        <p className="text-gray-500">{item.plan_nombre || item.plan}</p>
                        
                        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                            <div>
                                <span className="block font-bold text-gray-400 text-xs">Precio</span>
                                ${item.plan_precio || item.price}
                            </div>
                            <div>
                                <span className="block font-bold text-gray-400 text-xs">Clases</span>
                                {item.plan_clases || item.totalClasses}
                            </div>
                            <div>
                                <span className="block font-bold text-gray-400 text-xs">Fecha</span>
                                {item.start_date || item.startDate}
                            </div>
                        </div>

                        {/* --- LÓGICA DEL ARCHIVO ADJUNTO --- */}
                        {/* Se muestra SOLO si está Pendiente y existe el comprobante */}
                        {item.status === 'Pendiente' && (
                            <div className="mt-4">
                                {item.comprobante ? (
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => setSelectedImage(item.comprobante.startsWith('http') ? item.comprobante : `http://127.0.0.1:8000${item.comprobante}`)}
                                            className="inline-flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors w-fit"
                                        >
                                            <Eye size={16} /> Ver Comprobante
                                        </button>
                                    </div>
                                ) : (
                                    <span className="inline-flex items-center gap-2 text-gray-400 text-sm italic">
                                        <AlertCircle size={16} /> Sin comprobante
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Botones de Acción (Solo Pendientes) */}
                    {item.status === 'Pendiente' && (
                        <div className="flex gap-3 md:border-l md:pl-6 md:flex-col lg:flex-row">
                            <button 
                                onClick={() => handleReject(item.id)}
                                className="px-4 py-2 rounded-full border border-red-500 text-red-500 font-semibold hover:bg-red-50 transition-colors text-sm whitespace-nowrap"
                            >
                                Rechazar
                            </button>
                            <Button 
                                variant="primary" 
                                onClick={() => handleApprove(item.id)} 
                                className="text-sm whitespace-nowrap"
                            >
                                Aprobar
                            </Button>
                        </div>
                    )}
                </div>
            ))}
            
            {filteredList.length === 0 && (
                <p className="text-center text-gray-400 py-10">No hay membresías en esta categoría.</p>
            )}
        </div>

        {/* Modal para ver imagen en grande */}
        {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedImage(null)}>
                <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <X size={24} className="text-gray-700" />
                    </button>
                    <div className="aspect-auto">
                        <img src={selectedImage} alt="Comprobante" className="w-full h-auto rounded-xl" />
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default ManageMemberships;