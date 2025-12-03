import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmMembership = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { plan } = location.state;   
  
  const userId = localStorage.getItem("userId");  

  const handleConfirmPurchase = async () => {
    const payload = {
      usuario: Number(userId),
      plan_nombre: plan.name,
      plan_clases: plan.classes,
      plan_precio: plan.price
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/comprar-membresia/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Membresía activada con éxito!");
        navigate("/user/dashboard");
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="p-6">
      <h1>Confirmar compra</h1>
      <p>Plan seleccionado: {plan.name}</p>
      <p>Precio: {plan.price}</p>
      <p>Clases: {plan.classes}</p>

      <button
        onClick={handleConfirmPurchase}
        className="bg-green-600 text-white py-3 px-6 rounded-lg mt-4"
      >
        Confirmar Membresía
      </button>
    </div>
  );
};

export default ConfirmMembership;
