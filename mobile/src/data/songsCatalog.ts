export interface SongCompetition {
  id: string;
  songTitle: string;
  artistOrAlbum: string;
  category: 'Classical Dance' | 'Kathak' | 'Bharatanatyam' | 'Bollywood' | 'Folk Dance' | 'Sufi & Devotional';
  entryFee: number;
  prizePool: number;
  spotsTotal: number;
  spotsLeft: number;
  judge: string;
  status: 'Open' | 'Filling Fast' | 'Upcoming' | 'Closing Soon';
  difficulty: 'Beginner' | 'Intermediate' | 'Masterclass';
  duration: string;
  image: string;
}

// Base library of popular classical, kathak, bollywood, and folk songs
const BASE_SONGS = [
  { title: 'Ghar More Pardesiya', album: 'Kalank', cat: 'Kathak' as const, judge: 'Hassan Raza' },
  { title: 'Mohe Rang Do Laal', album: 'Bajirao Mastani', cat: 'Kathak' as const, judge: 'Hassan Raza' },
  { title: 'Kahe Chhed Mohe', album: 'Devdas (Pandit Birju Maharaj)', cat: 'Kathak' as const, judge: 'Hassan Raza' },
  { title: 'Aami Je Tomar (Kathak Jugalbandi)', album: 'Bhool Bhulaiyaa', cat: 'Classical Dance' as const, judge: 'Hassan Raza' },
  { title: 'Dheem Ta Dare (Tarana in Teentaal)', album: 'Classical Heritage', cat: 'Kathak' as const, judge: 'Hassan Raza' },
  { title: 'Albela Sajan Aayo Ri', album: 'Hum Dil De Chuke Sanam', cat: 'Classical Dance' as const, judge: 'Hassan Raza' },
  { title: 'Bho Shambho Shiva Shambho', album: 'Revathi Ragam Varnam', cat: 'Bharatanatyam' as const, judge: 'Dr. Padma S.' },
  { title: 'Nagada Sang Dhol Baje', album: 'Goliyon Ki Raasleela', cat: 'Folk Dance' as const, judge: 'Geeta Kapoor' },
  { title: 'Deewani Mastani', album: 'Bajirao Mastani', cat: 'Bollywood' as const, judge: 'Farah Khan' },
  { title: 'Chhalka Chhalka Re', album: 'Saathiya', cat: 'Bollywood' as const, judge: 'Hassan Raza' },
  { title: 'Pinga Ga Pori (Lavani Classical)', album: 'Bajirao Mastani', cat: 'Folk Dance' as const, judge: 'Meghna Roy' },
  { title: 'Ghoomar', album: 'Padmaavat', cat: 'Folk Dance' as const, judge: 'Hassan Raza' },
  { title: 'Barso Re Megha', album: 'Guru', cat: 'Bollywood' as const, judge: 'Saroj Khan Memorial' },
  { title: 'Kun Faya Kun (Sufi Whirling)', album: 'Rockstar', cat: 'Sufi & Devotional' as const, judge: 'Ustad Rahat A.' },
  { title: 'Kesariya (Classical Thumri Re-Imagined)', album: 'Brahmāstra', cat: 'Bollywood' as const, judge: 'Hassan Raza' },
  { title: 'Mere Dholna Sun', album: 'Bhool Bhulaiyaa 2', cat: 'Classical Dance' as const, judge: 'Hassan Raza' },
  { title: 'Taal Se Taal Mila (Western & Indian Classical)', album: 'Taal', cat: 'Classical Dance' as const, judge: 'Hassan Raza' },
  { title: 'Madhurashtakam (Adharam Madhuram)', album: 'Vrindavan Classical', cat: 'Sufi & Devotional' as const, judge: 'Pt. Jasraj Legacy' },
  { title: 'Piya Tose Naina Lage Re', album: 'Guide', cat: 'Classical Dance' as const, judge: 'Hassan Raza' },
  { title: 'In Aankhon Ki Masti Ke', album: 'Umrao Jaan', cat: 'Kathak' as const, judge: 'Hassan Raza' },
  { title: 'Shiva Tandava Stotram', album: 'Rāga Malkauns', cat: 'Bharatanatyam' as const, judge: 'Sudha Chandran' },
  { title: 'Thumak Chalat Ram Chandra', album: 'Rāga Bhairavi Thumri', cat: 'Classical Dance' as const, judge: 'Hassan Raza' },
  { title: 'Dholi Taro Dhol Baje', album: 'HDDCS', cat: 'Folk Dance' as const, judge: 'Falguni Pathak' },
  { title: 'Afreen Afreen (Classical Ghazal)', album: 'Coke Studio', cat: 'Sufi & Devotional' as const, judge: 'Hassan Raza' },
  { title: 'Chaudhary (Rajasthani Folk)', album: 'Mame Khan Special', cat: 'Folk Dance' as const, judge: 'Ila Arun' },
  { title: 'Jhin Min Jhini', album: 'Maqbool', cat: 'Kathak' as const, judge: 'Hassan Raza' },
  { title: 'Radha Kaise Na Jale', album: 'Lagaan', cat: 'Classical Dance' as const, judge: 'Hassan Raza' },
  { title: 'Bole Chudiyan', album: 'Kabhi Khushi Kabhie Gham', cat: 'Bollywood' as const, judge: 'Remo D\'Souza' },
  { title: 'Ramta Jogi', album: 'Taal', cat: 'Bollywood' as const, judge: 'Hassan Raza' },
  { title: 'Tere Hawaale', album: 'Laal Singh Chaddha', cat: 'Sufi & Devotional' as const, judge: 'Arijit Singh Foundation' },
  { title: 'Namo Namo Ji Shankara', album: 'Kedarnath', cat: 'Sufi & Devotional' as const, judge: 'Amit Trivedi Arts' },
  { title: 'Bumbro Bumbro', album: 'Mission Kashmir', cat: 'Folk Dance' as const, judge: 'Kashmiri Folk Trust' },
  { title: 'Rangabati (Sambalpuri Express)', album: 'Folk Traditions', cat: 'Folk Dance' as const, judge: 'Odisha Kala Mandal' },
  { title: 'Nimbooda Nimbooda', album: 'HDDCS', cat: 'Folk Dance' as const, judge: 'Hassan Raza' },
  { title: 'Genda Phool (Bengali Baul Fusion)', album: 'Badshah Folk Project', cat: 'Folk Dance' as const, judge: 'Ratan Kahar Trust' },
  { title: 'Kehna Hi Kya', album: 'Bombay (A.R. Rahman)', cat: 'Classical Dance' as const, judge: 'Hassan Raza' },
  { title: 'Tu Hi Re', album: 'Bombay', cat: 'Bollywood' as const, judge: 'Hassan Raza' },
  { title: 'Kajra Re', album: 'Bunty Aur Babli', cat: 'Bollywood' as const, judge: 'Vaibhavi Merchant' },
  { title: 'Chhan Chhan Man Mohan', album: 'Kathak Thumri Series', cat: 'Kathak' as const, judge: 'Hassan Raza' },
  { title: 'Man Mohini More Kanha (Rāga Yaman)', album: 'Yaman Expressive Solos', cat: 'Classical Dance' as const, judge: 'Hassan Raza' }
];

const IMAGES = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500',
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500',
  'https://images.unsplash.com/photo-1547153760-18fc86324498?w=500',
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500',
  'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=500',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500'
];

const FEE_TIERS = [29, 49, 79, 99, 149, 199, 249, 299, 499];
const PRIZE_MULTIPLIERS = [15, 20, 25, 30, 40, 50];

// Generate exactly 1000 songs and their competition details
export const generate1000Songs = (): SongCompetition[] => {
  const list: SongCompetition[] = [];

  for (let i = 1; i <= 1000; i++) {
    const base = BASE_SONGS[(i - 1) % BASE_SONGS.length];
    const image = IMAGES[(i - 1) % IMAGES.length];
    const fee = FEE_TIERS[(i * 3 + 2) % FEE_TIERS.length];
    const mult = PRIZE_MULTIPLIERS[(i * 7) % PRIZE_MULTIPLIERS.length];
    const prize = Math.round((fee * mult) / 100) * 100;
    const spotsTotal = i % 3 === 0 ? 25 : i % 5 === 0 ? 50 : 20;
    const spotsLeft = Math.max(1, (spotsTotal - ((i * 11) % spotsTotal)));

    let status: SongCompetition['status'] = 'Open';
    if (spotsLeft <= 3) status = 'Closing Soon';
    else if (spotsLeft <= 8) status = 'Filling Fast';
    else if (i % 8 === 0) status = 'Upcoming';

    const difficulty: SongCompetition['difficulty'] = 
      i % 4 === 0 ? 'Masterclass' : i % 2 === 0 ? 'Intermediate' : 'Beginner';

    const roundSuffix = i <= BASE_SONGS.length 
      ? '' 
      : ` (Edition #${Math.floor((i - 1) / BASE_SONGS.length) + 1})`;

    list.push({
      id: `song-${i}`,
      songTitle: `${base.title}${roundSuffix}`,
      artistOrAlbum: base.album,
      category: base.cat,
      entryFee: fee,
      prizePool: Math.max(1000, prize),
      spotsTotal,
      spotsLeft,
      judge: base.judge,
      status,
      difficulty,
      duration: `${2 + (i % 3)}m ${(i * 17) % 60}s`,
      image
    });
  }

  return list;
};

// Memoized singleton for instant loads
export const ALL_1000_SONGS: SongCompetition[] = generate1000Songs();
