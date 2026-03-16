import jwt from "jsonwebtoken";

// Validate the bearer token and attach the authenticated user payload.
export const authMiddleware = (req, res, next) => {
    // Read the authorization header from the incoming request.
    const authHeader = req.header("Authorization");

    // Reject requests that do not provide an authorization header.
    if (!authHeader) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        // Extract the bearer token from the authorization header.
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Verify the token and decode the embedded user payload.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the authenticated user data to the request object.
        req.user = decoded;

        // Continue processing the protected route.
        next();

    } catch (error) {
        // Reject invalid, expired, or tampered tokens.
        res.status(401).json({ message: "Token is not valid", error: error.message });
    }
};

