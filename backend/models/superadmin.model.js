import mongoose, { model, Schema } from "mongoose";
import pkg from "jsonwebtoken";
import { hash, verify } from "argon2";

const { sign } = pkg;

// Schema for Super Admin
const superAdminSchema = new Schema(
  {
    superAdminName: {
      type: String,
      required: true,
      minLength: [3, "Super admin name should be at least 3 characters"],
      maxLength: [50, "Super admin name should be at most 50 characters"],
      index: true, // Indexed for faster searches
      trim: true, // Remove leading/trailing spaces
    },

    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      lowercase: true, // Always store in lowercase
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
      index: true, // Indexed for quick lookups
    },

    password: {
      type: String,
      select: false, // Do not return password by default in queries
      minlength: [8, "Password should have at least 8 characters"],
      required: true,
    },

    // List of associated admins
    adminList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
      },
    ],

    // List of courses managed by this super admin
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
      },
    ],

    // Requests made by admins to super admin
    requestsAdmin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "requestsAdmin",
      },
    ],

    // Requests made by students to super admin
    requeststudent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "requestStudent",
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Instance method: generate JWT token for super admin
superAdminSchema.methods.generateAuthToken = function () {
  return sign({ _id: this._id }, process.env.SECRET, { expiresIn: "7d" });
};

// Static method: hash password before saving
superAdminSchema.statics.hashPassword = async function (password) {
  return await hash(password);
};

// Instance method: compare entered password with hashed password
superAdminSchema.methods.comparePassword = async function (password) {
  return await verify(this.password, password);
};

// Create and export model
const superAdminModel = model("superAdmin", superAdminSchema);

export default superAdminModel;
