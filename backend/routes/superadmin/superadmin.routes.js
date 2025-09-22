import { Router } from "express";
import { body } from "express-validator";
import { register } from "../../controllers/superadmin/superadmin.controller.js";

const router = Router();

// Route: POST /register
// Description: Registers a new Super Admin
router.post(
  "/register",
  [
    // Validate superAdminName: string, 3-50 characters
    body("superAdminName")
      .isString()
      .isLength({ min: 3, max: 50 })
      .withMessage(
        "Super admin name should be at least 3 to 50 characters long"
      ),

    // Validate email: must be a valid email format
    body("email").isEmail().withMessage("Valid email is required"),

    // Validate password: string, minimum 8 characters
    body("password")
      .isString()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  register
);

export default router;
