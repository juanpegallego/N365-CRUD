import React, { useState, useEffect } from "react";
import LoginFormUI from "./LoginFormUI";
import { useNavigate } from "react-router-dom";

function Login({
  userIsLogged,
  setUserIsLogged,
  setUsernameLabel,
  userNameLabel,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }

      const data = await response.json();
      if (data) {
        setUsernameLabel(data.message);
        setUserIsLogged(true);

        navigate("/");
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
      setError(error.message);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    console.log("logged?", userIsLogged);
  }, []);
  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!userIsLogged && (
        <div>
          <h2 style={{ color: "white" }}>Login</h2>

          <LoginFormUI
            handleSubmit={handleSubmit}
            username={username}
            handleUsernameChange={handleUsernameChange}
            password={password}
            handlePasswordChange={handlePasswordChange}
            handleLogout={handleLogout}
          />
        </div>
      )}

      {userIsLogged && (
        <p style={{ color: "white" }}>
          U are already logged as <span>{userNameLabel}</span>
        </p>
      )}

      <LoginFormUI
        handleSubmit={handleSubmit}
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleLogout={handleLogout}
      />
    </>
  );
}

export default Login;
