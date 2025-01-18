import { MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

function User() 
{
    const { user, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate("/", {replace : true});
    };
  
    return (
    <div>
        {isAuthenticated ? (
          <div>
            <strong>{user.name}</strong>
            <button>
              &nbsp; <MdLogout onClick={handleLogout} className="logout icon" />
            </button>
          </div>
        ) : (
          <NavLink to="/login">login</NavLink>
        )}
    </div>
    );
}

export default User;