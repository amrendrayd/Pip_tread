const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const friendRoutes = require('./routes/friendRoutes');
const postRoutes = require('./routes/postRoutes');
const feedRoutes = require('./routes/feedRoutes');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5501;

app.use(cors()); 
app.use(express.json()); 


const connectDB = require('./config/db');
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/feed', feedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
