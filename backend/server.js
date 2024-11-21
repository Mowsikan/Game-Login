const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

// MongoDB Connection
mongoose.connect(`mongodb://localhost:27017/Game`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ status: 'error', message: 'Invalid credentials' });
    }

    // Check if password matches (for simplicity, no hashing in this example)
    const isPasswordCorrect = user.password === password; // You should use bcrypt to hash the password

    if (isPasswordCorrect) {
      // Return success response with role and token (placeholder token for now)
      return res.json({ status: 'success', role: user.role, token: 'your_jwt_token' });
    } else {
      return res.json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.json({ status: 'error', message: 'Something went wrong' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
