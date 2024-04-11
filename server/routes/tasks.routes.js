const { Router } = require("express");
const { requireAuth, login, logout } = require("../middleware/auth.middleware");
const {
  getAllPayments,
  getPayment,
  createPayment,
  deletePayment,
} = require("../controllers/tasks.controller");

const router = Router();

router.post("/login", login, requireAuth);
router.post("/logout", logout, requireAuth);

router.get("/", requireAuth, getAllPayments);
router.post("/payments/new", requireAuth, createPayment);
router.post("/payments", requireAuth, createPayment);
router.get("/payments/:id", requireAuth, getPayment);
router.delete("/payments/:id", requireAuth, deletePayment);

module.exports = router;
