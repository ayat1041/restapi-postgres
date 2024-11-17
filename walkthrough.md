Here's a structured markdown version of your walkthrough:

# REST API Project Walkthrough

## **Step 1: Initialize the Project**
1. Create a new project:
   ```bash
   npm init -y
   ```
2. Install required dependencies:
   ```bash
   npm install express
   npm install pg
   ```
3. Start the server:
   ```bash
   node server.js
   ```

---

## **Step 2: Set Up PostgreSQL**
1. Open `psql` and log in.
2. Verify the connection:
   ```sql
   \conninfo
   ```
3. List all databases:
   ```sql
   \l
   ```
4. Create a new database named `students`:
   ```sql
   CREATE DATABASE students;
   ```
5. Verify the new database creation:
   ```sql
   \l
   ```
6. Connect to the `students` database:
   ```sql
   \c students
   ```
7. Clear the console:
   ```sql
   \! cls
   ```

---

## **Step 3: Create a Table**
Run the following SQL command to create a `students` table:
```sql
CREATE TABLE students (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  age INT,
  dob DATE
);
```

Verify the table creation:
```sql
\dt
```
Expected output:
```
          List of relations
 Schema |   Name   | Type  |  Owner
--------+----------+-------+----------
 public | students | table | postgres
(1 row)
```

---

## **Step 4: Insert Data**
Insert sample data into the `students` table:
```sql
INSERT INTO students (name, email, age, dob)
VALUES 
  ('Ayat', 'ay@gmail.com', 26, '1998-03-06'), 
  ('Tawsif', 't@gmail.com', 25, '1999-09-09');
```

---

## **Step 5: Query Data**
Retrieve all data from the `students` table:
```sql
SELECT * FROM students;
```
