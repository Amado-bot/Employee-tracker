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
VALUES ('Michael', 'Scott', 1, null),
('Jim', 'Halpert', 2, 1),
('Dwight', 'Schrute', 2, 1),
('Pam', 'Beasley', 4, 1),
('Kevin', 'Malone', 3, 1),
('Toby', 'Flannagan', 5, 2),
('Robert', 'bobert', 6, null);