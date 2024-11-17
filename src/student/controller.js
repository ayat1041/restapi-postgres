// business logic of each route
const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    // console.log(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    // console.log(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  //check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists.");
    }

    // add student to db
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Student created Successfully!");
      }
    );
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      res.status(500).send("Error fetching student");
      return; // Exit the function
    }

    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.status(404).send("Student does not exist");
      return; // Exit the function to prevent further execution
    }

    // Proceed to delete the student
    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) {
        res.status(500).send("Error removing student");
        return; // Exit the function
      }
      res.status(200).send("Student removed successfully");
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) {
      res.status(500).send("Error fetching student data");
      return; // Exit the function
    }

    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.status(404).send("No student data found.");
      return; // Exit the function to prevent further execution
    }

    // Proceed to update the student
    pool.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) {
        res.status(500).send("Error updating student data");
        return; // Exit the function
      }
      res.status(200).send("Student info updated.");
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
