const { Router } = require("express");
//const { login, logout } = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { login, logout } = require("../middleware/auth.middleware");

const router = Router();

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
