const jwt = require("jsonwebtoken");
require ("dotenv").config();

async function createJWT(email, username) {
    const jwtToken = jwt.sign(
        { email: email, role: "user", username: username },
        process.env.SECRET_KEY,
    );
    console.log(jwtToken);
    return jwtToken;
}

module.exports = createJWT;