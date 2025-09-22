import { validationResult } from "express-validator";
import { createSuperAdmin } from "../../services/superadmin/superadmin.service.js";

export const register = async (req, res) => {
    try{

    }catch(error){
        console.error('Error in registering Super Admin:' , error);
        return res.status(500).json({ message : 'Internal Server Error.'});
    }
};