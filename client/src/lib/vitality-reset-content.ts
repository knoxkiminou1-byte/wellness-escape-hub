export const VITALITY_RESET_PROGRAM = {
  id: "vitality-reset",
  title: "Vitality Reset",
  priceDisplay: "$497 one time",
  tagline: "Transform Your Health in Just 4 Weeks",
  shortDescription:
    "A 4 week Wellness Escape program for real women over 40 who want sustainable change. No extreme diets. No punishing workouts. Just smart, sustainable strategies.",
  longDescription:
    "This isn't about perfection. It's about progress that actually fits YOUR life. Real change for real women over 40 who are done wasting time on things that don't work. Four weeks of focused transformation with video lessons, private coaching, and practical action guides.",
  aboutMarti:
    "I'm Marti Shaw, and I've spent over 30 years in the fitness and wellness industry helping women transform their health. As a Certified Personal Trainer, Wellness Coach, Life Coach, and Pilates Instructor, I understand what works for women over 40—because I've been coaching them for decades.",
};

export const FIVE_PILLARS = [
  {
    id: "prioritize",
    name: "Prioritize",
    description: "Cut through the noise. Focus on what actually works.",
  },
  {
    id: "optimize",
    name: "Optimize",
    description:
      "Nutrition and hydration that fuel your body and balance your hormones.",
  },
  {
    id: "work-it",
    name: "Work It",
    description: "Exercise that honors where you are and builds you up.",
  },
  {
    id: "energize",
    name: "Energize",
    description: "Recovery, sleep, and stress management that change everything.",
  },
  {
    id: "radiate",
    name: "Radiate",
    description:
      "Step into the strongest, most confident version of yourself.",
  },
];

export type ProgressionAssignment = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  estimatedMinutes?: number;
  bringToCall?: string[];
};

export type CoachingSession = {
  weekNumber: number;
  title: string;
  description: string;
  whatToBring: string[];
  duration: string;
};

export type SessionContent = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  videoUrl: string;
  journalPrompt: string;
  progressionAssignments: ProgressionAssignment[];
};

export type WeekContent = {
  id: string;
  weekNumber: number;
  title: string;
  theme: string;
  summary: string;
  pillars: string[];
  sessions: SessionContent[];
  coachingSession?: CoachingSession;
};

export const COACHING_SESSIONS: CoachingSession[] = [
  {
    weekNumber: 1,
    title: "Week 1 Coaching Call",
    description:
      "Your first private session where we connect, troubleshoot, and celebrate your first wins together.",
    whatToBring: [
      "Your journal with 'Why' and Vision answers",
      "Your hydration observations from this week",
      "Any questions from the video lessons",
    ],
    duration: "30 minutes",
  },
  {
    weekNumber: 2,
    title: "Week 2 Coaching Call",
    description:
      "We'll dive deeper into your nutrition and movement patterns and adjust your approach.",
    whatToBring: [
      "Your nutrition observations",
      "Your movement log",
      "Questions about meal planning or exercise modifications",
    ],
    duration: "30 minutes",
  },
  {
    weekNumber: 3,
    title: "Week 3 Coaching Call",
    description:
      "Focus on stress patterns and sleep. We'll identify your specific triggers and solutions.",
    whatToBring: [
      "Your sleep audit notes",
      "Stress pattern observations",
      "Questions about recovery strategies",
    ],
    duration: "30 minutes",
  },
  {
    weekNumber: 4,
    title: "Week 4 Coaching Call",
    description:
      "Your final session where we lock in your sustainable rhythm and plan for the next 90 days.",
    whatToBring: [
      "Your integration notes",
      "Your 90 day vision",
      "Questions about maintaining your progress",
    ],
    duration: "30 minutes",
  },
];

export const VITALITY_RESET_WEEKS: WeekContent[] = [
  {
    id: "1",
    weekNumber: 1,
    title: "Prioritize & Optimize",
    theme: "Foundation and Clarity",
    summary:
      "We're starting with clarity. Set your baseline, name your reasons, and understand where your energy and habits stand today. Plus, nutrition and hydration basics that support YOU.",
    pillars: ["prioritize", "optimize"],
    coachingSession: COACHING_SESSIONS[0],
    sessions: [
      {
        id: "1",
        title: "Welcome to Vitality Reset",
        subtitle: "Your journey to mindful wellness begins",
        description:
          "Welcome to Wellness Escape and your Vitality Reset! I know what it takes to make this decision - to invest in yourself, to carve out time in your already packed schedule. I see you - juggling career, family, relationships, and a million responsibilities. You deserve to feel strong, energized, and confident in your body.",
        durationMinutes: 15,
        videoUrl: "https://youtu.be/WVqFu-egIjc",
        journalPrompt:
          "Why did you join this program right now? What's really driving you? Dig deep.",
        progressionAssignments: [
          {
            id: "1-1",
            title: "Finding Your Why and Writing Your Vision",
            description:
              "Grab your journal - yes, we're going old school! Take 10 minutes to get clear on what YOU want.",
            steps: [
              "Why did you join this program right now? What's really driving you? (Dig deep)",
              "What does success look like 4 weeks from now? Be specific - how do you want to FEEL? What do you want to be able to DO?",
              "What's your biggest challenge right now when it comes to health and wellness?",
              "Complete this sentence: I am committed to this program because... (be specific, make it emotional and personal)",
            ],
            estimatedMinutes: 10,
            bringToCall: ["Your Why and Vision answers"],
          },
          {
            id: "1-2",
            title: "Finding Your Hydration Baseline",
            description:
              "Track your clear water intake - not coffee, not tea, not gatorade. Just clear water.",
            steps: [
              "Track your water intake using your phone, sticky notes, or a measured water bottle",
              "Don't change anything yet - just become aware of how much water you're actually drinking",
              "Bonus: Notice your energy levels at different times of day (morning, afternoon, evening) on a 1 to 10 scale",
            ],
            estimatedMinutes: 5,
            bringToCall: ["Your hydration observations"],
          },
        ],
      },
      {
        id: "2",
        title: "Nutrition & Hydration Basics",
        subtitle: "Fuel that works for women over 40",
        description:
          "We're diving into nutrition basics - breakfast, lunch, and dinner. Not diet rules, but strategies that work WITH your body, specifically after 40. We'll talk about hydration and how something as simple as water can change your energy, your hunger cues, and your recovery.",
        durationMinutes: 18,
        videoUrl: "https://youtu.be/3XXde4jbX3I",
        journalPrompt:
          "How does your body tell you it's tired or underfueled? What patterns do you notice?",
        progressionAssignments: [
          {
            id: "2-1",
            title: "Reflection and Weekend Strategy",
            description:
              "Now that you know your baseline, let's work toward optimal hydration.",
            steps: [
              "Set a daily water goal based on your baseline",
              "Track your progress toward 90oz daily",
              "Notice changes in energy, hunger, and focus",
            ],
            estimatedMinutes: 5,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    weekNumber: 2,
    title: "Work It",
    theme: "Movement That Honors You",
    summary:
      "Exercise that honors where you are and builds you up. We're introducing movement as a reset tool rather than a punishment or aesthetic project.",
    pillars: ["work-it"],
    coachingSession: COACHING_SESSIONS[1],
    sessions: [
      {
        id: "3",
        title: "Movement as Reset",
        subtitle: "Exercise that honors where you are",
        description:
          "This week we're reframing movement. It's not about burning calories or punishing yourself. It's about using movement as a tool to reset your nervous system, boost your energy, and build strength that serves you in daily life.",
        durationMinutes: 20,
        videoUrl: "https://youtu.be/xMdSO4JJFNw",
        journalPrompt:
          "What kinds of movement feel sustainable for you this season?",
        progressionAssignments: [
          {
            id: "3-1",
            title: "Movement Inventory",
            description:
              "Take stock of what movement already exists in your life and what feels good.",
            steps: [
              "List all the ways you move in a typical week",
              "Rate each type of movement: Does it energize or deplete you?",
              "Identify one movement you'd like to add or increase",
            ],
            estimatedMinutes: 10,
          },
        ],
      },
      {
        id: "4",
        title: "Building Your Movement Practice",
        subtitle: "Creating sustainable habits",
        description:
          "Now we're building a realistic movement practice that fits YOUR life. Not what you think you should do, but what you can actually sustain week after week.",
        durationMinutes: 22,
        videoUrl: "https://youtu.be/E0-cMuu-L_Q",
        journalPrompt:
          "What has stopped you from maintaining a movement practice in the past?",
        progressionAssignments: [
          {
            id: "4-1",
            title: "Weekly Movement Plan",
            description: "Create a realistic movement schedule for the week.",
            steps: [
              "Choose 3 to 4 days for intentional movement",
              "Plan the type of movement and time of day",
              "Identify potential obstacles and backup plans",
            ],
            estimatedMinutes: 10,
            bringToCall: ["Your weekly movement plan"],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    weekNumber: 3,
    title: "Energize",
    theme: "Recovery, Sleep, and Stress",
    summary:
      "The recovery, sleep, and stress management that changes everything. Learn how stress shows up in your body and how to calm your system on demand.",
    pillars: ["energize"],
    coachingSession: COACHING_SESSIONS[2],
    sessions: [
      {
        id: "5",
        title: "Stress and Your Nervous System",
        subtitle: "Understanding your body's signals",
        description:
          "Recognize how stress shows up in your body and learn how to interrupt stress patterns. Your nervous system holds the key to sustainable energy and wellness.",
        durationMinutes: 24,
        videoUrl: "https://youtu.be/G0zt6uGkj_U",
        journalPrompt: "Where does stress live in your body right now?",
        progressionAssignments: [
          {
            id: "5-1",
            title: "Stress Pattern Awareness",
            description:
              "Become aware of how and when stress shows up for you.",
            steps: [
              "Track stress triggers for 3 days",
              "Note physical sensations when stressed (tight shoulders, headache, etc.)",
              "Identify your top 3 stress triggers",
            ],
            estimatedMinutes: 10,
            bringToCall: ["Your stress pattern observations"],
          },
        ],
      },
      {
        id: "6",
        title: "Sleep and Evening Reset",
        subtitle: "Reclaiming restorative rest",
        description:
          "Sleep is when your body heals and resets. We'll create an evening routine that signals your body it's time to wind down and prepare for truly restorative sleep.",
        durationMinutes: 19,
        videoUrl: "https://youtu.be/xEVqXOFucEU",
        journalPrompt:
          "What would a truly restorative evening look like for you?",
        progressionAssignments: [
          {
            id: "6-1",
            title: "Sleep Audit",
            description: "Evaluate your current sleep patterns and environment.",
            steps: [
              "Track your sleep for 5 nights (time to bed, wake time, quality 1 to 10)",
              "Assess your sleep environment (temperature, darkness, devices)",
              "Identify one change to try this week",
            ],
            estimatedMinutes: 10,
            bringToCall: ["Your sleep audit notes"],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    weekNumber: 4,
    title: "Radiate",
    theme: "Integration and Confidence",
    summary:
      "Step into the strongest, most confident version of yourself. Protect your changes with realistic plans for weekends, travel, and the next ninety days.",
    pillars: ["radiate"],
    coachingSession: COACHING_SESSIONS[3],
    sessions: [
      {
        id: "7",
        title: "Weekend and Travel Strategy",
        subtitle: "Maintaining momentum through disruption",
        description:
          "Life doesn't pause for wellness. Learn strategies to stay on track during weekends, travel, holidays, and those inevitable disruptions that used to derail you.",
        durationMinutes: 21,
        videoUrl: "https://youtu.be/2cypY8C67cA",
        journalPrompt: "Where do weekends usually go off the rails for you?",
        progressionAssignments: [
          {
            id: "7-1",
            title: "Disruption Proof Plan",
            description:
              "Create your strategy for staying on track during life's disruptions.",
            steps: [
              "Identify your top 3 disruption scenarios",
              "Create a 'minimum viable' wellness plan for each",
              "Write out your non negotiables vs. nice to haves",
            ],
            estimatedMinutes: 15,
          },
        ],
      },
      {
        id: "8",
        title: "Integration and Your Next 90 Days",
        subtitle: "Locking in your transformation",
        description:
          "This is about locking in a sustainable rhythm that you can carry forward. We'll create your vision for the next 90 days and identify the habits that will become your new normal.",
        durationMinutes: 23,
        videoUrl: "https://youtu.be/wJlypFkxCFk",
        journalPrompt:
          "What parts of this reset do you want to keep permanent?",
        progressionAssignments: [
          {
            id: "8-1",
            title: "Your 90 Day Vision",
            description:
              "Project forward and lock in your sustainable rhythm.",
            steps: [
              "Write your 90 day wellness vision",
              "List the 3 to 5 habits you're committing to long term",
              "Create your 'if/then' plans for common obstacles",
              "Write a letter to yourself to open in 90 days",
            ],
            estimatedMinutes: 20,
            bringToCall: ["Your 90 day vision", "Your integration notes"],
          },
        ],
      },
    ],
  },
];

export function getWeeksForProgram(programId: string): WeekContent[] {
  return VITALITY_RESET_WEEKS;
}

export function getSessionById(sessionId: string): SessionContent | undefined {
  for (const week of VITALITY_RESET_WEEKS) {
    const session = week.sessions.find((s) => s.id === sessionId);
    if (session) return session;
  }
  return undefined;
}

export function getWeekBySessionId(sessionId: string): WeekContent | undefined {
  for (const week of VITALITY_RESET_WEEKS) {
    if (week.sessions.some((s) => s.id === sessionId)) {
      return week;
    }
  }
  return undefined;
}
