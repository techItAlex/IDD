import type { RouteInput } from "./lib/buildRoute";

// Collected routes (r9–r100). Add one entry per route; copy the template below.
// Derived automatically: id, title, fare, totalMinutes, walkingMinutes,
// walkingMeters, transfers, modes, rating, status. Photos: put <id>.jpg in
// src/assets/images/routes/ (e.g. r12.jpg) — no code change needed.
//
// {
//   n: 9,
//   origin: "Santolan",
//   destination: "Araneta Center-Cubao",
//   steps: [
//     ["walk", "Walk to Santolan LRT-2 station", 4],
//     ["lrt", "Ride LRT-2 to Araneta Center-Cubao", 17, 15],
//     ["walk", "Follow signs to Araneta Center", 4],
//   ],
//   tags: ["Fast", "Beginner friendly", "Sheltered"],
//   exposure: "sheltered", // sheltered | partial | exposed
//   timeOfDay: ["morning", "midday", "evening"], // + "night"
//   tips: ["Avoid rush hour (6–9 AM, 4–7 PM)", "Keep your Beep card ready"],
//   description: "Direct LRT-2 ride with no transfers.", // optional
// },
export const collectedRoutes: RouteInput[] = [
  {
    n: 9,
    origin: "Pasay Rotonda (Metropoint Mall / Taft Ave)",
    destination: "Pasay City Hall (F.B. Harrison St)",
    steps: [
      ["walk", "Go down the MRT/LRT footbridge toward the jeepney terminal near Metropoint Mall / Lions Road.", 2],
      ["jeepney", "Board an M. Reyes–Libertad jeepney. Get off in front of Pasay City Hall along F.B. Harrison St.", 9, 14],
      ["walk", "Walk straight into the main entrance of Pasay City Hall.", 1],
    ],
    tags: ["Fast", "Cheapest", "Beginner friendly"],
    exposure: "partial",
    timeOfDay: ["morning", "midday", "afternoon"],
    tips: [
      "Pasay City Hall offices are open weekdays from 8:00 AM to 5:00 PM.",
      "Look for the jeepney line along Lions Road beside Metropoint Mall, and tell the driver you are getting off at City Hall.",
    ],
    description: "Direct jeepney ride from Rotonda straight to Pasay City Hall along F.B. Harrison Street.",
    dateChecked: "November 4, 2026",
  },
  {
    n: 10,
    origin: "Pasay City Hall (F.B. Harrison St)",
    destination: "Pasay Rotonda (Metropoint Mall / Taft Ave)",
    steps: [
      ["walk", "Walk out of City Hall and safely cross the street to the other side of F.B. Harrison Street.", 2],
      ["jeepney", "Wave down an M. Reyes–Libertad jeepney. Ask the driver to drop you off in front of Metropoint Mall along Taft Avenue.", 10, 14],
      ["walk", "Walk toward the stairs beside Metropoint Mall to reach LRT-1 EDSA or MRT-3 Taft station.", 2],
    ],
    tags: ["Fast", "Cheapest", "Beginner friendly"],
    exposure: "partial",
    timeOfDay: ["morning", "midday", "afternoon"],
    tips: [
      "M. Reyes jeepneys run until about 7:30–8:00 PM.",
      "For a late-night trip, take a quick tricycle to Libertad or walk toward Taft Avenue, where jeepneys run all night.",
    ],
    description: "Daytime and early-evening jeepney return from Pasay City Hall to Metropoint Mall at Pasay Rotonda.",
    dateChecked: "November 5, 2026",
  },
  {
    n: 11,
    origin: "LRT-1 Libertad Station (Taft Ave / Arnaiz Ave)",
    destination: "Cuneta Astrodome (Main Entrance)",
    steps: [
      ["walk", "Go down the Libertad Station stairs and safely cross Arnaiz Avenue toward the side across from Victory Pasay Mall.", 2],
      ["jeepney", "Ride a Dominga or M. Reyes–Libertad jeepney. Get off at F.B. Harrison Street near Derham Park.", 7, 14],
      ["walk", "Walk straight through Derham Park to the main front doors of Cuneta Astrodome.", 4],
    ],
    tags: ["Fast", "Cheapest", "Beginner friendly"],
    exposure: "partial",
    timeOfDay: ["morning", "midday", "afternoon"],
    tips: [
      "Ask the driver to drop you off at Derham Park or Petron.",
      "Bring exact fare during event days, when jeepneys fill up quickly.",
    ],
    description: "Direct jeepney from LRT-1 Libertad to F.B. Harrison, followed by a short walk across Derham Park to Cuneta Astrodome.",
    dateChecked: "November 5, 2026",
  },
  {
    n: 12,
    origin: "Cuneta Astrodome (Main Entrance)",
    destination: "LRT-1 Libertad Station (Taft Ave / Arnaiz Ave)",
    steps: [
      ["walk", "Exit the dome through F.B. Harrison Street by Petron, then cross to the other side.", 4],
      ["jeepney", "Ride a Dominga or M. Reyes–Libertad jeepney. Ask the driver to drop you near LRT-1 Libertad Station.", 8, 14],
      ["walk", "Walk to the covered stairs along Taft Avenue and go up to LRT-1 Libertad Station.", 2],
    ],
    tags: ["Cheapest", "Beginner friendly", "Fast"],
    exposure: "partial",
    timeOfDay: ["morning", "midday", "afternoon"],
    tips: [
      "Inner routes stop running around 7:30–8:00 PM.",
      "If an event ends late, walk toward Roxas Boulevard or EDSA for 24-hour rides.",
    ],
    description: "Short walk through Derham Park to F.B. Harrison, then a direct jeepney ride back to LRT-1 Libertad.",
    dateChecked: "November 5, 2026",
  },
  {
    n: 13,
    origin: "Pasay Rotonda (EDSA / Taft Ave)",
    destination: "SM Mall of Asia (Globe / Terminal)",
    steps: [
      ["walk", "Walk to the sidewalk in front of Chowking or McDonald's near Metropoint.", 2],
      ["jeepney", "Ride a traditional or modern MOA-bound jeepney along EDSA to the MOA jeepney stop.", 17, 14],
      ["walk", "Take the stairs or escalator up to the elevated walkway inside the mall.", 1],
    ],
    tags: ["Cheapest", "Crowded", "Beginner friendly"],
    exposure: "partial",
    timeOfDay: ["morning", "midday", "afternoon", "night"],
    tips: [
      "Watch your pockets and bags while boarding along the curb.",
      "Jeepneys run 24/7, but expect busier rides during afternoon rush.",
    ],
    description: "Direct jeepney ride along EDSA from outside Chowking or McDonald's to SM Mall of Asia.",
    dateChecked: "November 6, 2026",
  },
  {
    n: 14,
    origin: "SM Mall of Asia (Globe / Terminal)",
    destination: "Pasay Rotonda (EDSA / Taft Ave)",
    steps: [
      ["walk", "Walk to the MOA South Transport Terminal beside SM Hypermarket.", 1],
      ["jeepney", "Ride a Malibay or EDSA–Taft jeepney to Pasay Rotonda.", 20, 14],
      ["walk", "Walk toward Metropoint Mall or the station entrances.", 1],
    ],
    tags: ["Cheapest", "Crowded", "Beginner friendly"],
    exposure: "partial",
    timeOfDay: ["morning", "midday", "afternoon", "night"],
    tips: [
      "The longest terminal queues happen around mall closing, from 8:00 PM to 10:00 PM.",
      "Past midnight, jeepneys wait along the outer road near the BPO towers instead of the inner bays.",
    ],
    description: "Direct jeepney ride from the MOA South Terminal along EDSA back to Pasay Rotonda.",
    dateChecked: "November 6, 2026",
  },
  {
    n: 15,
    origin: "LRT-1 Gil Puyat Station (Taft Ave)",
    destination: "Star City (CCP Complex)",
    steps: [
      ["walk", "Walk to the sidewalk beside Wendy's and DLTB along Buendia.", 1],
      ["jeepney", "Board an orange multicab displaying the signboard CCP Complex / Gil Puyat.", 15, 14],
      ["walk", "Get off at Vicente Sotto Street and walk to the Star City gate.", 2],
    ],
    tags: ["Cheapest", "Beginner friendly"],
    exposure: "partial",
    timeOfDay: ["afternoon", "night"],
    tips: [
      "Orange multicabs wait beside Wendy's and DLTB.",
      "Trips take 10–12 minutes on clear roads, but may take 25 minutes during the 5:00–7:30 PM rush on Roxas Boulevard.",
    ],
    description: "Direct orange multicab ride along Buendia into CCP Complex, straight to Star City.",
    dateChecked: "November 6, 2026",
  },
  {
    n: 16,
    origin: "Star City (CCP Complex)",
    destination: "LRT-1 Gil Puyat Station (Taft Ave)",
    steps: [
      ["walk", "Walk to the curb outside Star City along Vicente Sotto Street.", 1],
      ["jeepney", "Ride an orange multicab with an LRT Buendia / Taft signboard.", 17, 14],
      ["walk", "Get off under the LRT line and head up to the station.", 2],
    ],
    tags: ["Cheapest", "Beginner friendly", "Crowded"],
    exposure: "partial",
    timeOfDay: ["afternoon", "night"],
    tips: [
      "Flag multicabs along Vicente Sotto Street.",
      "Past 9:30 PM, close to the final show, avoid overcharging e-trikes and stick to regular orange multicabs for the standard fare.",
    ],
    description: "Orange multicab ride from Star City back to LRT-1 Gil Puyat.",
    dateChecked: "November 6, 2026",
  },
];
