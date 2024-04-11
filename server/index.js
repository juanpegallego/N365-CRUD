const express = require("express");
const session = require("express-session");
const cors = require("cors");
const taskRoutes = require("./routes/tasks.routes");

const app = express();

const sessionConfig = {
  secret: "tu_secreto",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
  },
};

app.use(session(sessionConfig));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(taskRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("Servidor puerto 3000.");
});
