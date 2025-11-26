import { Dumbbell, Users, Coffee, ArrowRight, Clock } from 'lucide-react';
import Button from '../../components/common/Button';
import Footer from '../../components/layout/Footer';
import FondoImg from '../../assets/images/fondo.jpg';

// Placeholder para imágenes (puedes cambiarlas por las reales en assets/images)
// Nota: En producción, importa tus imágenes reales.
<img src={FondoImg} alt="Gimnasio PowerFit" className="w-full h-full object-cover" />

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* --- SECCIÓN 1: HERO (Bienvenida) --- */}
      {/* Referencia: Figura 3 del documento */}
      <section className="relative h-[600px] flex items-center justify-center text-center px-4">
        {/* Imagen de fondo con superposición oscura */}
        <div className="absolute inset-0">
          <img src={FondoImg} alt="Gimnasio PowerFit" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div> {/* Filtro oscuro para leer el texto */}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="inline-block py-1 px-3 rounded-full bg-green-500/20 border border-green-500 text-green-400 text-sm font-semibold mb-2">
            El mejor gimnasio de Copiapó
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Transforma tu cuerpo <br />
            <span className="text-green-500">Transforma tu vida</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Entrena con coach de bienestar motivados y ambiente alegre.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="primary" className="flex items-center justify-center gap-2">
              Agendar clase <ArrowRight size={18} />
            </Button>
            <button className="px-6 py-2 rounded-full font-semibold border-2 border-white text-white hover:bg-white hover:text-black transition-all">
              Conocer más
            </button>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 2: SERVICIOS --- */}
      {/* Referencia: Figura 4 del documento */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Nuestros <span className="text-green-500">servicios</span>
            </h2>
            <p className="text-gray-500 mt-2">Todo lo que necesitas para alcanzar tus metas fitness en un solo lugar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                <Dumbbell size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Entrenamiento personalizado</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Planes diseñados específicamente para tus objetivos con seguimiento profesional.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Clases grupales</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Baile entretenido, Salsa fit, Localizado y más entrenamientos dinámicos en grupo.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                <Coffee size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Energía en batido</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nutre tu cuerpo y recarga tu energía antes o después de entrenar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: INSTALACIONES --- */}
      {/* Referencia: Figura 5 del documento */}
      <section id="instalaciones" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Instalaciones <span className="text-green-500">cómodas y funcionales</span>
          </h2>
          <p className="text-gray-500 mb-12">Espacios bien equipados y pensados para ofrecerte una experiencia completa</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-64 rounded-2xl overflow-hidden group">
              <img src={FondoImg} alt="Baile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-left">
                <h3 className="text-white text-xl font-bold">Baile Entretenido</h3>
                <p className="text-gray-300 text-sm">Clases dinámicas con instructores profesionales</p>
              </div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070" alt="Pesas" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-left">
                <h3 className="text-white text-xl font-bold">Localizado</h3>
                <p className="text-gray-300 text-sm">Entrenamiento enfocado para maximizar tus resultados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 4: HORARIOS --- */}
      {/* Referencia: Figura 6 del documento */}
      <section id="horarios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Horarios <span className="text-green-500">flexibles</span>
            </h2>
            <p className="text-gray-500 mt-2">Entrena cuando quieras con nuestros amplios horarios</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna 1: Horarios de Atención */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
                <Clock className="text-green-500" /> Horarios de atención
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-medium text-gray-700">Lunes - Viernes</span>
                  <span className="text-green-600 font-semibold">6:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-medium text-gray-700">Sábados</span>
                  <span className="text-green-600 font-semibold">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="font-medium text-gray-700">Domingos</span>
                  <span className="text-green-600 font-semibold">9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Columna 2: Clases Programadas (Preview) */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
                <Clock className="text-green-500" /> Clases programadas
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800">Localizado</h4>
                    <span className="text-xs text-gray-500">Lun - Vie</span>
                  </div>
                  <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">9:00 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800">Baile Entretenido</h4>
                    <span className="text-xs text-gray-500">Lun, Mié, Jue, Vie</span>
                  </div>
                  <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">10:30 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800">Step</h4>
                    <span className="text-xs text-gray-500">Mar</span>
                  </div>
                  <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">10:30 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;