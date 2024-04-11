import React from "react";
import styled from "styled-components";

const StyledCard = styled.tr`
  width: 100%;
  padding: 5px 15px;
  border-radius: 6px;
  border: 1px solid #0000002e;
  margin: 5px 0;
`;

const StyledDeleteBtn = styled.button`
  background: #c85353;
  border: none;
  width: 50px;
  padding: 8px 12px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

function PaymentsListItem({
  id,
  amount,
  date,
  type,
  recipient,
  StyledPaymentsTH,
  setPayments,
  payments,
  setFilteredPayments,
  filteredPayments,
}) {
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
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-EN", options);
  }

  return (
    <StyledCard>
      <StyledPaymentsTH>{formatDate(date)}</StyledPaymentsTH>
      <StyledPaymentsTH> {recipient}</StyledPaymentsTH>
      <StyledPaymentsTH> ${amount}.-</StyledPaymentsTH>
      <StyledPaymentsTH>{type}</StyledPaymentsTH>
      <StyledPaymentsTH>
        <StyledDeleteBtn onClick={() => handleDelete(id)}>X</StyledDeleteBtn>
      </StyledPaymentsTH>
    </StyledCard>
  );
}

export default PaymentsListItem;
