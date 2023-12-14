const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    
    email: {
        in: ["body"],
        notEmpty:{
            options:{
                ignore_whitespace:true,
            }
        },
       
        errorMessage: "Email non valida"
    },
    password: {
        in: ["body"],
        notEmpty:{
            options:{
                ignore_whitespace:true,
            }
        },
       
        errorMessage: "Password non valida"
    }
}