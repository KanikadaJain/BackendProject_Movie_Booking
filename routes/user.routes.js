const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Signup route for a new user
router.post("/auth/signup", async (req, res) => {
    try {
      await userController.signUp(req, res);
    } catch (error) {
      res.status(500).send({ message: "An error occurred during signup." });
    }
});

// Login route
router.post("/auth/login", async (req, res) => {
    try {
      await userController.login(req, res);
    } catch (error) {
      res.status(500).send({ message: "An error occurred during login." });
    }
});

// Logout route
router.post("/auth/logout", async (req, res) => {
    try {
      await userController.logout(req, res);
    } catch (error) {
      res.status(500).send({ message: "An error occurred during logout." });
    }
});

// Coupon route
router.get("/auth/coupons", async (req, res) => {
    try {
      await userController.getCouponCode(req, res);
    } catch (error) {
      res
        .status(500)
        .send({ message: "An error occurred while fetching coupon codes." });
    }
});

//  Book show for user
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