const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Popolo il database con dati specifici e immagini dalla cartella uploads
    const postsData = [
      {
        title: 'Titolo 1',
        content: 'Contenuto del post 1',
        published: true,
        image: 'image-1702810325957.jpg', 
        tagIds: [1, 2],
      },
      {
        title: 'Titolo 2',
        content: 'Contenuto del post 2',
        published: true,
        image: 'image-1702810579326.jpg', 
        tagIds: [2, 3], 
      },
      {
        title: 'Titolo 3',
        content: 'Contenuto del post 3',
        published: true,
        image: 'image-1702810602680.jpg', 
        tagIds: [2], 
      },
      {
        title: 'Titolo 4',
        content: 'Contenuto del post 4',
        published: true,
        image: 'image-1702810827409.jpg', 
        tagIds: [1], 
      },
      {
        title: 'Titolo 5',
        content: 'Contenuto del post 5',
        published: true,
        image: 'image-1702827832792.jpg', 
        tagIds: [5], 
      },
      {
        title: 'Titolo 6',
        content: 'Contenuto del post 6',
        published: true,
        image: 'image-1702827711541.jpg', 
        tagIds: [3], 
      },
      {
        title: 'Titolo 7',
        content: 'Contenuto del post 7',
        published: true,
        image: 'image-1702827633009.jpg', 
        tagIds: [1], 
      },
      {
        title: 'Titolo 8',
        content: 'Contenuto del post 8',
        published: true,
        image: 'image-1702827737099.jpg', 
        tagIds: [2, 3], 
      },
      {
        title: 'Titolo 9',
        content: 'Contenuto del post 9',
        published: true,
        image: 'image-1702827605584.jpg', 
        tagIds: [3], 
      },
      {
        title: 'Titolo 10',
        content: 'Contenuto del post 10',
        published: true,
        image: 'image-1702811055989.jpg', 
        tagIds: [1], 
      },
      {
        title: 'Titolo 11',
        content: 'Contenuto del post 11',
        published: true,
        image: 'image-1702811025736.jpg', 
        tagIds: [5], 
      },
      {
        title: 'Titolo 12',
        content: 'Contenuto del post 12',
        published: true,
        image: 'image-1702827753232.jpg', 
        tagIds: [1], 
      },
      {
        title: 'Titolo 13',
        content: 'Contenuto del post 13',
        published: true,
        image: 'image-1702827659835.jpg', 
        tagIds: [4], 
      },
      
    ];

    for (const postData of postsData) {
      const imageFilePath = path.join(__dirname, '..', '..', 'uploads', postData.image);
      console.log('Percorso immagine:', imageFilePath);

      const post = await prisma.post.create({
        data: {
          title: postData.title,
          content: postData.content,
          published: postData.published,
          image: postData.image, 
          tags: {
            connect: postData.tagIds.map(tagId => ({ id: tagId })),
          },
        },
      });

      console.log('Post creato:', post);
    }

    console.log('Seeding completato!');
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


seedDatabase();