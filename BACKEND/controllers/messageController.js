const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function index(req,res){
    
    //find many ritorna una promise, quindi faccio un await
    const data = await prisma.message.findMany({  
    })
    
    return res.json(data)
    }


async function store(req,res){
    const messageData = req.body
    const newMessage = await prisma.message.create({
        data:{
            email: messageData.email,
            content: messageData.content
        }
    })
    return res.json(newMessage)
}

module.exports = {
    
        store,
        index
       
}