CREATE TABLE ps_intakes (
    id SERIAL PRIMARY KEY, 
    referral_source VARCHAR(50) NOT NULL,
    employee_id bigint REFERENCES employees(id) NOT NULL
);