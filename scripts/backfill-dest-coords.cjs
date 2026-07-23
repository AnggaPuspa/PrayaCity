require("dotenv").config();
const { PrismaClient } = require("../src/generated/prisma");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

/**
 * Approximate public map points for known Central Lombok destinations.
 * Matched by current DB slug (admin-created slugs differ from seed ids).
 */
const COORDS_BY_SLUG = {
  "kuta-mandalika-beach": { latitude: -8.8956, longitude: 116.2804 },
  "bukit-merese": { latitude: -8.9125, longitude: 116.3208 },
  "bukit-lancing": { latitude: -8.7198, longitude: 116.2685 },
  "pantai-tanjung-aan": { latitude: -8.9078, longitude: 116.3215 },
  "pantai-gerupuk": { latitude: -8.9165, longitude: 116.3352 },
  "desa-sade": { latitude: -8.8458, longitude: 116.2921 },
  // Approximate for Benang Kelambu waterfall area (Central Lombok)
  "air-terjun-benang-kelambu": { latitude: -8.5345, longitude: 116.3268 },
  selongbelanak: { latitude: -8.8612, longitude: 116.1485 },
  sukarara: { latitude: -8.7125, longitude: 116.2788 },
};

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const all = await prisma.destination.findMany({
    select: { id: true, slug: true, latitude: true, longitude: true, titleEn: true },
  });

  let updated = 0;
  for (const dest of all) {
    const coords = COORDS_BY_SLUG[dest.slug];
    if (!coords) {
      console.log(`SKIP (no mapping): ${dest.slug}`);
      continue;
    }
    if (dest.latitude != null && dest.longitude != null) {
      console.log(`OK already has coords: ${dest.slug}`);
      continue;
    }

    await prisma.destination.update({
      where: { id: dest.id },
      data: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    });
    updated += 1;
    console.log(
      `UPDATED ${dest.slug} -> ${coords.latitude}, ${coords.longitude}`,
    );
  }

  const after = await prisma.destination.findMany({
    where: {
      status: "PUBLISHED",
      latitude: { not: null },
      longitude: { not: null },
    },
    select: { slug: true, latitude: true, longitude: true },
  });

  console.log(`\nUpdated: ${updated}`);
  console.log(`Published with coords now: ${after.length}`);
  console.log(after.map((d) => d.slug));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
