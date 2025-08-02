const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const interactionRoutes = require('./routes/interactionRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err.message));


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/interact', interactionRoutes);
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => res.send('Mini Dating App Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));