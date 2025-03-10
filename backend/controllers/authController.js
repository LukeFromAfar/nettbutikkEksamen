const User = require('../models/UserSchema'); // Assuming you have a User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createJWT = require('../utils/createJWT');
const createCookie = require('../utils/createCookie');

const saltRounds = parseInt(process.env.SALT_ROUNDS);

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