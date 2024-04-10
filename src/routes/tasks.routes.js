const { Router } = require("express");
const {
  getAllPayments,
  getPayment,
  createPayment,
  deletePayment,
} = require("../controllers/tasks.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = Router();

router.get("/payments", getAllPayments);
router.get("/", requireAuth, getAllPayments);
router.post("/payments/new", createPayment);

router.get("/payments/:id", requireAuth, getPayment);
router.post("/payments", requireAuth, createPayment);
router.delete("/payments/:id", deletePayment);

module.exports = router;
