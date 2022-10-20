INSERT INTO users (admin, first, last, email, cohort_name, archived, username, password, ets_date) values (false, 'Bobby', 'Brown', 'email', 'MCSP-10', true, 'usern', 'password'),
(false, 'Jane', 'Doe', 'email', 'MCSP-03', true, 'usern', 'password', "7/23/20"), 
(false, 'Wane', 'Doi', 'email', 'MCSP-03', true, 'usern', 'password', "7/23/20"),
(false, 'Rane', 'Do', 'email', 'MCSP-03', true, 'usern', 'password', "7/23/20"),
(false, 'Tane', 'Dou', 'email', 'MCSP-03', true, 'usern', 'password', "7/23/20");

INSERT INTO cohorts (cohort_name, start_date, end_date, active, archived) values 

('MCSP-02', '4/5/2020', '8/12/2020', false, true)
,('MCSP-03', '8/16/2020', '12/16/2020', false, true)
,('MCSP-04', '9/13/2020', '1/13/2020', false, true)
,('MCSP-05', '10/11/2020', '2/10/2020', false, true)
,('MCSP-06', '11/8/2020', '3/10/2020', false, true);
