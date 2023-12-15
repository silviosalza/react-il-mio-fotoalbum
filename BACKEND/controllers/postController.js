const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {validationResult} = require("express-validator")


async function index(req,res){
const postToFind = req.query
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
            connect: Array.isArray(postToAdd.tags) ? postToAdd.tags.map(tagId => ({ "id": tagId })) : [],
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


async function update(req, res) {
    const id = parseInt(req.params.id);
    const postToUpdate = req.body;
  
    const existingPost = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        tags: {
          select: {
            id: true,
          },
        },
      },
    });
  
    if (!existingPost) {
      throw new Error('Post non trovato');
    }
  
    // Estrai gli ID delle categorie correlate
    const tagIds = existingPost.tags.map((tag) => ({ id: tag.id }));
  
    // Assicurati che postToUpdate.tags sia definito e sia un array
    const newTagIds = Array.isArray(postToUpdate.tags)
      ? postToUpdate.tags.map((tagId) => ({ id: tagId }))
      : [];
  
    // Aggiorna il post e le categorie correlate
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: postToUpdate.title,
        content: postToUpdate.content,
        image: postToUpdate.image,
        published: postToUpdate.published,
        // Altri campi...
  
        // Aggiorna le categorie correlate
        tags: {
          disconnect: tagIds,
          connect: newTagIds,
        },
      },
    });
  
    return res.json(updatedPost);
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