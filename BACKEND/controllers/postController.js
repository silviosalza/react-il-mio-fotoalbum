const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {validationResult} = require("express-validator")


async function index(req,res){
const postToFind = req.body
console.log(postToFind);
//find many ritorna una promise, quindi faccio un await
const data = await prisma.post.findMany({
    where: {
        published: postToFind.published,
        title: {
            contains: postToFind.title
        },
        content:{
            contains:postToFind.content
        }
    },
    include:{
        tags: {
            select:{
                name: true
            }
        }
    }
})

return res.json(data)

}

async function show(req,res){
const id = parseInt(req.params.id)
const data = await prisma.post.findUnique({
    where: {
        id: id,
    }
})
return res.json(data)  
}

async function store(req,res){
const validation = validationResult(req)
if(!validation.isEmpty()){
    return res.status(422).json(validation.array())
}
const postToAdd = req.body
console.log(postToAdd);
const newPost = await prisma.post.create({
    data: {
        title: postToAdd.title,
        slug: postToAdd.slug,
        content: postToAdd.content,
        image: postToAdd.image,
        published: postToAdd.published,
        tags: {
            connect : postToAdd.tags.map(tagId =>({
                "id": tagId
            }))
        },
    },
    //specifico quali relazioni includere nella risposta
    include : {
        tags: {
            select:{
                name: true
            }
        }
        
    }
})
return res.json(newPost)  
}


async function update(req,res){
    const id = parseInt(req.params.id);
    const postToUpdate = req.body;

    const data = await prisma.post.findUnique({
        where: {
            id: id,
        }
    })
    if(!data){
        throw new Error ('Not Found')
    }
    const postUpdated = await prisma.post.update({
       data: postToUpdate,
       where: {
        id: id
       }
    })
   return res.json(postUpdated) 
}



async function destroy(req,res){
    const id = parseInt(req.params.id);
await prisma.post.delete({
    where: {
        id: id,
    }
})
    return res.json({message: "Post obliterato"})
}








module.exports = {
    index,
    show,
    store,
    update,
    destroy,
}