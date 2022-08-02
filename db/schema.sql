DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT,
    title VARCHAR(30),
    salary DECIMAL(7,2),
    department_id INT,
    FOREIGN KEY(department_id) REFERENCES department(id),
    PRIMARY KEY(id) 
);

CREATE TABLE employee(
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY(id) REFERENCES role(id) ON DELETE SET NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id) REFERENCES employee(manager_id) ON DELETE SET NULL
);