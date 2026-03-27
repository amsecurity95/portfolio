// Tropical Map MVP v1 — Static HTML build (no bundler)
// Storage: localStorage (no backend)
// Exposes: window.TM

(function () {
  const LS = {
    users: "tm_users_v1",
    session: "tm_session_v1",
    places: "tm_places_v1",
    counters: "tm_city_counters_v1",
    communes: "tm_communes_v1",
    incidentCodeCounters: "tm_incident_code_counters_v1"
  };

  const now = () => new Date().toISOString();
  const uid = () => (crypto?.randomUUID?.() ?? `id_${Math.random().toString(16).slice(2)}_${Date.now()}`);

  const read = (k, fallback) => {
    try {
      const raw = localStorage.getItem(k);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const seed = () => {
    // Always ensure demo accounts exist (for testing)
    const users = read(LS.users, []);
    const demoAccounts = [
      { id: "u_resident", role: "resident", email: "resident@tropical.map", password: "resident123", commune: "Lubumbashi", emailVerified: true, createdAt: now() },
      { id: "u_business", role: "business", email: "business@tropical.map", password: "business123", commune: "Lubumbashi", emailVerified: true, createdAt: now() },
      { id: "u_admin", role: "admin", email: "admin@tropical.map", password: "admin123", commune: "Lubumbashi", emailVerified: true, createdAt: now() }
    ];
    
    // Merge demo accounts (update if exist, add if missing)
    demoAccounts.forEach(demo => {
      const idx = users.findIndex(u => u.id === demo.id);
      if (idx >= 0) {
        users[idx] = { ...users[idx], ...demo, createdAt: users[idx].createdAt }; // Keep original createdAt
      } else {
        users.push(demo);
      }
    });
    write(LS.users, users);

    // Always ensure demo places exist
    const places = read(LS.places, []);
    const demoPlaces = [
        {
          id: "p_demo_1",
          type: "business",
          status: "approved",
          visibility: "public",
          tropicalCode: "TM-LSH-000001",
          name: "Tropical Market (Demo)",
          commune: "Lubumbashi",
          neighborhood: "Centre",
          landmark: "Près du rond-point",
          address: "Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.664, lng: 27.479, accuracy: 50 },
          photos: [],
          phone: "+243000000000",
          categories: ["Market"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_2",
          type: "home",
          status: "pending",
          visibility: "private",
          tropicalCode: "TM-LSH-000002",
          name: "Résidence d'Aminata (Demo)",
          commune: "Lubumbashi",
          neighborhood: "Kampemba",
          landmark: "Près de l'école primaire",
          address: "Kitumaïni, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.674, lng: 27.489, accuracy: 50 },
          photos: [],
          phone: "+243000000001",
          categories: [],
          createdBy: "u_resident",
          createdAt: now(),
          updatedAt: now()
        },
        {
          id: "p_demo_3",
          type: "business",
          status: "pending",
          visibility: "public",
          tropicalCode: "TM-LSH-000003",
          name: "Restaurant Le Palmier (Demo)",
          commune: "Lubumbashi",
          neighborhood: "Annexe",
          landmark: "Face à la station-service",
          address: "Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.654, lng: 27.469, accuracy: 50 },
          photos: [],
          phone: "+243000000002",
          categories: ["Restaurant", "Food"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now()
        },
        {
          id: "p_demo_4",
          type: "home",
          status: "approved",
          visibility: "private",
          tropicalCode: "TM-LSH-000004",
          name: "Résidence de Jean (Demo)",
          commune: "Lubumbashi",
          neighborhood: "Katuba",
          landmark: "Près du marché central",
          address: "Kiwele, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.659, lng: 27.474, accuracy: 50 },
          photos: [],
          phone: "+243000000003",
          categories: [],
          createdBy: "u_resident",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "Approuvé (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_5",
          type: "business",
          status: "approved",
          visibility: "public",
          tropicalCode: "TM-LSH-000005",
          name: "Restaurant Le Jardin",
          commune: "Kenya",
          neighborhood: "Lido",
          landmark: "Avenue de l'Indépendance",
          address: "Makutano, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.670, lng: 27.485, accuracy: 50 },
          photos: [],
          phone: "+243000000004",
          categories: ["Restaurant", "Food"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_6",
          type: "business",
          status: "approved",
          visibility: "public",
          tropicalCode: "TM-LSH-000006",
          name: "Hôtel Grand Lubumbashi",
          commune: "Lubumbashi",
          neighborhood: "Golf",
          landmark: "Près de l'aéroport",
          address: "Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.655, lng: 27.470, accuracy: 50 },
          photos: [],
          phone: "+243000000005",
          categories: ["Hotel", "Accommodation"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_7",
          type: "business",
          status: "approved",
          visibility: "public",
          tropicalCode: "TM-LSH-000007",
          name: "Cathédrale Saint-Pierre",
          commune: "Lubumbashi",
          neighborhood: "Kenya",
          landmark: "Place de l'Indépendance",
          address: "Makutano, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.668, lng: 27.482, accuracy: 50 },
          photos: [],
          phone: "+243000000006",
          categories: ["Church", "Religious"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_8",
          type: "business",
          status: "approved",
          visibility: "public",
          tropicalCode: "TM-LSH-000008",
          name: "Station Total Centre",
          commune: "Lubumbashi",
          neighborhood: "Makomeno",
          landmark: "Route principale",
          address: "Kiwele, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.662, lng: 27.476, accuracy: 50 },
          photos: [],
          phone: "+243000000007",
          categories: ["Station", "Gas Station"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_9",
          type: "business",
          status: "approved",
          visibility: "public",
          tropicalCode: "TM-LSH-000009",
          name: "Pharmacie Centrale",
          commune: "Katuba",
          neighborhood: "Kisanga",
          landmark: "Près du marché central",
          address: "Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.656, lng: 27.472, accuracy: 50 },
          photos: [],
          phone: "+243000000008",
          categories: ["Pharmacy", "Health"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_10",
          type: "business",
          status: "approved",
          tropicalCode: "TM-LSH-000010",
          name: "Hôpital Général de Lubumbashi",
          commune: "Ruashi",
          neighborhood: "Ruashi",
          landmark: "Route de Kasenga",
          address: "Baudouin, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.650, lng: 27.468, accuracy: 50 },
          photos: [],
          phone: "+243000000009",
          categories: ["Hospital", "Health"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_11",
          type: "business",
          status: "approved",
          tropicalCode: "TM-LSH-000011",
          name: "École Primaire Saint-Joseph",
          commune: "Kamalondo",
          neighborhood: "Kamalondo",
          landmark: "Quartier résidentiel",
          address: "Kiwele, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.658, lng: 27.480, accuracy: 50 },
          photos: [],
          phone: "+243000000010",
          categories: ["School", "Education"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_12",
          type: "business",
          status: "approved",
          tropicalCode: "TM-LSH-000012",
          name: "Banque Commerciale du Congo",
          commune: "Lubumbashi",
          neighborhood: "Golf",
          landmark: "Boulevard Lumumba",
          address: "Kiwele, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.660, lng: 27.478, accuracy: 50 },
          photos: [],
          phone: "+243000000011",
          categories: ["Bank", "Finance"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_13",
          type: "business",
          status: "approved",
          tropicalCode: "TM-LSH-000013",
          name: "Marché Central de Katuba",
          commune: "Katuba",
          neighborhood: "Katuba",
          landmark: "Centre du quartier",
          address: "Lumumba, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.654, lng: 27.474, accuracy: 50 },
          photos: [],
          phone: "+243000000012",
          categories: ["Market", "Shopping"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_14",
          type: "business",
          status: "approved",
          tropicalCode: "TM-LSH-000014",
          name: "Boutique Mode & Style",
          commune: "Kampemba",
          neighborhood: "Bel-Air",
          landmark: "Rue commerçante",
          address: "Baudouin, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.652, lng: 27.470, accuracy: 50 },
          photos: [],
          phone: "+243000000013",
          categories: ["Shop", "Fashion"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_15",
          type: "business",
          status: "approved",
          tropicalCode: "TM-LSH-000015",
          name: "Restaurant Chez Mama",
          commune: "Ruashi",
          neighborhood: "Kalubwe",
          landmark: "Près de l'école",
          address: "Baudouin, Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.648, lng: 27.466, accuracy: 50 },
          photos: [],
          phone: "+243000000014",
          categories: ["Restaurant", "Food"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        },
        {
          id: "p_demo_16",
          type: "business",
          status: "approved",
          tropicalCode: "TM-LSH-000016",
          name: "Hôtel Safari",
          commune: "Kenya",
          neighborhood: "Golf Plateau",
          landmark: "Vue sur la ville",
          address: "Lubumbashi, Haut-Katanga, République Démocratique du Congo",
          location: { lat: -11.666, lng: 27.484, accuracy: 50 },
          photos: [],
          phone: "+243000000015",
          categories: ["Hotel", "Accommodation"],
          createdBy: "u_business",
          createdAt: now(),
          updatedAt: now(),
          inspector: { uid: "u_admin", note: "OK (demo)", validatedAt: now() }
        }
      ];
      
    // Merge demo places (add if missing, keep existing if present)
    demoPlaces.forEach(demo => {
      const idx = places.findIndex(p => p.id === demo.id);
      if (idx >= 0) {
        places[idx] = { ...places[idx], ...demo, createdAt: places[idx].createdAt }; // Keep original createdAt
      } else {
        places.push(demo);
      }
    });
    
      write(LS.places, places);
      const counters = read(LS.counters, {});
      if (!counters.LSH || counters.LSH < 16) {
        write(LS.counters, { ...counters, LSH: 16 });
      }
      
      // Initialize communes data
      const communes = read(LS.communes, []);
      // Always update communes data to ensure it's current
      const lubumbashiCommunes = [
        {
          id: "commune_centre",
          name: "Commune de Lubumbashi (Centre-ville)",
          commune: "Lubumbashi",
          quartiers: ["Makomeno", "Kamalondo", "Golf", "Kenya"],
          description: "Administrative & commercial center",
          bounds: [
            [-11.650, 27.460], // SW
            [-11.650, 27.500], // SE
            [-11.680, 27.500], // NE
            [-11.680, 27.460], // NW
            [-11.650, 27.460]  // Close polygon
          ]
        },
        {
          id: "commune_kampemba",
          name: "Commune de Kampemba",
          commune: "Kampemba",
          quartiers: ["Bel-Air", "Salama", "Kafubu"],
          description: "Mixed residential & industrial areas",
          bounds: [
            [-11.690, 27.480],
            [-11.690, 27.520],
            [-11.720, 27.520],
            [-11.720, 27.480],
            [-11.690, 27.480]
          ]
        },
        {
          id: "commune_kenya",
          name: "Commune de Kenya",
          commune: "Kenya",
          quartiers: ["Lido", "Golf Plateau", "Kabulameshi"],
          description: "Often considered residential / middle to upper class areas",
          bounds: [
            [-11.640, 27.480],
            [-11.640, 27.520],
            [-11.670, 27.520],
            [-11.670, 27.480],
            [-11.640, 27.480]
          ]
        },
        {
          id: "commune_katuba",
          name: "Commune de Katuba",
          commune: "Katuba",
          quartiers: ["Katuba", "Kisanga", "Lufira"],
          description: "Very populated, commercial activity",
          bounds: [
            [-11.660, 27.450],
            [-11.660, 27.490],
            [-11.690, 27.490],
            [-11.690, 27.450],
            [-11.660, 27.450]
          ]
        },
        {
          id: "commune_ruashi",
          name: "Commune de Ruashi",
          commune: "Ruashi",
          quartiers: ["Kalubwe", "Ruashi", "Matoleo"],
          description: "Expanding residential zones, mining influence nearby",
          bounds: [
            [-11.630, 27.440],
            [-11.630, 27.480],
            [-11.660, 27.480],
            [-11.660, 27.440],
            [-11.630, 27.440]
          ]
        },
        {
          id: "commune_kamalondo",
          name: "Commune de Kamalondo",
          commune: "Kamalondo",
          quartiers: ["Kamalondo", "Kapemba"],
          description: "Historical & traditional areas",
          bounds: [
            [-11.700, 27.460],
            [-11.700, 27.500],
            [-11.730, 27.500],
            [-11.730, 27.460],
            [-11.700, 27.460]
          ]
        },
        {
          id: "commune_annexe",
          name: "Commune Annexe",
          commune: "Annexe",
          quartiers: ["Kawama", "Luano", "Munua"],
          description: "Peripheral / semi-rural, fast urban growth",
          bounds: [
            [-11.710, 27.440],
            [-11.710, 27.480],
            [-11.740, 27.480],
            [-11.740, 27.440],
            [-11.710, 27.440]
          ]
        }
      ];
      write(LS.communes, lubumbashiCommunes);
  };

  // -------- Auth --------
  const getSession = () => read(LS.session, null);
  const setSession = (s) => write(LS.session, s);
  const logout = () => localStorage.removeItem(LS.session);

  const getUsers = () => read(LS.users, []);
  const findUserByEmail = (email) => getUsers().find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  const getCurrentUser = () => {
    const s = getSession();
    if (!s?.userId) return null;
    return getUsers().find((u) => u.id === s.userId) ?? null;
  };
  const updateUserAddress = (data) => {
    const s = getSession();
    if (!s?.userId) return null;
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === s.userId);
    if (idx < 0) return null;
    const u = users[idx];
    const updated = {
      ...u,
      addressCity: data.addressCity ?? u.addressCity,
      addressCommune: data.addressCommune ?? u.addressCommune,
      addressNeighborhood: data.addressNeighborhood ?? u.addressNeighborhood,
      addressLandmark: data.addressLandmark ?? u.addressLandmark,
      addressPhone: data.addressPhone ?? u.addressPhone,
      addressLat: data.addressLat ?? u.addressLat,
      addressLng: data.addressLng ?? u.addressLng,
      updatedAt: now()
    };
    users[idx] = updated;
    write(LS.users, users);
    return updated;
  };
  const login = ({ email, password }) => {
    const u = findUserByEmail(email);
    if (!u || u.password !== password) throw new Error("Email ou mot de passe incorrect.");
    if (u.emailVerified === false) throw new Error("Email non vérifié. Vérifiez votre email.");
    setSession({ userId: u.id, at: now() });
    return u;
  };
  const genCode = () => String(Math.floor(100000 + Math.random() * 900000));
  const resetPassword = ({ email, newPassword }) => {
    if (!email || !newPassword) throw new Error("Email et nouveau mot de passe requis.");
    if (String(newPassword).length < 6) throw new Error("Mot de passe trop court (min 6).");
    const users = getUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === String(email).toLowerCase());
    if (idx < 0) throw new Error("Compte introuvable pour cet email.");
    users[idx] = { ...users[idx], password: newPassword, updatedAt: now() };
    write(LS.users, users);
    return users[idx];
  };
  const register = ({ email, password, role, commune }) => {
    if (!email || !password) throw new Error("Email et mot de passe requis.");
    if (findUserByEmail(email)) throw new Error("Cet email est déjà utilisé.");
    if (!["resident", "business"].includes(role)) throw new Error("Rôle invalide.");
    const users = getUsers();
    const u = { 
      id: uid(), 
      role, 
      email, 
      password, 
      commune: commune || "Lubumbashi", 
      createdAt: now(),
      emailVerified: false,
      verificationCode: genCode(),
      verificationExpires: Date.now() + 15 * 60 * 1000 // 15 minutes
    };
    users.push(u);
    write(LS.users, users);
    setSession({ userId: u.id, at: now() });
    return u;
  };
  const verifyEmailCode = ({ email, code }) => {
    if (!email || !code) throw new Error("Email et code requis.");
    const users = getUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === String(email).toLowerCase());
    if (idx < 0) throw new Error("Compte introuvable.");
    const user = users[idx];
    if (user.emailVerified) return true;
    if (!user.verificationCode || !user.verificationExpires) throw new Error("Aucun code actif.");
    if (Date.now() > Number(user.verificationExpires)) throw new Error("Code expiré. Renvoyez un nouveau code.");
    if (String(user.verificationCode) !== String(code).trim()) throw new Error("Code incorrect.");
    users[idx] = { ...user, emailVerified: true, verificationCode: null, verificationExpires: null, updatedAt: now() };
    write(LS.users, users);
    return true;
  };
  const resendVerification = ({ email }) => {
    if (!email) throw new Error("Email requis.");
    const users = getUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === String(email).toLowerCase());
    if (idx < 0) throw new Error("Compte introuvable.");
    const code = genCode();
    users[idx] = { 
      ...users[idx], 
      emailVerified: false, 
      verificationCode: code, 
      verificationExpires: Date.now() + 15 * 60 * 1000, 
      updatedAt: now() 
    };
    write(LS.users, users);
    return code;
  };

  const requireAuth = ({ roles = null, redirectTo = "auth/login.html" } = {}) => {
    // Check API auth first (JWT), then fallback to localStorage
    let u = null;
    if (window.TMAPI && window.TMAPI.USE_BACKEND && window.TMAPI.Auth) {
      u = window.TMAPI.Auth.getCurrentUser();
    }
    if (!u) u = getCurrentUser();
    if (!u) {
      // Get the current path relative to /site/
      let currentPath = window.location.pathname;
      if (currentPath.includes('/site/')) {
        currentPath = currentPath.split('/site/')[1] || '';
      } else if (currentPath.startsWith('/')) {
        currentPath = currentPath.substring(1);
      }
      
      // Calculate relative path to auth/login.html from current location
      // If we're in admin/, we need to go up one level: ../auth/login.html
      // If we're in auth/, we can use: login.html (but redirectTo already has auth/)
      let loginPath = redirectTo;
      if (currentPath.startsWith('admin/') || currentPath === 'admin') {
        loginPath = '../auth/login.html';
      } else if (currentPath.startsWith('dashboard/') || currentPath === 'dashboard') {
        loginPath = '../auth/login.html';
      } else if (!currentPath.startsWith('auth/')) {
        loginPath = 'auth/login.html';
      }
      
      const next = encodeURIComponent(currentPath + window.location.search);
      window.location.href = `${loginPath}?next=${next}`;
      return null;
    }
    if (roles && !roles.includes(u.role)) {
      window.location.href = "index.html";
      return null;
    }
    return u;
  };

  // -------- Places --------
  const getPlaces = () => read(LS.places, []);
  const savePlaces = (places) => write(LS.places, places);
  const getPlaceById = (id) => getPlaces().find((p) => p.id === id) ?? null;

  const normalizeCityCode = (commune) => {
    const c = String(commune || "").trim().toLowerCase();
    if (!c) return "UNK";
    if (c.includes("lubumbashi")) return "LSH";
    const letters = c
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z]/g, "");
    return letters.slice(0, 3).toUpperCase() || "UNK";
  };

  /**
   * Infer city code from coordinates (for covered cities).
   */
  const getCityCodeFromCoords = (lat, lng) => {
    const cities = [
      { code: "LSH", lat: -11.66, lng: 27.48 },
      { code: "KIN", lat: -4.32, lng: 15.31 },
      { code: "KLW", lat: -10.72, lng: 25.47 },
      { code: "MAT", lat: -5.82, lng: 13.46 }
    ];
    let best = cities[0];
    let minDist = Infinity;
    for (const c of cities) {
      const d = Math.hypot(lat - c.lat, lng - c.lng);
      if (d < minDist) { minDist = d; best = c; }
    }
    return best.code;
  };

  /**
   * Generate a deterministic TM code from lat/lng (client-side). Format: TM-CITY-NNNNNN.
   * @param {number} lat
   * @param {number} lng
   * @param {string} [commune] - Optional commune/city name for city code (e.g. "Lubumbashi" -> LSH)
   */
  const generateTropicalCodeFromCoords = (lat, lng, commune) => {
    if (typeof lat !== "number" || typeof lng !== "number" || isNaN(lat) || isNaN(lng)) return null;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
    const city = commune ? normalizeCityCode(commune) : getCityCodeFromCoords(lat, lng);
    const n = Math.abs((Math.round((lat + 90) * 100000) * 1000 + Math.round((lng + 180) * 100000)) % 1000000);
    return `TM-${city}-${String(n).padStart(6, "0")}`;
  };

  const nextTropicalCode = (commune) => {
    const city = normalizeCityCode(commune);
    const counters = read(LS.counters, {});
    let n = Number(counters[city] || 0);
    const places = getPlaces();
    while (true) {
      n += 1;
      const code = `TM-${city}-${String(n).padStart(6, "0")}`;
      if (!places.some((p) => p.tropicalCode === code)) {
        counters[city] = n;
        write(LS.counters, counters);
        return code;
      }
    }
  };

  /** Incident/reaction pin type codes: INC, ACC, EV, ANI, TRA */
  const INCIDENT_TYPE_CODES = {
    incident: "INC",
    accident: "ACC",
    event: "EV",
    wild_animal: "ANI",
    work_road: "TRA"
  };

  /**
   * Generate TM code for incident/reaction pins. Format: TM-LUB-INC-0000001
   * @param {string} type - incident, accident, event, wild_animal, work_road
   * @param {string} [city] - City code (default LUB for Lubumbashi)
   */
  const generateIncidentTropicalCode = (type, city = "LUB") => {
    const typeCode = INCIDENT_TYPE_CODES[type] || "INC";
    const cityCode = (city || "LUB").toUpperCase().slice(0, 3);
    const counters = read(LS.incidentCodeCounters, {});
    const key = typeCode;
    let n = Number(counters[key] || 0);
    n += 1;
    counters[key] = n;
    write(LS.incidentCodeCounters, counters);
    return `TM-${cityCode}-${typeCode}-${String(n).padStart(7, "0")}`;
  };

  const createPlace = ({ type, name, commune, neighborhood, landmark, phone, categories, location, photos, will_store_client_addresses, pinIcon }) => {
    const u = getCurrentUser();
    if (!u) throw new Error("Non connecté.");
    // Special types (airport, hospital, clinic) only for inspectors/admins
    if (["airport", "hospital", "clinic"].includes(type) && u.role !== "admin") throw new Error("Accès refusé.");
    if (!name) throw new Error("Nom requis.");
    if (!commune) throw new Error("Commune requise.");
    if (!neighborhood) throw new Error("Quartier requis.");
    if (!location?.lat || !location?.lng) throw new Error("Localisation requise.");
    if (!photos || !Array.isArray(photos)) throw new Error("Photos invalides.");
    if (!photos || photos.length === 0) throw new Error("Au moins une photo est requise.");

    // Determine visibility: residential (home) = private, business = public
    const visibility = (type === "home") ? "private" : "public";

    const p = {
      id: uid(),
      type,
      status: "pending",
      visibility,
      tropicalCode: nextTropicalCode(commune),
      name,
      commune,
      neighborhood,
      landmark: landmark || "",
      location: { lat: Number(location.lat), lng: Number(location.lng), accuracy: location.accuracy ? Number(location.accuracy) : undefined },
      photos,
      phone: phone || "",
      categories: type === "business" ? (categories || []) : [],
      pinIcon: type === "business" ? (pinIcon || null) : null,
      createdBy: u.id,
      createdAt: now(),
      updatedAt: now(),
      inspector: null
    };
    const places = getPlaces();
    places.unshift(p);
    savePlaces(places);
    return p;
  };

  const updatePlaceOwner = (id, patch) => {
    const u = getCurrentUser();
    if (!u) throw new Error("Non connecté.");
    const places = getPlaces();
    const idx = places.findIndex((p) => p.id === id);
    if (idx < 0) throw new Error("Lieu introuvable.");
    const p = places[idx];
    if (p.createdBy !== u.id && u.role !== "admin") throw new Error("Accès refusé.");

    let nextStatus = p.status;
    if (p.status === "approved") nextStatus = "pending_review";
    if (p.status === "pending_review") nextStatus = "pending_review";
    if (p.status === "pending" || p.status === "rejected") nextStatus = p.status;

    places[idx] = { ...p, ...patch, status: nextStatus, updatedAt: now() };
    savePlaces(places);
    return places[idx];
  };

  const deletePlaceOwner = (id) => {
    const u = getCurrentUser();
    if (!u) throw new Error("Non connecté.");
    const p = getPlaceById(id);
    if (!p) throw new Error("Lieu introuvable.");
    if (u.role === "admin") {
      savePlaces(getPlaces().filter((x) => x.id !== id));
      return true;
    }
    if (u.role === "inspector") {
      savePlaces(getPlaces().filter((x) => x.id !== id));
      return true;
    }
    const canDelete = p.createdBy === u.id && (p.status === "pending" || p.status === "rejected");
    if (!canDelete) throw new Error("Suppression non autorisée.");
    savePlaces(getPlaces().filter((x) => x.id !== id));
    return true;
  };

  // Inspecteur/admin: mise à jour de la position d'un lieu
  const updatePlaceLocation = (id, location) => {
    const u = getCurrentUser();
    if (!u) throw new Error("Non connecté.");
    if (!location?.lat || !location?.lng) throw new Error("Localisation requise.");
    const places = getPlaces();
    const idx = places.findIndex((p) => p.id === id);
    if (idx < 0) throw new Error("Lieu introuvable.");
    const p = places[idx];
    if (u.role !== "admin") throw new Error("Accès refusé.");
    places[idx] = {
      ...p,
      location: { lat: Number(location.lat), lng: Number(location.lng) },
      updatedAt: now()
    };
    savePlaces(places);
    return places[idx];
  };

  const inspectorApprove = ({ id, note, lat, lng }) => {
    const u = getCurrentUser();
    if (!u || u.role !== "admin") throw new Error("Accès refusé.");
    const places = getPlaces();
    const idx = places.findIndex((p) => p.id === id);
    if (idx < 0) throw new Error("Lieu introuvable.");
    const p = places[idx];
    places[idx] = {
      ...p,
      status: "approved",
      location: { ...p.location, lat: Number(lat ?? p.location.lat), lng: Number(lng ?? p.location.lng) },
      inspector: { uid: u.id, note: note || "", validatedAt: now() },
      updatedAt: now()
    };
    savePlaces(places);
    return places[idx];
  };

  const inspectorReject = ({ id, note }) => {
    const u = getCurrentUser();
    if (!u || u.role !== "admin") throw new Error("Accès refusé.");
    if (!note) throw new Error("Note requise.");
    const places = getPlaces();
    const idx = places.findIndex((p) => p.id === id);
    if (idx < 0) throw new Error("Lieu introuvable.");
    const p = places[idx];
    places[idx] = { ...p, status: "rejected", inspector: { uid: u.id, note, validatedAt: now() }, updatedAt: now() };
    savePlaces(places);
    return places[idx];
  };

  // -------- Communes --------
  const getCommunes = () => read(LS.communes, []);
  const getCommuneById = (id) => getCommunes().find((c) => c.id === id) ?? null;
  const getCommuneByName = (name) => getCommunes().find((c) => c.commune.toLowerCase() === name.toLowerCase()) ?? null;
  const getQuartiersByCommune = (communeName) => {
    const commune = getCommuneByName(communeName);
    return commune ? commune.quartiers : [];
  };

  // -------- UI --------
  const q = (sel, root = document) => root.querySelector(sel);
  const setText = (sel, text) => { const el = q(sel); if (el) el.textContent = text; };

  const toast = (msg, kind = "info") => {
    let host = q("#tmToastHost");
    if (!host) {
      host = document.createElement("div");
      host.id = "tmToastHost";
      host.style.position = "fixed";
      host.style.left = "0";
      host.style.right = "0";
      host.style.bottom = "14px";
      host.style.display = "grid";
      host.style.placeItems = "center";
      host.style.zIndex = "9999";
      document.body.appendChild(host);
    }
    const el = document.createElement("div");
    el.className = "banner";
    el.style.boxShadow = "var(--shadow)";
    el.style.maxWidth = "680px";
    el.style.width = "calc(100% - 32px)";
    el.style.borderColor =
      kind === "error" ? "rgba(220,38,38,.35)" : kind === "success" ? "rgba(31,175,106,.35)" : "var(--border)";
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  };

  const buildNav = () => {
    // Don't show navigation on auth pages (login, register, verify, recover)
    const isAuthPage = window.location.pathname.includes('/auth/');
    if (isAuthPage) {
      const nav = q("#tmNavRight");
      if (nav) nav.innerHTML = '';
      return;
    }
    
    // Try API first, fallback to localStorage
    let u = null;
    if (window.TMAPI && window.TMAPI.USE_BACKEND && window.TMAPI.Auth) {
      u = window.TMAPI.Auth.getCurrentUser();
    } else {
      u = getCurrentUser();
    }
    
    const nav = q("#tmNavRight");
    if (!nav) return;
    
    // Show sign-in button if no user is connected
    if (!u) {
      // Calculate relative path to login page based on current page location
      const currentPath = window.location.pathname;
      let loginHref = "auth/login.html";
      if (currentPath.includes("/dashboard/") || currentPath.includes("/admin/")) {
        loginHref = "../auth/login.html";
      } else if (currentPath.includes("/auth/")) {
        loginHref = "login.html";
      }
      
      nav.innerHTML = `
        <a class="btn primary" href="${loginHref}" style="display:inline-flex; align-items:center; gap:8px;">
          <span class="material-icons" style="font-size:18px; vertical-align:middle">login</span>
          <span>Se connecter</span>
        </a>
      `;
      return;
    }
    
    // Calculate relative paths based on current page location
    const currentPath = window.location.pathname;
    const isSubFolder = currentPath.includes("/dashboard/") || currentPath.includes("/admin/");
    const notificationsHref = isSubFolder ? "../notifications.html" : "notifications.html";
    const dashboardHref = isSubFolder ? "../dashboard/new-place.html" : "dashboard/new-place.html";
    
    // Add notifications button with dropdown
    const notificationsBtn = u ? `
      <div class="notifications-dropdown-wrap">
        <button class="btn secondary" id="notificationsBtn" type="button" style="position:relative" title="Notifications" aria-haspopup="true" aria-expanded="false">
          <span class="material-icons" style="font-size:18px; vertical-align:middle">notifications</span>
          <span id="notificationBadge" style="display:none; position:absolute; top:-4px; right:-4px; background:#DC2626; color:white; border-radius:50%; width:18px; height:18px; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center">0</span>
        </button>
        <div class="notifications-dropdown" id="notificationsDropdown" role="menu" aria-label="Notifications" style="display:none">
          <div class="notifications-dropdown-header">
            <span>Notifications</span>
            <a href="${notificationsHref}">Voir tout</a>
          </div>
          <div class="notifications-dropdown-list" id="notificationsDropdownList"></div>
          <div class="notifications-dropdown-empty" id="notificationsDropdownEmpty" style="display:none">
            <span class="material-icons">notifications_none</span>
            Aucune notification
          </div>
        </div>
      </div>
    ` : '';

    nav.innerHTML = `
      ${notificationsBtn}
      <button class="btn logout" id="tmLogoutBtn" type="button">Déconnexion</button>
    `;

    // Notifications dropdown: toggle and load
    const notificationsDropdown = document.getElementById("notificationsDropdown");
    const notificationsBtnEl = document.getElementById("notificationsBtn");
    if (u && notificationsBtnEl && notificationsDropdown) {
      const listEl = document.getElementById("notificationsDropdownList");
      const emptyEl = document.getElementById("notificationsDropdownEmpty");
      const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]));
      const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const diffMs = Date.now() - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1) return "À l'instant";
        if (diffMins < 60) return `Il y a ${diffMins} min`;
        if (diffHours < 24) return `Il y a ${diffHours} h`;
        if (diffDays < 7) return `Il y a ${diffDays} j`;
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
      };
      const iconMap = { place_approved: 'check_circle', place_rejected: 'cancel', modification_request: 'edit', modification_needed: 'edit', approval: 'info', rejection: 'cancel' };
      const colorMap = { place_approved: 'var(--green)', place_rejected: '#DC2626', modification_request: 'var(--yellow)', modification_needed: 'var(--yellow)', approval: 'var(--blue)', rejection: '#DC2626' };
      async function loadNotificationsDropdown() {
        try {
          let notifications = [];
          if (window.TMAPI && window.TMAPI.USE_BACKEND && window.TMAPI.Notifications) {
            notifications = await window.TMAPI.Notifications.getAll();
          }
          const recent = notifications.slice(0, 8);
          if (recent.length === 0) {
            listEl.innerHTML = "";
            emptyEl.style.display = "";
          } else {
            emptyEl.style.display = "none";
            listEl.innerHTML = recent.map((n) => {
              const icon = iconMap[n.type] || 'notifications';
              const color = colorMap[n.type] || 'rgba(10,42,67,0.6)';
              const placeLink = n.place_id ? ` <a href="${dashboardHref}?id=${esc(n.place_id)}" style="font-size:11px; color:var(--green)">Voir</a>` : '';
              return `<div class="notifications-dropdown-item ${n.read ? '' : 'unread'}" data-id="${esc(n.id)}">
                <span class="material-icons notif-icon" style="color:${color}">${icon}</span>
                <div class="notif-content">
                  <div class="notif-title">${esc(n.title)}</div>
                  <div class="notif-message">${esc(n.message)}${placeLink}</div>
                  <div class="notif-time">${formatTimeAgo(n.created_at)}</div>
                </div>
              </div>`;
            }).join("");
            listEl.querySelectorAll(".notifications-dropdown-item").forEach((el) => {
              el.addEventListener("click", async () => {
                const id = el.dataset.id;
                if (id && el.classList.contains("unread") && window.TMAPI?.Notifications?.markAsRead) {
                  try { await window.TMAPI.Notifications.markAsRead(id); } catch (e) {}
                  el.classList.remove("unread");
                }
              });
            });
          }
        } catch (err) {
          listEl.innerHTML = "";
          emptyEl.style.display = "";
          emptyEl.innerHTML = '<span class="material-icons">error</span>Erreur de chargement';
        }
      }
      notificationsBtnEl.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = notificationsDropdown.style.display === "flex";
        if (isOpen) {
          notificationsDropdown.style.display = "none";
          notificationsBtnEl.setAttribute("aria-expanded", "false");
        } else {
          notificationsDropdown.style.display = "flex";
          notificationsBtnEl.setAttribute("aria-expanded", "true");
          loadNotificationsDropdown();
        }
      });
      document.addEventListener("click", (e) => {
        if (!notificationsDropdown.contains(e.target) && !notificationsBtnEl.contains(e.target)) {
          notificationsDropdown.style.display = "none";
          notificationsBtnEl.setAttribute("aria-expanded", "false");
        }
      });
    }

    // Load unread notifications count
    if (u && window.TMAPI && window.TMAPI.USE_BACKEND && window.TMAPI.Notifications) {
      (async () => {
        try {
          const notifications = await window.TMAPI.Notifications.getAll();
          const unreadCount = notifications.filter(n => !n.read).length;
          const badge = document.getElementById("notificationBadge");
          const btn = document.getElementById("notificationsBtn");
          if (badge && btn) {
            if (unreadCount > 0) {
              badge.textContent = unreadCount > 99 ? '99+' : String(unreadCount);
              badge.style.display = "flex";
              btn.classList.add("hasNotifications");
            } else {
              badge.style.display = "none";
              btn.classList.remove("hasNotifications");
            }
          }
        } catch (err) {
          console.error('Error loading notification count:', err);
        }
      })();
    }
    q("#tmLogoutBtn")?.addEventListener("click", () => {
      // Use API logout if available, fallback to localStorage logout
      if (window.TMAPI && window.TMAPI.USE_BACKEND && window.TMAPI.Auth) {
        window.TMAPI.Auth.logout();
      } else {
        logout();
      }
      window.location.href = "index.html";
    });
  };


  // Determine account type based on user role and places
  const getAccountType = (userId) => {
    let user = getUsers().find(u => u.id === userId);
    if (!user) {
      const cur = getCurrentUser();
      if (cur && cur.id === userId) user = cur;
    }
    if (user && user.role === "admin") {
      return { type: "admin", label: "Accès complet", color: "#1FAF6A" };
    }
    const places = getPlaces().filter(p => p.createdBy === userId || p.created_by === userId);
    const hasResidential = places.some(p => p.type === "home");
    const hasBusiness = places.some(p => p.type === "business" || p.type === "airport" || p.type === "hospital" || p.type === "clinic");
    
    if (hasResidential && hasBusiness) {
      return { type: "standard", label: "Standard account", color: "#3B82F6" }; // Blue
    } else if (hasResidential) {
      return { type: "residential", label: "Residential account", color: "#1FAF6A" }; // Green
    } else if (hasBusiness) {
      return { type: "business", label: "Business account", color: "#DC2626" }; // Red
    } else {
      return { type: "standard", label: "Standard account", color: "#6B7280" }; // Gray (no places yet)
    }
  };

  // Reset system function - clears all localStorage data
  const resetSystem = () => {
    Object.values(LS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log("System reset: All localStorage data cleared");
    // Re-seed with fresh data
    seed();
    return true;
  };

  window.TM = {
    seed,
    resetSystem,
    generateTropicalCodeFromCoords,
    generateIncidentTropicalCode,
    getAccountType,
    getCurrentUser,
    updateUserAddress,
    login,
    register,
    verifyEmailCode,
    resendVerification,
    resetPassword,
    logout,
    requireAuth,
    getUsers,
    getPlaces,
    getPlaceById,
    createPlace,
    updatePlaceOwner,
    updatePlaceLocation,
    deletePlaceOwner,
    inspectorApprove,
    inspectorReject,
    getCommunes,
    getCommuneById,
    getCommuneByName,
    getQuartiersByCommune,
    q,
    setText,
    toast,
    buildNav
  };

  // auto init
  seed();
  document.addEventListener("DOMContentLoaded", () => buildNav());
})();


