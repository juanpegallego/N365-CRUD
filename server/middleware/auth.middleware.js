const { users_pool } = require("../db");
const bcrypt = require("bcrypt");

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const result = await users_pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        req.session.user = {
          id: user.id,
          username: user.username,
        };
        res.json({ message: username });
      } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
      }
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

function requireAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Acceso no autorizado" });
  }
}
module.exports = { requireAuth, login, logout };
