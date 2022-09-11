CREATE TABLE beneficiaries (
    id SERIAL PRIMARY KEY, 
    full_name VARCHAR(50) NOT NULL, 
    file_number VARCHAR(50) NOT NULL,
    individual_number VARCHAR(50),
    passport_number VARCHAR(50)
);


INSERT INTO beneficiaries
    (full_name, file_number, individual_number, passport_number)
VALUES
    ('Hoda Zidan', '914-15C00001', 'i354321354', 'p4534312'),
    ('Ismail mohamed', '914-15C00002', 'i354321354', 'p4534312'),
    ('Satouna AlAhmed', '914-15C00003', 'i354321354', 'p4534312'),
    ('Rabab Hassan', '914-15C00004', 'i354321354', 'p4534312'),
    ('Shady Ahmed', '914-15C00005', 'i354321354', 'p4534312'),
    ('Selim Alattar', '914-15C00006', 'i354321354', 'p4534312')

