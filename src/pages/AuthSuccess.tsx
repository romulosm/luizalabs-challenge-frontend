import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <p>Autenticando...</p>;
};

export default AuthSuccess;
