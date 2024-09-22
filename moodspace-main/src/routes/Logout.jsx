import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/authStore";
export default function Logout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
}
