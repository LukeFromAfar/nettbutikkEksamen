const User = require('../models/UserSchema'); // Assuming you have a User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(req.body);

            const user = await User.findOne({ email: email });
            const role = "user";

            console.log(user);
            let hashedPassword = user.password;
            const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
            console.log(isPasswordCorrect);

            if (isPasswordCorrect) {
                const jwtToken = await createJWT(email, role);
                createCookie(res, jwtToken);

                res.status(202).send({ msg: "User found", user: user });
            } else {
                res.status(404).send({ msg: "User not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Error logging in" });
        }
    },

    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).send({ msg: 'User already exists' });
            }

            user = new User({ email, password });
            user.password = await bcrypt.hash(password, saltRounds);
            await user.save();

            const jwtToken = await createJWT(email, "user");
            createCookie(res, jwtToken);

            res.status(201).send({ msg: 'User registered', user: user });
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Error registering user" });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('password');
            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Error fetching user" });
        }
    }
};

module.exports = authController;