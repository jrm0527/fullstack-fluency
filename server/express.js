import express from "express";
const app = express();
app.use(express.json());

import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
const { Pool } = pg;

import cors from "cors";
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/api/tasks", async (req, res, next) => {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const { rows } = await pool.query("SELECT * FROM task");
    res.send(rows);
    pool.end();
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

app.get("/api/tasks/:taskId", async (req, res, next) => {
  const taskId = req.params.taskId;
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const { rows } = await pool.query(
      `SELECT * FROM task WHERE id = ${taskId}`
    );
    res.send(rows);
    pool.end();
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

app.use((req, res, next) => {
  next({ status: 404, message: "Not Found" });
});

app.use((error, req, res, next) => {
  res.status(error.status).send(error.message);
});

app.listen(port, function () {
  console.log(`server is running on ${port}`);
});
