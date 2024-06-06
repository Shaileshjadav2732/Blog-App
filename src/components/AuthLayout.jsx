  import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authentication = true }) { 
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status); 

  useEffect(() => {
    // Check if authentication is required and user is not authenticated, redirect to login
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      // Check if authentication is not required and user is authenticated, redirect to home
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>; // Wrapped children with empty fragment
}
+   1            

// This React component Protected is designed to ensure that certain routes within a React application are accessible only to authenticated users.