function verifyAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send({ msg: 'Access denied. Admin role required.' });
    }
}

module.exports = verifyAdmin;