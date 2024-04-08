import { React, u } from "react";

function PaymentUI({ handleSubmit, handleChange, loading }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="payment_amount"
          onChange={handleChange}
          placeholder="Amount"
        ></input>

        <input
          type="date"
          name="payment_date"
          onChange={handleChange}
          placeholder="Date"
        ></input>
        <input
          type="text"
          name="payment_type"
          onChange={handleChange}
          placeholder="Reason"
        ></input>

        <input
          type="text"
          name="payment_recipient"
          onChange={handleChange}
          placeholder="Recipient"
        ></input>

        <button>{loading ? "Cargando" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default PaymentUI;
