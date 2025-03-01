import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Token not provided, please try again" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {

            return res.status(403).json({ success: false, message: "Token is not valid, please try again" });
        }
        next();

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });

    }
};

export default adminAuth;