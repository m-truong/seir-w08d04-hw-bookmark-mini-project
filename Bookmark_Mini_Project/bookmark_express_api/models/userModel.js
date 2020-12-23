/**
 * Schema for 'Users' when a new client registers with username in the database.
 */
const {Schema, model} = require('mongoose');
const userSchema = Schema({
    username: {type: String, required: true},
    password: String
})
module.exports = model('User', userSchema);