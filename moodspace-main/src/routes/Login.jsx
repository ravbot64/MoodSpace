import Form from "../components/Form/Form";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/authStore";
import loginImg from "../assets/loginImg.jpg";
import Navbar from "../components/Navbar/Navbar";
import { Container } from "@mantine/core";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const setName = useAuthStore((state) => state.setName);
  const setUEmail = useAuthStore((state) => state.setUEmail);
  const apiUrl = useAuthStore((state) => state.apiUrl);

  // Helper function to set cookies
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    // Check if you're in production to set Secure flag
    const secure = import.meta.env.VITE_MODE === "production" ? "Secure;" : "";
    const domain = import.meta.env.VITE_MODE === "production" ? "domain=moodspace.vercel.app;" : ""
    const sameSite = import.meta.env.VITE_MODE === "production" ? "SameSite=None;" : ""
    // Set the cookie with SameSite=None and Secure in production
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; ${domain} ${secure} ${sameSite}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/v1/user/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();

      login(data.token);
      setCookie("token", data.token, 7);
      setCookie("uname", data.username, 7);
      setCookie("uemail", data.email, 7);

      // Set state values in Zustand
      setName(data.username);
      setUEmail(data.email);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid p={0}>
      <Navbar />
      <Form
        type="Login"
        onSubmit={onSubmit}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        img={loginImg}
        loading={loading}
      />
    </Container>
  );
};

export default Login;
