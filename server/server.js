const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const propertyFormRoutes = require('./routes/propertyFormRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
console.log(process.env.MONGO_URI)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI,{family: 4})
    .then(() => console.log('Connected to MongoDB✅'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/property-records', propertyFormRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅Server is running on port ${PORT}`);
}); 