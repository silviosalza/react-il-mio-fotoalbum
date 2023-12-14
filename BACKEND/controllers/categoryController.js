const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function index(req,res){
    
//find many ritorna una promise, quindi faccio un await
const data = await prisma.category.findMany({  
})

return res.json(data)
}

async function store(req,res){
    const catData = req.body
    const newCat = await prisma.category.create({
        data:{
            name: catData.name
        }
    })
    return res.json(newCat)
}

module.exports = {
    
        store,
        index
       
}