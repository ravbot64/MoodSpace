import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { nprogress, NavigationProgress } from "@mantine/nprogress";

import Hero from "./routes/Hero";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Register from "./routes/Register";
import ErrorPage from "./routes/error-page";
import Home from "./components/Home/Home";
import Mood from "./routes/Mood";
import ConfirmationPage from "./routes/ConfirmationPage";
import Journal from "./routes/Journal";
import AllJournals from "./routes/AllJournals";
import Books from "./routes/Books";
import Articles from "./routes/Articles";
import Organizations from "./routes/Organizations";
import Helpline from "./routes/Helpline";

import useAuthStore from "./stores/authStore";
import JournalDetail from "./routes/JournalDetail";
import { Container } from "@mantine/core";

const App = () => {
  // Login state
  const isLoggedIn = useAuthStore((store) => store.isLoggedIn);
  const login = useAuthStore((state) => state.login);
  const setName = useAuthStore((state) => state.setName);
  const setUEmail = useAuthStore((state) => state.setUEmail);
  let location = useLocation();

  // Helper function to get cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const token = getCookie("token");
    const uname = getCookie("uname");
    const uemail = getCookie("uemail");

    if (token && uname && uemail) {
      login(token); // Set token and isLoggedIn
      setName(uname); // Set username in Zustand
      setUEmail(uemail); // Set email in Zustand
    }
  }, [login, setName, setUEmail]);

  useEffect(() => {
    nprogress.start();
    nprogress.complete();
  }, [location.pathname]);

  return (
    <Container fluid bg="#f0f7f6" p={0} style={{ overflowX: "hidden" }}>
      <NavigationProgress />
      <Routes>
        {!isLoggedIn && <Route index element={<Hero />} />}
        {isLoggedIn && (
          <Route index element={<Navigate to="/dashboard" replace />} />
        )}
        {isLoggedIn && (
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="mood" element={<Mood />} />
            <Route path="mood/confirm" element={<ConfirmationPage />} />
            <Route path="journal" element={<Journal />} />
            <Route path="journal/all" element={<AllJournals />} />
            <Route path="journal/:id" element={<JournalDetail />} />
            <Route path="resources/books" element={<Books />} />
            <Route path="resources/articles" element={<Articles />} />
            <Route path="resources/organizations" element={<Organizations />} />
            <Route path="resources/helpline" element={<Helpline />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        )}
        {isLoggedIn && <Route path="/logout" element={<Logout />} />}
        {!isLoggedIn && <Route path="login" element={<Login />} />}
        {!isLoggedIn && <Route path="register" element={<Register />} />}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Container>
  );
};

export default App;
