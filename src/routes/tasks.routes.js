const { Router } = require("express");
const {
  getAllPayments,
  getPayment,
  createPayment,
  deletePayment,
} = require("../controllers/tasks.controller");

const router = Router();

router.get("/payments", getAllPayments);
router.get("/payments/:id", getPayment);
router.post("/payments", createPayment);
router.delete("/payments/:id", deletePayment);

module.exports = router;
