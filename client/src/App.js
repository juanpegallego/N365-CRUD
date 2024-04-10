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
  return (
    <BrowserRouter>
      <Menu />
      <StyledWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/" element={<PaymentsListLogic />} />
          <Route path="/payments/new" element={<NewPaymentFormLogic />} />
        </Routes>
      </StyledWrapper>
    </BrowserRouter>
  );
}
