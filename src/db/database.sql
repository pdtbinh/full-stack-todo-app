CREATE DATABASE todo_db;

CREATE DATABASE IF NOT EXISTS perntodo;

DROP TABLE IF EXISTS doer;

CREATE TABLE doer(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

DROP TABLE IF EXISTS todo;

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    user_id INT,
    content VARCHAR(255)
);