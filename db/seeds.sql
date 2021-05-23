--Department Seed
INSERT INTO department(department_name)
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal');
-- Employee Role Seed
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 10000, 1),
('Salesperson', 80000,1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);
--Employee Seed
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Chris', 'Sannar', 1, null),
('javid', 'Santos', 2, null),
('Mason', 'Short', 3, null),
('Michael', 'Breaker', 4, 1),
('Laffy', 'Taffy', 5, 4),
('Naruto', 'Uzumaki', 6, 1),
('Hakuna','Matata', 2, 7);