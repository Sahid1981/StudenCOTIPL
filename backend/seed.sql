-- Database
CREATE DATABASE IF NOT EXISTS cotipl;
USE cotipl;

-- Tables
CREATE TABLE IF NOT EXISTS courses (
    code VARCHAR(45) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    recordings VARCHAR(255) NOT NULL,
    lectures VARCHAR(255) NOT NULL,
    passed TINYINT(1) NOT NULL DEFAULT 0,
    grade INT NULL,
    color VARCHAR(10) NOT NULL DEFAULT '#ff0000'
);

