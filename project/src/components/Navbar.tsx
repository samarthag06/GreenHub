import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, ShoppingBag, Users, Trophy, User, LogOut, Shield, PlusCircle, Bell, ShoppingCart } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user"); 
  const user = userString ? JSON.parse(userString) : null; 

  // ✅ Role-based access
  const isAdmin = user?.isadmin === true || user?.isadmin === "true";
  const isManufacturer = user?.role === "manufacturer";
  const isUser = user?.role === "user";

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload(); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">GreenMart</span>
          </Link>

          {/* ✅ Flex wrapper for navigation links */}
          <div className="flex flex-wrap items-center space-x-6 md:space-x-8">
            <Link to="/products" className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
              <ShoppingBag className="h-5 w-5" />
              <span>Products</span>
            </Link>
            <Link to="/community" className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
              <Users className="h-5 w-5" />
              <span>Community</span>
            </Link>
            <Link to="/leaderboard" className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
              <Trophy className="h-5 w-5" />
              <span>Leaderboard</span>
            </Link>

            {/* ✅ Admin Dashboard (Only for Admins) */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-semibold border border-red-600 px-3 py-1 rounded-lg"
              >
                <Shield className="h-5 w-5" />
                <span>Admin Panel</span>
              </Link>
            )}

            {/* ✅ Add Product (Only for Manufacturers) */}
            {isManufacturer && (
              <Link
                to="/AddProduct"
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-semibold border border-blue-600 px-3 py-1 rounded-lg"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Add Product</span>
              </Link>
            )}
          </div>

          {/* ✅ Flex wrapper for user actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* ✅ Notification Icon */}
                <Link to="/notifications" className="text-gray-600 hover:text-green-600 relative">
                  <Bell className="h-6 w-6" />
                </Link>

                {/* ✅ Cart Icon (Only for Users) */}
                {isUser && (
                  <Link to="/mycart" className="text-gray-600 hover:text-green-600 relative">
                    <ShoppingCart className="h-6 w-6" />
                  </Link>
                )}

                <Link to="/dashboard" className="text-gray-600 hover:text-green-600">
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-green-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;