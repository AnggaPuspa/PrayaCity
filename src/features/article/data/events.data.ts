import type { LocalizedEvent } from "../types";

/**
 * Single bilingual source of truth for Central Lombok events/articles.
 * Featured, list, detail, and related all derive from this (via the services).
 * Content lives here — never in i18n messages — to keep message files lean.
 */
export const EVENTS: LocalizedEvent[] = [
  {
    slug: "bau-nyale-festival-2025",
    image: "/landingpageasset/festivalpesonabau.webp",
    categories: ["Culture", "Events"],
    date: { en: "February 2025", id: "Februari 2025" },
    title: {
      en: "Festival Pesona Bau Nyale 2025",
      id: "Festival Pesona Bau Nyale 2025",
    },
    excerpt: {
      en: "Thousands gather at Seger Beach, Kuta Mandalika for the legendary sea-worm catching ritual — a celebration of Sasak folklore, music, and tradition.",
      id: "Ribuan orang berkumpul di Pantai Seger, Kuta Mandalika untuk ritual menangkap cacing laut legendaris — perayaan cerita rakyat, musik, dan tradisi Sasak.",
    },
    body: {
      en: [
        "The highly anticipated Festival Pesona Bau Nyale 2025 runs from 14 February to 18 February 2025, presenting a series of cultural exhibitions, traditional performances, and the legendary sea worm catching ritual.",
        "Festival Pesona Bau Nyale 2025 opens at Kuta Mandalika Beach, marking the beginning of its grandest edition yet and further establishing Central Lombok as an emerging platform for immersive cultural tourism in Southeast Asia.",
        "Running under the theme 'Spirit of Mandalika', the multi-day festival brings together artists, cultural practitioners, local communities, and international visitors. It expands beyond the traditional ritual into a wider field of learning, research, public dialogue, and professional exchange.",
        "Following an international campaign that received immense global attention, the festival presents dozens of local crafts, culinary highlights, and the famous Presean martial arts championship, redefining the way tourists experience the true soul of Lombok.",
      ],
      id: [
        "Festival Pesona Bau Nyale 2025 yang dinanti-nantikan berlangsung dari 14 hingga 18 Februari 2025, menghadirkan rangkaian pameran budaya, pertunjukan tradisional, dan ritual menangkap cacing laut yang legendaris.",
        "Festival Pesona Bau Nyale 2025 dibuka di Pantai Kuta Mandalika, menandai dimulainya edisi termegahnya sejauh ini dan semakin mengukuhkan Lombok Tengah sebagai platform pariwisata budaya yang imersif di Asia Tenggara.",
        "Mengusung tema 'Spirit of Mandalika', festival multihari ini mempertemukan seniman, pegiat budaya, komunitas lokal, dan pengunjung mancanegara. Acara ini berkembang melampaui ritual tradisional menjadi ruang pembelajaran, riset, dialog publik, dan pertukaran profesional yang lebih luas.",
        "Setelah kampanye internasional yang menuai perhatian global luar biasa, festival ini menampilkan puluhan kerajinan lokal, sajian kuliner unggulan, dan kejuaraan bela diri Presean yang terkenal, mendefinisikan ulang cara wisatawan merasakan jiwa Lombok yang sesungguhnya.",
      ],
    },
  },
  {
    slug: "motogp-mandalika-2025",
    image: "/landingpageasset/motogp.webp",
    categories: ["Sports", "Events"],
    date: { en: "October 2025", id: "Oktober 2025" },
    title: {
      en: "MotoGP Pertamina Grand Prix of Indonesia",
      id: "MotoGP Pertamina Grand Prix of Indonesia",
    },
    excerpt: {
      en: "The roar of MotoGP returns to the Pertamina Mandalika International Circuit, drawing racing fans from across the globe to Central Lombok.",
      id: "Deru MotoGP kembali ke Sirkuit Internasional Pertamina Mandalika, menarik penggemar balap dari seluruh dunia ke Lombok Tengah.",
    },
    body: {
      en: [
        "Central Lombok takes the global stage once again as the Pertamina Mandalika International Circuit hosts the MotoGP Grand Prix of Indonesia, one of the most awaited rounds of the championship calendar.",
        "Beyond the racing, the event transforms the region into a festival of speed and culture — fan zones, local cuisine, and Sasak performances welcome visitors from dozens of countries.",
        "Organizers expect the circuit to draw more than 100,000 spectators, reinforcing Mandalika's position as a world-class sporting destination while spotlighting the natural beauty of southern Lombok.",
      ],
      id: [
        "Lombok Tengah kembali naik ke panggung dunia saat Sirkuit Internasional Pertamina Mandalika menjadi tuan rumah MotoGP Grand Prix of Indonesia, salah satu seri paling dinanti dalam kalender kejuaraan.",
        "Selain balapan, acara ini menyulap kawasan menjadi festival kecepatan dan budaya — zona penggemar, kuliner lokal, dan pertunjukan Sasak menyambut pengunjung dari puluhan negara.",
        "Penyelenggara memperkirakan sirkuit menarik lebih dari 100.000 penonton, mengukuhkan posisi Mandalika sebagai destinasi olahraga kelas dunia sekaligus menyorot keindahan alam Lombok bagian selatan.",
      ],
    },
  },
  {
    slug: "presean-cultural-championship",
    image: "/landingpageasset/preseencaltural.webp",
    categories: ["Culture", "Sports"],
    date: { en: "August 2025", id: "Agustus 2025" },
    title: {
      en: "Presean Cultural Championship",
      id: "Kejuaraan Budaya Presean",
    },
    excerpt: {
      en: "Witness the bravery of Presean, the traditional Sasak stick-fighting martial art, at Sade Traditional Village, Pujut.",
      id: "Saksikan keberanian Presean, seni bela diri tongkat tradisional Sasak, di Desa Adat Sade, Pujut.",
    },
    body: {
      en: [
        "Presean, the centuries-old Sasak martial art in which two combatants duel with rattan sticks and rawhide shields, takes center stage at Sade Traditional Village in Pujut.",
        "More than a contest of strength, Presean is a ritual of courage and sportsmanship — accompanied by traditional gamelan music and watched over by a referee known as the pekembar.",
        "The championship draws fighters and spectators from across the island, keeping a proud Sasak heritage alive for new generations and curious travelers alike.",
      ],
      id: [
        "Presean, seni bela diri Sasak berusia berabad-abad di mana dua petarung beradu menggunakan tongkat rotan dan perisai kulit, menjadi sorotan utama di Desa Adat Sade, Pujut.",
        "Lebih dari sekadar adu kekuatan, Presean adalah ritual keberanian dan sportivitas — diiringi musik gamelan tradisional dan diawasi oleh wasit yang disebut pekembar.",
        "Kejuaraan ini menarik petarung dan penonton dari seluruh pulau, menjaga warisan Sasak yang membanggakan tetap hidup bagi generasi baru maupun wisatawan yang penasaran.",
      ],
    },
  },
  {
    slug: "lombok-weaving-festival",
    image: "/landingpageasset/lomboktenggah.webp",
    categories: ["Art", "Culture"],
    date: { en: "September 2025", id: "September 2025" },
    title: {
      en: "Lombok Tengah Weaving Festival",
      id: "Festival Tenun Lombok Tengah",
    },
    excerpt: {
      en: "Sukarara Village showcases the timeless craft of traditional Sasak weaving, where every motif tells a story passed down through generations.",
      id: "Desa Sukarara menampilkan kerajinan tenun tradisional Sasak yang abadi, di mana setiap motif menyimpan kisah turun-temurun.",
    },
    body: {
      en: [
        "Sukarara Village, the heart of Sasak weaving, hosts a festival celebrating songket and tenun — handwoven textiles whose intricate motifs carry generations of meaning.",
        "Visitors can watch artisans work the traditional backstrap loom, try weaving themselves, and learn how each pattern reflects the identity and stories of the Sasak people.",
        "The festival supports local weavers and positions Central Lombok's craft heritage as a sustainable pillar of cultural tourism.",
      ],
      id: [
        "Desa Sukarara, jantung tenun Sasak, menggelar festival yang merayakan songket dan tenun — kain tenun tangan dengan motif rumit yang membawa makna lintas generasi.",
        "Pengunjung dapat menyaksikan perajin mengerjakan alat tenun gedongan tradisional, mencoba menenun sendiri, dan memahami bagaimana setiap motif mencerminkan identitas serta kisah masyarakat Sasak.",
        "Festival ini mendukung para penenun lokal dan menempatkan warisan kerajinan Lombok Tengah sebagai pilar berkelanjutan pariwisata budaya.",
      ],
    },
  },
  {
    slug: "mandalika-night-run",
    image: "/landingpageasset/mandalikakorprifun.webp",
    categories: ["Sports", "Health"],
    date: { en: "December 2025", id: "Desember 2025" },
    title: {
      en: "Mandalika Korpri Fun Night Run",
      id: "Mandalika Korpri Fun Night Run",
    },
    excerpt: {
      en: "Runners light up Kuta Mandalika Beach Park for a festive night run that strengthens Central Lombok's community sports and wellness scene.",
      id: "Para pelari menerangi Taman Pantai Kuta Mandalika dalam lari malam meriah yang memperkuat olahraga komunitas dan kebugaran Lombok Tengah.",
    },
    body: {
      en: [
        "Kuta Mandalika Beach Park comes alive after dark for the Mandalika Korpri Fun Night Run, a festive race that blends sport, community, and seaside scenery.",
        "Open to families and serious runners alike, the event promotes a healthy, active lifestyle while showcasing the vibrant nightlife potential of the Mandalika area.",
        "With thousands of participants, the night run strengthens the bond between Bali and Lombok's wellness and community-sports communities.",
      ],
      id: [
        "Taman Pantai Kuta Mandalika hidup saat malam untuk Mandalika Korpri Fun Night Run, lomba meriah yang memadukan olahraga, kebersamaan, dan panorama tepi pantai.",
        "Terbuka untuk keluarga maupun pelari serius, acara ini mendorong gaya hidup sehat dan aktif sekaligus memperlihatkan potensi kehidupan malam kawasan Mandalika yang semarak.",
        "Dengan ribuan peserta, lari malam ini mempererat ikatan antara komunitas kebugaran dan olahraga masyarakat Bali dan Lombok.",
      ],
    },
  },
];

export const CATEGORIES = [
  "Art",
  "Culture",
  "Education",
  "Entertainment",
  "Events",
  "F&B",
  "Family",
  "Health",
  "Sports",
];
