// Static India learning data - 28 States + 8 Union Territories
// Data is factual and child-safe. Do not scatter facts elsewhere.

export const REGIONS = ["North", "South", "East", "West", "Central", "Northeast"];

export const STATES = [
  { id: "AP", name: "Andhra Pradesh", capital: "Amaravati", capitalNote: "Amaravati is the state capital; some administrative work also happens in Visakhapatnam.", region: "South", knownFor: "Spicy food, temples, and long sandy coast", fact: "Andhra Pradesh has one of the longest coastlines in India.", languages: ["Telugu", "Urdu", "Hindi"] },
  { id: "AR", name: "Arunachal Pradesh", capital: "Itanagar", region: "Northeast", knownFor: "Sunrise state and misty mountains", fact: "Arunachal Pradesh means 'Land of Dawn-Lit Mountains'.", languages: ["English", "Hindi", "Nyishi", "Adi"] },
  { id: "AS", name: "Assam", capital: "Dispur", region: "Northeast", knownFor: "Tea gardens and the Brahmaputra river", fact: "Assam is famous for its aromatic tea, grown in wide green estates.", languages: ["Assamese", "Bengali", "Bodo", "Hindi"] },
  { id: "BR", name: "Bihar", capital: "Patna", region: "East", knownFor: "Ancient learning at Nalanda and the river Ganga", fact: "Nalanda in Bihar was one of the world's oldest universities.", languages: ["Hindi", "Bhojpuri", "Maithili", "Urdu"] },
  { id: "CT", name: "Chhattisgarh", capital: "Raipur", region: "Central", knownFor: "Forests, waterfalls, and tribal art", fact: "Chitrakote Falls in Chhattisgarh is called 'India's Niagara'.", languages: ["Hindi", "Chhattisgarhi"] },
  { id: "GA", name: "Goa", capital: "Panaji", region: "West", knownFor: "Beaches, coconut palms, and colourful houses", fact: "Goa is India's smallest state by area.", languages: ["Konkani", "Marathi", "English", "Hindi"] },
  { id: "GJ", name: "Gujarat", capital: "Gandhinagar", region: "West", knownFor: "Kites, garba dance, and salt deserts", fact: "The Rann of Kutch turns bright white with salt in winter.", languages: ["Gujarati", "Hindi"] },
  { id: "HR", name: "Haryana", capital: "Chandigarh", capitalNote: "Chandigarh is shared as the capital of Haryana and Punjab and is itself a Union Territory.", region: "North", knownFor: "Wheat fields and traditional wrestling", fact: "Haryana is one of the country's top producers of milk.", languages: ["Hindi", "Punjabi", "Haryanvi"] },
  { id: "HP", name: "Himachal Pradesh", capital: "Shimla", region: "North", knownFor: "Snowy mountains and apple orchards", fact: "The toy train to Shimla is a UNESCO World Heritage railway.", languages: ["Hindi", "Pahari", "Punjabi"] },
  { id: "JH", name: "Jharkhand", capital: "Ranchi", region: "East", knownFor: "Waterfalls, forests, and minerals", fact: "Jharkhand means 'Land of Forests'.", languages: ["Hindi", "Santali", "Urdu", "Bengali"] },
  { id: "KA", name: "Karnataka", capital: "Bengaluru", region: "South", knownFor: "Tech city, palaces, and coffee hills", fact: "Bengaluru is often called the Silicon Valley of India.", languages: ["Kannada", "Urdu", "English", "Hindi"] },
  { id: "KL", name: "Kerala", capital: "Thiruvananthapuram", region: "South", knownFor: "Backwaters, coconuts, and houseboats", fact: "Kerala's backwaters are a network of calm lakes and canals.", languages: ["Malayalam", "English", "Tamil"] },
  { id: "MP", name: "Madhya Pradesh", capital: "Bhopal", region: "Central", knownFor: "Tigers, forts, and the heart of India", fact: "Madhya Pradesh is home to famous tiger reserves like Kanha.", languages: ["Hindi", "Urdu"] },
  { id: "MH", name: "Maharashtra", capital: "Mumbai", region: "West", knownFor: "Bollywood, ports, and the Sahyadri hills", fact: "Mumbai is home to India's biggest film industry, Bollywood.", languages: ["Marathi", "Hindi", "Urdu", "English"] },
  { id: "MN", name: "Manipur", capital: "Imphal", region: "Northeast", knownFor: "The floating Loktak Lake and classical dance", fact: "Loktak Lake has floating patches of vegetation called phumdis.", languages: ["Meitei (Manipuri)", "English", "Hindi"] },
  { id: "ML", name: "Meghalaya", capital: "Shillong", region: "Northeast", knownFor: "Living root bridges and rain", fact: "Meghalaya means 'Abode of Clouds'.", languages: ["Khasi", "Garo", "English", "Hindi"] },
  { id: "MZ", name: "Mizoram", capital: "Aizawl", region: "Northeast", knownFor: "Bamboo dances and green hills", fact: "Mizoram sits on gentle rolling blue-green hills.", languages: ["Mizo", "English", "Hindi"] },
  { id: "NL", name: "Nagaland", capital: "Kohima", region: "Northeast", knownFor: "Hornbill Festival and colourful tribal culture", fact: "The Hornbill Festival brings together all major Naga tribes.", languages: ["English", "Nagamese", "Hindi"] },
  { id: "OD", name: "Odisha", capital: "Bhubaneswar", region: "East", knownFor: "Sun Temple and beautiful beaches", fact: "The Konark Sun Temple is shaped like a giant chariot.", languages: ["Odia", "Hindi", "English"] },
  { id: "PB", name: "Punjab", capital: "Chandigarh", capitalNote: "Chandigarh is shared as the capital of Punjab and Haryana.", region: "North", knownFor: "Golden fields, bhangra, and the Golden Temple", fact: "The Golden Temple in Amritsar is covered in real gold leaf.", languages: ["Punjabi", "Hindi", "English"] },
  { id: "RJ", name: "Rajasthan", capital: "Jaipur", region: "North", knownFor: "Desert forts, camels, and colourful cities", fact: "Jaipur is called the Pink City because of its rose-coloured buildings.", languages: ["Hindi", "Rajasthani", "Urdu"] },
  { id: "SK", name: "Sikkim", capital: "Gangtok", region: "Northeast", knownFor: "Kanchenjunga peak and organic farming", fact: "Sikkim was India's first fully organic-farming state.", languages: ["Nepali", "English", "Hindi", "Bhutia"] },
  { id: "TN", name: "Tamil Nadu", capital: "Chennai", region: "South", knownFor: "Grand temples and classical Bharatanatyam dance", fact: "Tamil is one of the world's oldest living languages.", languages: ["Tamil", "English"] },
  { id: "TG", name: "Telangana", capital: "Hyderabad", region: "South", knownFor: "Charminar, biryani, and IT hubs", fact: "Hyderabad's Charminar has four tall arches built in 1591.", languages: ["Telugu", "Urdu", "Hindi", "English"] },
  { id: "TR", name: "Tripura", capital: "Agartala", region: "Northeast", knownFor: "Bamboo crafts and royal palaces", fact: "Ujjayanta Palace in Agartala is a beautiful royal building.", languages: ["Bengali", "Kokborok", "English", "Hindi"] },
  { id: "UP", name: "Uttar Pradesh", capital: "Lucknow", region: "North", knownFor: "The Taj Mahal and the river Ganga", fact: "The Taj Mahal in Agra is one of the Seven Wonders of the World.", languages: ["Hindi", "Urdu", "Bhojpuri", "Awadhi"] },
  { id: "UK", name: "Uttarakhand", capital: "Dehradun", capitalNote: "Dehradun is the winter capital; Gairsain is the summer capital.", region: "North", knownFor: "Himalayan peaks and holy rivers", fact: "The Ganga and Yamuna rivers both begin in Uttarakhand.", languages: ["Hindi", "Garhwali", "Kumaoni", "Sanskrit"] },
  { id: "WB", name: "West Bengal", capital: "Kolkata", region: "East", knownFor: "Sweets, trams, and the Sundarbans", fact: "The Sundarbans mangrove forest is home to the Royal Bengal tiger.", languages: ["Bengali", "Hindi", "Nepali", "Urdu"] },
];

export const UNION_TERRITORIES = [
  { id: "AN", name: "Andaman and Nicobar Islands", capital: "Port Blair", knownFor: "Turquoise islands and coral reefs", fact: "The Andamans have hundreds of islands sprinkled in the sea.", languages: ["Hindi", "English", "Bengali", "Tamil"] },
  { id: "CH", name: "Chandigarh", capital: "Chandigarh", knownFor: "Planned gardens and modern design", fact: "Chandigarh was designed by architect Le Corbusier.", languages: ["Hindi", "Punjabi", "English"] },
  { id: "DN", name: "Dadra and Nagar Haveli and Daman and Diu", capital: "Daman", knownFor: "Coastal forts and quiet beaches", fact: "This UT was formed by joining two smaller territories in 2020.", languages: ["Gujarati", "Hindi", "Marathi", "English"] },
  { id: "DL", name: "Delhi", capital: "New Delhi", knownFor: "India's national capital, forts, and street food", fact: "Delhi has served as a capital city for many centuries of history.", languages: ["Hindi", "English", "Punjabi", "Urdu"] },
  { id: "JK", name: "Jammu and Kashmir", capital: "Srinagar", capitalNote: "Srinagar is the summer capital; Jammu is the winter capital.", knownFor: "Dal Lake and snowy valleys", fact: "Shikara boats float across the beautiful Dal Lake in Srinagar.", languages: ["Kashmiri", "Dogri", "Hindi", "Urdu"] },
  { id: "LA", name: "Ladakh", capital: "Leh", capitalNote: "Leh and Kargil serve as the two main administrative centres.", knownFor: "High mountains, monasteries, and blue lakes", fact: "Pangong Lake in Ladakh changes colour through the day.", languages: ["Ladakhi", "Hindi", "Urdu", "English"] },
  { id: "LD", name: "Lakshadweep", capital: "Kavaratti", knownFor: "Tiny coral islands in the Arabian Sea", fact: "Lakshadweep means 'a hundred thousand islands' in Sanskrit.", languages: ["Malayalam", "English", "Hindi"] },
  { id: "PY", name: "Puducherry", capital: "Puducherry", knownFor: "French-style streets and seaside promenade", fact: "Puducherry has streets with colourful French colonial houses.", languages: ["Tamil", "English", "French", "Malayalam"] },
];

// Rough SVG polygons removed - real map paths now live in
// /app/frontend/src/data/indiaMapPaths.json (dissolved from
// udit-001/india-maps-data GeoJSON, CC BY).
export const ISLAND_INSETS = ["AN", "LD"];
