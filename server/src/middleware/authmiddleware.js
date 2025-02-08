import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
<<<<<<< HEAD
        res.status(401).json({ message: 'Token is not valid' });
=======
        res.status(401).json({ message: 'Token is not valid:'+err });
>>>>>>> 489a09c (initial commit)
    }
};

export default authMiddleware;
