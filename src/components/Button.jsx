export default function Button({ children, variant = "primary", onClick, disabled, className = "" }) {
  const base = "px-4 py-2 rounded font-semibold transition-all duration-300 transform hover:scale-105";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-900 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className} ${!disabled ? "hover:animate-pulseSlow" : "opacity-50 cursor-not-allowed"}`}
    >
      {children}
    </button>
  );
}
