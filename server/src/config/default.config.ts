import shortid from "shortid"
import adminUsersModel from "../models/admin-users.model"
import { AdminBody } from "../types/auth"
import bcrypt from "bcrypt"

export const createDefaultAdmin = async () => {
    const admin: AdminBody = {
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS,
        name: process.env.ADMIN_NAME,
        family: process.env.ADMIN_FAMILY,
        role: process.env.ADMIN_ROLE,
        accessLevel: 'general',
    }
    
    const superAdmin = await adminUsersModel.findOne({ username: admin.username })
    if (!superAdmin) {
        await adminUsersModel.create({
            user_id: shortid.generate(),
            ...admin,
            password: bcrypt.hashSync(String(admin.password) , 10),
            access_level: admin.accessLevel
        })
        console.log("D:✅")
    }
}