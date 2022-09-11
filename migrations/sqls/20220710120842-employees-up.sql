CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(50) NOT NULL UNIQUE,
    user_id bigint
);



INSERT INTO employees
    (name, email, user_id)
VALUES
    ('mohamed fathy', 'admin@gmail.com', '1')