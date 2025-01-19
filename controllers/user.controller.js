const TokenGenerator = require("uuid-token-generator");
const { fromString } = require("uuidv4");
const User = require("../models/user.model");
const { atob } = require("b2a");
const crypto = require("crypto");

// Get Coupon Code controller
exports.getCouponCode = async (req, res) => {
  try {
    const tokenReceived = req.headers.authorization.split(" ")[1];

    const user = await User.findOne({ accesstoken: tokenReceived });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Some error occurred, please try again later." });
    }
    const coupon = user.coupens.find((c) => c.id == req.query.code);
    res.send(coupon || { message: "Coupon not found." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error validating token" });
  }
};

// Book Show controller
exports.bookShow = async (req, res) => {
  try {
    if (!req.body.customerUuid) {
      return res.status(400).send({ message: "ID Not Found!" });
    }
    const user = await User.findOne({ uuid: req.body.customerUuid });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const newRefNo =
      new Date().getMilliseconds().toString() +
      Math.floor(Math.random() * 100).toString();
    req.body.bookingRequest.reference_number = newRefNo;

    user.bookingRequests.push(req.body.bookingRequest);

    await user.save();
    res.send({ reference_number: newRefNo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error validating token" });
  }
};

exports.login = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res
        .status(401)
        .send({ message: "Authorization header is missing or invalid." });
    }

    const authToken = authHeader.split(" ")[1];
    const unamePwd = atob(authToken);
    const [uname, pwd] = unamePwd.split(":");

    if (!uname || !pwd) {
      return res
        .status(400)
        .send({ message: "Please provide username and password to continue." });
    }

    const user = await User.findOne({ username: uname });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    if (pwd === user.password) {
      const tokgen = new TokenGenerator();
      const accessTokenGenerated = tokgen.generate();
      const uuidGenerated = crypto
        .createHash("sha256")
        .update(username + Date.now().toString())
        .digest("hex");

      user.isLoggedIn = true;
      user.uuid = uuidGenerated;
      user.accesstoken = accessTokenGenerated;

      const updatedUser = await User.findOneAndUpdate(
        { username: uname },
        user,
        { new: true, useFindAndModify: false }
      );

      res.header("access-token", updatedUser.accesstoken);
      res.send({
        id: updatedUser.uuid,
        "access-token": updatedUser.accesstoken,
      });
    } else {
      res.status(401).send({ message: "Invalid password." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signUp = async (req, res) => {
  try {
    const {
      email_address,
      first_name,
      last_name,
      password,
      mobile_number,
      role = "user",
    } = req.body;

    // Check if all required fields are present
    if (
      !email_address ||
      !first_name ||
      !last_name ||
      !password ||
      !mobile_number
    ) {
      return res
        .status(400)
        .send({ message: "All required fields must be provided." });
    }

    // Concatenate first and last name for username
    const username = `${first_name}${last_name}`;
    // Generate a unique UUID based on userName
    const uuid = crypto
      .createHash("sha256")
      .update(username + Date.now().toString())
      .digest("hex");

    // Create the new user with a generated uuid
    const user = new User({
      email: email_address,
      first_name,
      last_name,
      username,
      password,
      contact: mobile_number,
      role,
      isLoggedIn: false,
      uuid: uuid, // Generate a unique UUID
      accesstoken: "",
      coupens: [],
      bookingRequests: [],
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Some error occurred, please try again later." });
  }
};

// Logout function
exports.logout = async (req, res) => {
  try {
    if (!req.body.uuid) {
      return res.status(400).send({ message: "ID Not Found!" });
    }

    const update = { isLoggedIn: false, uuid: "", accesstoken: "" };
    const data = await User.findOneAndUpdate({ uuid: req.body.uuid }, update, {
      new: true,
    });

    if (!data) {
      return res.status(404).send({ message: "User not found." });
    }

    res.send({ message: "Logged Out successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating" });
  }
};