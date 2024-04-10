import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentUI from "./NewPaymentFormUI";

export default function TaskForm() {
  const [payment, setPayment] = useState({
    payment_amount: "",
    payment_date: "",
    payment_type: "",
    payment_recipient: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(payment).every(
      (value) => value.trim() !== ""
    );

    if (!isNotEmpty) {
      console.log("Ningún campo puede estar vacío.");
      return;
    }

    setLoading(true);
    const res = await fetch("http://localhost:3000/payments", {
      method: "POST",
      body: JSON.stringify(payment),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    setLoading(false);

    navigate("/");
  };

  const handleChange = (e) =>
    setPayment({ ...payment, [e.target.name]: e.target.value });

  return (
    <div>
      <p>Create Task</p>
      <PaymentUI
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
