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
	let heros;
	try {
		students = await Postgres.query("SELECT * FROM hero");
        res.json({
            message: "success",
            data: heros.rows,
        })
	} 
    catch (err) {
		return res.status(400).json({
			message: "An error happened",
		});
	}
})


app.post("/hero", async (req, res) => {
    const heros = req.body;
    try {
      await Postgres.query("INSERT INTO hero(name,color,is_alive,age,image) VALUES ($1,$2,$3,$4,$5,)", [
        heros.name,
        heros.color,
        heros.is_alive,
        heros.age,
        heros.image
      ]);
      res.json({
        message: "heros added",
        data: heros.rows,
      });
    } catch (err) {
      res.json({
        message: err,
      });
    }
  });


app.listen( process.env.PGPORT,()=>( console.log("this server listing port:5432")))