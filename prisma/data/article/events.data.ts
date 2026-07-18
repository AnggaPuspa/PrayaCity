import type { LocalizedEvent } from "../../../src/features/article/types";

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

  // ── Culture page content (blog posts from /culture) ──────────────
  {
    slug: "bau-nyale-when-the-sea-comes-alive",
    image: "/culture/warisan-nusa-culture-1.webp",
    categories: ["Culture", "Events"],
    date: { en: "Annual Ritual", id: "Ritual Tahunan" },
    title: {
      en: "Bau Nyale — When the Sea Comes Alive",
      id: "Bau Nyale — Saat Laut Menjadi Hidup",
    },
    excerpt: {
      en: "Every year at Seger Beach, thousands gather to catch nyale sea worms — believed to be the reincarnation of Princess Mandalika, who sacrificed herself to bring peace among her suitors.",
      id: "Setiap tahun di Pantai Seger, ribuan orang berkumpul untuk menangkap cacing laut nyale — yang diyakini sebagai reinkarnasi Putri Mandalika, yang mengorbankan dirinya untuk membawa kedamaian di antara para pelamarnya.",
    },
    body: {
      en: [
        "Every year at Seger Beach, thousands gather to catch nyale sea worms — believed to be the reincarnation of Princess Mandalika, who sacrificed herself to bring peace among her suitors. As dawn breaks, the people of Central Lombok wade into the waters in a moment of spiritual connection that has been repeated for centuries.",
        "The legend of Princess Mandalika is inseparable from the identity of southern Lombok. Faced with many suitors and the threat of conflict, she chose the sea — and from that sacrifice grew a ritual of hope, unity, and reverence for nature that still draws crowds from across the island and beyond.",
        "Today Bau Nyale is both a sacred tradition and a living cultural festival: music, food, crafts, and community gatherings surround the dawn ritual. Visitors who join at first light leave with more than photographs — they leave with a story that has defined Central Lombok for generations.",
      ],
      id: [
        "Setiap tahun di Pantai Seger, ribuan orang berkumpul untuk menangkap cacing laut nyale — yang diyakini sebagai reinkarnasi Putri Mandalika, yang mengorbankan dirinya untuk membawa kedamaian di antara para pelamarnya. Saat fajar menyingsing, masyarakat Lombok Tengah mengarungi air dalam momen hubungan spiritual yang telah diulang selama berabad-abad.",
        "Legenda Putri Mandalika tak terpisahkan dari identitas Lombok selatan. Dihadapkan pada banyak pelamar dan ancaman konflik, ia memilih laut — dan dari pengorbanan itu tumbuh ritual harapan, persatuan, serta penghormatan kepada alam yang masih menarik kerumunan dari seluruh pulau dan luar daerah.",
        "Hari ini Bau Nyale adalah tradisi sakral sekaligus festival budaya yang hidup: musik, kuliner, kerajinan, dan pertemuan komunitas mengiringi ritual fajar. Pengunjung yang datang saat subuh membawa pulang lebih dari foto — mereka membawa cerita yang telah mendefinisikan Lombok Tengah lintas generasi.",
      ],
    },
  },
  {
    slug: "peresean-where-courage-is-tested",
    image: "/culture/warisan-nusa-culture-2.webp",
    categories: ["Culture", "Sports"],
    date: { en: "Traditional Martial Art", id: "Seni Bela Diri Tradisional" },
    title: {
      en: "Peresean — Where Courage is Tested",
      id: "Peresean — Tempat Keberanian Diuji",
    },
    excerpt: {
      en: "Two men, rattan sticks, and buffalo hide shields — Peresean is a traditional Sasak duel that symbolizes bravery and sportsmanship across Central Lombok.",
      id: "Dua pria, tongkat rotan, dan perisai kulit kerbau — Peresean adalah duel tradisional Sasak yang melambangkan keberanian dan sportivitas di seluruh Lombok Tengah.",
    },
    body: {
      en: [
        "Two men, rattan sticks, and buffalo hide shields — Peresean is a traditional Sasak duel that symbolizes bravery and sportsmanship. Once held to invoke rain during dry seasons, it is today celebrated at cultural festivals across Central Lombok, drawing crowds who come to witness a living expression of Sasak identity.",
        "More than a contest of strength, Peresean is guided by rules of honor. Fighters known as pepadu strike with rattan while a referee (pekembar) and traditional music keep the rhythm of courage and restraint.",
        "At villages and festivals from Sade to Praya, Peresean remains a proud stage for Sasak heritage — raw, ceremonial, and deeply communal.",
      ],
      id: [
        "Dua pria, tongkat rotan, dan perisai kulit kerbau — Peresean adalah duel tradisional Sasak yang melambangkan keberanian dan sportivitas. Dulunya diadakan untuk memanggil hujan selama musim kemarau, saat ini Peresean dirayakan di festival budaya di seluruh Lombok Tengah, menarik banyak orang yang datang untuk menyaksikan ekspresi hidup identitas Sasak.",
        "Lebih dari sekadar adu kekuatan, Peresean dipandu oleh aturan kehormatan. Para petarung yang disebut pepadu memukul dengan rotan, sementara wasit (pekembar) dan musik tradisional menjaga irama keberanian serta pengendalian diri.",
        "Di desa dan festival dari Sade hingga Praya, Peresean tetap menjadi panggung warisan Sasak yang membanggakan — mentah, seremonial, dan sangat komunal.",
      ],
    },
  },
  {
    slug: "gendang-beleq-the-pulse-of-the-island",
    image: "/culture/warisan-nusa-culture-3.webp",
    categories: ["Culture", "Art"],
    date: { en: "Rhythmic Heritage", id: "Warisan Irama" },
    title: {
      en: "Gendang Beleq — The Pulse of the Island",
      id: "Gendang Beleq — Denyut Nadi Pulau",
    },
    excerpt: {
      en: "Translating to \"Big Drum,\" Gendang Beleq is an ancient musical tradition whose thunderous rhythm still powers Sasak ceremonies and processions.",
      id: "Diterjemahkan sebagai \"Gendang Besar,\" Gendang Beleq adalah tradisi musik kuno yang irama menggelegarnya masih menggerakkan upacara dan prosesi Sasak.",
    },
    body: {
      en: [
        "Translating to \"Big Drum,\" Gendang Beleq is an ancient musical tradition originally used to encourage warriors marching to battle. Today, these massive, thunderous drums form the heartbeat of traditional Sasak wedding processions and cultural ceremonies, echoing the island's fierce and vibrant history.",
        "A full ensemble fills the air with layered percussion — deep, commanding, and impossible to ignore. For visitors, hearing Gendang Beleq live is often the first moment Central Lombok feels fully alive.",
        "From village courtyards to major festivals, the big drum remains a sonic emblem of Sasak pride and collective energy.",
      ],
      id: [
        "Diterjemahkan sebagai \"Gendang Besar,\" Gendang Beleq adalah tradisi musik kuno yang awalnya digunakan untuk menyemangati prajurit yang berangkat ke medan perang. Saat ini, gendang-gendang besar yang menggelegar ini membentuk detak jantung prosesi pernikahan tradisional Sasak dan upacara budaya, menggemakan sejarah pulau yang sengit dan semarak.",
        "Satu ansambel penuh memenuhi udara dengan perkusi berlapis — dalam, tegas, dan tak mungkin diabaikan. Bagi pengunjung, mendengar Gendang Beleq secara langsung sering menjadi momen pertama Lombok Tengah terasa benar-benar hidup.",
        "Dari halaman desa hingga festival besar, gendang besar tetap menjadi lambang bunyi kebanggaan dan energi kolektif Sasak.",
      ],
    },
  },
  {
    slug: "sade-village-weaving-threads-of-time",
    image: "/culture/warisan-nusa-culture-4.webp",
    categories: ["Culture", "Art"],
    date: { en: "Ancestral Craft", id: "Kerajinan Leluhur" },
    title: {
      en: "Sade Village Weaving — Threads of Time",
      id: "Tenun Desa Sade — Untaian Waktu",
    },
    excerpt: {
      en: "In the traditional Sasak village of Sade, hand-weaving has been passed down through generations of women — every pattern holding cultural meaning.",
      id: "Di desa tradisional Sasak, Sade, seni menenun dengan tangan telah diwariskan dari generasi ke generasi — setiap pola menyimpan makna budaya.",
    },
    body: {
      en: [
        "In the traditional Sasak village of Sade, the meticulous art of hand-weaving has been passed down through generations of women. Using natural dyes and intricate backstrap looms, they create stunning Songket fabrics that tell stories of their ancestors, where every pattern holds a profound cultural significance.",
        "Walking through Sade is a lesson in living heritage: thatched homes, open workshops, and the steady rhythm of looms. Guests can watch artisans at work and understand how cloth becomes memory.",
        "Supporting Sade weavers means keeping a lineage of skill, identity, and livelihood woven into the future of Central Lombok.",
      ],
      id: [
        "Di desa tradisional Sasak, Sade, seni menenun dengan tangan telah diwariskan dari generasi ke generasi. Menggunakan pewarna alami dan alat tenun punggung yang rumit, mereka menciptakan kain Songket menakjubkan yang menceritakan kisah leluhur mereka, di mana setiap pola memiliki makna budaya yang mendalam.",
        "Berjalan di Sade adalah pelajaran warisan yang hidup: rumah berjerami, bengkel terbuka, dan irama stabil alat tenun. Tamu dapat menyaksikan perajin bekerja dan memahami bagaimana kain menjadi memori.",
        "Mendukung penenun Sade berarti menjaga garis keturunan keterampilan, identitas, dan penghidupan yang terjalin ke masa depan Lombok Tengah.",
      ],
    },
  },
  {
    slug: "alang-alang-the-sacred-granary",
    image: "/culture/warisan-nusa-culture-5.webp",
    categories: ["Culture"],
    date: { en: "Harvest Festival", id: "Festival Panen" },
    title: {
      en: "Alang-Alang — The Sacred Granary",
      id: "Alang-Alang — Lumbung Suci",
    },
    excerpt: {
      en: "Across Central Lombok, iconic lumbung rice barns with curved thatched roofs stand as symbols of harvest gratitude and community life.",
      id: "Di seluruh Lombok Tengah, lumbung padi ikonik dengan atap melengkung berjerami berdiri sebagai simbol rasa syukur panen dan kehidupan komunitas.",
    },
    body: {
      en: [
        "Across Central Lombok, you'll spot the iconic lumbung (rice barns) with their distinctive curved thatched roofs. More than just agricultural storage, these structures represent the community's profound gratitude for the harvest and are central to communal gatherings and thanksgiving rituals.",
        "The architecture is both practical and symbolic: elevated floors protect grain, while the form itself has become a visual shorthand for Sasak rural life.",
        "Visiting villages where lumbung still define the skyline is a reminder that Central Lombok's culture is rooted as much in the land as in ceremony and story.",
      ],
      id: [
        "Di seluruh Lombok Tengah, Anda akan melihat lumbung (lumbung padi) ikonik dengan atap melengkung berjerami yang khas. Lebih dari sekadar penyimpanan pertanian, struktur ini mewakili rasa syukur mendalam masyarakat atas panen dan menjadi pusat pertemuan komunal serta ritual ucapan syukur.",
        "Arsitekturnya praktis sekaligus simbolis: lantai ditinggikan melindungi padi, sementara bentuknya sendiri menjadi singkatan visual kehidupan pedesaan Sasak.",
        "Mengunjungi desa di mana lumbung masih mendefinisikan cakrawala adalah pengingat bahwa budaya Lombok Tengah berakar sama kuatnya di tanah, upacara, dan cerita.",
      ],
    },
  },
  {
    slug: "waktu-telu-the-ancient-syncretism",
    image: "/culture/warisan-nusa-culture-6.webp",
    categories: ["Culture"],
    date: { en: "Spiritual Harmony", id: "Keharmonisan Spiritual" },
    title: {
      en: "Waktu Telu — The Ancient Syncretism",
      id: "Waktu Telu — Sinkretisme Kuno",
    },
    excerpt: {
      en: "Waktu Telu blends Islamic teachings with indigenous animist and Hindu-Buddhist traditions into a philosophy of harmony unique to Lombok.",
      id: "Waktu Telu memadukan ajaran Islam dengan tradisi animisme asli dan Hindu-Buddha menjadi filosofi harmoni yang khas Lombok.",
    },
    body: {
      en: [
        "Waktu Telu represents a unique ancestral belief system that blends Islamic teachings with indigenous animist and Hindu-Buddhist traditions. Though practiced by fewer today, its philosophy of harmony between humans, nature, and the divine remains deeply woven into the spiritual fabric of Central Lombok.",
        "Understanding Waktu Telu is key to reading many local customs — respect for sacred places, cycles of the land, and the quiet balance communities still seek between faith and heritage.",
        "For travelers, approaching this tradition with curiosity and care opens a deeper layer of Central Lombok beyond festivals and beaches.",
      ],
      id: [
        "Waktu Telu mewakili sistem kepercayaan leluhur yang unik yang memadukan ajaran Islam dengan tradisi animisme asli dan Hindu-Buddha. Meskipun dipraktikkan oleh lebih sedikit orang saat ini, filosofi harmoni antara manusia, alam, dan yang ilahi tetap terjalin erat dalam tatanan spiritual Lombok Tengah.",
        "Memahami Waktu Telu adalah kunci membaca banyak adat lokal — penghormatan pada tempat suci, siklus tanah, dan keseimbangan tenang yang masih dicari komunitas antara iman dan warisan.",
        "Bagi wisatawan, mendekati tradisi ini dengan rasa ingin tahu dan kehati-hatian membuka lapisan lebih dalam Lombok Tengah di luar festival dan pantai.",
      ],
    },
  },
  {
    slug: "nasi-balap-puyung",
    image: "/culture/ayam-taliwang.webp",
    categories: ["Culture", "F&B"],
    date: { en: "Culinary Heritage", id: "Warisan Kuliner" },
    title: {
      en: "Nasi Balap Puyung",
      id: "Nasi Balap Puyung",
    },
    excerpt: {
      en: "A signature Central Lombok rice plate — spicy, humble, and unforgettable — born from the flavors of Puyung village.",
      id: "Sajian nasi khas Lombok Tengah — pedas, sederhana, dan tak terlupakan — lahir dari cita rasa desa Puyung.",
    },
    body: {
      en: [
        "Nasi Balap Puyung is one of Central Lombok's most beloved everyday dishes: steamed rice served with shredded spicy chicken or meat, sambal, and simple sides that pack serious heat.",
        "The name \"balap\" (race) hints at how quickly the dish is prepared and how eagerly people finish it. What looks modest on the plate delivers bold Sasak seasoning.",
        "Try it at local warungs around Praya and Puyung — a direct taste of how Central Lombok eats at home and on the road.",
      ],
      id: [
        "Nasi Balap Puyung adalah salah satu hidangan sehari-hari paling digemari di Lombok Tengah: nasi hangat dengan ayam atau daging suwir pedas, sambal, dan lauk sederhana yang membawa kepedasan serius.",
        "Nama \"balap\" mengisyaratkan cara masaknya yang cepat dan antusiasme orang menghabiskannya. Tampilan sederhana di piring justru menyimpan bumbu Sasak yang tegas.",
        "Cicipi di warung sekitar Praya dan Puyung — rasa langsung bagaimana Lombok Tengah makan di rumah maupun di perjalanan.",
      ],
    },
  },
  {
    slug: "sate-bulayak",
    image: "/culture/satabulayak.webp",
    categories: ["Culture", "F&B"],
    date: { en: "Culinary Heritage", id: "Warisan Kuliner" },
    title: {
      en: "Sate Bulayak",
      id: "Sate Bulayak",
    },
    excerpt: {
      en: "Sasak satay served with rice cakes wrapped in palm leaves and a rich peanut-coconut sauce unique to Lombok.",
      id: "Sate Sasak yang disajikan dengan lontong berbungkus daun palem dan saus kacang-kelapa khas Lombok.",
    },
    body: {
      en: [
        "Sate Bulayak pairs grilled meat skewers with bulayak — rice cakes wrapped in young palm leaves — and a creamy peanut sauce scented with coconut and local spices.",
        "It is festival food and comfort food at once: smoky, aromatic, and built for sharing at ceremonies and night markets.",
        "Order it wherever celebrations gather in Central Lombok — a plate that tastes like community.",
      ],
      id: [
        "Sate Bulayak memadukan tusuk daging bakar dengan bulayak — lontong berbungkus daun palem muda — serta saus kacang creamy beraroma kelapa dan rempah lokal.",
        "Ini makanan festival sekaligus makanan nyaman: asap, harum, dan dibuat untuk berbagi di upacara maupun pasar malam.",
        "Pesan di mana pun perayaan berkumpul di Lombok Tengah — sepiring rasa yang terasa seperti komunitas.",
      ],
    },
  },
  {
    slug: "ayam-taliwang",
    image: "/culture/nasi-balap-kayung.webp",
    categories: ["Culture", "F&B"],
    date: { en: "Culinary Heritage", id: "Warisan Kuliner" },
    title: {
      en: "Ayam Taliwang",
      id: "Ayam Taliwang",
    },
    excerpt: {
      en: "Lombok's iconic grilled chicken — fiery, smoky, and inseparable from the island's culinary reputation.",
      id: "Ayam bakar ikonik Lombok — pedas, berasap, dan tak terpisahkan dari reputasi kuliner pulau ini.",
    },
    body: {
      en: [
        "Ayam Taliwang is grilled young chicken coated in a fiery red chili paste. Born in Taliwang and beloved across Lombok, it has become a flagship taste of the island.",
        "The heat is the point — balanced by smoke from the grill and often served with plecing kangkung or plain rice to cool the fire.",
        "In Central Lombok, Ayam Taliwang is the dish many visitors remember first: bold, unapologetic, and deeply local.",
      ],
      id: [
        "Ayam Taliwang adalah ayam muda bakar berlapis pasta cabai merah yang pedas. Lahir di Taliwang dan dicintai di seluruh Lombok, hidangan ini menjadi cita rasa unggulan pulau.",
        "Kepedasannya adalah intinya — diimbangi asap panggangan dan sering disajikan dengan plecing kangkung atau nasi putih untuk meredakan panas.",
        "Di Lombok Tengah, Ayam Taliwang sering menjadi hidangan pertama yang diingat pengunjung: tegas, tanpa kompromi, dan sangat lokal.",
      ],
    },
  },
  {
    slug: "sup-iga-bebalung",
    image: "/culture/satabulayak.webp",
    categories: ["Culture", "F&B"],
    date: { en: "Culinary Heritage", id: "Warisan Kuliner" },
    title: {
      en: "Sup Iga Bebalung",
      id: "Sup Iga Bebalung",
    },
    excerpt: {
      en: "A hearty Lombok beef-rib soup — clear broth, deep spice, and the kind of comfort that defines local home cooking.",
      id: "Sup iga sapi khas Lombok — kuah bening, rempah dalam, dan kenyamanan yang mendefinisikan masakan rumah lokal.",
    },
    body: {
      en: [
        "Sup Iga Bebalung is a clear beef-rib soup simmered with garlic, shallot, and Lombok spices until the meat falls from the bone.",
        "It is everyday comfort rather than festival spectacle — the kind of bowl families share after long days and travelers order when they want something warming and real.",
        "Find it in local eateries around Praya and across Central Lombok for a slower, deeper taste of the region.",
      ],
      id: [
        "Sup Iga Bebalung adalah sup iga sapi berkuah bening yang dimasak lama dengan bawang putih, bawang merah, dan rempah Lombok hingga daging lunak dari tulang.",
        "Ini kenyamanan sehari-hari, bukan tontonan festival — mangkuk yang dibagikan keluarga setelah hari panjang dan dipesan wisatawan saat ingin sesuatu yang menghangatkan dan otentik.",
        "Temukan di warung sekitar Praya dan di seluruh Lombok Tengah untuk rasa wilayah yang lebih pelan dan dalam.",
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
