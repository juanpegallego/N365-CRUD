import { React } from "react";

import { StyledInput, StyledLabel } from "./utils/customStyled";

function PaymentUI({ handleSubmit, handleChange, loading }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <StyledLabel htmlFor="payment_amount">Amount</StyledLabel>
        <StyledInput
          type="number"
          name="payment_amount"
          onChange={handleChange}
          placeholder="Amount"
        ></StyledInput>
        <StyledLabel htmlFor="payment_date">Date</StyledLabel>

        <StyledInput
          type="date"
          name="payment_date"
          onChange={handleChange}
          placeholder="Date"
        ></StyledInput>

        <StyledLabel htmlFor="payment_type">Concept</StyledLabel>

        <StyledInput
          type="text"
          name="payment_type"
          onChange={handleChange}
          placeholder="Reason"
        ></StyledInput>
        <StyledLabel htmlFor="payment_recipient">Recipient</StyledLabel>

        <StyledInput
          type="text"
          name="payment_recipient"
          onChange={handleChange}
          placeholder="Recipient"
        ></StyledInput>

        <button>{loading ? "Loading" : "Save"}</button>
      </form>
    </div>
  );
}

export default PaymentUI;
