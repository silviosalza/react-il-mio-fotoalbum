const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Popola il database con dati specifici e immagini dalla cartella uploads
    const postsData = [
      {
        title: 'Titolo 1',
        content: 'Contenuto del post 1',
        published: true,
        image: 'image-1702810325957.jpg', // Assicurati che l'immagine esista nella cartella uploads
        tagIds: [1, 2], // Array di ID delle tags da associare
      },
      {
        title: 'Titolo 2',
        content: 'Contenuto del post 2',
        published: true,
        image: 'image-1702810325957.jpg', // Assicurati che l'immagine esista nella cartella uploads
        tagIds: [2, 3], // Array di ID delle tags da associare
      },
      // Aggiungi altri dati secondo necessità
    ];

    for (const postData of postsData) {
      const imageFilePath = path.join(__dirname, '..', '..', 'uploads', postData.image);
      console.log('Percorso immagine:', imageFilePath);

      const post = await prisma.post.create({
        data: {
          title: postData.title,
          content: postData.content,
          published: postData.published,
          image: postData.image, // Passa direttamente il nome del file
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

// Esegui lo script di seeding
seedDatabase();