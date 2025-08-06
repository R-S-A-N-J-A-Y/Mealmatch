const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../../models/UserModel');
const route = express.Router();

route.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

      
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ uid : user._id,message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = route;
