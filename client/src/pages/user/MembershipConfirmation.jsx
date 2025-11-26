import { useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const MembershipConfirmation = () => {
  const location = useLocation();
  
  // Recuperamos los datos del plan enviados desde la página anterior
  const { plan } = location.state || {};

  // Si alguien intenta entrar directo por URL sin elegir plan, lo devolvemos
  if (!plan) {
    return <Navigate to="/user/memberships" />;
  }

  // Formateador de dinero
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Botón Volver */}
      <div className="absolute top-24 left-4 md:left-8">
        <Link to="/user/memberships" className="flex items-center gap-2 text-gray-600 hover:text-green-500 font-medium transition-colors">
          <ArrowLeft size={20} />
          Volver a planes
        </Link>
      </div>

      {/* Tarjeta de Confirmación (Figura 12) */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8 border border-gray-100">
        
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="text-green-500" size={28} />
          <h1 className="text-2xl font-bold text-gray-900">Confirmar Membresía</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8 ml-10">
          Por favor verifica que toda la información sea correcta
        </p>

        {/* Detalle del Plan (Contenedor gris) */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-2 gap-y-6">
            
            {/* Nombre del Plan */}
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                Membresía
              </span>
              <span className="text-lg font-bold text-gray-900">
                {plan.name}
              </span>
            </div>

            {/* Cantidad de Clases */}
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                Clases
              </span>
              <span className="text-lg font-bold text-gray-900">
                {plan.classes} clases
              </span>
            </div>

            {/* Precio */}
            <div className="col-span-2 border-t border-gray-200 pt-4 mt-2">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                Precio Total
              </span>
              <span className="text-3xl font-extrabold text-green-600">
                {formatPrice(plan.price)}
              </span>
            </div>

          </div>
        </div>

        {/* Botón de Acción */}
        {/* Esto llevará al Pago (Figuras 21/22) en el siguiente paso */}
        <Link to="/user/dashboard" state={{ item: plan, type: 'membership' }}>
          <Button variant="primary" className="w-full py-4 text-lg">
            Está todo correcto, continuar al pago
          </Button>
        </Link>

      </div>
    </div>
  );
};

export default MembershipConfirmation;