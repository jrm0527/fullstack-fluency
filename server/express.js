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
  const query = {
    text: "SELECT * FROM task WHERE id = $1",
    values: [taskId],
  };
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const { rows } = await pool.query(query);
    res.send(rows);
    pool.end();
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

app.post("/api/tasks/", async (req, res, next) => {
  const taskName = req.body.task;
  const completed = false;

  const query = {
    text: "INSERT INTO task (task, complete) VALUES ($1, $2) RETURNING *",
    values: [taskName, completed],
  };

  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const { rows } = await pool.query(query);
    res.send(rows);
    pool.end();
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

app.delete("/api/tasks/:taskId", async (req, res, next) => {
  const taskId = req.params.taskId;

  const query = {
    text: "DELETE FROM task WHERE id = $1 RETURNING *",
    values: [taskId],
  };
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      next({ status: 400, message: "Bad Request" });
    } else {
      res.send(rows);
    }
    pool.end();
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

app.patch("/api/tasks/:taskId", async (req, res, next) => {
  const taskId = req.params.taskId;
  const taskName = req.body.task;
  const completed = req.body.complete;

  const query = {
    text: "UPDATE task SET task = COALESCE($2, task), complete = COALESCE($3, complete) WHERE id = $1 RETURNING *",
    values: [taskId, taskName || null, completed || null],
  };
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      next({ status: 400, message: "Bad Request" });
    } else {
      res.send(rows);
    }
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
