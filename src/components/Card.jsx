export default function Card({ title, children }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 bg-white animate-slideUp dark:bg-gray-800 dark:text-gray-100">
      <h2 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-400">{title}</h2>
      {children}
    </div>
  );
}
