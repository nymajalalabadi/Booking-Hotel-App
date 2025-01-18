import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";

function ProtectedRoute({ children }) {

  const { isAuthenticated } = useAuth();
  const naviagate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) 
    {
        naviagate("/login"); //AUTHENTICATON
    } 
  }, [isAuthenticated, naviagate]);

  return isAuthenticated ? children : null;
  
}

export default ProtectedRoute;