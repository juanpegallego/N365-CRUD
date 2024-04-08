const pool = require("../db");

const getAllPayments = async (req, res, next) => {
  try {
    const allPayments = await pool.query("SELECT * from payment");
    res.json(allPayments.rows);
  } catch (error) {
    next(error);
  }
};

const getPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM payment WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Payment not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createPayment = async (req, res, next) => {
  const { payment_amount, payment_date, payment_type, payment_recipient } =
    req.body;

  try {
    const result = await pool.query(
      "INSERT INTO payment (payment_amount, payment_date, payment_type, payment_recipient) VALUES($1,$2,$3,$4) RETURNING *",
      [payment_amount, payment_date, payment_type, payment_recipient]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM payment WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Payment Not found",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPayments,
  getPayment,
  createPayment,
  deletePayment,
};
