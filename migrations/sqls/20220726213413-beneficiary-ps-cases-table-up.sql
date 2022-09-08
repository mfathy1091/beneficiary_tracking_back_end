CREATE TABLE beneficiary_ps_cases (
    id SERIAL PRIMARY KEY, 
    is_direct boolean NOT NULL,   
    beneficiary_id bigint REFERENCES beneficiaries(id) NOT NULL,
    ps_case_id bigint REFERENCES ps_cases(id) NOT NULL
);