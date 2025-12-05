import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

const Classes = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  const diasOrden = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sabado"];

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/horario/");
        const data = await res.json();
        setClases(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar clases:", error);
      }
    };

    fetchClases();
  }, []);

  const reservarClase = async (claseId) => {
    const usuarioId = localStorage.getItem("userId");

    if (!usuarioId) {
      alert("Debes iniciar sesión para reservar.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/reservar-clase/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clase_id: claseId,
          usuario_id: usuarioId
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Reserva confirmada ✔");
        // Refrescar horarios para ver los cupos actualizados
        setClases((prev) =>
          prev.map((c) =>
            c.id === claseId ? { ...c, cupos_disponibles: data.cupos_restantes } : c
          )
        );
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("No se pudo conectar al servidor.");
      console.log(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando clases...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
        <Calendar /> Clases Disponibles
      </h1>

      {/* Agrupar por día */}
      {diasOrden.map((dia) => {
        const clasesDelDia = clases.filter((c) => c.dia === dia);

        if (clasesDelDia.length === 0) return null;

        return (
          <div key={dia} className="mb-10">
            <h2 className="text-xl font-bold text-green-600 mb-3">{dia}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clasesDelDia.map((clase) => (
                <div
                  key={clase.id}
                  className="bg-white border shadow-sm p-5 rounded-xl"
                >
                  <h3 className="text-lg font-bold text-gray-900">{clase.tipo}</h3>
                  <p className="text-gray-600">{clase.horario}</p>
                  <p className="text-gray-700 font-medium mt-2">
                    Cupos disponibles: {clase.cupos_disponibles}
                  </p>

                  <button
                    onClick={() => reservarClase(clase.id)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Reservar
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Classes;
