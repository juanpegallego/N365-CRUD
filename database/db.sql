CREATE DATABASE paymentsdb

CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    payment_amount DECIMAL(10, 2), 
    payment_date DATE, 
    payment_type VARCHAR(50), 
    payment_recipient VARCHAR(255) 
);  

CREATE DATABASE credenciales

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255) 
);  

// Las pruebas fueron hechas con el usuario 'n365' y la clave 'n365' hasheada que seria '$2a$10$k14dow0JYfa7reVJU/GrVeHLw2jD.kbrsJyBuM9RHj32/0v1Cgt86'
// Para agregar este mismo ejemplo ejecutar el siguiente comando:

CREATE USER n365 WITH PASSWORD '$2a$10$k14dow0JYfa7reVJU/GrVeHLw2jD.kbrsJyBuM9RHj32/0v1Cgt86';