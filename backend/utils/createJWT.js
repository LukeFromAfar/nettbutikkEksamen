const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createJWT(email, role, username) {
    const jwtToken = jwt.sign(
        { email, role, username },
        process.env.SECRET_KEY
    );
    console.log(jwtToken);
    return jwtToken;
}

module.exports = createJWT;