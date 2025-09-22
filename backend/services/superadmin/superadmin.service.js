import superAdminModel from "../../models/superadmin.model.js";

/**
 * Service: Create a new Super Admin
 * @param {Object} param0 - superAdminName, email, password
 * @returns {Object} superAdmin document
 */
export const createSuperAdmin = async ({ superAdminName, email, password }) => {
  try {
    // Basic validation: ensure all required fields are provided
    if (!superAdminName || !email || !password) {
      throw new Error("All fields are required.");
    }

    // Hash the password using the model's static hashPassword method
    const hashedPassword = await superAdminModel.hashPassword(password);

    // Create and save the Super Admin document in the database
    const superAdmin = await superAdminModel.create({
      superAdminName: superAdminName.trim(), // Trim whitespace
      email: email.toLowerCase().trim(), // Normalize email
      password: hashedPassword,
    });

    // Return the created superAdmin document
    return superAdmin;
  } catch (error) {
    // Log the error for debugging
    console.error("Error in creating Super Admin (service layer):", error);
    // Re-throw the error so the controller can handle it properly
    throw error;
  }
};
