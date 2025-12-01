// src/pages/coach/ManageUsers.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Admin PowerFit",
    contact: null,
    registeredAt: "28/10/2025",
  },
  {
    id: 2,
    name: "Coach PowerFit",
    contact: null,
    registeredAt: "28/10/2025",
  },
  {
    id: 3,
    name: "valeria lopez",
    contact: null,
    registeredAt: "24/10/2025",
  },
];

const ManageUsers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredUsers = initialUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-6">
      {/* Volver al panel */}
      <button
        onClick={() => navigate("/coach/panel")}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver al Panel</span>
      </button>

      {/* Título */}
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Usuarios
      </h1>

      {/* Buscador */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white"
        />
      </div>

      {/* Cards de usuarios */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <article
            key={user.id}
            className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {user.name}
            </h2>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500 block">Contacto</span>
                <span className="font-semibold text-gray-800">
                  {user.contact ?? "No disponible"}
                </span>
              </div>

              <div>
                <span className="text-gray-500 block">Fecha de registro</span>
                <span className="font-semibold text-gray-800">
                  {user.registeredAt}
                </span>
              </div>
            </div>
          </article>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No se encontraron usuarios con ese nombre.
          </p>
        )}
      </section>
    </main>
  );
};

export default ManageUsers;
