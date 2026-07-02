// Static India learning data - 28 States + 8 Union Territories
// Data is factual and child-safe. Do not scatter facts elsewhere.

export const REGIONS = ["North", "South", "East", "West", "Central", "Northeast"];

export const STATES = [
  { id: "AP", name: "Andhra Pradesh", capital: "Amaravati", capitalNote: "Amaravati is the state capital; some administrative work also happens in Visakhapatnam.", region: "South", knownFor: "Spicy food, temples, and long sandy coast", fact: "Andhra Pradesh has one of the longest coastlines in India." },
  { id: "AR", name: "Arunachal Pradesh", capital: "Itanagar", region: "Northeast", knownFor: "Sunrise state and misty mountains", fact: "Arunachal Pradesh means 'Land of Dawn-Lit Mountains'." },
  { id: "AS", name: "Assam", capital: "Dispur", region: "Northeast", knownFor: "Tea gardens and the Brahmaputra river", fact: "Assam is famous for its aromatic tea, grown in wide green estates." },
  { id: "BR", name: "Bihar", capital: "Patna", region: "East", knownFor: "Ancient learning at Nalanda and the river Ganga", fact: "Nalanda in Bihar was one of the world's oldest universities." },
  { id: "CT", name: "Chhattisgarh", capital: "Raipur", region: "Central", knownFor: "Forests, waterfalls, and tribal art", fact: "Chitrakote Falls in Chhattisgarh is called 'India's Niagara'." },
  { id: "GA", name: "Goa", capital: "Panaji", region: "West", knownFor: "Beaches, coconut palms, and colourful houses", fact: "Goa is India's smallest state by area." },
  { id: "GJ", name: "Gujarat", capital: "Gandhinagar", region: "West", knownFor: "Kites, garba dance, and salt deserts", fact: "The Rann of Kutch turns bright white with salt in winter." },
  { id: "HR", name: "Haryana", capital: "Chandigarh", capitalNote: "Chandigarh is shared as the capital of Haryana and Punjab and is itself a Union Territory.", region: "North", knownFor: "Wheat fields and traditional wrestling", fact: "Haryana is one of the country's top producers of milk." },
  { id: "HP", name: "Himachal Pradesh", capital: "Shimla", region: "North", knownFor: "Snowy mountains and apple orchards", fact: "The toy train to Shimla is a UNESCO World Heritage railway." },
  { id: "JH", name: "Jharkhand", capital: "Ranchi", region: "East", knownFor: "Waterfalls, forests, and minerals", fact: "Jharkhand means 'Land of Forests'." },
  { id: "KA", name: "Karnataka", capital: "Bengaluru", region: "South", knownFor: "Tech city, palaces, and coffee hills", fact: "Bengaluru is often called the Silicon Valley of India." },
  { id: "KL", name: "Kerala", capital: "Thiruvananthapuram", region: "South", knownFor: "Backwaters, coconuts, and houseboats", fact: "Kerala's backwaters are a network of calm lakes and canals." },
  { id: "MP", name: "Madhya Pradesh", capital: "Bhopal", region: "Central", knownFor: "Tigers, forts, and the heart of India", fact: "Madhya Pradesh is home to famous tiger reserves like Kanha." },
  { id: "MH", name: "Maharashtra", capital: "Mumbai", region: "West", knownFor: "Bollywood, ports, and the Sahyadri hills", fact: "Mumbai is home to India's biggest film industry, Bollywood." },
  { id: "MN", name: "Manipur", capital: "Imphal", region: "Northeast", knownFor: "The floating Loktak Lake and classical dance", fact: "Loktak Lake has floating patches of vegetation called phumdis." },
  { id: "ML", name: "Meghalaya", capital: "Shillong", region: "Northeast", knownFor: "Living root bridges and rain", fact: "Meghalaya means 'Abode of Clouds'." },
  { id: "MZ", name: "Mizoram", capital: "Aizawl", region: "Northeast", knownFor: "Bamboo dances and green hills", fact: "Mizoram sits on gentle rolling blue-green hills." },
  { id: "NL", name: "Nagaland", capital: "Kohima", region: "Northeast", knownFor: "Hornbill Festival and colourful tribal culture", fact: "The Hornbill Festival brings together all major Naga tribes." },
  { id: "OD", name: "Odisha", capital: "Bhubaneswar", region: "East", knownFor: "Sun Temple and beautiful beaches", fact: "The Konark Sun Temple is shaped like a giant chariot." },
  { id: "PB", name: "Punjab", capital: "Chandigarh", capitalNote: "Chandigarh is shared as the capital of Punjab and Haryana.", region: "North", knownFor: "Golden fields, bhangra, and the Golden Temple", fact: "The Golden Temple in Amritsar is covered in real gold leaf." },
  { id: "RJ", name: "Rajasthan", capital: "Jaipur", region: "North", knownFor: "Desert forts, camels, and colourful cities", fact: "Jaipur is called the Pink City because of its rose-coloured buildings." },
  { id: "SK", name: "Sikkim", capital: "Gangtok", region: "Northeast", knownFor: "Kanchenjunga peak and organic farming", fact: "Sikkim was India's first fully organic-farming state." },
  { id: "TN", name: "Tamil Nadu", capital: "Chennai", region: "South", knownFor: "Grand temples and classical Bharatanatyam dance", fact: "Tamil is one of the world's oldest living languages." },
  { id: "TG", name: "Telangana", capital: "Hyderabad", region: "South", knownFor: "Charminar, biryani, and IT hubs", fact: "Hyderabad's Charminar has four tall arches built in 1591." },
  { id: "TR", name: "Tripura", capital: "Agartala", region: "Northeast", knownFor: "Bamboo crafts and royal palaces", fact: "Ujjayanta Palace in Agartala is a beautiful royal building." },
  { id: "UP", name: "Uttar Pradesh", capital: "Lucknow", region: "North", knownFor: "The Taj Mahal and the river Ganga", fact: "The Taj Mahal in Agra is one of the Seven Wonders of the World." },
  { id: "UK", name: "Uttarakhand", capital: "Dehradun", capitalNote: "Dehradun is the winter capital; Gairsain is the summer capital.", region: "North", knownFor: "Himalayan peaks and holy rivers", fact: "The Ganga and Yamuna rivers both begin in Uttarakhand." },
  { id: "WB", name: "West Bengal", capital: "Kolkata", region: "East", knownFor: "Sweets, trams, and the Sundarbans", fact: "The Sundarbans mangrove forest is home to the Royal Bengal tiger." },
];

export const UNION_TERRITORIES = [
  { id: "AN", name: "Andaman and Nicobar Islands", capital: "Port Blair", knownFor: "Turquoise islands and coral reefs", fact: "The Andamans have hundreds of islands sprinkled in the sea." },
  { id: "CH", name: "Chandigarh", capital: "Chandigarh", knownFor: "Planned gardens and modern design", fact: "Chandigarh was designed by architect Le Corbusier." },
  { id: "DN", name: "Dadra and Nagar Haveli and Daman and Diu", capital: "Daman", knownFor: "Coastal forts and quiet beaches", fact: "This UT was formed by joining two smaller territories in 2020." },
  { id: "DL", name: "Delhi", capital: "New Delhi", knownFor: "India's national capital, forts, and street food", fact: "Delhi has served as a capital city for many centuries of history." },
  { id: "JK", name: "Jammu and Kashmir", capital: "Srinagar", capitalNote: "Srinagar is the summer capital; Jammu is the winter capital.", knownFor: "Dal Lake and snowy valleys", fact: "Shikara boats float across the beautiful Dal Lake in Srinagar." },
  { id: "LA", name: "Ladakh", capital: "Leh", capitalNote: "Leh and Kargil serve as the two main administrative centres.", knownFor: "High mountains, monasteries, and blue lakes", fact: "Pangong Lake in Ladakh changes colour through the day." },
  { id: "LD", name: "Lakshadweep", capital: "Kavaratti", knownFor: "Tiny coral islands in the Arabian Sea", fact: "Lakshadweep means 'a hundred thousand islands' in Sanskrit." },
  { id: "PY", name: "Puducherry", capital: "Puducherry", knownFor: "French-style streets and seaside promenade", fact: "Puducherry has streets with colourful French colonial houses." },
];

// Rough SVG polygons for a simplified India map. Coordinates are approximate
// positions inside a 100x110 viewBox, arranged to resemble India's outline.
// Each region has a unique clickable path.
export const MAP_REGIONS = [
  // Far north
  { id: "JK", label: "J&K", d: "M28,6 L48,4 L58,10 L62,18 L52,22 L40,20 L30,16 Z", cx: 44, cy: 13 },
  { id: "LA", label: "Ladakh", d: "M52,22 L62,18 L74,20 L72,30 L60,32 L52,28 Z", cx: 62, cy: 25 },
  { id: "HP", label: "HP", d: "M40,20 L52,22 L52,28 L46,32 L38,30 Z", cx: 45, cy: 26 },
  { id: "PB", label: "Punjab", d: "M30,26 L40,26 L38,34 L28,34 Z", cx: 33, cy: 30 },
  { id: "CH", label: "CH", d: "M38,30 L42,30 L42,33 L38,33 Z", cx: 40, cy: 31.5 },
  { id: "HR", label: "Haryana", d: "M32,34 L44,34 L44,42 L34,42 Z", cx: 39, cy: 38 },
  { id: "DL", label: "Delhi", d: "M40,40 L44,40 L44,44 L40,44 Z", cx: 42, cy: 42 },
  { id: "UK", label: "UK", d: "M44,30 L54,30 L54,38 L46,40 L44,36 Z", cx: 49, cy: 35 },
  { id: "RJ", label: "Rajasthan", d: "M18,34 L34,34 L34,50 L20,54 L14,46 Z", cx: 24, cy: 44 },
  { id: "UP", label: "UP", d: "M44,42 L64,40 L66,50 L54,54 L44,52 Z", cx: 54, cy: 47 },
  // Northeast strip
  { id: "SK", label: "Sikkim", d: "M70,44 L74,44 L74,48 L70,48 Z", cx: 72, cy: 46 },
  { id: "AR", label: "AR", d: "M78,42 L94,40 L96,48 L82,50 Z", cx: 87, cy: 45 },
  { id: "AS", label: "Assam", d: "M76,48 L92,48 L92,54 L76,54 Z", cx: 84, cy: 51 },
  { id: "NL", label: "NL", d: "M88,52 L94,52 L94,58 L88,58 Z", cx: 91, cy: 55 },
  { id: "MN", label: "MN", d: "M86,58 L92,58 L92,62 L86,62 Z", cx: 89, cy: 60 },
  { id: "MZ", label: "MZ", d: "M82,60 L86,60 L86,66 L82,66 Z", cx: 84, cy: 63 },
  { id: "TR", label: "Tripura", d: "M78,58 L82,58 L82,62 L78,62 Z", cx: 80, cy: 60 },
  { id: "ML", label: "ML", d: "M76,54 L88,54 L88,58 L76,58 Z", cx: 82, cy: 56 },
  // East
  { id: "BR", label: "Bihar", d: "M58,44 L72,44 L72,52 L58,52 Z", cx: 65, cy: 48 },
  { id: "JH", label: "JH", d: "M58,52 L72,52 L72,60 L58,60 Z", cx: 65, cy: 56 },
  { id: "WB", label: "WB", d: "M70,52 L78,52 L78,66 L70,66 Z", cx: 74, cy: 59 },
  { id: "OD", label: "Odisha", d: "M56,60 L72,60 L72,72 L58,74 Z", cx: 64, cy: 66 },
  // Central & west
  { id: "GJ", label: "Gujarat", d: "M8,46 L22,50 L24,60 L14,68 L6,60 Z", cx: 14, cy: 58 },
  { id: "MP", label: "MP", d: "M26,50 L52,52 L56,62 L34,64 L24,60 Z", cx: 38, cy: 58 },
  { id: "CT", label: "CT", d: "M46,60 L58,60 L60,72 L46,72 Z", cx: 53, cy: 66 },
  { id: "MH", label: "MH", d: "M16,64 L46,64 L46,76 L20,78 Z", cx: 30, cy: 71 },
  { id: "TG", label: "TG", d: "M36,74 L52,74 L52,82 L38,82 Z", cx: 44, cy: 78 },
  { id: "AP", label: "AP", d: "M40,82 L58,82 L58,92 L42,94 L38,88 Z", cx: 48, cy: 88 },
  { id: "GA", label: "Goa", d: "M20,80 L26,80 L26,84 L20,84 Z", cx: 23, cy: 82 },
  { id: "KA", label: "Karnataka", d: "M22,82 L40,82 L40,94 L26,96 L20,90 Z", cx: 30, cy: 89 },
  { id: "KL", label: "Kerala", d: "M24,96 L34,96 L34,104 L26,106 Z", cx: 29, cy: 100 },
  { id: "TN", label: "TN", d: "M34,94 L44,94 L44,104 L36,106 L32,100 Z", cx: 38, cy: 100 },
  { id: "PY", label: "PY", d: "M42,98 L46,98 L46,102 L42,102 Z", cx: 44, cy: 100 },
];

// Insets for island territories drawn separately in a chip strip
export const ISLAND_INSETS = ["AN", "LD"];
