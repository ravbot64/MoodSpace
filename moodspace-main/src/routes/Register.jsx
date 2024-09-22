import Form from "../components/Form/Form";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/authStore";
import registerImg from "../assets/register.jpg";
import Navbar from "../components/Navbar/Navbar";
import { Container } from "@mantine/core";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  };

  const login = useAuthStore((state) => state.login);
  const setName = useAuthStore((state) => state.setName);
  const setUEmail = useAuthStore((state) => state.setUEmail);
  const apiUrl = useAuthStore((state) => state.apiUrl);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (username.trim() === "") {
      throw new Error("Username field is empty");
    } else if (password.trim() === "") {
      throw new Error("Password field is empty");
    }

    if (!usernameRegex.test(username)) {
      throw new Error(
        "Username can only contain letters, numbers, underscores, and hyphens."
      );
    }
    if (email.trim() !== "" && !emailRegex.test(email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters."
      );
    }

    try {
      const response = await fetch(`${apiUrl}/v1/user/register`, {
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
      setName(data.username);
      setUEmail(data.email);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container fluid p={0}>
      <Navbar />
      <Form
        type="Register"
        onSubmit={onSubmit}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
        img={registerImg}
        loading={loading}
      />
    </Container>
  );
};

export default Register;
