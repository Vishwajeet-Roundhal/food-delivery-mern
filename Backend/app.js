require("dotenv").config();
const express = require("express");
const connectDB = require("./Utils/db");
const multer = require('multer');
const app = express();
const auth = require('./Routers/auth-route')
const restaurant = require('./Routers/restaurant-route')
PORT = 6005;
app.use(express.json());
const User = require("./models/User")

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to save the uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post('/upload', upload.single('profileImage'), async (req, res) => {
    try {
        // The file is available in req.file
        const profileImageUrl = `/uploads/${req.file.filename}`;

        // Save the profile image URL to the user document in the database
        const user = await User.findById(req.body._id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.profile_url = profileImageUrl;
        await user.save();

        res.status(200).send('File uploaded and URL saved to user profile');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.use('/api/auth',auth);
app.use('/api/restaurant',restaurant);


connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error, "database error");
  }
});



