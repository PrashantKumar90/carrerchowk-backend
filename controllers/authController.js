const jwt = require("jsonwebtoken");

// Hardcoded credentials
const HARD_CODED_USER = {
  email: "prashant17924@gmail.com",
  password: "*PRASANT@salo!821119#",
};

// Login User
const loginUser = (req, res) => {
  const { email, password } = req.body;


  if (email === HARD_CODED_USER.email && password === HARD_CODED_USER.password) {
    const token = jwt.sign(
      { userId: "1", email: HARD_CODED_USER.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token });
  }

  return res.status(400).json({ message: "Invalid email or password" });
};

module.exports = { loginUser };
