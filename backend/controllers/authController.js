const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const createJWT = require('../utils/createJWT');
const createCookie = require('../utils/createCookie');

const saltRounds = parseInt(process.env.SALT_ROUNDS);

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(req.body);
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send({ msg: "User not found" });
            }
    
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            console.log(isPasswordCorrect);
    
            if (isPasswordCorrect) {
                // Pass username as third parameter
                const jwtToken = await createJWT(email, user.role, user.username);
                createCookie(res, jwtToken);
    
                res.status(202).send({ msg: "User found", user: user });
            } else {
                res.status(400).send({ msg: "Invalid credentials" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Error logging in" });
        }
    },
    
    register: async (req, res) => {
        try {
            const { email, password, repeatPassword, username } = req.body;
    
            if (password !== repeatPassword) {
                return res.status(400).send({ msg: 'Passwords do not match' });
            }
    
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).send({ msg: 'User with this email already exists' });
            }
    
            user = await User.findOne({ username });
            if (user) {
                return res.status(400).send({ msg: 'Username already exists' });
            }
    
            user = new User({ email, password, username });
            const salt = await bcrypt.genSalt(saltRounds);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
    
            // Pass username as third parameter
            const jwtToken = await createJWT(email, user.role, username);
            createCookie(res, jwtToken);
    
            res.status(201).send({ msg: 'User registered', user: user });
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Error registering user" });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('jwt', {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'strict'
            });
            res.status(200).send({ msg: "Logged out successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Error logging out" });
        }
    },

    // Add or update the forgotPassword function in authController.js
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            
            if (!user) {
                return res.status(404).send({ msg: 'No account with that email address exists.' });
            }
    
            // Generate a reset token
            const resetToken = crypto.randomBytes(20).toString('hex');
            
            // Set token and expiration on user account
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            await user.save();
    
            // Create reset URL
            const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
            
            // Create reusable transporter with Ethereal credentials
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'jeff.konopelski49@ethereal.email',
                    pass: '2KxgqpmfrGvEb8P36N'
                }
            });
    
            // Send email
            const info = await transporter.sendMail({
                from: '"Nettbutikk" <noreply@nettbutikk.com>',
                to: user.email,
                subject: 'Password Reset',
                html: `
                    <p>You requested a password reset</p>
                    <p>Click <a href="${resetUrl}">here</a> to reset your password</p>
                    <p>This link is valid for 1 hour.</p>
                `
            });
    
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            
            res.status(200).send({ 
                msg: 'Password reset email sent. Check the email or server console for instructions.',
                // You can remove this in production, but it's helpful for testing
                previewUrl: nodemailer.getTestMessageUrl(info) 
            });
        } catch (error) {
            console.error('Forgot password error:', error);
            res.status(500).send({ msg: 'Server error.' });
        }
    },

    // Add or update the resetPassword function in authController.js
    resetPassword: async (req, res) => {
        try {
            const { token } = req.params;
            const { password } = req.body;
            
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });
            
            if (!user) {
                return res.status(400).send({ msg: 'Password reset token is invalid or has expired.' });
            }
            
            // Set new password
            const salt = await bcrypt.genSalt(saltRounds);
            user.password = await bcrypt.hash(password, salt);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            
            res.status(200).send({ msg: 'Password has been reset successfully' });
        } catch (error) {
            console.error('Reset password error:', error);
            res.status(500).send({ msg: 'Server error.' });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Error fetching user" });
        }
    }
};

module.exports = authController;