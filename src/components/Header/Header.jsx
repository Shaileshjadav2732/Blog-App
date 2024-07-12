import React from "react";
import { Container, Logo, LogoutBtn } from "../index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  // Accessing authentication status from Redux state
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // Navigation items based on authentication status
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, // Active if user is not authenticated
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus, // Active if user is not authenticated
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus, // Active if user is authenticated
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus, // Active if user is authenticated
    },
  ];

  return (
    <header className="bg-white shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              <Logo />
            </Link>
          </div>
          <ul className="flex items-center space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 ease-in-out rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* Rendering LogoutBtn if user is authenticated */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
