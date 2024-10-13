const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }

  const newUser = new User({ username, email, password });

  await newUser.save();

  res.status(201).json({ message: 'User registered successfully!' });

};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
    
};

module.exports = { registerUser, loginUser };
