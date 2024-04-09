import React, { useEffect, useState } from "react";
import PaymentsListItem from "./PaymentsListItem";
import PaymentsSelect from "./PaymentsSelect";
import styled from "styled-components";

const StyledPaymentsMain = styled.main`
  display: grid;
  grid-template-rows: 30% 20% 50%;
  width: 100%;
`;

const StyledPaymentsList = styled.div`
  display: table;
  margin: 20px 0;
  background: #2a2e3e;
  width: 100%;
`;

const StyledPaymentsListTitle = styled.thead`
  background: #757c99;
  padding: 20px 0;
`;
const StyledPaymentsTH = styled.th`
  padding: 20px 0;
  color: white;
`;

export default function PaymentsListLogic() {
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
  useEffect(() => {
    // Filtrar y ordenar los pagos por fecha
    const filteredAndSortedPayments = payments
      .filter((payment) => filteredPayments.some(({ id }) => id === payment.id)) // Filtrar solo los pagos que están presentes en filteredPayments
      .sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date)); // Ordenar por fecha ascendente

    setFilteredPayments(filteredAndSortedPayments);
  }, [payments]); // Ejecutar cuando cambian los pagos

  return (
    <StyledPaymentsMain>
      <tr>
        <h1 style={{ color: "white" }}>Payments List</h1>
      </tr>
      <PaymentsSelect
        payments={payments}
        setFilteredPayments={setFilteredPayments}
      />

      <StyledPaymentsList>
        <StyledPaymentsListTitle>
          <tr>
            <StyledPaymentsTH>Date</StyledPaymentsTH>
            <StyledPaymentsTH>Recipient</StyledPaymentsTH>
            <StyledPaymentsTH>Amount</StyledPaymentsTH>
            <StyledPaymentsTH>Concept</StyledPaymentsTH>
            <StyledPaymentsTH>Delete Payment</StyledPaymentsTH>
          </tr>
        </StyledPaymentsListTitle>

        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <PaymentsListItem
                key={payment.id}
                id={payment.id}
                amount={payment.payment_amount}
                date={payment.payment_date}
                type={payment.payment_type}
                recipient={payment.payment_recipient}
                handleDelete={handleDelete}
                StyledPaymentsTH={StyledPaymentsTH}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay pagos disponibles.</td>
            </tr>
          )}
        </tbody>
      </StyledPaymentsList>
    </StyledPaymentsMain>
  );
}
