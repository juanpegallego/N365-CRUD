import React from "react";

function Item({ id, amount, date, type, recipient, handleDelete }) {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  }

  return (
    <div>
      <span>
        ID: {id}, Amount: {amount} {formatDate(date)}
      </span>
      <p>{type}</p>
      <h2>{recipient}</h2>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default Item;
