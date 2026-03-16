import exp from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {UserModel} from "../models/User.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

export const authRouter = exp.Router();

authRouter.post("/register", async (req, res) => {
    try {
        // Extract registration fields from the request body.
        const { name, email, password } = req.body;
        // Validate that all required fields are provided before saving.
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        // Prevent duplicate accounts by checking for an existing email.
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Securely hash the password before persistence.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user record.
        const user = new UserModel({
            name,
            email,
            password: hashedPassword
        });
        
        await user.save();

        // Return a success response for completed registration.
        res.status(201).json({ message: "User registered successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error during registration" });
    }
});

// Authenticate a user and return a signed access token.
authRouter.post("/login", async (req, res) => {
    try {
        // Extract login credentials from the request body.
        const { email, password } = req.body;
        // Validate that both email and password are provided.
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }
        // Validate that the account exists for the provided email.
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
 
        // Verify the submitted password against the stored hash.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Issue a JWT for authenticated access.
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Return the token and basic user profile data.
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error during login" });
    }
});

// Return the currently authenticated user's profile information.
authRouter.get("/me", authMiddleware, async (req, res) => {
  try {
        // Retrieve the authenticated user and exclude the password field.
    const user = await UserModel.findById(req.user.id).select("-password");

        // Send the user profile payload.
    res.json(user);
  } catch (error) {
        // Handle unexpected server-side failures.
    res.status(500).json({ error: error.message });
  }
});

