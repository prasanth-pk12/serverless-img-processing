import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-10 ">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center">Serverless Image Processing App</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;