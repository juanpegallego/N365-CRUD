const { Router } = require("express");
const {
  getAllPayments,
  getPayment,
  createPayment,
  deletePayment,
} = require("../controllers/tasks.controller");
const { requireAuth } = require("../middleware/auth.middleware"); // Middleware de autenticación

const router = Router();

router.get("/payments", requireAuth, getAllPayments);
router.get("/payments/:id", requireAuth, getPayment);
router.post("/payments", requireAuth, createPayment);
router.delete("/payments/:id", requireAuth, deletePayment);

module.exports = router;
