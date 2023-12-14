const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    name: {
        in: ["body"],
        notEmpty: {
          options: {
            ignore_whitespace: true
          }  
        },
        isLength: {
            options:{
                min: 2
            }
        },
        errorMessage: "Il nome non è valido"
    },
    email: {
        in: ["body"],
        notEmpty: {
          options: {
            ignore_whitespace: true
          }  
        },
        isLength: {
            options:{
                min: 5
            }
        },
         custom:{
             options: async (value) =>{
                 const emailAlreadyUsed = await prisma.user.findUnique({
                     where:{
                         email:value
                     }
                 })

                 if(emailAlreadyUsed){
                     return Promise.reject("Email già in uso")
                 }
                 return true
             }
         },
    },
    password: {
        in: ["body"],
        isStrongPassword: {
            options:{
                minLength: 8,
                minLowerCase:1,
                minUpperCase:1,
                minNumbers:1,
                minSymbols:1,
            }
        },
        errorMessage: "Password non valida"
    }
}