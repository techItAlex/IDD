export type Mode =
  "jeepney" | "bus" | "mrt" | "lrt" | "uv" | "taxi" | "train" | "walk";
export type Route = {
  id: string;
  title: string;
  origin: string;
  destination: string;
  modes: Mode[];
  fare: number;
  totalMinutes: number;
  walkingMinutes: number;
  walkingMeters: number;
  transfers: number;
  exposure: "sheltered" | "partial" | "exposed";
  steps: { mode: Mode; text: string; minutes: number; fare?: number }[];
  tags: string[];
  tips: string[];
  description?: string;
  imageKey?: string;
  imageUrl?: string;
  rating: number;
  ratingCount: number;
  status: "verified" | "unverified" | "checking" | "pending";
  authorId: string;
  trending?: boolean;
  helpfulCount: number;
  timeOfDay?: string[];
};
export const routes: Route[] = [
  {
    id: "r1",
    title: "LRT-2 Santolan → Cubao",
    origin: "Santolan",
    destination: "Araneta Center-Cubao",
    modes: ["lrt"],
    fare: 15,
    totalMinutes: 25,
    walkingMinutes: 4,
    walkingMeters: 280,
    transfers: 0,
    exposure: "sheltered",
    steps: [
      { mode: "walk", text: "Walk to Santolan LRT-2 station", minutes: 4 },
      {
        mode: "lrt",
        text: "Ride LRT-2 to Araneta Center-Cubao",
        minutes: 17,
        fare: 15,
      },
      { mode: "walk", text: "Follow signs to Araneta Center", minutes: 4 },
    ],
    tags: ["Fast", "Beginner friendly", "Sheltered"],
    tips: ["Avoid rush hour (6–9 AM, 4–7 PM)", "Keep your Beep card ready"],
    rating: 4.8,
    ratingCount: 124,
    status: "verified",
    authorId: "u-mika",
    trending: true,
    helpfulCount: 32,
    timeOfDay: ["morning", "midday", "evening"],
  },
  {
    id: "r2",
    title: "MRT-3 + Jeepney",
    origin: "Cubao",
    destination: "BGC",
    modes: ["mrt", "jeepney"],
    fare: 42,
    totalMinutes: 65,
    walkingMinutes: 10,
    walkingMeters: 650,
    transfers: 1,
    exposure: "partial",
    steps: [
      {
        mode: "walk",
        text: "Walk to Araneta Center-Cubao MRT station",
        minutes: 5,
      },
      {
        mode: "mrt",
        text: "Ride MRT-3 to Ayala station",
        minutes: 23,
        fare: 28,
      },
      {
        mode: "walk",
        text: "Walk to the BGC bus and jeepney terminal",
        minutes: 5,
      },
      {
        mode: "jeepney",
        text: "Ride a BGC-bound jeepney to your stop",
        minutes: 27,
        fare: 14,
      },
      { mode: "walk", text: "Walk to your destination", minutes: 5 },
    ],
    tags: ["Cheapest", "Crowded", "Fast"],
    tips: [
      "Sit near the front for a faster drop-off",
      "Bring exact fare",
      "Avoid rush hour (6–9 AM, 4–7 PM)",
    ],
    rating: 4.7,
    ratingCount: 112,
    status: "verified",
    authorId: "u-mika",
    trending: true,
    helpfulCount: 45,
    timeOfDay: ["morning", "midday", "evening"],
  },
  {
    id: "r3",
    title: "MRT-3 + Bus",
    origin: "Cubao",
    destination: "BGC (via Ayala)",
    modes: ["mrt", "bus"],
    fare: 56,
    totalMinutes: 80,
    walkingMinutes: 12,
    walkingMeters: 900,
    transfers: 2,
    exposure: "partial",
    steps: [
      {
        mode: "mrt",
        text: "Ride MRT-3 from Cubao to Ayala",
        minutes: 25,
        fare: 28,
      },
      { mode: "walk", text: "Walk to the BGC Bus terminal", minutes: 7 },
      {
        mode: "bus",
        text: "Take the BGC bus to your stop",
        minutes: 38,
        fare: 28,
      },
      { mode: "walk", text: "Walk to your destination", minutes: 10 },
    ],
    tags: ["Sheltered", "Beginner friendly"],
    tips: [
      "Buy a BGC bus ticket before boarding",
      "Check the bus route at the terminal",
    ],
    rating: 4.6,
    ratingCount: 98,
    status: "verified",
    authorId: "u-renz",
    helpfulCount: 21,
    timeOfDay: ["morning", "midday"],
  },
  {
    id: "r4",
    title: "Jeepney + Bus",
    origin: "Cubao",
    destination: "BGC",
    modes: ["jeepney", "bus"],
    fare: 38,
    totalMinutes: 100,
    walkingMinutes: 15,
    walkingMeters: 1100,
    transfers: 1,
    exposure: "exposed",
    steps: [
      {
        mode: "jeepney",
        text: "Ride a jeepney toward Guadalupe",
        minutes: 48,
        fare: 18,
      },
      { mode: "walk", text: "Walk to the bus stop", minutes: 7 },
      { mode: "bus", text: "Take a bus toward BGC", minutes: 35, fare: 20 },
      { mode: "walk", text: "Walk to your destination", minutes: 10 },
    ],
    tags: ["Cheapest", "Less crowded"],
    tips: ["Bring exact fare", "Allow extra time during peak hours"],
    rating: 4.1,
    ratingCount: 52,
    status: "checking",
    authorId: "u-jasper",
    helpfulCount: 8,
    timeOfDay: ["midday", "evening"],
  },
  {
    id: "r5",
    title: "UV Express",
    origin: "PITX",
    destination: "NAIA Terminal 3",
    modes: ["uv"],
    fare: 45,
    totalMinutes: 35,
    walkingMinutes: 5,
    walkingMeters: 350,
    transfers: 0,
    exposure: "partial",
    steps: [
      { mode: "walk", text: "Head to the UV Express bay at PITX", minutes: 5 },
      {
        mode: "uv",
        text: "Ride the airport-bound UV Express",
        minutes: 25,
        fare: 45,
      },
      { mode: "walk", text: "Follow signs to Terminal 3", minutes: 5 },
    ],
    tags: ["Fast", "Beginner friendly"],
    tips: [
      "Confirm the terminal before boarding",
      "Keep luggage close during busy hours",
    ],
    rating: 4.5,
    ratingCount: 64,
    status: "verified",
    authorId: "u-carlo",
    trending: true,
    helpfulCount: 15,
    timeOfDay: ["morning", "midday", "evening"],
  },
  {
    id: "r6",
    title: "MRT-3 + Skybridge",
    origin: "Cubao",
    destination: "SM North",
    modes: ["mrt", "walk"],
    fare: 20,
    totalMinutes: 35,
    walkingMinutes: 8,
    walkingMeters: 550,
    transfers: 0,
    exposure: "sheltered",
    steps: [
      {
        mode: "mrt",
        text: "Ride MRT-3 from Cubao to North Avenue",
        minutes: 22,
        fare: 20,
      },
      { mode: "walk", text: "Use the station walkway to SM North", minutes: 8 },
      {
        mode: "walk",
        text: "Walk to your destination inside the mall",
        minutes: 5,
      },
    ],
    tags: ["Sheltered", "Beginner friendly", "Fast"],
    tips: ["Use MRT-3 (not LRT) for North Avenue", "The walkway is sheltered"],
    rating: 4.7,
    ratingCount: 86,
    status: "verified",
    authorId: "u-renz",
    helpfulCount: 29,
    timeOfDay: ["morning", "midday", "evening"],
  },
  {
    id: "r7",
    title: "LRT-2 + Jeepney",
    origin: "Cubao",
    destination: "UP Diliman",
    modes: ["lrt", "jeepney"],
    fare: 37,
    totalMinutes: 70,
    walkingMinutes: 12,
    walkingMeters: 850,
    transfers: 1,
    exposure: "partial",
    steps: [
      {
        mode: "lrt",
        text: "Ride LRT-2 from Araneta Center-Cubao to Katipunan",
        minutes: 14,
        fare: 20,
      },
      {
        mode: "walk",
        text: "Walk to the jeepney stop outside Katipunan station",
        minutes: 4,
      },
      {
        mode: "jeepney",
        text: "Ride a UP Ikot or Philcoa jeepney into UP Diliman",
        minutes: 37,
        fare: 13,
      },
      { mode: "walk", text: "Walk to your building", minutes: 15 },
    ],
    tags: ["Beginner friendly", "Less crowded"],
    tips: ["Sit near the front for a faster drop-off", "Bring exact fare"],
    rating: 4.3,
    ratingCount: 31,
    status: "verified",
    authorId: "u-liza",
    helpfulCount: 11,
    timeOfDay: ["morning", "midday"],
  },
  {
    id: "r8",
    title: "Jeepney",
    origin: "Baclaran",
    destination: "SM Manila",
    modes: ["jeepney"],
    fare: 18,
    totalMinutes: 45,
    walkingMinutes: 6,
    walkingMeters: 400,
    transfers: 0,
    exposure: "exposed",
    steps: [
      {
        mode: "walk",
        text: "Walk to the Manila-bound jeepney stop",
        minutes: 3,
      },
      {
        mode: "jeepney",
        text: "Ride a jeepney to Manila City Hall",
        minutes: 36,
        fare: 18,
      },
      { mode: "walk", text: "Walk to SM Manila", minutes: 6 },
    ],
    tags: ["Cheapest", "Crowded", "Less safe at night"],
    tips: [
      "Ask the driver to let you know near City Hall",
      "Avoid rush hour (6–9 AM, 4–7 PM)",
    ],
    rating: 4.2,
    ratingCount: 76,
    status: "unverified",
    authorId: "u-jasper",
    helpfulCount: 13,
    timeOfDay: ["morning", "midday", "evening"],
  },
];
export const users = [
  { id: "u-alex", name: "Alex Santos", handle: "@alexsantos", verified: false },
  { id: "u-mika", name: "Mika Reyes", handle: "@mikareyes", verified: true },
  {
    id: "u-jasper",
    name: "Jasper Reyes",
    handle: "@jasperreyes",
    verified: false,
  },
  {
    id: "u-carlo",
    name: "Carlo Dela Cruz",
    handle: "@carlodc",
    verified: false,
  },
  { id: "u-liza", name: "Liza Santos", handle: "@lizas", verified: false },
  { id: "u-renz", name: "Renz Aquino", handle: "@renzaquino", verified: true },
];
export type Question = {
  id: string;
  type: "direction" | "route";
  title: string;
  body: string;
  tags: string[];
  askerId: string;
  timeAgo: string;
  upvotes: number;
  routeId?: string;
  answerIds: string[];
  acceptedAnswerId?: string;
};
export const initialQuestions: Question[] = [
  {
    id: "q1",
    type: "direction",
    title: "How do I get to SM North from Cubao?",
    body: "First time commuting this route. Which station should I use?",
    tags: ["mrt", "beginner friendly"],
    askerId: "u-jasper",
    timeAgo: "2h ago",
    upvotes: 34,
    answerIds: ["a1", "a2", "a3"],
    acceptedAnswerId: "a1",
  },
  {
    id: "q2",
    type: "route",
    title: "May dumadaan pa bang jeep ng Zapote sa 7PM?",
    body: "Will be heading home after work. Thanks!",
    tags: ["jeepney", "safety"],
    askerId: "u-liza",
    timeAgo: "4h ago",
    upvotes: 12,
    routeId: "r8",
    answerIds: ["a4", "a5", "a6"],
  },
  {
    id: "q3",
    type: "direction",
    title: "Safe ba ang P2P bus from Ayala to NAIA at night?",
    body: "My flight arrives late, around 10pm.",
    tags: ["safety", "bus"],
    askerId: "u-carlo",
    timeAgo: "Yesterday",
    upvotes: 28,
    answerIds: ["a7", "a8", "a9"],
  },
  {
    id: "q4",
    type: "direction",
    title: "May jeep ba mula Pasig Palengke papuntang Ortigas?",
    body: "Any tips for this route?",
    tags: ["jeepney", "fare"],
    askerId: "u-mika",
    timeAgo: "Yesterday",
    upvotes: 8,
    answerIds: ["a10"],
  },
  {
    id: "q5",
    type: "direction",
    title: "How do I get from Cubao to BGC?",
    body: "Looking for the fastest and easiest option.",
    tags: ["mrt", "jeepney", "bgc"],
    askerId: "u-renz",
    timeAgo: "2 days ago",
    upvotes: 41,
    answerIds: ["a11", "a12", "a13"],
  },
  {
    id: "q6",
    type: "direction",
    title: "May dumadaan po bang jeep pa-Philcoa from SM North?",
    body: "Salamat po!",
    tags: ["jeepney", "fare"],
    askerId: "u-jasper",
    timeAgo: "2 days ago",
    upvotes: 34,
    answerIds: ["a14"],
  },
  {
    id: "q7",
    type: "route",
    title: "Is it safe to commute at night in Makati?",
    body: "Any well-lit routes you recommend?",
    tags: ["safety", "makati"],
    askerId: "u-liza",
    timeAgo: "3 days ago",
    upvotes: 16,
    answerIds: ["a15"],
  },
  {
    id: "q8",
    type: "direction",
    title: "May UV Express ba sa MOA ng 6AM?",
    body: "Going to the airport early.",
    tags: ["uv", "fare"],
    askerId: "u-carlo",
    timeAgo: "3 days ago",
    upvotes: 7,
    answerIds: ["a16"],
  },
  {
    id: "q-own",
    type: "direction",
    title: "Best way to get to Makati from Quezon City?",
    body: "I’m new to the commute and would appreciate route advice.",
    tags: ["mrt", "beginner friendly"],
    askerId: "u-alex",
    timeAgo: "1h ago",
    upvotes: 3,
    answerIds: ["a17"],
  },
];
