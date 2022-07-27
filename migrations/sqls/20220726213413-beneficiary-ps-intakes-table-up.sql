CREATE TABLE beneficiary_ps_intakes (
    id SERIAL PRIMARY KEY, 
    is_direct boolean NOT NULL,   
    beneficiary_id bigint REFERENCES beneficiaries(id) NOT NULL,
    ps_intake_id bigint REFERENCES ps_intakes(id) NOT NULL
);