const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user; // Attach the user object to the request
        req.userId = user._id; // Attach the userId for easier access
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authentication error:', error); // Log the error for debugging
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
