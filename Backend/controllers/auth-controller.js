const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../Utils/emailService");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, username, addresses, profile_url } =
      req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }
    const userExists = await User.findOne({ email: email });

    if (await userExists)
      return res.status(409).json({ message: "User already exists" });

    const salt = 10;
    const pass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: pass,
      phone,
      username,
      addresses,
      profile_url,
    });

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    res.status(200).json({
      newUser,
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(email);

    if (!user) return res.status(400).json("user or password wrong");
    console.log(email, password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) return res.status(400).json("Invalid");
    // Return jsonwebtoken
    if (user) {
      res.json({
        token: await user.generateToken(),
        userId: user._id.toString(),
        username: user.username,
      });
    }
    const emailSubject = "Welcome to Swiggy!";
    const emailText = `
        Dear ${user.username},

        Welcome to Swiggy! We are thrilled to have you with us.

        You can now browse through our extensive list of restaurants and order your favorite meals with just a few clicks. 

        If you have any questions or need assistance, feel free to reach out to our support team.

        Happy ordering!

        Best regards,
        The Swiggy Team
      `;

    await sendEmail(email, emailSubject, emailText);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, username, addresses, phone } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          username,
          addresses,
          phone,
        },
      },
      { new: true }
    );

    if (!updateUser) return res.status(404).json({ msg: "no update found" });

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = { register, login , updateUser};
