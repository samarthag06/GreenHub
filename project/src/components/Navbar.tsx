import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, ShoppingBag, Users, Trophy, User, LogOut, Shield, PlusCircle, Bell, ShoppingCart, Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Role-based access
  const isAdmin = user?.isadmin === true || user?.isadmin === "true";
  const isManufacturer = user?.role === "manufacturer";
  const isUser = user?.role === "user";

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to the login page
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

          {/* Hamburger Menu Icon (Visible on Mobile) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-green-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-6 md:space-x-8">
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

            {/* Admin Dashboard (Only for Admins) */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-semibold border border-red-600 px-3 py-1 rounded-lg"
              >
                <Shield className="h-5 w-5" />
                <span>Admin Panel</span>
              </Link>
            )}

            {/* Add Product (Only for Manufacturers) */}
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

          {/* User Actions (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Notification Icon */}
                <Link to="/notifications" className="text-gray-600 hover:text-green-600 relative">
                  <Bell className="h-6 w-6" />
                </Link>

                {/* Cart Icon (Only for Users) */}
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

        {/* Mobile Menu (Visible on Mobile) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-2 space-y-4">
              <Link to="/products" className="block text-gray-600 hover:text-green-600">
                Products
              </Link>
              <Link to="/community" className="block text-gray-600 hover:text-green-600">
                Community
              </Link>
              <Link to="/leaderboard" className="block text-gray-600 hover:text-green-600">
                Leaderboard
              </Link>

              {/* Admin Dashboard (Only for Admins) */}
              {isAdmin && (
                <Link to="/admin" className="block text-red-600 hover:text-red-700 font-semibold">
                  Admin Panel
                </Link>
              )}

              {/* Add Product (Only for Manufacturers) */}
              {isManufacturer && (
                <Link to="/AddProduct" className="block text-blue-600 hover:text-blue-700 font-semibold">
                  Add Product
                </Link>
              )}

              {/* User Actions */}
              {user ? (
                <>
                  <Link to="/notifications" className="block text-gray-600 hover:text-green-600">
                    Notifications
                  </Link>
                  {isUser && (
                    <Link to="/mycart" className="block text-gray-600 hover:text-green-600">
                      Cart
                    </Link>
                  )}
                  <Link to="/dashboard" className="block text-gray-600 hover:text-green-600">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-green-600 hover:text-green-700 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block text-gray-600 hover:text-green-600">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;