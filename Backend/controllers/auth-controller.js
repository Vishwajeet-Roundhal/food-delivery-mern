const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../Utils/emailService");
const crypto = require("crypto");

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

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    await sendEmail(email, "Your OTP", otp);

    const newUser = await User.create({
      name,
      email,
      password: pass,
      phone,
      username,
      addresses,
      profile_url,
      otp: otp,
      isVerified: false,
    });

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

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const receivedOTP = parseInt(otp);
    // Check if the OTP matches
    if (user.otp !== receivedOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    await user.save();
    req.user = user;

    res.status(200).json({ message: "OTP verified successfully" });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
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

const forgotPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetToken = token;
    await user.save();

    const subject = "Password reset";
    const text =
      `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
      `http://${req.headers.host}/reset-password/${token}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`;
    
    sendEmail(userEmail, subject, text);

    res.status(200).json({ msg: "Password reset link has been sent" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({ resetToken: token });

    if (!user) {
      return res.status(404).json({ msg: "Invalid or expired token" });
    }

    user.password = newPassword;

    user.resetToken = undefined;
    await user.save();

    res.status(200).json({ msg: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


const updatePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


module.exports = { register, login, updateUser, verifyOTP, resetPassword, updatePassword };
