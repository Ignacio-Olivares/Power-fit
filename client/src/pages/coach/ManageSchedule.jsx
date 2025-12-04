import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Edit2, Plus, Trash2, X } from "lucide-react";
import Button from "../../components/common/Button";

// Tipos de clase
const CLASS_TYPES = [
  "Baile entretenido",
  "Fit salsa",
  "Localizado",
  "Step",
  "Taller salsa",
  "Taller bachata",
  "Fusión Fit",
];

// Horarios permitidos
const CLASS_TIMES = [
  "09:00 - 10:20",
  "10:30 - 12:00",
  "18:00 - 19:00",
  "19:00 - 20:15",
  "20:15 - 21:10",
];

// Días de la semana
const WEEK_DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// Formatear fecha LOCAL a YYYY-MM-DD (sin UTC)
const formatLocalDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// Obtener fecha de cada día (lunes–sábado) de la semana actual
const getDateForDay = (dayIndex) => {
  const today = new Date();
  const dow = today.getDay(); // 0 domingo, 1 lunes, ..., 6 sábado

  const diffToMonday = (dow + 6) % 7; // lunes = 0
  const monday = new Date(today);
  monday.setDate(today.getDate() - diffToMonday);

  const target = new Date(monday);
  target.setDate(monday.getDate() + dayIndex);

  return formatLocalDate(target); // ← ya no usamos toISOString()
};

// Convierte una fecha en formato YYYY-MM-DD a una cadena de fecha local
// Evita que `new Date("YYYY-MM-DD")` sea interpretado como UTC
const toLocalDateString = (ymd) => {
  if (!ymd) return "";
  const parts = ymd.split("-").map((p) => Number(p));
  const [y, m, d] = parts;
  const local = new Date(y, m - 1, d);
  return local.toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const ManageSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [newClass, setNewClass] = useState({ type: "", time: "" });

  // -------- CARGAR HORARIO DESDE DJANGO --------
  const fetchSchedule = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/horario/");
      const data = await res.json();

      const formatted = WEEK_DAYS.map((day, index) => ({
        day,
        date: getDateForDay(index),
        classes: data.filter((c) => c.dia === day),
      }));

      setSchedule(formatted);
    } catch (error) {
      console.log("Error cargando horario:", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  // -------- CONTRASEÑA PARA EDITAR --------
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "Gabriela") {
      setIsEditing(true);
      setShowPasswordModal(false);
      setPasswordInput("");
    } else {
      alert("Contraseña incorrecta.");
    }
  };

  // -------- AGREGAR CLASE (POST) --------
  const addClassToDay = async () => {
    if (!newClass.type || !newClass.time) {
      alert("Debes seleccionar tipo de clase y horario.");
      return;
    }

    const payload = {
      dia: schedule[selectedDay].day,
      fecha: schedule[selectedDay].date,
      tipo: newClass.type,
      horario: newClass.time,
    };

    const res = await fetch("http://127.0.0.1:8000/horario/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fetchSchedule();
      setSelectedDay(null);
      setNewClass({ type: "", time: "" });
    } else {
      alert("Error al guardar la clase");
    }
  };

  // -------- ELIMINAR CLASE (DELETE) --------
  const deleteClass = async (classId) => {
    if (!window.confirm("¿Eliminar esta clase?")) return;

    await fetch(`http://127.0.0.1:8000/horario/${classId}/`, {
      method: "DELETE",
    });

    fetchSchedule();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Volver */}
        <button
          onClick={() => {
            if (isEditing) {
            // Si estaba en edición, vuelve al modo visualización
            setIsEditing(false);
            setSelectedDay(null);
          } else {
            // Si NO estaba editando, vuelve al panel
              window.location.href = "/coach/panel";
             }
          }}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium mb-6"
            >
            <ArrowLeft size={20} /> Volver
            </button>
            
        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-8">Horario Semanal</h1>

        {!isEditing && (
          <div className="text-center mb-4">
            <Button
              variant="primary"
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2 mx-auto"
            >
              <Edit2 size={18} /> Modificar Horario
            </Button>
          </div>
        )}

        {/* TARJETAS DE DÍAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map((day, index) => (
            <div key={index} className="bg-white shadow-sm border rounded-2xl p-5">
              <h2 className="font-bold text-lg text-gray-800">
                {day.day} — {toLocalDateString(day.date)}
              </h2>

              <div className="mt-3 space-y-3">
                {day.classes.length === 0 && (
                  <p className="text-gray-400 text-sm">Sin clases</p>
                )}

                {day.classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{cls.tipo}</p>
                      <p className="text-gray-500 text-sm">{cls.horario}</p>
                    </div>

                    {isEditing && (
                      <button
                        className="text-green-500 hover:text-red-700"
                        onClick={() => deleteClass(cls.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <Button
                  className="w-full mt-4 flex items-center gap-2"
                  onClick={() => setSelectedDay(index)}
                >
                  <Plus size={18} /> Agregar clase
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* MODAL AGREGAR CLASE */}
        {selectedDay !== null && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">
                  Agregar clase — {schedule[selectedDay].day}
                </h2>
                <button onClick={() => setSelectedDay(null)}>
                  <X />
                </button>
              </div>

              <label className="text-sm font-semibold">Tipo de clase</label>
              <select
                className="w-full border p-2 rounded mb-3"
                value={newClass.type}
                onChange={(e) =>
                  setNewClass({ ...newClass, type: e.target.value })
                }
              >
                <option value="">Seleccionar...</option>
                {CLASS_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <label className="text-sm font-semibold">Horario</label>
              <select
                className="w-full border p-2 rounded mb-4"
                value={newClass.time}
                onChange={(e) =>
                  setNewClass({ ...newClass, time: e.target.value })
                }
              >
                <option value="">Seleccionar...</option>
                {CLASS_TIMES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <Button variant="primary" className="w-full" onClick={addClassToDay}>
                Guardar clase
              </Button>
            </div>
          </div>
        )}

        {/* MODAL CONTRASEÑA */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-xl">
              <h2 className="text-xl font-bold mb-4">Ingresa la contraseña</h2>

              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  className="w-full border p-3 rounded mb-4"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••"
                />

                <Button type="submit" variant="primary" className="w-full">
                  Confirmar
                </Button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageSchedule;
