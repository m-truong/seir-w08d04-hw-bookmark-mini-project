const mongoose = require("mongoose");

// ======================
// MONGODB DOC-OBJ SCHEMA
// ======================
const bookmarkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true }
});

// ======================
// MONGODB DOC-OBJ MODEL-INTERFACE
// ======================
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;