export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4 text-center mt-10">
      <div className="space-x-4 mb-2">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Service</a>
      </div>
      <p>© {new Date().getFullYear()} My React App. All rights reserved.</p>
    </footer>
  );
}
