const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {validationResult} = require("express-validator")
const fs = require('fs');


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
    },
    include: {
      tags: true,
    },
})
return res.json(data)  
}

async function store(req, res) {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(422).json(validation.array());
  }

  // Estrai i dati dal corpo della richiesta
  const postToAdd = req.body;
  const published = postToAdd.published == "true";
  const tagsArray = JSON.parse(postToAdd.tags);

  // Estrai il file caricato tramite Multer
  const file = req.file;
  const imageFileName = file ? file.filename : null;
  console.log("Contenuto della richiesta:", req.body);

  // Crea il nuovo post con l'upload dell'immagine
  const newPost = await prisma.post.create({
  
    data: {
      title: postToAdd.title,
      content: postToAdd.content,
      published: published,
      image: imageFileName || null,
      tags: {
        connect: Array.isArray(tagsArray) ? tagsArray.map(tagId => ({ "id": tagId })) : [],
      },
    },
    include: {
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log(newPost);
  return res.json(newPost);
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
  
  console.log(postToUpdate.tags);
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: postToUpdate.title, 
        content: postToUpdate.content,
        image: postToUpdate.image,
        published: postToUpdate.published,
        tags: { 
          set: [],
          connect: postToUpdate.tags.map(tagId => ({ id: tagId })),
        },
      },
      include : { tags: true} 
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