const {validationResult} = require("express-validator")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {matchedData} = require("express-validator")
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken")

async function register(req,res){

const validation = validationResult(req)
if(!validation.isEmpty()){
    return res.status(422).json(validation.array())
}
//sanifico i dati dai dati non necessari, presenti nel validatore
const sanitizedData = matchedData(req);

//crypto la password con bcrypt library
sanitizedData.password = await bcrypt.hash(sanitizedData.password , 10)

//passo solo i dati che sono nel validatore
 const user = await prisma.user.create({
    data:{
        ...sanitizedData,
    },
    select:{
        id: true,
        name: true,
        email: true,
        role: true,

    }
 })
 const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {expiresIn: "1h"})



res.json({user, token})
}


async function login(req,res){

const validation = validationResult(req)
if(!validation.isEmpty()){
    return res.status(422).json(validation.array())
}
//recuper i dat inseriti dall'utente
const {email,password} = req.body

//controllo che si sia un utente con quell email
const user = await prisma.user.findUnique({
    where:{
        email: email,
    },
});
if(!user){
    throw new Error("Utente non trovato")
}
//controllare che la pass sia corretta
const passMatch = await bcrypt.compare(password, user.password);
//mi ritorna un booleano
if(!passMatch){
    throw new Error("Password errata")
}
//generare il token JWT
const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {expiresIn: "1h"})
delete user.password

res.json({user, token})

}




module.exports = {
    register,
    login
}