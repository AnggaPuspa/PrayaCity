import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { EVENTS, CATEGORIES } from "./data/article/events.data";
import { DESTINATIONS_DATA } from "./data/destinations/destinations";
import en from "../messages/en.json";
import id from "../messages/id.json";

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("password123", 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@prayacity.id" },
    update: {
      password: hashedPassword,
    },
    create: {
      email: "admin@prayacity.id",
      password: hashedPassword,
      fullName: "Super Admin",
      role: "SUPER_ADMIN",
    },
  });
  console.log(`Upserted admin: ${admin.email}`);

  // 2. Seed Categories
  for (const catName of CATEGORIES) {
    await prisma.category.upsert({
      where: { name: catName },
      update: {},
      create: { name: catName },
    });
  }
  console.log(`Seeded ${CATEGORIES.length} categories.`);

  // 3. Seed Events
  for (const ev of EVENTS) {
    const createdEvent = await prisma.event.upsert({
      where: { slug: ev.slug },
      update: {
        titleEn: ev.title.en,
        titleId: ev.title.id,
        excerptEn: ev.excerpt.en,
        excerptId: ev.excerpt.id,
        bodyEn: ev.body.en,
        bodyId: ev.body.id,
        dateEn: ev.date.en,
        dateId: ev.date.id,
        image: ev.image,
        isFeatured: ev.categories.includes("Events") ? true : false,
        status: "PUBLISHED",
      },
      create: {
        slug: ev.slug,
        titleEn: ev.title.en,
        titleId: ev.title.id,
        excerptEn: ev.excerpt.en,
        excerptId: ev.excerpt.id,
        bodyEn: ev.body.en,
        bodyId: ev.body.id,
        dateEn: ev.date.en,
        dateId: ev.date.id,
        image: ev.image,
        isFeatured: ev.categories.includes("Events") ? true : false,
        status: "PUBLISHED",
      },
    });

    // Link event to categories
    for (const catName of ev.categories) {
      const dbCat = await prisma.category.findUnique({ where: { name: catName } });
      if (dbCat) {
        await prisma.eventCategory.upsert({
          where: {
            eventId_categoryId: {
              eventId: createdEvent.id,
              categoryId: dbCat.id,
            },
          },
          update: {},
          create: {
            eventId: createdEvent.id,
            categoryId: dbCat.id,
          },
        });
      }
    }
    console.log(`Upserted event: ${ev.slug}`);
  }

  // 4. Seed Destinations
  const destEn = (en as any).DestinationsPage.items;
  const destId = (id as any).DestinationsPage.items;

  for (const dest of DESTINATIONS_DATA) {
    const enData = destEn[dest.id];
    const idData = destId[dest.id];
    
    if (!enData || !idData) {
      console.warn(`Translation missing for destination ${dest.id}`);
      continue;
    }

    await prisma.destination.upsert({
      where: { slug: dest.id }, // Using id as slug
      update: {
        titleEn: enData.title,
        titleId: idData.title,
        descriptionEn: enData.description,
        descriptionId: idData.description,
        longDescriptionEn: enData.longDescription,
        longDescriptionId: idData.longDescription,
        locationEn: enData.location,
        locationId: idData.location,
        statusLabelEn: enData.status,
        statusLabelId: idData.status,
        entranceFeeEn: enData.entranceFee,
        entranceFeeId: idData.entranceFee,
        latitude: dest.latitude,
        longitude: dest.longitude,
        imageSrc: dest.imageSrc,
        detailImageSrc: dest.detailImageSrc ?? null,
        tags: dest.tags,
        isFeatured: true,
        status: "PUBLISHED",
      },
      create: {
        slug: dest.id,
        titleEn: enData.title,
        titleId: idData.title,
        descriptionEn: enData.description,
        descriptionId: idData.description,
        longDescriptionEn: enData.longDescription,
        longDescriptionId: idData.longDescription,
        locationEn: enData.location,
        locationId: idData.location,
        statusLabelEn: enData.status,
        statusLabelId: idData.status,
        entranceFeeEn: enData.entranceFee,
        entranceFeeId: idData.entranceFee,
        latitude: dest.latitude,
        longitude: dest.longitude,
        imageSrc: dest.imageSrc,
        detailImageSrc: dest.detailImageSrc ?? null,
        tags: dest.tags,
        isFeatured: true,
        status: "PUBLISHED",
      },
    });
    console.log(`Upserted destination: ${dest.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
