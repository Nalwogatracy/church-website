import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const storePath = path.join(process.cwd(), 'church-data-store.json');
  if (!fs.existsSync(storePath)) {
    console.log('No church-data-store.json found to seed.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(storePath, 'utf-8'));

  // Seed Admin Users
  if (data.users && data.users.length > 0) {
    for (const u of data.users) {
      await prisma.adminUser.upsert({
        where: { email: u.email },
        update: { name: u.name, passwordHash: u.passwordHash, role: u.role },
        create: {
          id: u.id,
          name: u.name,
          email: u.email,
          passwordHash: u.passwordHash,
          role: u.role,
        },
      });
    }
  }

  // Seed Pastors
  if (data.pastors && data.pastors.length > 0) {
    for (const p of data.pastors) {
      await prisma.pastor.upsert({
        where: { id: p.id },
        update: { name: p.name, title: p.title, bio: p.bio, imageUrl: p.imageUrl, email: p.email, order: p.order },
        create: {
          id: p.id,
          name: p.name,
          title: p.title,
          bio: p.bio,
          imageUrl: p.imageUrl,
          email: p.email,
          order: p.order,
        },
      });
    }
  }

  // Seed Events
  if (data.events && data.events.length > 0) {
    for (const e of data.events) {
      await prisma.event.upsert({
        where: { id: e.id },
        update: {
          title: e.title,
          description: e.description,
          eventDate: new Date(e.eventDate),
          startTime: e.startTime,
          endTime: e.endTime,
          location: e.location,
          category: e.category,
          imageUrl: e.imageUrl,
          featured: e.featured || false,
        },
        create: {
          id: e.id,
          title: e.title,
          description: e.description,
          eventDate: new Date(e.eventDate),
          startTime: e.startTime,
          endTime: e.endTime,
          location: e.location,
          category: e.category,
          imageUrl: e.imageUrl,
          featured: e.featured || false,
        },
      });
    }
  }

  // Seed Sermons
  if (data.sermons && data.sermons.length > 0) {
    for (const s of data.sermons) {
      await prisma.sermon.upsert({
        where: { id: s.id },
        update: {
          title: s.title,
          speaker: s.speaker,
          series: s.series,
          scripture: s.scripture,
          sermonDate: new Date(s.sermonDate),
          videoUrl: s.videoUrl,
          description: s.description,
          imageUrl: s.imageUrl,
        },
        create: {
          id: s.id,
          title: s.title,
          speaker: s.speaker,
          series: s.series,
          scripture: s.scripture,
          sermonDate: new Date(s.sermonDate),
          videoUrl: s.videoUrl,
          description: s.description,
          imageUrl: s.imageUrl,
        },
      });
    }
  }

  // Seed Gallery
  if (data.gallery && data.gallery.length > 0) {
    for (const g of data.gallery) {
      await prisma.galleryItem.upsert({
        where: { id: g.id },
        update: { title: g.title, category: g.category, imageUrl: g.imageUrl },
        create: { id: g.id, title: g.title, category: g.category, imageUrl: g.imageUrl },
      });
    }
  }

  console.log('Database seeding complete for Supabase!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
