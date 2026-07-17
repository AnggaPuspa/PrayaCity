import { prisma } from "../src/lib/prisma";
import { DESTINATIONS_DATA } from "../prisma/data/destinations/destinations";

async function main() {
  for (const dest of DESTINATIONS_DATA) {
    const updated = await prisma.destination.updateMany({
      where: { slug: dest.id },
      data: {
        latitude: dest.latitude,
        longitude: dest.longitude,
      },
    });
    console.log(dest.id, updated.count, dest.latitude, dest.longitude);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
