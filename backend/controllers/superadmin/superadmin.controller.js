import { validationResult } from "express-validator";
import { createSuperAdmin } from "../../services/superadmin/superadmin.service.js";
import superAdminModel from "../../models/superadmin.model.js";

// Controller: Register a new Super Admin
export const register = async (req, res) => {
  try {
    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return 400 if validation fails
      return res.status(400).json({ errors: errors.array() });
    }

    const { superAdminName, email, password } = req.body;

    // Check if super admin with the same email already exists
    const isAlreadyExist = await superAdminModel
      .findOne({ email })
      .select("+password"); // Include password field for internal operations if needed

    if (isAlreadyExist) {
      // Return 401 Unauthorized if super admin already exists
      return res.status(401).json({ message: "Super admin already exists." });
    }

    // Create new super admin using service layer
    const superAdmin = await createSuperAdmin({
      superAdminName,
      email,
      password,
    });

    // Generate JWT token for authentication
    const token = superAdmin.generateAuthToken();

    // Set cookie with JWT token (7 days expiry)
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true, // Cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === "production", // Send only over HTTPS in prod
      sameSite: "lax", // Helps prevent CSRF attacks
    });

    // Respond with token and super admin details
    return res.status(201).json({
      token: token,
      superAdmin: superAdmin,
      message: "Registration Done",
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error in registering Super Admin:", error);
    // Return generic internal server error
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
