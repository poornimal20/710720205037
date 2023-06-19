const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
    },
    ownerEmail: {
        type: String,
        required: true,
        unique: true,
    },
    accessCode: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("user", UserSchema);
