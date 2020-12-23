// Require files from .env
require('dotenv').config();

// =============================
// EXPRESS SERVER && DEPENDENCIES
// ==============================
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const bookmarksController = require('./controllers/bookmarkRoutes.js');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require("express");
const app = express(); 
const PORT = process.env.PORT || 3000;
const SECRET = "abcdefghijklmnopqrstuvwxyz";
// ===============
// JSON MIDDLEWARE 
// ** needs to be before router ** 
// ===============
app.use(cors())
app.use(express.json()); 
// ===============
// USE ROUTER
// ===============
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

// ======================================
// AUTHENTICATION AND REGISTRATION ROUTES
// ======================================
// REGISTER-USER ROUTE
app.post('/register', (req, res) => {
    req.body.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(createdUser)
        }
    })
})
// LOGIN ROUTE
app.post('/login', async (req, res) => {
    const { username, password } = req.body; 
    try {
        const user = await User.findOne( { username } )
        // 
        console.log("user", user);
        if (bcryptjs.compareSync(password, user.password)) { 
            // takes secret and username 
            // generates random String 'Bearer $2a' 
            // token keeps user logged in
            const token = jwt.sign({ 
                username: user.username 
            }, SECRET) 
            res.status(200).json({ 
                token, 
                username, 
                authenticated: true
            })
        }
    } catch( error) {
        res.status(400).json(error)

    }
})

// ===============
// LISTENER
// ===============
app.listen(PORT, () => {
    console.log('🎉 🎊', 'celebrations happening on port', PORT, '🎉 🎊');
});