const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    otp: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        expires: 60
    }
});

const OTP = mongoose.model('otp', otpSchema);

module.exports = OTP;