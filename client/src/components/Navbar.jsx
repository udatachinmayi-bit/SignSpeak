import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">SignSpeak</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/translator">Translator</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;