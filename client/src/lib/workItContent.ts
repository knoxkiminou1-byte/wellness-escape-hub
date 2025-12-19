export interface WorkItWeek {
  id: string;
  weekNumber: number;
  title: string;
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
    title: "Foundation First",
    objective: "Establish your baseline and create clarity around your current habits.",
    whyItMatters: "You can't change what you don't measure. This week is about honest assessment, not judgment.",
    actionSteps: [
      "Complete the Week 1 video lesson",
      "Book your first 30 minute one on one",
      "Track your water intake for 3 days",
      "Write down your current morning routine",
    ],
    reflectionPrompt: "What surprised you most about your current habits? What feels like low-hanging fruit to improve?",
    journalPrompts: [
      "What does 'feeling good' actually mean to you?",
      "When did you last feel truly energized?",
      "What's one small thing you keep putting off?",
    ],
  },
  {
    id: "work-it-2",
    weekNumber: 2,
    title: "Work It Week 2",
    objective: "Build momentum with movement and accountability.",
    whyItMatters: "Week 2 is where real change begins. You've got context now. Time to move.",
    actionSteps: [
      "Book your session",
      "Complete the Week 2 workouts",
      "Do a 10 minute walk after dinner 3 times this week",
      "Track one protein-focused meal each day",
    ],
    reflectionPrompt: "What changed in your energy this week? What resistance did you feel? What will you do next week to elevate?",
    journalPrompts: [
      "How did your body feel after movement?",
      "What time of day works best for you to exercise?",
      "What story do you tell yourself about working out?",
    ],
  },
  {
    id: "work-it-3",
    weekNumber: 3,
    title: "Energize & Recover",
    objective: "Prioritize recovery, sleep, and stress management.",
    whyItMatters: "Results happen during recovery. This week we focus on the things that actually let your body change.",
    actionSteps: [
      "Complete the Week 3 video lessons",
      "Book your Week 3 coaching call",
      "Set a consistent bedtime for 5 nights",
      "Try one stress-relief technique from the lesson",
    ],
    reflectionPrompt: "What's draining your energy that you could release? How is your sleep affecting everything else?",
    journalPrompts: [
      "What does rest actually look like for you?",
      "When do you feel most stressed during the day?",
      "What boundaries could protect your energy?",
    ],
  },
  {
    id: "work-it-4",
    weekNumber: 4,
    title: "Radiate Forward",
    objective: "Create your 90-day vision and sustainable habits.",
    whyItMatters: "This isn't the end—it's the launchpad. Week 4 sets you up for the next 3 months.",
    actionSteps: [
      "Complete the Week 4 video lessons",
      "Book your final coaching call",
      "Write your 90-day vision statement",
      "Choose 3 habits to continue beyond the program",
    ],
    reflectionPrompt: "Who are you becoming? What will you do differently on weekends? What's your non-negotiable now?",
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
