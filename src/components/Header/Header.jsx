import React from "react";
import { Container, Logo, LogoutBtn } from "../index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 
function Header() {
  // Accessing authentication status from Redux state
  const authStatus = useSelector((state) => (state.auth.status));
  console.log(authStatus); // Logging authentication status for debugging
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
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
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
  )
}

export default Header;
