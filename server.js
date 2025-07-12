const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");
const udocumentRoutes = require("./routes/udocumentRoutes"); //this is for user side

const manageDocRoutes = require("./routes/manageDocRoutes");


const managePyq = require("./routes/MPyqRoutes");
const uploadPyq = require("./routes/PyqRoutes");
const userPyq = require("./routes/UPyqRoutes");

const connectDB = require("./config/db");
const uploadRoute = require("./routes/uploadCourseDoc");
app.use(express.urlencoded({ extended: true }));
// CORS Configuration
const corsOptions = {
  origin: [
    'https://carrerchowk.vercel.app', // React dev server    
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Your other middleware
app.use(express.json());
connectDB();
// Routes would go here
app.use('/api/contact', contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoute);
app.use("/api", udocumentRoutes);//user side filter
app.use("/api/manage", manageDocRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api", uploadPyq);
app.use("/api/managepyq",managePyq); // need to update the jsx file 
app.use("/api", userPyq) // need to work with pulic resource jsx file


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));