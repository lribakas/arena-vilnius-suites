export const suites = [
  {
    id: "presidential",
    name: "Presidential Suite",
    tagline: "The ultimate arena experience",
    capacity: "20-30 guests",
    capacityNum: 30,
    price: "From €5,000",
    priceNum: 5000,
    eventTypes: ["concerts", "basketball", "corporate"],
    image: null,
    gallery: [],
    features: ["Private bar & lounge", "Personal concierge", "Premium catering", "VIP parking (6 spots)", "Private entrance", "4K screens", "Climate control", "Dedicated restroom"],
    description: "Our flagship Presidential Suite offers an unrivaled luxury experience with panoramic arena views, a private bar, gourmet catering, and impeccable service. Perfect for high-profile corporate entertaining or exclusive celebrations.",
    catering: "Full gourmet menu with premium spirits, champagne, and fine wines. Custom menu available upon request.",
    included: ["Dedicated suite host", "Pre-event access (2 hours)", "Post-event lounge", "Personalized branding options", "High-speed WiFi", "Premium sound system"]
  },
  {
    id: "executive",
    name: "Executive Suite",
    tagline: "Refined corporate hospitality",
    capacity: "12-18 guests",
    capacityNum: 18,
    price: "From €3,500",
    priceNum: 3500,
    eventTypes: ["concerts", "basketball", "corporate"],
    image: null,
    gallery: [],
    features: ["Private bar", "Premium catering", "VIP parking (4 spots)", "Private entrance", "3 HD screens", "Lounge seating"],
    description: "The Executive Suite combines sophisticated design with world-class amenities. Ideal for corporate hospitality, client entertainment, and memorable celebrations with an intimate atmosphere.",
    catering: "Curated menu with premium beverages and seasonal specialties.",
    included: ["Dedicated host", "Pre-event access (1 hour)", "High-speed WiFi", "Premium sound"]
  },
  {
    id: "skybox",
    name: "Skybox Lounge",
    tagline: "Elevated views, elevated experience",
    capacity: "8-12 guests",
    capacityNum: 12,
    price: "From €2,000",
    priceNum: 2000,
    eventTypes: ["concerts", "basketball", "shows"],
    image: null,
    gallery: [],
    features: ["Semi-private space", "Premium seating", "Dedicated bar service", "VIP parking (2 spots)", "HD screens", "Panoramic views"],
    description: "The Skybox Lounge offers a premium elevated vantage point with stunning panoramic views of the arena floor. A perfect blend of exclusivity and atmosphere for small groups seeking a memorable experience.",
    catering: "Premium finger food and beverage packages available.",
    included: ["Priority access", "High-speed WiFi", "Coat check service"]
  },
  {
    id: "courtside",
    name: "Courtside Club",
    tagline: "Front row, backstage access",
    capacity: "4-8 guests",
    capacityNum: 8,
    price: "From €1,500",
    priceNum: 1500,
    eventTypes: ["basketball", "shows"],
    image: null,
    gallery: [],
    features: ["Floor-level seats", "Pre-show lounge access", "Meet & greet opportunities", "VIP parking (2 spots)", "Premium dining"],
    description: "Get closer to the action than ever before. The Courtside Club puts you front row with exclusive backstage access, premium dining, and the chance to meet performers and athletes.",
    catering: "Gourmet dining experience with premium cocktails.",
    included: ["Floor-level premium seats", "Backstage access", "Exclusive lounge", "Premium parking"]
  },
  {
    id: "loge-box",
    name: "Loge Box",
    tagline: "Intimate luxury for every event",
    capacity: "4-6 guests",
    capacityNum: 6,
    price: "From €800",
    priceNum: 800,
    eventTypes: ["concerts", "basketball", "shows", "corporate"],
    image: null,
    gallery: [],
    features: ["Semi-private box", "Comfortable premium seating", "In-seat service", "Dedicated screen", "Premium sightlines"],
    description: "Our Loge Boxes offer an intimate premium experience with exceptional sightlines and attentive in-seat service. An affordable luxury option for smaller groups wanting to elevate their event experience.",
    catering: "Food and beverage packages with in-seat delivery.",
    included: ["Priority entry", "In-seat service", "High-speed WiFi"]
  },
  {
    id: "terrace",
    name: "The Terrace",
    tagline: "Open-air premium social space",
    capacity: "30-50 guests",
    capacityNum: 50,
    price: "From €8,000",
    priceNum: 8000,
    eventTypes: ["concerts", "corporate"],
    image: null,
    gallery: [],
    features: ["Open-air terrace", "Full bar & lounge", "DJ booth", "Panoramic city views", "VIP parking (10 spots)", "Private entrance", "Multiple screens"],
    description: "The Terrace is our most expansive premium space — a spectacular open-air venue perfect for large corporate events, product launches, and exclusive celebrations with stunning city views.",
    catering: "Full-service catering with live cooking stations and premium bar.",
    included: ["Event coordinator", "Custom branding", "Professional AV setup", "Pre & post event access", "Security detail"]
  }
];

export const events = [
  {
    id: "ev1",
    title: "EuroLeague Basketball: Žalgiris vs Barcelona",
    category: "basketball",
    date: "2026-05-22",
    time: "19:00",
    image: null,
    availableSuites: ["presidential", "executive", "skybox", "courtside", "loge-box"],
    description: "Experience the thrill of EuroLeague basketball in ultimate luxury."
  },
  {
    id: "ev2",
    title: "Ed Sheeran — Mathematics Tour",
    category: "concerts",
    date: "2026-06-15",
    time: "20:00",
    image: null,
    availableSuites: ["presidential", "executive", "skybox", "loge-box", "terrace"],
    description: "An unforgettable night of music from one of the world's biggest artists."
  },
  {
    id: "ev3",
    title: "Cirque du Soleil — KOOZA",
    category: "shows",
    date: "2026-07-03",
    time: "19:30",
    image: null,
    availableSuites: ["executive", "skybox", "courtside", "loge-box"],
    description: "The world-renowned circus spectacular comes to Vilnius."
  },
  {
    id: "ev4",
    title: "Tech Leaders Summit 2026",
    category: "corporate",
    date: "2026-09-10",
    time: "09:00",
    image: null,
    availableSuites: ["presidential", "executive", "terrace"],
    description: "The premier technology conference for Baltic business leaders."
  },
  {
    id: "ev5",
    title: "Lithuanian Basketball League Finals",
    category: "basketball",
    date: "2026-05-30",
    time: "18:00",
    image: null,
    availableSuites: ["presidential", "executive", "skybox", "courtside", "loge-box"],
    description: "The biggest night in Lithuanian basketball — be part of history."
  },
  {
    id: "ev6",
    title: "Coldplay — Music of the Spheres",
    category: "concerts",
    date: "2026-08-20",
    time: "20:30",
    image: null,
    availableSuites: ["presidential", "executive", "skybox", "loge-box", "terrace"],
    description: "A spectacular audiovisual concert experience like no other."
  }
];

export const testimonials = [
  {
    name: "Andrius Kubilius",
    role: "CEO, Baltic Ventures",
    text: "The Presidential Suite exceeded every expectation. Our clients were absolutely blown away by the service and atmosphere. This is how corporate hospitality should be done.",
    avatar: null
  },
  {
    name: "Maria Johansson",
    role: "VP Marketing, Nordic Tech Group",
    text: "We hosted our product launch at The Terrace and it was perfection. The team at Arena Vilnius handled everything flawlessly. Already planning our next event.",
    avatar: null
  },
  {
    name: "Tomas Vaitkus",
    role: "Managing Partner, LT Capital",
    text: "From the moment we arrived, every detail was impeccable. The Executive Suite provided the perfect setting for entertaining our international investors.",
    avatar: null
  }
];

export const benefits = [
  {
    title: "Private Entrance & Parking",
    description: "Skip the crowds with dedicated VIP access and reserved premium parking.",
    icon: "car"
  },
  {
    title: "World-Class Catering",
    description: "Gourmet cuisine and premium beverages curated by top chefs.",
    icon: "utensils"
  },
  {
    title: "Dedicated Concierge",
    description: "Your personal host ensures every detail is perfect from start to finish.",
    icon: "concierge"
  },
  {
    title: "Custom Branding",
    description: "Personalize your suite with corporate branding and custom setups.",
    icon: "palette"
  },
  {
    title: "Premium Technology",
    description: "4K screens, surround sound, and high-speed connectivity throughout.",
    icon: "monitor"
  },
  {
    title: "Flexible Packages",
    description: "From single events to full-season packages — tailored to your needs.",
    icon: "package"
  }
];