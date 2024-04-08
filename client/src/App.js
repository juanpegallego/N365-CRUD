import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentsList from "./Components/PaymentsList";
import NewPaymentFormLogic from "./Components/NewPaymentFormLogic";
import Menu from "./Components/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <section>
        <Routes>
          <Route path="/" element={<PaymentsList />} />
          <Route path="/payments/new" element={<NewPaymentFormLogic />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}
