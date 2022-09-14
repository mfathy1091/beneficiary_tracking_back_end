CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    "password" VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255),
    role_id bigint REFERENCES roles(id)
);


