import superAdminModel from "../../models/superadmin.model.js";

export const createSuperAdmin = async ({ superAdminName, email, password }) => {
  try {
    if (!superAdminModel || !email || !password) {
      throw new Error("All fields are required.");
    }

    const hashedPassword = superAdminModel.hashPassword(password);

    const superAdmin = await superAdminModel.create({
      superAdminName: superAdminName,
      email: email,
      password: hashedPassword,
    });

    return superAdmin;
  } catch (error) {
    console.error("Error in creating superadmin (services):", error);
  }
};
