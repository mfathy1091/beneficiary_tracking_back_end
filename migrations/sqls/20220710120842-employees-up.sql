CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(50) NOT NULL UNIQUE,
    avatar VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dztskndab/image/upload/v1662985098/avatar/avatar_czgymz.png' NOT NULL,
    user_id bigint
);



INSERT INTO employees
    (name, email, avatar, user_id)
VALUES
    ('mohamed fathy', 'admin@gmail.com', 'https://res.cloudinary.com/dztskndab/image/upload/v1662985098/avatar/avatar_czgymz.png', '1')