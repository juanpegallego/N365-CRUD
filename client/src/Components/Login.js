import React, { useState } from "react";
import LoginFormUI from "./LoginFormUI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import LogoffButton from "./LogoutButton";

function Login({
  userIsLogged,
  setUserIsLogged,
  setUsernameLabel,
  userNameLabel,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        Cookies.set("userName", username); // Guardar el nombre de usuario en la cookie
        setUsernameLabel(data.message);
        setUserIsLogged(true);
        Swal.fire({
          title: "Welcome!",
          icon: "success",
          confirmButtonText: "Enter",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Invalid username or password!",
        text: "Try again",
        icon: "error",
        confirmButtonText: "Ok",
      });
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
      setUserIsLogged(false);
    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
    }
  };

  return (
    <>
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
        <div>
          <p style={{ color: "white" }}>
            U are already logged as <span>{userNameLabel}</span>
          </p>
          <LogoffButton handleLogout={handleLogout} />
        </div>
      )}
    </>
  );
}

export default Login;
