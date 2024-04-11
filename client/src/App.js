import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentsListLogic from "./Components/PaymentsListLogic";
import NewPaymentFormLogic from "./Components/NewPaymentFormLogic";
import Menu from "./Components/NavBar";
import Login from "./Components/Login";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: block;
  max-width: 1184px;
  width: 100%;
  padding: 15px 50px 0 15px;
  margin: 15px;
`;

export default function App() {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [userNameLabel, setUsernameLabel] = useState(undefined);

  return (
    <BrowserRouter>
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
          />{" "}
          <Route
            path="/"
            element={<PaymentsListLogic userIsLogged={userIsLogged} />}
          />
          <Route
            path="/payments/new"
            element={<NewPaymentFormLogic userIsLogged={userIsLogged} />}
          />
        </Routes>
      </StyledWrapper>
    </BrowserRouter>
  );
}
