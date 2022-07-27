CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(50) NOT NULL UNIQUE,
    user_id bigint REFERENCES users(id)
);



