import type { Mode, Route } from "../data";

export const TAGS = [
  "Fast",
  "Cheapest",
  "Beginner friendly",
  "Sheltered",
  "Crowded",
  "Less crowded",
  "Safe",
  "Less safe at night",
  "Transfer difficulty",
] as const;
export type Tag = (typeof TAGS)[number];
export type TimeOfDay = "morning" | "midday" | "afternoon" | "evening" | "night";

// [mode, instruction, minutes, fare?] — fare only for paid legs
export type StepInput = [Mode, string, number, number?];

// What collectors hand in. Everything else on a Route is derived below.
export type RouteInput = {
  n: number; // "Route #n" -> id "r<n>" (also the image file name, e.g. r12.jpg)
  origin: string;
  destination: string;
  steps: StepInput[];
  tags: Tag[];
  exposure: Route["exposure"];
  timeOfDay: TimeOfDay[];
  tips: string[];
  transfers?: number; // only for incomplete routes with no steps yet
  description?: string;
  dateChecked?: string;
  source?: string;
  status?: Route["status"];
};

const WALK_METERS_PER_MINUTE = 70;

export function buildRoute(i: RouteInput): Route {
  const steps = i.steps.map(([mode, text, minutes, fare]) => ({
    mode,
    text,
    minutes,
    ...(fare ? { fare } : {}),
  }));
  const rides = steps.filter((s) => s.mode !== "walk");
  const walkingMinutes = steps
    .filter((s) => s.mode === "walk")
    .reduce((sum, s) => sum + s.minutes, 0);
  return {
    id: `r${i.n}`,
    title: `${i.origin} to ${i.destination}`,
    origin: i.origin,
    destination: i.destination,
    modes: rides.length
      ? [...new Set(rides.map((s) => s.mode))]
      : steps.length
        ? ["walk"]
        : [],
    fare: steps.reduce((sum, s) => sum + (s.fare ?? 0), 0),
    totalMinutes: steps.reduce((sum, s) => sum + s.minutes, 0),
    walkingMinutes,
    walkingMeters: walkingMinutes * WALK_METERS_PER_MINUTE,
    transfers: i.transfers ?? Math.max(rides.length - 1, 0),
    exposure: i.exposure,
    steps,
    tags: i.tags,
    tips: i.tips,
    description: i.description,
    dateChecked: i.dateChecked,
    source: i.source,
    rating: 0,
    ratingCount: 0,
    status: i.status ?? "unverified",
    authorId: "u-idd",
    helpfulCount: 0,
    timeOfDay: i.timeOfDay,
  };
}

// Dev-time sanity check so a typo in a collected row is caught early.
export function buildRoutes(inputs: RouteInput[], taken: Route[] = []): Route[] {
  const ids = new Set(taken.map((r) => r.id));
  return inputs.map((input) => {
    const route = buildRoute(input);
    if (ids.has(route.id))
      console.warn(`Duplicate route id ${route.id} (${route.title})`);
    ids.add(route.id);
    if (!input.steps.length && input.status !== "incomplete")
      console.warn(`Route ${route.id} (${route.title}) has no steps`);
    return route;
  });
}
