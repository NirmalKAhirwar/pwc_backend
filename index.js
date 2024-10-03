const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const User = require("./Schema/users");
const Totp = require("./Schema/totp");
// const db = mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;
mongoose
  .connect(process.env.DB_CONNECTION, {})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
var qr_img_code = "";
const secret = speakeasy.generateSecret({
  name: "WeAreTeam8",
});
console.log(secret);
qrcode.toDataURL(secret.otpauth_url, function (err, data) {
  // console.log(data);
  qr_img_code = data;
});

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send(`<img src="${qr_img_code}"> </img>`);
});

app.post("/api/signup", (req, res) => {
  const { username, password, email } = req.body;
  console.log("User: " + username);
  console.log("Password: " + password);
  console.log("Email: " + email);

  if (!username || !password || !email) {
    return res.status(401);
  }

  const newUser = new User({ username, password, email });
  newUser.save();
  res.status(201).json({ message: "User signed up successfully" });
});

app.post("/api/login", async function (req, res) {
  const { email, password } = req.body;
  console.log("Email: " + email);
  console.log("Password: " + password);

  const user = await User.findOne({ email });
  console.log("User: " + user);

  if (user.email === email && user.password === password) {
    res.json({ message: "User logged in successfully" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});


app.post("/api/totp", async function (req, res) {
  const { email, password } = req.body;
  console.log("Email: " + email);
  console.log("Password: " + password);

  const user = await User.findOne({ email });
  console.log("User: " + user);

  if (user.email === email && user.password === password) {
    res.json({ message: "User logged in successfully" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});


app.listen(PORT, function () {
  console.log(`Listening on PORT http://localhost:${PORT}`);
});
