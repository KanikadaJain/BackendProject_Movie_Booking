const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post("/auth/signup", async (req, res) => {
    try {
      await userController.signUp(req, res);
    } catch (error) {
      res.status(500).send({ message: "An error occurred during signup." });
    }
});

router.post("/auth/login", async (req, res) => {
    try {
      await userController.login(req, res);
    } catch (error) {
      res.status(500).send({ message: "An error occurred during login." });
    }
});

router.post("/auth/logout", async (req, res) => {
    try {
      await userController.logout(req, res);
    } catch (error) {
      res.status(500).send({ message: "An error occurred during logout." });
    }
});

router.get("/auth/coupons", async (req, res) => {
    try {
      await userController.getCouponCode(req, res);
    } catch (error) {
      res
        .status(500)
        .send({ message: "An error occurred while fetching coupon codes." });
    }
});

router.post("/auth/bookings", async (req, res) => {
    try {
      await userController.bookShow(req, res);
    } catch (error) {
      res
        .status(500)
        .send({ message: "An error occurred while booking the show." });
    }
});

module.exports = router;
