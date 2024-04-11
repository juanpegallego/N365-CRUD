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
  min-width: 800px;
`;

const StyledPaymentsListTitle = styled.thead`
  background: #757c99;
  padding: 20px 0;
`;
const StyledPaymentsTH = styled.th`
  padding: 20px 0;
  color: white;
`;

export default function PaymentsListLogic({ userIsLogged }) {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);

  const loadPayments = async () => {
    try {
      const response = await fetch("http://localhost:3000/", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error al cargar los pagos");
      }
      const data = await response.json();
      setPayments(data);
      setFilteredPayments(data);
    } catch (error) {
      console.error("Error al cargar los pagos:", error);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  useEffect(() => {
    if (Array.isArray(payments)) {
      const filteredAndSortedPayments = payments
        .filter((payment) =>
          filteredPayments.some(({ id }) => id === payment.id)
        )
        .sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date)); // Orden descendente por fecha

      setFilteredPayments(filteredAndSortedPayments);
    }
  }, []);

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
                StyledPaymentsTH={StyledPaymentsTH}
                setPayments={setPayments}
                payments={payments}
                setFilteredPayments={setFilteredPayments}
                filteredPayments={filteredPayments}
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
