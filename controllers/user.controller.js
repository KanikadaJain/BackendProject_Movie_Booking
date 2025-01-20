const TokenGenerator = require("uuid-token-generator");
const { fromString } = require("uuidv4");
const User = require("../models/user.model");
const { atob } = require("b2a");
const crypto = require("crypto");

// Login function
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (user) {
      // Compare the entered password with the hashed password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Update the user status to logged in and generate an access token
        user.isLoggedIn = true;
        user.accesstoken = uuidv4(); // Generate a new access token
        await user.save();

        res.status(200).json({ message: 'Login successful!', accessToken: user.accesstoken });
      } else {
        res.status(400).send('Incorrect password.');
      }
    } else {
      res.status(404).send('Username not found.');
    }
  } catch (error) {
    res.status(500).send('An error occurred during login.');
  }
};

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

// signUp - to create a USER object and save it in USER schema
exports.signUp = async (req, res) => {
  const { email, first_name, last_name, username, contact, password, role } = req.body;
  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send('Username or email already exists.');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      userId: Math.floor(1000 + Math.random() * 9000), // Random 4 digit userId
      email,
      first_name,
      last_name,
      username,
      contact,
      password: hashedPassword,
      role: role || 'user',
      uuid: uuidv4()
    });
    // Save the new user to the database
    await newUser.save();
    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(500).send('An error occurred during registration.');
  }
};

// logout - requires the unique Id of the logged-in person
exports.logout = async (req, res) => {
  const { uuid } = req.body;

  try {
    // Find the user by UUID
    const user = await User.findOne({ uuid, isLoggedIn: true });
    if (user) {
      // Set the user's isLoggedIn status to false and clear the access token
      user.isLoggedIn = false;
      user.accesstoken = null;
      await user.save();

      res.status(200).send('Logout successful.');
    } else {
      res.status(404).send('User not found or already logged out.');
    }
  } catch (error) {
    res.status(500).send('An error occurred during logout.');
  }
};