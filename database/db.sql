CREATE DATABASE paymentsdb

CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    payment_amount DECIMAL(10, 2), 
    payment_date DATE, 
    payment_type VARCHAR(50), 
    payment_recipient VARCHAR(255) 
);  