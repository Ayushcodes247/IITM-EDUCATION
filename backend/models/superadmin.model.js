import mongoose, { Schema } from "mongoose";
import { sign } from "jsonwebtoken";
import { hash, verify } from "argon2";

const superAdminSchema = new Schema({
  superAdminName: {
    type: String,
    required: true,
    minLength: [3, "super admin name should be atleast 3 Charater"],
    maxLength: [50, "super admin name should be atmost 50 Charater"],
    index: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
    index: true,
  },

  password: {
    type: String,
    select: false,
    minlength: [8, "Password should have at least 8 characters"],
  },

  adminList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  ],

  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
  ],

  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "requests",
    },
  ],
});
