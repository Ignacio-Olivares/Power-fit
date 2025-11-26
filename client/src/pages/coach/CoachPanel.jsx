// src/pages/coach/CoachPanel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {ArrowLeft, CreditCard, Users, Calendar, User, DollarSign,} from "lucide-react";
import DashboardCard from "../../components/common/DashboardCard";

const CoachPanel = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-6">
      {/* Volver al menú principal */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver al Menú Principal</span>
      </button>

      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900">Panel de Coach</h1>
      <p className="text-gray-500 mb-10">Bienvenid@ Coach PowerFit</p>

      {/* Grid de tarjetas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          Icon={CreditCard}
          title="Membresías"
          subtitle="Ver membresías activas"
          buttonText="Ver Membresías"
          to="/coach/memberships"
        />

        <DashboardCard
          Icon={Users}
          title="Usuarios"
          subtitle="Ver información de usuarios"
          buttonText="Ver Usuarios"
          to="/coach/users"
        />

        <DashboardCard
          Icon={Calendar}
          title="Horario"
          subtitle="Ver horarios"
          buttonText="Ver Horario"
          to="/coach/schedule"
        />

        <DashboardCard
          Icon={User}
          title="Coaches"
          subtitle="Ver información de coaches"
          buttonText="Ver Coaches"
          to="/coach/coaches"
        />

        <DashboardCard
          Icon={DollarSign}
          title="Pagos"
          subtitle="Ver y exportar historial de pagos"
          buttonText="Ver Pagos"
          to="/coach/payments"
        />
      </section>
    </main>
  );
};

export default CoachPanel;
