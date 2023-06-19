// register the user

const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwtSecret = require("../config/data.config");

const jwtToken = require("jsonwebtoken");
router.post(
    "/register",
    check("companyName", "name must be provided").notEmpty(),
    check("ownerName", "ownerName must be provided").notEmpty(),
    check("rollNo", "rollno is required").notEmpty(),
    check("ownerEmail", "ownerEmail must be provided").isEmail(),
    check("accessCode", "accessCode must be provided").notEmpty(),
    async (req, res) => {
        console.log(jwtSecret);
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ msg: error.array() });
        }
        const { name, password, email } = req.body;
        // existing email id
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);
            let user1 = new User({
                name,
                email,
                password: newPassword,
            });
            await user1.save();
            const payload = { user: { id: user1.id } };
            jwtToken.sign(payload, jwtSecret, { expiresIn: "5 days" }, (err, token) => {
                if (err) throw err;
                else
                    res.json(token);
            })
            // payload , jwtSecret , expiration , handler
            console.log(JSON.stringify(req.body));
            // return res.status(201).json({ result :"user Created Successfully"});
        }
        catch (err) {
            return res.status(400).json({ msg: err });
        }
    });
router.get("", (req, res) => {
    res.status(200).json({ msg: "Message from user" });
});

// Route : /users/:id
module.exports = router;