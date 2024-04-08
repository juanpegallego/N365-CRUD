import React, { useEffect, useState } from "react";
import Item from "./Item";
import PaymentsSelect from "./PaymentsSelect";

export default function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);

  const loadPayments = async () => {
    const response = await fetch("http://localhost:3000/payments");
    const data = await response.json();
    setPayments(data);
    setFilteredPayments(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/payments/${id}`, {
        method: "DELETE",
      });
      setPayments(payments.filter((payment) => payment.id !== id));
      setFilteredPayments(
        filteredPayments.filter((payment) => payment.id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <>
      <h1>Payments List</h1>

      <PaymentsSelect
        payments={payments}
        setFilteredPayments={setFilteredPayments}
      />

      {filteredPayments.map((payment) => (
        <Item
          key={payment.id}
          id={payment.id}
          amount={payment.payment_amount}
          date={payment.payment_date}
          type={payment.payment_type}
          recipient={payment.payment_recipient}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
}
