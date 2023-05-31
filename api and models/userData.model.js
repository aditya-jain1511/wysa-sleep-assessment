const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDataSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId }, //auth.currentUser.uid
    displayName: { type: String, maxlength: 32 }, //nickname
    emailID: { type: String, trim: true, required: true },
    passwordHash: { type: String },
    admin: { type: Boolean },
    phoneCode: { type: String }, //adding or updating the profile
    phoneNumber: { type: String }, //adding or updating the profile
    photoURL: { type: String }, //adding or updating the profile
    city: { type: String }, //adding or updating the profile
    state: { type: String }, //adding or updating the profile
    country: { type: String }, //adding or updating the profile
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const userData = mongoose.model("userData", userDataSchema);
module.exports = userData;

// ----------------------------------------------------------------------------------------

/**
 * A way to secure the password is to send in a hash password, multiple ways to do it
 * - passport js - local strategy - creates an idToken that is used with a expire time if needed
 * - hashing the password before storing it and comparing the hash when logging in
 * - Firebase has built in feature for storing auth and users
 *
 * In the project i have used Firebase as Baas (backend as a service) for auth and database needs
 * Below is one of the ways to secure the user signup and login
 */

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by the provided email
    const user = await User.findOne({ email });
    if (!user) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "User not found." });
    }
    // Compare hashed password with the provided password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "Invalid credentials." });
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({ message: "Server error." });
  }
});

// Registration route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user in the database with the hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: "User registered successfully." });

  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.json({ message: "Server error." });
  }
});
