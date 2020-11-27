const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    cpf: {
        type: String,
        required: true
    },
    rg: {
        type: String,
        required: true
    },
    bornDate: {
        type: String,
        required: true
    },
    firstTelephone: {
        type: String,
        required: true
    },
    secondTelephone: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    authLevel: {
        type: Number,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    avatarURL: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Users', userSchema);