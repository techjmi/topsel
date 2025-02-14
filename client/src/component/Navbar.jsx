import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("topsel"));
    setUser(storedUser);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Search", path: "/search" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="md:hidden" onClick={() => setMenuOpen(true)}>
          <FiMenu size={24} />
        </button>
        <Link to="/" className="text-xl font-bold">Brand</Link>
      </div>

      <ul className="hidden md:flex gap-6">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link to={item.path} className="hover:text-gray-400">{item.name}</Link>
          </li>
        ))}
      </ul>

      <div>
        {user ? (

        <FaUserCircle size="36"/>
        ) : (
          <Link to="/login" className="px-4 py-2 bg-blue-500 rounded">Login</Link>
        )}
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMenuOpen(false)}></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 w-64 p-6 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform`}
      >
        <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
          <FiX size={24} />
        </button>
        <ul className="mt-10 space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className="text-white block p-2" onClick={() => setMenuOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
