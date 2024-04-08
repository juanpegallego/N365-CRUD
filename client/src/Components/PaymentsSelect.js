import React, { useEffect, useState } from "react";

function PaymentsSelect({ payments, setFilteredPayments }) {
  const [filters, setFilters] = useState({
    filterDate: "",
    filterAmount: "",
    filterRecipient: "",
    filterType: "",
    searchTerm: "",
  });

  const [uniqueFilters, setUniqueFilters] = useState({
    uniqueDates: [],
    uniqueAmounts: [],
    uniqueRecipients: [],
    uniqueTypes: [],
  });
  const { filterDate, filterAmount, filterRecipient, filterType, searchTerm } =
    filters;
  const handleFilterChange = (filterName, filterValue) => {
    if (
      filterName === "filterDate" ||
      filterName === "filterAmount" ||
      filterName === "filterRecipient" ||
      filterName === "filterType"
    ) {
      setFilters({
        ...filters,
        [filterName]: filterValue,
        filterAmount: filterName === "filterAmount" ? filterValue : "",
        filterRecipient: filterName === "filterRecipient" ? filterValue : "",
        filterType: filterName === "filterType" ? filterValue : "",
      });
    } else {
      setFilters({ ...filters, [filterName]: filterValue });
    }
  };

  const handleFilter = () => {
    let filteredPayments = payments.filter((payment) => {
      const { payment_amount, payment_type, payment_recipient } = payment;

      const amountMatch = payment_amount.toString().includes(searchTerm);
      const typeMatch = payment_type
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const recipientMatch = payment_recipient
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return amountMatch || typeMatch || recipientMatch;
    });

    if (filterDate) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.payment_date === filterDate
      );
    }

    if (filterAmount) {
      const numericFilter = parseFloat(filterAmount);
      filteredPayments = filteredPayments.filter(
        (payment) =>
          payment.payment_amount >= numericFilter &&
          payment.payment_amount < numericFilter + 1
      );
    }

    if (filterRecipient) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.payment_recipient === filterRecipient
      );
    }

    if (filterType) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.payment_type === filterType
      );
    }

    setFilteredPayments(filteredPayments);
  };
  const handleFilterReset = () => {
    setFilters({
      filterDate: "",
      filterAmount: "",
      filterRecipient: "",
      filterType: "",
      searchTerm: "",
    });
  };

  useEffect(() => {
    const uniqueDates = [
      ...new Set(payments.map((payment) => payment.payment_date)),
    ];
    const uniqueAmounts = [
      ...new Set(payments.map((payment) => payment.payment_amount)),
    ];
    const uniqueRecipients = [
      ...new Set(payments.map((payment) => payment.payment_recipient)),
    ];
    const uniqueTypes = [
      ...new Set(payments.map((payment) => payment.payment_type)),
    ];

    setUniqueFilters({
      uniqueDates,
      uniqueAmounts,
      uniqueRecipients,
      uniqueTypes,
    });
  }, [payments]);

  useEffect(() => {
    handleFilter();
  }, [filters]);

  return (
    <div>
      <select
        onChange={(e) => handleFilterChange("filterDate", e.target.value)}
        value={filters.filterDate}
      >
        <option value="">Mostrar todos</option>
        {uniqueFilters.uniqueDates
          .sort((a, b) => new Date(a) - new Date(b)) // Ordenar de menor a mayor
          .map((date) => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString("es-ES")}
            </option>
          ))}
      </select>

      <select
        onChange={(e) => handleFilterChange("filterAmount", e.target.value)}
        value={filters.filterAmount}
      >
        <option value="">Seleccionar monto</option>
        {uniqueFilters.uniqueAmounts
          .sort((a, b) => a - b) // Ordenar de menor a mayor
          .map((amount) => (
            <option key={amount} value={amount}>
              {amount}
            </option>
          ))}
      </select>

      <select
        onChange={(e) => handleFilterChange("filterRecipient", e.target.value)}
        value={filters.filterRecipient}
      >
        <option value="">Seleccionar destinatario</option>
        {uniqueFilters.uniqueRecipients
          .sort((a, b) => a.localeCompare(b)) // Ordenar alfabéticamente
          .map((recipient) => (
            <option key={recipient} value={recipient}>
              {recipient}
            </option>
          ))}
      </select>

      <select
        onChange={(e) => handleFilterChange("filterType", e.target.value)}
        value={filters.filterType}
      >
        <option value="">Seleccionar motivo de pago</option>
        {uniqueFilters.uniqueTypes
          .sort((a, b) => a.localeCompare(b)) // Ordenar alfabéticamente
          .map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
      </select>
      <button onClick={handleFilterReset}>Limpiar filtros</button>
      <input
        type="text"
        value={filters.searchTerm}
        onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
        placeholder="Buscar por monto, tipo de pago o nombre del beneficiario"
      />
    </div>
  );
}

export default PaymentsSelect;
