const mongoose = require('mongoose')

const TotpSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    secret: String,
    algorithm: String,
    digits: Number,
    period: Number,
    windowSize: Number,
    lastUsed: Date
})


const Totp = mongoose.model("Totp", TotpSchema);

module.exports = Totp;