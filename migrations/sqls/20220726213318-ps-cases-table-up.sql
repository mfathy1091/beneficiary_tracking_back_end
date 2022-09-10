CREATE TYPE CASE_STATUS AS ENUM
    ('active', 'inactive', 'closed');

CREATE TABLE ps_cases (
    id SERIAL PRIMARY KEY, 
    referral_source VARCHAR(50) NOT NULL,
    created_by bigint REFERENCES employees(id) NOT NULL,
    assigned_by bigint REFERENCES employees(id),
    assigned_to bigint REFERENCES employees(id),
    status VARCHAR(50) NOT NULL
);