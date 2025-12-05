import { useEffect, useState } from "react";
import { ArrowLeft, ClipboardCheck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageAttendance = () => {
  const [clasesHoy, setClasesHoy] = useState([]);
  const [asistentes, setAsistentes] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [loadingClases, setLoadingClases] = useState(true);
  const [loadingAsistentes, setLoadingAsistentes] = useState(false);

  const navigate = useNavigate();

  // 🔥 Cargar clases del día
  const fetchClasesDeHoy = async () => {
    setLoadingClases(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/clases-hoy/");
      const data = await res.json();
      setClasesHoy(data);
    } catch (err) {
      console.error("Error al cargar clases:", err);
      alert("No se pudo conectar al servidor.");
    }
    setLoadingClases(false);
  };

  // 🔥 Cargar asistentes de una clase
  const fetchAsistentes = async (claseId) => {
    setClaseSeleccionada(claseId);
    setLoadingAsistentes(true);

    try {
      const res = await fetch(`http://127.0.0.1:8000/asistentes/${claseId}/`);
      const data = await res.json();
      setAsistentes(data);
    } catch (err) {
      console.error("Error al cargar asistentes:", err);
      alert("No se pudo conectar al servidor.");
    }

    setLoadingAsistentes(false);
  };

  // 🔥 Marcar asistencia
  const marcarPresente = async (reservaId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/asistencia/${reservaId}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ presente: true }),
        }
      );

      if (res.ok) {
        setAsistentes((prev) =>
          prev.map((a) =>
            a.id === reservaId ? { ...a, presente: true } : a
          )
        );
      }
    } catch (err) {
      alert("No se pudo marcar asistencia.");
    }
  };

  useEffect(() => {
    fetchClasesDeHoy();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Botón Volver */}
      <button
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium mb-6"
        onClick={() => navigate("/coach/panel")}
      >
        <ArrowLeft size={20} />
        Volver al Panel
      </button>

      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-6">
        <ClipboardCheck className="text-green-600" />
        Control de Asistencia
      </h1>

      {/* === LISTA DE CLASES DEL DÍA === */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="text-green-600" /> Clases de Hoy
        </h2>

        {loadingClases ? (
          <p className="text-gray-600">Cargando clases...</p>
        ) : clasesHoy.length === 0 ? (
          <p className="text-gray-500">No hay clases programadas para hoy.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clasesHoy.map((clase) => (
              <button
                key={clase.id}
                onClick={() => fetchAsistentes(clase.id)}
                className={`p-4 rounded-xl border shadow-sm text-left transition hover:shadow-md ${
                  claseSeleccionada === clase.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <p className="font-semibold text-gray-900">{clase.tipo}</p>
                <p className="text-gray-600 text-sm">{clase.horario}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* === LISTA DE ASISTENTES === */}
      {claseSeleccionada && (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Asistentes de la Clase
          </h2>

          {loadingAsistentes ? (
            <p className="text-gray-500">Cargando asistentes...</p>
          ) : asistentes.length === 0 ? (
            <p className="text-gray-500">Ningún alumno inscrito aún.</p>
          ) : (
            <div className="space-y-3">
              {asistentes.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 shadow-sm"
                >
                  {/* Nombre del alumno */}
                  <span className="font-semibold text-gray-900">
                    {st.nombre} {st.apellido}
                  </span>

                  {/* Estado */}
                  {st.presente ? (
                    <span className="text-green-600 font-semibold">
                      Presente ✔
                    </span>
                  ) : (
                    <button
                      onClick={() => marcarPresente(st.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Marcar Presente
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageAttendance;
