const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { Pool } = require("pg");
dotenv.config({
	path: "./config.env",
});

app.use(express.json());



const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

app.get("/", async (_req, res) => {
	let students;
	try {
		students = await Postgres.query("SELECT * FROM student");
        res.json({
            message: "success",
            data: students.rows,
        })
	} 
    catch (err) {
		return res.status(400).json({
			message: "An error happened",
		});
	}
})


app.post("/students", async (req, res) => {
    const students = req.body.name;
    try {
      await Postgres.query("INSERT INTO student(name) VALUES ($1)", [
        students,
      ]);
      res.json({
        message: "Student added",
        data: students.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  });


app.listen( process.env.PGPORT,()=>( console.log("this server listing port:5432")))