// Require hidden files from .env
require('dotenv').config();

// =============================
// EXPRESS SERVER && DEPENDENCIES
// ==============================
const cors = require('cors');
const mongoose = require('mongoose');
const express = require("express");
const app = express(); 
const PORT = process.env.PORT || 3000;

// ===============
// JSON MIDDLEWARE 
// ** this needs to be as high as possible before the router ** 
// ===============
app.use(cors())
app.use(express.json()); 

// ===============
// USE ROUTER
// ===============
const bookmarksController = require('./controllers/bookmarkRoutes.js');
app.use('/bookmarks', bookmarksController);

// ===============
// MONGOOSE DATABASE
// ===============
const MONGOURI =
    process.env.MONGODB_URI;

// ====================================
// MONGOOSE STATUS MSGS TO MONGODB-ATLAS
// =====================================
mongoose.connection.on('error', (err) =>
console.log(err.message + ' is Mongod not running?')
);
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

// ====================================
// MONGOOSE CONNECT TO MONGODB-ATLAS
// =====================================
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongoose...');
});


// ===============
// LISTENER
// ===============
app.listen(PORT, () => {
    console.log('🎉 🎊', 'celebrations happening on port', PORT, '🎉 🎊');
});