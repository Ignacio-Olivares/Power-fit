import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Loader } from 'lucide-react';
import Button from '../../components/common/Button';

const PaymentMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('transferencia');
  const [selectedFile, setSelectedFile] = useState(null); // Estado para el archivo
  
  const { plan } = location.state || {};
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!plan || !userId) navigate("/user/memberships");
  }, [plan, userId, navigate]);

  if (!plan) return null;

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFinalizePurchase = async () => {
    if (paymentMethod === 'transferencia' && !selectedFile) {
      alert("Por favor, adjunta el comprobante de pago.");
      return;
    }

    setLoading(true);

    // USAMOS FORMDATA PARA ENVIAR IMAGENES
    const formData = new FormData();
    formData.append("usuario", userId);
    formData.append("plan_nombre", plan.name);
    formData.append("plan_clases", plan.classes);
    formData.append("plan_precio", plan.price);
    
    if (selectedFile) {
      formData.append("comprobante", selectedFile);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/comprar-membresia/", {
        method: "POST",
        body: formData, // No lleva Content-Type header manualmente, fetch lo pone solo
      });

      if (res.ok) {
        // MENSAJE DE ESPERA SOLICITADO
        alert("Solicitud enviada con éxito. Espere la confirmación del administrador.");
        navigate("/user/dashboard"); 
      } else {
        const data = await res.json();
        alert("Error: " + (data.error || "No se pudo procesar"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Botón Volver */}
      <div className="absolute top-24 left-4 md:left-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium">
          <ArrowLeft size={20} /> Volver
        </button>
      </div>

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Método de Pago</h1>
        
        {/* Opción Transferencia */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer mb-2">
            <input 
              type="radio" 
              className="text-green-500 focus:ring-green-500"
              checked={paymentMethod === 'transferencia'}
              onChange={() => setPaymentMethod('transferencia')}
            />
            <span className="font-semibold text-gray-700">Transferencia Bancaria</span>
          </label>

          {paymentMethod === 'transferencia' && (
            <div className="ml-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm space-y-2 animate-fade-in">
              <p><strong>Datos bancarios...</strong> (Aquí van tus datos)</p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="block font-bold mb-2 text-gray-700">Adjuntar Comprobante *</label>
                
                {/* Input de Archivo Personalizado */}
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors bg-gray-50">
                  <input 
                    type="file" 
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Upload size={24} className="mb-2 text-green-500"/>
                    <span className="text-sm font-medium">
                      {selectedFile ? selectedFile.name : "Haz clic para subir imagen"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Button variant="primary" className="w-full py-3" onClick={handleFinalizePurchase} disabled={loading}>
          {loading ? <Loader className="animate-spin mx-auto"/> : "Confirmar Pago"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;