--SQL TESTS--

CREATE DATABASE user_profiles;

--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    insurance_id VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--insert sample user
INSERT INTO users (user_name, user_email, insurance_id, user_password) VALUES ('maydoe', 'mary789@yahoo.com', '56781234-A', 'dnalysis8');

--create patient sample table
CREATE TABLE Patient(
    Patient_ID INT NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    DateofBirth VARCHAR(255) NOT NULL,
    Gender VARCHAR(255) NOT NULL,
    PatientHealthIn_ID VARCHAR(255) NOT NULL,
    PRIMARY KEY (Patient_ID)
);

--insert sample patient
INSERT INTO Patient (Patient_ID, FirstName, LastName, DateofBirth, Gender, PatientHealthIn_ID) VALUES (84614, 'George', 'Arubi', '04/21/1998', 'Male', '53933899-A');

--SQL QUERIES--

--insert sample user
INSERT INTO users (user_id, user_name, user_email, user_password, insurance_id) 
VALUES (7777777, 'doghousetv', 'doghousetv@gmail.com', 'dnalysis8', 83917400);

--insert sample patient
INSERT INTO patient (patient_id, first_name, last_name, date_of_birth, gender, address, phone_no, email, race_ethnic_origin, emergency_contact_name, emergency_contact_phone, insurance_id, health_insurance_plan, policy_start_date, policy_end_date)
VALUES ();