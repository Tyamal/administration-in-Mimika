const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_mongo_db_uri' with your actual MongoDB URI)
mongoose.connect('your_mongo_db_uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple schema and model
const publicServiceSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

const PublicService = mongoose.model('PublicService', publicServiceSchema);

// Routes
app.get('/services', async (req, res) => {
    const services = await PublicService.find();
    res.json(services);
});

app.post('/services', async (req, res) => {
    const newService = new PublicService(req.body);
    await newService.save();
    res.status(201).json(newService);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
