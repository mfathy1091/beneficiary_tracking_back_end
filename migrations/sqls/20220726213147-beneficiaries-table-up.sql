CREATE TABLE beneficiaries (
    id SERIAL PRIMARY KEY, 
    full_name VARCHAR(50) NOT NULL, 
    file_number VARCHAR(50) NOT NULL,
    individual_number VARCHAR(50),
    passport_number VARCHAR(50)
);