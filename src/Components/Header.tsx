
import { useEffect, useState } from "react";
import profile from "../assets/Local Hunt Logo NoBG.png";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // State to hold user data
  const [ userData, setUserData] = useState<{
    email: string;
    fullName: string;
    id: string;
    phone: string;
    role: string;
  }>();


  // Get  data form local storage and parse it using useeffect
  useEffect( 
    () => {
      const data = localStorage.getItem("userdate");
      if (data) {
         const parsedData = JSON.parse(data);
        //  console.log("Parsed User Data:", parsedData);
          setUserData(parsedData.user);
      }
    }, []
) 


  return (
    <div className="flex items-center justify-between px-[80px] py-4 shadow-sm bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src={profile} alt="Local Hunt" className="h-12 cursor-pointer" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
        <Link to="/" className="hover:text-red-600">
          Home
        </Link>
        <Link to="/new" className="hover:text-red-600">
          New
        </Link>
        <Link to="/shop" className="hover:text-red-600">
          Shop
        </Link>
        <Link to="/about" className="hover:text-red-600">
          About
        </Link>
        <Link to="/contact" className="hover:text-red-600">
          Contact
        </Link>
      </nav>

      {/* Search + Cart/Login */}
      <div className="flex items-center space-x-4">
        <form 
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            }
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-full text-sm"
          />
          <button type="submit" className="absolute left-3 top-2.5 text-gray-400 hover:text-gray-600">
            <FaSearch className="w-5 h-5" />
          </button>
        </form>

        <Link to="/cart">
        <FaShoppingCart className="w-6 h-6 text-gray-700 hover:text-red-600 cursor-pointer" />
        </Link>

      {
        userData?.id ? (
          <Link to="/profile" className="text-gray-700 hover:text-red-600 font-medium flex items-center space-x-2">
            <FaUser/>
          </Link>
        ) : (
          <Link to="/login" className="text-gray-700 hover:text-red-600 font-medium">
            Login
        </Link>
        )
      }
      </div>
    </div>
  );
};

export default Header;
