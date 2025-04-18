const jwt = require('jsonwebtoken');

const authMiddleWare =async (req, res, next) => {
    const {token} = req.headers;
    if(!token)
        return res.status(401).json({message: 'No token provided'});
    try {
        const token_decode = jwt.verify(
            token,
            process.env.TOKEN_SECRET
        )
        req.userId = token_decode.id
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({message: 'Invalid token'});
    }
}

module.exports = authMiddleWare;