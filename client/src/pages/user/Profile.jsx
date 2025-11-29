import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Activity, Heart } from 'lucide-react';
import Button from '../../components/common/Button';

const Profile = () => {
  const user = {
    nombre: "Valeria",
    apellido: "López",
    email: "correo@correo.cl"
  };

  const [physicalData, setPhysicalData] = useState({
    weight: 60, 
    height: 160 
  });

  const [imc, setImc] = useState(0);
  const [imcStatus, setImcStatus] = useState("");
  const [imcColor, setImcColor] = useState("text-gray-900");

  // --- 1. DEFINIMOS LA FUNCIÓN PRIMERO (Para evitar el error) ---
  const determineImcStatus = (value) => {
    if (value < 18.5) {
      setImcStatus("Bajo peso");
      setImcColor("text-blue-500");
    } else if (value >= 18.5 && value <= 24.9) {
      setImcStatus("Peso normal");
      setImcColor("text-green-500");
    } else if (value >= 25 && value <= 29.9) {
      setImcStatus("Sobrepeso");
      setImcColor("text-orange-500");
    } else {
      setImcStatus("Obesidad");
      setImcColor("text-red-500");
    }
  };

  // --- 2. AHORA EL EFECTO PUEDE USARLA ---
  useEffect(() => {
    const heightInMeters = physicalData.height / 100;
    // Validamos que no sea cero para evitar errores de división
    if (heightInMeters > 0 && physicalData.weight > 0) {
      const calculatedImc = (physicalData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      setImc(calculatedImc);
      
      // Llamamos a la función que ya fue definida arriba
      determineImcStatus(calculatedImc);
    }
  }, [physicalData]); 

  const handleChange = (e) => {
    setPhysicalData({
      ...physicalData,
      [e.target.name]: parseFloat(e.target.value) || 0
    });
  };

  const handleSave = () => {
    alert("Datos guardados correctamente");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Botón Volver */}
        <div className="mb-8">
          <Link to="user/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors w-fit">
            <ArrowLeft size={20} />
            Volver al Menú
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Mi Ficha Personal</h1>
          <p className="text-gray-500">Información personal y médica</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Tarjeta 1: Datos Personales */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-green-500" />
              <h3 className="text-lg font-bold text-gray-900">Datos Personales</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nombre</label>
                <div className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-600">
                  {user.nombre}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Apellido</label>
                <div className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-600">
                  {user.apellido}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Correo Electrónico</label>
                <div className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-600">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Datos Físicos */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-green-500" />
                <h3 className="text-lg font-bold text-gray-900">Datos Físicos</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Peso (kg)</label>
                  <input 
                    type="number" 
                    name="weight"
                    value={physicalData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Altura (cm)</label>
                  <input 
                    type="number" 
                    name="height"
                    value={physicalData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Cálculo IMC */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="text-green-500" />
              <h3 className="text-lg font-bold text-gray-900">Índice de Masa Corporal (IMC)</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              
              <div className="flex-1 bg-green-50 rounded-xl p-8 text-center w-full">
                <p className="text-gray-500 text-sm mb-2">Tu IMC es</p>
                <h2 className={`text-5xl font-extrabold mb-2 ${imcColor}`}>{imc}</h2>
                <span className={`px-4 py-1 rounded-full text-sm font-bold bg-white shadow-sm ${imcColor}`}>
                  {imcStatus}
                </span>
                <div className="mt-6">
                  <Button variant="primary" onClick={handleSave}>
                    Guardar Registro
                  </Button>
                </div>
              </div>

              <div className="flex-1 w-full">
                <h4 className="font-bold text-gray-700 mb-4">Rangos de IMC:</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Bajo peso</span>
                    <span className="font-semibold text-blue-500">&lt; 18.5</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Peso normal</span>
                    <span className="font-semibold text-green-500">18.5 - 24.9</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Sobrepeso</span>
                    <span className="font-semibold text-orange-500">25 - 29.9</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Obesidad</span>
                    <span className="font-semibold text-red-500">≥ 30</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Última actualización: 28/10/2025</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;