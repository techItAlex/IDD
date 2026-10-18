import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  routes as seed,
  initialQuestions,
  type Question,
  type Route,
} from "./data";
type Answer = {
  id: string;
  questionId: string;
  authorId: string;
  text: string;
  timeAgo: string;
  upvotes: number;
  replies: { id: string; text: string; authorId: string }[];
};
type State = {
  isLoggedIn: boolean;
  hasEntered: boolean;
  points: number;
  savedRouteIds: string[];
  compareIds: string[];
  upvoted: string[];
  routes: Route[];
  questions: Question[];
  answers: Record<string, Answer>;
  wizard: any;
  toast: string;
  loginOpen: boolean;
  pending: (() => void) | null;
  filter: { sort: string; time: string; modes: string[] };
  notifications: { title: string; read: boolean; to: string }[];
  recent: string[];
  addToast: (s: string) => void;
  requireLogin: (fn?: () => void) => void;
  login: () => void;
  logout: () => void;
  reset: () => void;
  save: (id: string) => void;
  compare: (id: string) => void;
  upvote: (id: string) => void;
  postQuestion: (q: Question) => void;
  postAnswer: (qid: string, text: string) => void;
  accept: (qid: string, aid: string) => void;
  setWizard: (v: any) => void;
};
const defaultAnswers: any = {
  a1: {
    id: "a1",
    questionId: "q1",
    authorId: "u-mika",
    text: "Take the MRT-3 from Cubao to North Avenue. SM North is connected by a covered walkway from the station.",
    timeAgo: "1h ago",
    upvotes: 18,
    replies: [],
  },
  a2: {
    id: "a2",
    questionId: "q1",
    authorId: "u-renz",
    text: "MRT-3 is the easiest. Follow the signs for the SM North walkway.",
    timeAgo: "50m ago",
    upvotes: 8,
    replies: [],
  },
  a3: {
    id: "a3",
    questionId: "q1",
    authorId: "u-carlo",
    text: "You can also take a jeepney, but MRT is faster at peak times.",
    timeAgo: "30m ago",
    upvotes: 4,
    replies: [],
  },
  a4: {
    id: "a4",
    questionId: "q2",
    authorId: "u-jasper",
    text: "Yes, there are still jeeps around 7pm, though they can be less frequent.",
    timeAgo: "3h ago",
    upvotes: 5,
    replies: [
      {
        id: "rep1",
        text: "Thanks! I’ll wait by the main road.",
        authorId: "u-liza",
      },
    ],
  },
  a5: {
    id: "a5",
    questionId: "q2",
    authorId: "u-mika",
    text: "Try the main terminal and ask the dispatcher.",
    timeAgo: "2h ago",
    upvotes: 3,
    replies: [],
  },
  a6: {
    id: "a6",
    questionId: "q2",
    authorId: "u-renz",
    text: "Keep a backup ride in mind after 8pm.",
    timeAgo: "1h ago",
    upvotes: 2,
    replies: [],
  },
};
Object.assign(defaultAnswers, {
  a7: {
    id: "a7",
    questionId: "q3",
    authorId: "u-mika",
    text: "The P2P bus is generally a comfortable option. Check the last departure at the terminal and confirm the schedule on the day.",
    timeAgo: "Yesterday",
    upvotes: 14,
    replies: [],
  },
  a8: {
    id: "a8",
    questionId: "q3",
    authorId: "u-renz",
    text: "Ayala to NAIA services can be limited late at night, so keep a backup ride option.",
    timeAgo: "Yesterday",
    upvotes: 7,
    replies: [],
  },
  a9: {
    id: "a9",
    questionId: "q3",
    authorId: "u-carlo",
    text: "I have used it in the evening. Stay in the well-lit terminal area while waiting.",
    timeAgo: "Yesterday",
    upvotes: 4,
    replies: [],
  },
  a17: {
    id: "a17",
    questionId: "q-own",
    authorId: "u-mika",
    text: "MRT-3 from Cubao to Ayala is a good starting point. From there, use the Makati exit and follow signs for your destination.",
    timeAgo: "45m ago",
    upvotes: 2,
    replies: [],
  },
});
const start = () => ({
  isLoggedIn: false,
  hasEntered: false,
  points: 320,
  savedRouteIds: [],
  compareIds: ["r1", "r2"],
  upvoted: [],
  routes: seed,
  questions: initialQuestions,
  answers: defaultAnswers,
  wizard: {},
  toast: "",
  loginOpen: false,
  pending: null,
  filter: { sort: "Recommended", time: "Any", modes: [] },
  notifications: [
    {
      title: "Your answer got a helpful upvote! +10 points",
      read: false,
      to: "/community",
    },
    {
      title: "Your route 'Cubao → UP Diliman' is pending review",
      read: false,
      to: "/profile",
    },
    {
      title: "Jasper replied to your question",
      read: true,
      to: "/question/q-own",
    },
    { title: "You reached Level 2", read: true, to: "/rewards" },
  ],
  recent: [
    "Cubao to BGC",
    "SM North to Trinoma",
    "Makati to Las Piñas",
    "Ayala to UP Diliman",
  ],
});
export const useApp = create<State>()(
  persist(
    (set, get) => ({
      ...start(),
      addToast: (toast) => {
        set({ toast });
        setTimeout(() => set({ toast: "" }), 2600);
      },
      requireLogin: (fn) => {
        if (get().isLoggedIn) {
          fn?.();
          return;
        }
        set({ loginOpen: true, pending: fn || null });
      },
      login: () => {
        const fn = get().pending;
        set({
          isLoggedIn: true,
          hasEntered: true,
          loginOpen: false,
          pending: null,
        });
        get().addToast("Welcome, Alex!");
        setTimeout(() => fn?.(), 0);
      },
      logout: () => set({ isLoggedIn: false, loginOpen: false }),
      reset: () => {
        set({ ...start() });
        get().addToast("Demo data reset");
      },
      save: (id) => {
        if (!get().isLoggedIn) {
          get().requireLogin(() => get().save(id));
          return;
        }
        const wasSaved = get().savedRouteIds.includes(id);
        set((s) => ({
          savedRouteIds: wasSaved
            ? s.savedRouteIds.filter((x) => x !== id)
            : [...s.savedRouteIds, id],
        }));
        get().addToast(wasSaved ? "Route removed from saved" : "Route saved");
      },
      compare: (id) => {
        const wasCompared = get().compareIds.includes(id);
        if (!wasCompared && get().compareIds.length >= 3) {
          get().addToast("Compare up to 3 routes");
          return;
        }
        set((s) => ({
          compareIds: wasCompared
            ? s.compareIds.filter((x) => x !== id)
            : [...s.compareIds, id],
        }));
        get().addToast(
          wasCompared
            ? "Removed from compare"
            : `Added to compare (${get().compareIds.length}/3)`,
        );
      },
      upvote: (id) => {
        if (!get().isLoggedIn) {
          get().requireLogin(() => get().upvote(id));
          return;
        }
        set((s) => ({
          upvoted: s.upvoted.includes(id)
            ? s.upvoted.filter((x) => x !== id)
            : [...s.upvoted, id],
          questions: s.questions.map((q) =>
            q.id === id
              ? { ...q, upvotes: q.upvotes + (s.upvoted.includes(id) ? -1 : 1) }
              : q,
          ),
        }));
      },
      postQuestion: (q) => {
        set((s) => ({ questions: [q, ...s.questions], points: s.points + 5 }));
        get().addToast("Your question has been posted!");
      },
      postAnswer: (qid, text) => {
        const id = "a" + Date.now();
        set((s) => ({
          answers: {
            ...s.answers,
            [id]: {
              id,
              questionId: qid,
              authorId: "u-alex",
              text,
              timeAgo: "Just now",
              upvotes: 0,
              replies: [],
            },
          },
          questions: s.questions.map((q) =>
            q.id === qid ? { ...q, answerIds: [...q.answerIds, id] } : q,
          ),
          points: s.points + 10,
        }));
        get().addToast(
          "Your answer has been posted! Thanks for helping the community.",
        );
      },
      accept: (qid, aid) => {
        set((s) => ({
          questions: s.questions.map((q) =>
            q.id === qid ? { ...q, acceptedAnswerId: aid } : q,
          ),
          points: s.points + 10,
        }));
        get().addToast("+10 points awarded to the answerer");
      },
      setWizard: (wizard) => set({ wizard }),
    }),
    {
      name: "idd-demo",
      version: 1,
      migrate: (persisted: any) => ({ ...persisted, hasEntered: false }),
      // Guests are asked again on a fresh page load; login state still persists.
      partialize: (state) => ({ ...state, hasEntered: false }),
    },
  ),
);
