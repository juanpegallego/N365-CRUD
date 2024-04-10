const session = require("express-session");
const { users_pool } = require("../db");

const sessionConfig = {
  secret: "tu_secreto",
  resave: false,
  saveUninitialized: false,
};

function requireAuth(req, res, next) {
  console.log("ACA ESTAMOS EN REQUIREAUTH", req.session.user);
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Acceso no autorizado" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const result = await users_pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      const user = {
        id: result.rows[0].id,
        username: result.rows[0].username,
      };
      req.session.user = user;
      console.log("NUEVO USER CORRECTO", user);
      res.json({ message: "Autenticación exitosa" });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Error al cerrar sesión" });
    } else {
      res.json({ message: "Sesión cerrada exitosamente" });
    }
  });
}

module.exports = { requireAuth, login, logout, sessionConfig };
