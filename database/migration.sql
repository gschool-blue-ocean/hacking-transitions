DROP TABLE IF EXISTS  cohorts, users, dependents, tasks, comments;

CREATE TABLE cohorts (
    cohort_id SERIAL PRIMARY KEY,
    cohort_name VARCHAR(20),
    start_date VARCHAR(20),
    end_date VARCHAR(20),
    active BOOLEAN
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first VARCHAR(50) NOT NULL,
    last VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    rank VARCHAR(20),
    mos TEXT,
    interests TEXT,
    branch VARCHAR(20),
    duty_station VARCHAR(50),
    taps_complete BOOLEAN,
    leave_start_date VARCHAR(20),
    ets_date VARCHAR(20),
    planning_to_relocate BOOLEAN,
    city VARCHAR(30),
    state VARCHAR(30),
    has_dependents BOOLEAN,
    highest_education VARCHAR(50),
    seeking_further_education BOOLEAN,
    admin BOOLEAN NOT NULL,
    cohort_name VARCHAR(20),
    cohort_id INTEGER,
    foreign key(cohort_id) references cohorts(cohort_id),
    new_user BOOLEAN,
    relocate_to_country boolean,
    relocate_city VARCHAR(50),
    relocate_state VARCHAR(50),
    relocate_country VARCHAR(50)
);

CREATE TABLE dependents (
    dependent_id SERIAL PRIMARY KEY,
    sponsor_id INTEGER,
    foreign key(sponsor_id) references users(user_id),
    age NUMERIC,
    relation VARCHAR(10)
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    student_id INTEGER,
    foreign key(student_id) references users(user_id),
    title VARCHAR(100),
    date VARCHAR(20),
    description TEXT,
    remarks TEXT,
    completed BOOLEAN
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    student_id INTEGER,
    foreign key (student_id) references users(user_id),
    author_id INTEGER,
    author_name VARCHAR(100),
    foreign key (author_id) references users(user_id),
    content TEXT, 
    date_time TEXT
);
