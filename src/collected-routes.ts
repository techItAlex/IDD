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
export const collectedRoutes: RouteInput[] = [];
