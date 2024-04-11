import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentsListLogic from "./Components/PaymentsListLogic";
import NewPaymentFormLogic from "./Components/NewPaymentFormLogic";
import Menu from "./Components/NavBar";
import Login from "./Components/Login";
import styled from "styled-components";
import Cookies from "js-cookie";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
  margin: 150px auto 0 auto;
`;
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 800px;
  width: 100%;
  margin: 15px auto;
`;

export default function App() {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [userNameLabel, setUsernameLabel] = useState(undefined);

  useEffect(() => {
    const sessionId = Cookies.get("connect.sid");
    const storedUserName = Cookies.get("userName");

    sessionId ? setUserIsLogged(true) : setUserIsLogged(false);

    if (storedUserName) {
      setUsernameLabel(storedUserName);
    }
  }, []);

  return (
    <BrowserRouter>
      <AppWrapper>
        <Menu userIsLogged={userIsLogged} userNameLabel={userNameLabel} />
        <StyledWrapper>
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  setUserIsLogged={setUserIsLogged}
                  setUsernameLabel={setUsernameLabel}
                  userIsLogged={userIsLogged}
                  userNameLabel={userNameLabel}
                />
              }
            />
            <Route
              path="/"
              element={
                userIsLogged ? (
                  <PaymentsListLogic userIsLogged={userIsLogged} />
                ) : (
                  <p>you lost your session</p>
                )
              }
            />
            <Route
              path="/payments/new"
              element={
                userIsLogged ? (
                  <NewPaymentFormLogic userIsLogged={userIsLogged} />
                ) : (
                  <p>you lost your session</p>
                )
              }
            />
          </Routes>
        </StyledWrapper>
      </AppWrapper>
    </BrowserRouter>
  );
}
