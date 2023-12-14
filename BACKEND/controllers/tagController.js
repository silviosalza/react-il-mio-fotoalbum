const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function index(req,res){
    
    //find many ritorna una promise, quindi faccio un await
    const data = await prisma.tag.findMany({  
    })
    
    return res.json(data)
    }
async function store(req,res){
    const tagData = req.body
    const newTag = await prisma.tag.create({
        data:{
            name: tagData.name
        }
    })
    return res.json(newTag)
}

module.exports = {
    
        store,
        index
       
}