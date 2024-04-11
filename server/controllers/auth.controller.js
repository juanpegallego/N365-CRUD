const users_pool = require("../db");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const result = await users_pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      req.session.user = result.rows[0];
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

module.exports = { login, logout };
