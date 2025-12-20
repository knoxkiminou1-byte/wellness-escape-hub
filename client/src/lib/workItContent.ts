export interface WorkItWeek {
  id: string;
  weekNumber: number;
  title: string;
  subtitle: string;
  objective: string;
  whyItMatters: string;
  actionSteps: string[];
  reflectionPrompt: string;
  journalPrompts: string[];
}

export const WORK_IT_WEEKS: WorkItWeek[] = [
  {
    id: "work-it-1",
    weekNumber: 1,
    title: "Prioritize & Optimize",
    subtitle: "Prioritize: Focus on where you're at, and where you want to be. Optimize: The basics of your nutrition and hydration.",
    objective: "Establish your baseline and create clarity around your current habits.",
    whyItMatters: "You'll set specific, meaningful goals and follow sustainable strategies that actually work—no vague wishes, restrictive diets, or deprivation.",
    actionSteps: [
      "Complete the Week 1 video lesson",
      "Book your first 30 minute one on one",
      "Track your water intake for 3 days",
      "Write down your current morning routine",
    ],
    reflectionPrompt: "Why did you join this program now?",
    journalPrompts: [
      "What does success look like 4 weeks from now?",
      "What's your biggest challenge right now when it comes to health and wellness?",
      "Complete the following statement: \"I am committed to this program because...\"",
    ],
  },
  {
    id: "work-it-2",
    weekNumber: 2,
    title: "Work It",
    subtitle: "Movement that honors you.",
    objective: "Build momentum with movement and accountability.",
    whyItMatters: "Your body is capable of more than you think, and the only way to find out what it can do is to START MOVING.",
    actionSteps: [
      "Book your session",
      "Complete the Week 2 workouts",
      "Do a 10 minute walk after dinner 3 times this week",
      "Track one protein focused meal each day",
    ],
    reflectionPrompt: "What is possible for you if you move consistently for the next 4 weeks? Imagine what could be possible in 4 months.",
    journalPrompts: [
      "Are there opportunities to add more movement in my day? Taking the stairs instead of the elevator? Parking farther away? A walk after dinner?",
      "The hardest thing about starting to exercise is?",
      "The best thing about starting to exercise is?",
    ],
  },
  {
    id: "work-it-3",
    weekNumber: 3,
    title: "Energize",
    subtitle: "Prioritize recovery, sleep, and stress management.",
    objective: "Prioritize recovery, sleep, and stress management.",
    whyItMatters: "When you prioritize recovery, your body responds BETTER to everything else. Better sleep = better metabolism, better mood, better results from your workouts, better everything.",
    actionSteps: [
      "Complete the Week 3 video lessons",
      "Book your Week 3 coaching call",
      "Set a consistent bedtime for 5 nights",
      "Try one stress relief technique from the lesson",
    ],
    reflectionPrompt: "What is exciting to you about creating a Wind Down routine?",
    journalPrompts: [
      "How has my sleep changed from the beginning of the week to now?",
      "What stress management practice helped me the most? Why?",
      "How does my body FEEL after prioritizing recovery? (More energy? Less pain? Better mood?)",
    ],
  },
  {
    id: "work-it-4",
    weekNumber: 4,
    title: "Radiate",
    subtitle: "Stepping into your strongest self.",
    objective: "Create your 90 day vision and sustainable habits.",
    whyItMatters: "You've changed. Not just your habits...YOU. Your mindset. Your relationship with your body. Your understanding of what you're truly capable of.",
    actionSteps: [
      "Complete the Week 4 video lessons",
      "Book your final coaching call",
      "Write your 90 day vision statement",
      "Choose 3 habits to continue beyond the program",
    ],
    reflectionPrompt: "Who are you becoming? What will you do differently on weekends? What's your non negotiable now?",
    journalPrompts: [
      "What did you learn about yourself these 4 weeks?",
      "What habit surprised you by sticking?",
      "What does the next version of you look like?",
    ],
  },
];

export function getWorkItWeek(weekNumber: number): WorkItWeek | undefined {
  return WORK_IT_WEEKS.find((w) => w.weekNumber === weekNumber);
}
