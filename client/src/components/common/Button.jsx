
const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseStyle = "px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base";
  
  // Definimos los estilos basados en las imágenes:
  // Primary: Fondo verde, texto blanco (Botón "Registrarse")
  // Secondary: Fondo blanco, borde verde, texto verde (Botón "Iniciar sesión")
  const variants = {
    primary: "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg border border-transparent",
    secondary: "bg-white text-green-500 border-2 border-green-500 hover:bg-green-50"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;