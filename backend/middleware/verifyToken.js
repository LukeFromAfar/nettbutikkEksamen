const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/UserSchema');

async function verifyJwt ( req, res, next ) {
    const jsonwebtoken = req.cookies.jwt;

    if (jsonwebtoken) {

        await jwt.verify(jsonwebtoken, process.env.SECRET_KEY, (async (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).send({ msg: "Invalid token" });
                return;
            }
            console.log(decoded);
            let email = decoded.email;
            req.user = decoded;
            

            try {
            const user = await User.findOne({ email });
            console.log(user, ("USER"))
            req.user.id = user._id;

            } catch (error) {
                console.log(error);
                res.status(500).send({ msg: "Error getting user" });
                return;
            }
            console.log(req.user);
            

        })).then(() => {
            console.log(req.user);
            next();
        });
    }
};

module.exports = verifyJwt;