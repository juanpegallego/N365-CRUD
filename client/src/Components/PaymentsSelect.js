import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import FilterSelect from "./FilterSelect";
import styled from "styled-components";
import { StyledButton } from "./utils/customStyled";

const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  width: 100%;
`;

const StyledSelectorsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

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
    if (payments && Array.isArray(payments)) {
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
    } else {
      setFilteredPayments([]);
    }
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
    if (payments && Array.isArray(payments)) {
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
    }
  }, [payments]);

  useEffect(() => {
    handleFilter();
  }, [filters, payments]);
  return (
    <StyledAside>
      <StyledSelectorsContainer>
        <select
          onChange={(e) => handleFilterChange("filterDate", e.target.value)}
          value={filters.filterDate}
          style={{
            maxHeight: "24px",
            cursor: "pointer",
            borderRadius: "0px",
            border: "none",
            margin: "0 5px 0 0",
          }}
        >
          <option hidden value="">
            DATE
          </option>
          {uniqueFilters.uniqueDates
            .sort((a, b) => new Date(a) - new Date(b))
            .map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString("en-EN")}
              </option>
            ))}
        </select>

        <FilterSelect
          filters={filters}
          handleFilterChange={handleFilterChange}
          filterTypeString={"filterAmount"}
          filterText={"AMOUNT"}
          filtros={uniqueFilters.uniqueAmounts}
        />

        <FilterSelect
          filters={filters}
          handleFilterChange={handleFilterChange}
          filterTypeString={"filterRecipient"}
          filterText={"RECIPIENT"}
          filtros={uniqueFilters.uniqueRecipients}
        />

        <FilterSelect
          filters={filters}
          handleFilterChange={handleFilterChange}
          filterTypeString={"filterType"}
          filterText={"CONCEPT"}
          filtros={uniqueFilters.uniqueTypes}
        />
        <StyledButton bgc={"#535353"} onClick={handleFilterReset}>
          CLEAN FILTERS
        </StyledButton>
      </StyledSelectorsContainer>
      <div>
        <SearchInput
          style={{ maxHeight: "30px", cursor: "pointer" }}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </div>
    </StyledAside>
  );
}

export default PaymentsSelect;
