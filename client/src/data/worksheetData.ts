// Worksheet data extracted from Vitality Reset PDF

export const WORKSHEET_DATA = {
  "1": {
    title: "Week 1 Lesson 1: Reflection Questions",
    questions: [
      {
        id: "q1",
        type: "textarea" as const,
        question: "1. Why did you join this program right now? What's really driving you? Dig deep.",
        placeholder: "Take your time with this. What's the real reason you're here?"
      },
      {
        id: "q2",
        type: "textarea" as const,
        question: "2. What does success look like 4 weeks from now? Be specific - how do you want to FEEL? What do you want to be able to DO?",
        placeholder: "Be specific about how you want to feel and what you want to be able to do..."
      },
      {
        id: "q3",
        type: "textarea" as const,
        question: "3. What's your biggest challenge right now when it comes to health and wellness?",
        placeholder: "Be honest with yourself..."
      },
      {
        id: "q4",
        type: "textarea" as const,
        question: "4. Write Your WHY Statement - Complete this sentence (make it emotional and personal): 'I am committed to this program because...'",
        placeholder: "I am committed to this program because..."
      },
      {
        id: "hydration_mon",
        type: "text" as const,
        question: "Monday Water Intake (8oz glasses - just track, don't change anything yet)",
        placeholder: "Example: 6 glasses = 48oz"
      },
      {
        id: "hydration_tue",
        type: "text" as const,
        question: "Tuesday Water Intake",
        placeholder: "Total ounces"
      },
      {
        id: "hydration_wed",
        type: "text" as const,
        question: "Wednesday Water Intake",
        placeholder: "Total ounces"
      },
      {
        id: "hydration_thu",
        type: "text" as const,
        question: "Thursday Water Intake",
        placeholder: "Total ounces"
      },
      {
        id: "hydration_fri",
        type: "text" as const,
        question: "Friday Water Intake",
        placeholder: "Total ounces"
      },
      {
        id: "hydration_sat",
        type: "text" as const,
        question: "Saturday Water Intake",
        placeholder: "Total ounces"
      },
      {
        id: "hydration_sun",
        type: "text" as const,
        question: "Sunday Water Intake",
        placeholder: "Total ounces"
      },
      {
        id: "energy_notes",
        type: "textarea" as const,
        question: "Energy Level Tracking (BONUS) - Rate your energy 1-10 throughout the week (morning, afternoon, evening)",
        placeholder: "Track how your energy fluctuates throughout each day. Example: Monday - Morning: 7, Afternoon: 5, Evening: 4"
      }
    ]
  },
  "2": {
    title: "Week 1 Lesson 2: Week 1 Reflection & Weekend Strategy",
    questions: [
      {
        id: "win1",
        type: "text" as const,
        question: "Win #1 from Week 1 (big or small - they all count!)",
        placeholder: "What are you proud of?"
      },
      {
        id: "win2",
        type: "text" as const,
        question: "Win #2 from Week 1",
        placeholder: "Every win matters"
      },
      {
        id: "win3",
        type: "text" as const,
        question: "Win #3 from Week 1",
        placeholder: "You've accomplished more than you think"
      },
      {
        id: "proud",
        type: "textarea" as const,
        question: "1. What am I proud of from this week?",
        placeholder: "Take 5-10 minutes to reflect..."
      },
      {
        id: "what_felt_good",
        type: "textarea" as const,
        question: "2. What felt good? What strategy clicked? What surprised me?",
        placeholder: "What's working for you?"
      },
      {
        id: "challenging",
        type: "textarea" as const,
        question: "3. What was challenging? (No judgment - just awareness)",
        placeholder: "It's okay if things were hard. Just notice."
      },
      {
        id: "do_differently",
        type: "textarea" as const,
        question: "4. What's ONE thing I'll do differently next week?",
        placeholder: "One small change can make a big difference"
      },
      {
        id: "goals_specific",
        type: "checklist" as const,
        question: "Are my goals specific enough? (Not 'eat better' but 'drink 64oz water daily and eat protein at breakfast')",
        options: [
          "Yes, they're specific",
          "Need to make them more specific"
        ]
      },
      {
        id: "goals_realistic",
        type: "checklist" as const,
        question: "Are they realistic for my current life? (Not what you SHOULD do, but what you CAN actually do)",
        options: [
          "Yes, they're realistic",
          "Need to adjust them"
        ]
      },
      {
        id: "goals_exciting",
        type: "checklist" as const,
        question: "Do they excite me? (If they feel like punishment, adjust them!)",
        options: [
          "Yes, I'm excited",
          "Need to make them more exciting/meaningful"
        ]
      }
    ]
  },
  "3": {
    title: "Week 2 Lesson 1: Work It (Movement Planning)",
    questions: [
      {
        id: "mindset_write",
        type: "textarea" as const,
        question: "Write this mindset shift where you'll see it: 'Movement is something I GET to do - it's how I celebrate, strengthen, and protect my body.'",
        placeholder: "Where will you post this reminder?"
      },
      {
        id: "movement_goals",
        type: "checklist" as const,
        question: "What do I want movement to help me achieve?",
        options: [
          "Boost my metabolism",
          "Build/maintain muscle",
          "Strengthen my bones",
          "Improve my mood and energy",
          "Sleep better",
          "Reduce stress",
          "Make everyday activities easier",
          "Feel strong and capable"
        ]
      },
      {
        id: "workout1",
        type: "text" as const,
        question: "Workout #1: Day, Time, Type",
        placeholder: "Example: Monday, 6:30am, Strength training"
      },
      {
        id: "workout2",
        type: "text" as const,
        question: "Workout #2: Day, Time, Type",
        placeholder: "Example: Wednesday, 12pm, Walk"
      },
      {
        id: "workout3",
        type: "text" as const,
        question: "Workout #3: Day, Time, Type",
        placeholder: "Example: Friday, 6pm, Yoga"
      },
      {
        id: "rest_days",
        type: "text" as const,
        question: "My Rest Day(s) this week",
        placeholder: "Rest is when you get stronger!"
      },
      {
        id: "strength_exercises",
        type: "checklist" as const,
        question: "Strength Training - Bodyweight exercises I'll focus on (1x this week, 20-30 minutes)",
        options: [
          "Squats (strong legs and glutes)",
          "Push-ups (modified if needed - upper body strength)",
          "Planks (core stability)",
          "Glute bridges (hip and glute strength)"
        ]
      },
      {
        id: "cardio_choice",
        type: "checklist" as const,
        question: "Cardiovascular Exercise - Choose what works for YOU",
        options: [
          "Brisk walking (yes, this counts!)",
          "Intervals (30 sec fast, 1 min slow, repeat 15-20 min)",
          "Dancing",
          "Swimming",
          "Biking",
          "Hiking"
        ]
      },
      {
        id: "flexibility",
        type: "checklist" as const,
        question: "Flexibility & Mobility (5-10 minutes after workouts or on rest days)",
        options: [
          "Post-workout stretching",
          "Gentle yoga",
          "Full-body stretch routine"
        ]
      },
      {
        id: "movement_audit",
        type: "textarea" as const,
        question: "Movement Audit (track for 2 days): Total steps, time sitting, time moving, opportunities to add more movement",
        placeholder: "Day 1 and Day 2 observations..."
      },
      {
        id: "movement_timing",
        type: "checklist" as const,
        question: "How I'll fit movement into my busy life:",
        options: [
          "Morning workouts (get it done before the day gets away)",
          "Lunch break movement (20-minute walk or quick strength session)",
          "Evening wind-down (stretch or gentle movement before bed)"
        ]
      },
      {
        id: "biggest_barrier",
        type: "text" as const,
        question: "My biggest barrier to exercise:",
        placeholder: "What usually stops you?"
      },
      {
        id: "barrier_strategy",
        type: "textarea" as const,
        question: "My strategy to overcome it:",
        placeholder: "How will you work around this?"
      },
      {
        id: "where_i_am",
        type: "textarea" as const,
        question: "Where I am with fitness right now (be honest, no judgment):",
        placeholder: "Starting slow? Dealing with injuries? Already active?"
      },
      {
        id: "whats_possible",
        type: "textarea" as const,
        question: "Imagine 4 weeks from now. What will consistent movement make possible for me?",
        placeholder: "Dream big - what will you be able to do?"
      }
    ]
  },
  "4": {
    title: "Week 2 Lesson 2: Movement Celebration",
    questions: [
      {
        id: "movement_win1",
        type: "text" as const,
        question: "Movement Win #1 from Week 2",
        placeholder: "What are you proud of?"
      },
      {
        id: "movement_win2",
        type: "text" as const,
        question: "Movement Win #2 from Week 2",
        placeholder: "Keep going!"
      },
      {
        id: "movement_win3",
        type: "text" as const,
        question: "Movement Win #3 from Week 2",
        placeholder: "You're doing amazing!"
      },
      {
        id: "workouts_completed",
        type: "text" as const,
        question: "1. How many workouts did I complete this week?",
        placeholder: "Every workout counts"
      },
      {
        id: "what_surprised",
        type: "textarea" as const,
        question: "2. What surprised me? (Stronger than I thought? Harder than expected?)",
        placeholder: "What did you discover about yourself?"
      },
      {
        id: "what_felt_good",
        type: "textarea" as const,
        question: "3. What felt GOOD? Which movements made me feel powerful?",
        placeholder: "Which exercises did you enjoy?"
      },
      {
        id: "body_different",
        type: "textarea" as const,
        question: "4. How does my body FEEL different than it did at the start of the week? (Stronger? More energized? Sore but accomplished?)",
        placeholder: "Notice the changes, even small ones"
      },
      {
        id: "favorite_workout",
        type: "textarea" as const,
        question: "5. What was my favorite workout or movement this week? Why?",
        placeholder: "What brought you joy?"
      },
      {
        id: "do_differently",
        type: "textarea" as const,
        question: "6. What's ONE thing I'll do differently or better next week?",
        placeholder: "How will you level up?"
      },
      {
        id: "strength_progress",
        type: "checklist" as const,
        question: "Progress markers I noticed in strength training:",
        options: [
          "Could do more reps",
          "Could hold plank longer",
          "Could go deeper in squats",
          "Felt stronger overall"
        ]
      },
      {
        id: "strength_goal_week3",
        type: "text" as const,
        question: "My strength goal for Week 3:",
        placeholder: "Add 2-3 more reps? Hold plank 5 seconds longer?"
      },
      {
        id: "cardio_progress",
        type: "checklist" as const,
        question: "Cardiovascular exercise progress:",
        options: [
          "Felt more energized after cardio",
          "Could talk while moving (moderate intensity)",
          "Breathing got easier throughout the week"
        ]
      },
      {
        id: "cardio_goal_week3",
        type: "text" as const,
        question: "My cardio goal for Week 3:",
        placeholder: "Longer duration? Faster pace? More consistency?"
      },
      {
        id: "flexibility_consistent",
        type: "checklist" as const,
        question: "Did I stretch consistently this week?",
        options: [
          "Yes, after every workout",
          "Most of the time",
          "Need to prioritize this more"
        ]
      },
      {
        id: "flexibility_noticed",
        type: "checklist" as const,
        question: "What I noticed from flexibility work:",
        options: [
          "Less stiffness",
          "Better range of motion",
          "Easier recovery",
          "Need to be more consistent to notice changes"
        ]
      },
      {
        id: "tight_areas",
        type: "checklist" as const,
        question: "Areas that feel tight and need attention:",
        options: [
          "Hips",
          "Shoulders",
          "Hamstrings",
          "Lower back"
        ]
      },
      {
        id: "flexibility_goal_week3",
        type: "text" as const,
        question: "My flexibility goal for Week 3:",
        placeholder: "Stretch daily? Focus on tight areas?"
      }
    ]
  },
  "5": {
    title: "Week 3 Lesson 1: Energize (Sleep & Stress Management)",
    questions: [
      {
        id: "sleep_challenge",
        type: "textarea" as const,
        question: "My current sleep challenge:",
        placeholder: "What's preventing you from sleeping well?"
      },
      {
        id: "sleep_audit_date",
        type: "text" as const,
        question: "Sleep Audit - Date:",
        placeholder: "Track one night"
      },
      {
        id: "bedtime",
        type: "text" as const,
        question: "What time did I go to bed?",
        placeholder: "Example: 10:30pm"
      },
      {
        id: "wake_time",
        type: "text" as const,
        question: "What time did I wake up?",
        placeholder: "Example: 6:30am"
      },
      {
        id: "total_hours",
        type: "text" as const,
        question: "Total hours of sleep:",
        placeholder: "Calculate the hours"
      },
      {
        id: "wake_ups",
        type: "text" as const,
        question: "How many times did I wake up during the night?",
        placeholder: "Just notice"
      },
      {
        id: "morning_feeling",
        type: "text" as const,
        question: "How did I feel in the morning? (1-10 scale: 1=exhausted, 10=fully rested)",
        placeholder: "Rate 1-10"
      },
      {
        id: "before_bed",
        type: "checklist" as const,
        question: "What I did in the HOUR BEFORE BED:",
        options: [
          "Watched TV",
          "Scrolled phone",
          "Read a book",
          "Took a bath/shower",
          "Worked"
        ]
      },
      {
        id: "ideal_bedtime",
        type: "text" as const,
        question: "My ideal bedtime (allowing 7-9 hours):",
        placeholder: "Example: 10pm"
      },
      {
        id: "ideal_wake_time",
        type: "text" as const,
        question: "My wake time:",
        placeholder: "Example: 6am"
      },
      {
        id: "winddown_routine",
        type: "textarea" as const,
        question: "Create My 30-Minute Wind-Down Routine: List your planned activities with times (screens off, tea, bath, reading, stretching, etc.)",
        placeholder: "9:30pm - Screens off, 9:35pm - Herbal tea, 9:45pm - Bath, 10:15pm - Reading, 10:30pm - Lights out"
      },
      {
        id: "sleep_environment",
        type: "checklist" as const,
        question: "Make my bedroom a sleep sanctuary:",
        options: [
          "Cool - Set temperature to 65-68°F",
          "Dark - Use blackout curtains or eye mask",
          "Quiet - Use earplugs or white noise if needed",
          "Comfortable - Good pillows and bedding",
          "Clutter-free - Clear, calm space",
          "Keep bedroom for sleep only - No TV, no work, minimal phone use"
        ]
      },
      {
        id: "sleep_environment_change",
        type: "text" as const,
        question: "One thing I'll change about my sleep environment this week:",
        placeholder: "What's the easiest fix?"
      },
      {
        id: "caffeine_cutoff",
        type: "text" as const,
        question: "My last cup of coffee/caffeine will be by:",
        placeholder: "Noon? 2pm?"
      },
      {
        id: "current_stressors",
        type: "checklist" as const,
        question: "What I'm currently juggling (be honest - no judgment):",
        options: [
          "Career demands",
          "Family responsibilities",
          "Financial pressures",
          "Hormonal changes",
          "Health concerns",
          "Relationship dynamics",
          "Mental load of managing everyone else's lives"
        ]
      },
      {
        id: "biggest_stressor",
        type: "textarea" as const,
        question: "My biggest stressor right now:",
        placeholder: "What's weighing on you most?"
      },
      {
        id: "stress_practice",
        type: "checklist" as const,
        question: "Choose at least ONE stress management practice to start this week:",
        options: [
          "Deep Breathing - Box Breathing: Inhale 4 → Hold 4 → Exhale 4 → Hold 4",
          "Gentle Movement - Walk, yoga, stretching, dancing",
          "Mindfulness & Meditation - 5 minutes daily",
          "Journaling - Brain dump for 5-10 minutes",
          "Set Boundaries - Say no, ask for help, put myself first",
          "Gratitude Practice - 3 things I'm grateful for before bed"
        ]
      },
      {
        id: "stress_practice_when",
        type: "text" as const,
        question: "When I'll practice my stress management technique:",
        placeholder: "Morning? Lunch break? Before bed?"
      },
      {
        id: "boundary_to_set",
        type: "textarea" as const,
        question: "One boundary I need to set this week:",
        placeholder: "What do you need to say no to?"
      },
      {
        id: "limit_this_week",
        type: "textarea" as const,
        question: "What amplifies stress - one thing I'll limit this week:",
        placeholder: "Excessive caffeine? Alcohol? News/doom-scrolling? Over-scheduling?"
      },
      {
        id: "personal_vision",
        type: "textarea" as const,
        question: "My personal vision for how I want to FEEL:",
        placeholder: "When you prioritize recovery, how do you want to feel?"
      }
    ]
  },
  "6": {
    title: "Week 3 Lesson 2: Recovery Celebration",
    questions: [
      {
        id: "recovery_win1",
        type: "text" as const,
        question: "Recovery Win #1 from Week 3",
        placeholder: "Celebrate yourself!"
      },
      {
        id: "recovery_win2",
        type: "text" as const,
        question: "Recovery Win #2 from Week 3",
        placeholder: "What changed?"
      },
      {
        id: "recovery_win3",
        type: "text" as const,
        question: "Recovery Win #3 from Week 3",
        placeholder: "You're doing amazing!"
      },
      {
        id: "sleep_changed",
        type: "textarea" as const,
        question: "1. How has my sleep changed from the beginning of the week to now?",
        placeholder: "More hours? Better quality? Easier to fall asleep?"
      },
      {
        id: "stress_practice_helped",
        type: "textarea" as const,
        question: "2. What stress management practice helped me the most? Why?",
        placeholder: "What made the biggest difference?"
      },
      {
        id: "body_feels",
        type: "textarea" as const,
        question: "3. How does my body FEEL after prioritizing recovery? (More energy? Less pain? Better mood? Calmer? Stronger?)",
        placeholder: "Notice all the changes"
      },
      {
        id: "hours_sleeping",
        type: "text" as const,
        question: "Hours I was actually sleeping:",
        placeholder: "Average per night"
      },
      {
        id: "sleep_surprising",
        type: "checklist" as const,
        question: "Was this surprising?",
        options: [
          "Yes",
          "No"
        ]
      },
      {
        id: "woke_up_times",
        type: "text" as const,
        question: "Times I woke up at night:",
        placeholder: "Average per night"
      },
      {
        id: "morning_feeling_beginning",
        type: "text" as const,
        question: "How I felt in the mornings - Beginning of week (1-10):",
        placeholder: "Rate 1-10"
      },
      {
        id: "morning_feeling_end",
        type: "text" as const,
        question: "How I felt in the mornings - End of week (1-10):",
        placeholder: "Rate 1-10"
      },
      {
        id: "sleep_insight",
        type: "textarea" as const,
        question: "Biggest sleep insight:",
        placeholder: "What did you learn about your sleep?"
      },
      {
        id: "winddown_stuck",
        type: "checklist" as const,
        question: "Did I stick to my wind-down routine?",
        options: [
          "Most nights",
          "Some nights",
          "A few times",
          "Need to recommit"
        ]
      },
      {
        id: "winddown_felt_good",
        type: "textarea" as const,
        question: "What parts of my wind-down routine felt good:",
        placeholder: "What's working?"
      },
      {
        id: "winddown_forced",
        type: "textarea" as const,
        question: "What felt forced or unrealistic:",
        placeholder: "What needs to change?"
      },
      {
        id: "sleep_adjustments",
        type: "textarea" as const,
        question: "Adjustments I need to make to my sleep strategy:",
        placeholder: "Based on what you learned this week..."
      },
      {
        id: "sleep_commitment_week4",
        type: "text" as const,
        question: "My sleep commitment for Week 4 - Same bedtime every night:",
        placeholder: "Example: 10pm"
      },
      {
        id: "wake_commitment_week4",
        type: "text" as const,
        question: "Same wake time every morning:",
        placeholder: "Example: 6am"
      },
      {
        id: "stress_technique_committed",
        type: "textarea" as const,
        question: "The ONE stress technique I committed to daily - how did it go?",
        placeholder: "Deep breathing? Movement? Meditation? Journaling?"
      },
      {
        id: "stress_patterns_times",
        type: "textarea" as const,
        question: "Times of day I feel most stressed:",
        placeholder: "Morning rush? Afternoon slump? Evening overwhelm?"
      },
      {
        id: "stress_triggers",
        type: "textarea" as const,
        question: "Specific situations or people that spike my stress:",
        placeholder: "What sets you off?"
      },
      {
        id: "stress_signals",
        type: "checklist" as const,
        question: "Early warning signs my body gives me when stressed:",
        options: [
          "Tight muscles",
          "Shallow breathing",
          "Racing thoughts",
          "Digestive issues",
          "Irritability"
        ]
      },
      {
        id: "stress_response_plan",
        type: "textarea" as const,
        question: "My plan to respond to these stress signals:",
        placeholder: "When you notice stress, what will you do?"
      },
      {
        id: "boundaries_practiced",
        type: "textarea" as const,
        question: "Did I practice setting boundaries this week? What did I say no to? What did I ask for help with?",
        placeholder: "Celebrate yourself for putting yourself first"
      },
      {
        id: "boundary_week4",
        type: "textarea" as const,
        question: "One boundary I need to set in Week 4:",
        placeholder: "What do you need to protect?"
      },
      {
        id: "recovery_signs",
        type: "checklist" as const,
        question: "Signs my body is recovering well:",
        options: [
          "Less muscle soreness (or faster recovery)",
          "Better energy throughout the day",
          "Improved mood and mental clarity",
          "Feeling stronger in workouts",
          "Better sleep quality",
          "Fewer cravings and hunger fluctuations",
          "More patience with myself and others",
          "Feeling calmer and less reactive"
        ]
      },
      {
        id: "recovery_adjustment",
        type: "textarea" as const,
        question: "Based on this week, my recovery adjustment is:",
        placeholder: "More stretching? More rest? Keep doing what's working?"
      },
      {
        id: "rest_was_3weeks_ago",
        type: "textarea" as const,
        question: "How I felt about rest THREE WEEKS AGO:",
        placeholder: "What did rest mean to you before?"
      },
      {
        id: "rest_now",
        type: "textarea" as const,
        question: "How I feel about rest NOW:",
        placeholder: "Has your mindset shifted?"
      },
      {
        id: "weekend_joy",
        type: "textarea" as const,
        question: "One thing I'll do this weekend that brings me pure joy:",
        placeholder: "What fills your cup?"
      }
    ]
  },
  "7": {
    title: "Week 4 Lesson 1: Radiate (Stepping Into Your Power)",
    questions: [
      {
        id: "week1_accomplished",
        type: "textarea" as const,
        question: "Week 1 - PRIORITIZE & OPTIMIZE - What I accomplished:",
        placeholder: "Look back at your wins"
      },
      {
        id: "week2_accomplished",
        type: "textarea" as const,
        question: "Week 2 - WORK IT - What I accomplished:",
        placeholder: "Your movement journey"
      },
      {
        id: "week3_accomplished",
        type: "textarea" as const,
        question: "Week 3 - ENERGIZE - What I accomplished:",
        placeholder: "Your recovery transformation"
      },
      {
        id: "who_i_was",
        type: "textarea" as const,
        question: "Four weeks ago, I was:",
        placeholder: "Who were you when you started?"
      },
      {
        id: "who_i_am",
        type: "textarea" as const,
        question: "Today, I am:",
        placeholder: "Who are you now?"
      },
      {
        id: "internal_change",
        type: "textarea" as const,
        question: "The biggest internal change (mindset, self-trust, confidence):",
        placeholder: "This is the real transformation"
      },
      {
        id: "radiate_means",
        type: "textarea" as const,
        question: "What does 'radiating' look like in MY life?",
        placeholder: "Showing up as your most authentic, confident self"
      },
      {
        id: "week1_wins",
        type: "textarea" as const,
        question: "MY EVIDENCE LIST - Week 1 Wins (list at least 5 wins):",
        placeholder: "1. 2. 3. 4. 5. (keep going!)"
      },
      {
        id: "week2_wins",
        type: "textarea" as const,
        question: "Week 2 Wins (list at least 5):",
        placeholder: "Every workout, every choice, every moment you showed up"
      },
      {
        id: "week3_wins",
        type: "textarea" as const,
        question: "Week 3 Wins (list at least 5):",
        placeholder: "All your recovery and stress management wins"
      },
      {
        id: "additional_wins",
        type: "textarea" as const,
        question: "Additional wins I'm proud of:",
        placeholder: "Don't hold back - celebrate EVERYTHING"
      },
      {
        id: "old_negative1",
        type: "text" as const,
        question: "My old negative thought #1:",
        placeholder: "What used to hold you back?"
      },
      {
        id: "new_confident1",
        type: "text" as const,
        question: "My new confident truth #1:",
        placeholder: "Replace it with what you know now"
      },
      {
        id: "old_negative2",
        type: "text" as const,
        question: "My old negative thought #2:",
        placeholder: "Another limiting belief"
      },
      {
        id: "new_confident2",
        type: "text" as const,
        question: "My new confident truth #2:",
        placeholder: "Your powerful truth"
      },
      {
        id: "old_negative3",
        type: "text" as const,
        question: "My old negative thought #3:",
        placeholder: "One more"
      },
      {
        id: "new_confident3",
        type: "text" as const,
        question: "My new confident truth #3:",
        placeholder: "Step into this new belief"
      },
      {
        id: "top_non_negotiable1",
        type: "textarea" as const,
        question: "MY TOP 3 NON-NEGOTIABLES - #1: The practice that makes the biggest difference for me",
        placeholder: "Example: 'I need 8 hours of sleep or everything falls apart'"
      },
      {
        id: "top_non_negotiable2",
        type: "textarea" as const,
        question: "Non-Negotiable #2:",
        placeholder: "Example: 'Strength training 2x/week makes me feel powerful'"
      },
      {
        id: "top_non_negotiable3",
        type: "textarea" as const,
        question: "Non-Negotiable #3:",
        placeholder: "Example: 'My morning routine sets the tone for my whole day'"
      },
      {
        id: "weekly_movement_schedule",
        type: "textarea" as const,
        question: "My Weekly Movement Schedule: Days, times, types",
        placeholder: "Example: Mon/Wed/Fri 6am strength, Tue/Thu walk, Sat rest"
      },
      {
        id: "nutrition_focus",
        type: "textarea" as const,
        question: "My Nutrition Focus: Meal prep day, protein goal, hydration goal",
        placeholder: "What works for YOUR life?"
      },
      {
        id: "recovery_practices",
        type: "textarea" as const,
        question: "My Recovery Practices: Sleep schedule, wind-down routine, stress management, rest day",
        placeholder: "Your non-negotiables for recovery"
      },
      {
        id: "mindset_rituals",
        type: "textarea" as const,
        question: "My Mindset Rituals: Morning and evening practices",
        placeholder: "How you start and end your day"
      },
      {
        id: "obstacle1",
        type: "text" as const,
        question: "Obstacle #1:",
        placeholder: "Travel? Work stress? Family obligations?"
      },
      {
        id: "backup_plan1",
        type: "textarea" as const,
        question: "My backup plan for Obstacle #1:",
        placeholder: "What will you do when this happens?"
      },
      {
        id: "obstacle2",
        type: "text" as const,
        question: "Obstacle #2:",
        placeholder: "Lack of motivation?"
      },
      {
        id: "backup_plan2",
        type: "textarea" as const,
        question: "My backup plan for Obstacle #2:",
        placeholder: "Your strategy"
      },
      {
        id: "obstacle3",
        type: "text" as const,
        question: "Obstacle #3:",
        placeholder: "What else might derail you?"
      },
      {
        id: "backup_plan3",
        type: "textarea" as const,
        question: "My backup plan for Obstacle #3:",
        placeholder: "Be prepared"
      },
      {
        id: "weekly_checkin_day",
        type: "text" as const,
        question: "Every _______ (day), I will spend 15 minutes reviewing my week",
        placeholder: "Sunday? Monday?"
      },
      {
        id: "commitment",
        type: "textarea" as const,
        question: "My commitment to myself (this is not a temporary program - this is your LIFESTYLE):",
        placeholder: "Write your commitment. Make it powerful. Sign it."
      }
    ]
  },
  "8": {
    title: "Week 4 Lesson 2: Transformation Celebration",
    questions: [
      {
        id: "physical_wins",
        type: "checklist" as const,
        question: "Evidence of Your Transformation - Physical Wins:",
        options: [
          "Increased strength and endurance",
          "Better energy throughout the day",
          "Improved sleep quality",
          "Clothes fitting differently",
          "Reduced aches and pains"
        ]
      },
      {
        id: "mental_emotional_wins",
        type: "checklist" as const,
        question: "Mental & Emotional Wins:",
        options: [
          "More confidence in my choices",
          "Better mood and mental clarity",
          "Less anxiety and overwhelm",
          "Stronger self-trust",
          "More patience with myself"
        ]
      },
      {
        id: "biggest_win",
        type: "textarea" as const,
        question: "My Biggest Win from the Vitality Reset:",
        placeholder: "The ONE thing you're most proud of"
      },
      {
        id: "non_negotiable1_final",
        type: "text" as const,
        question: "Your 3 Non-Negotiables (practices that make everything else fall into place) - #1:",
        placeholder: "What must you protect?"
      },
      {
        id: "non_negotiable2_final",
        type: "text" as const,
        question: "Non-Negotiable #2:",
        placeholder: "Your anchor"
      },
      {
        id: "non_negotiable3_final",
        type: "text" as const,
        question: "Non-Negotiable #3:",
        placeholder: "Your foundation"
      },
      {
        id: "too_busy_plan",
        type: "textarea" as const,
        question: "When life gets crazy - If I'm 'too busy', I will:",
        placeholder: "Your minimum viable routine"
      },
      {
        id: "lose_motivation_plan",
        type: "textarea" as const,
        question: "If I lose motivation, I will:",
        placeholder: "How you'll get back on track"
      },
      {
        id: "fall_off_plan",
        type: "textarea" as const,
        question: "If I fall off track, I will:",
        placeholder: "No shame, just the plan to restart"
      },
      {
        id: "next_goal",
        type: "textarea" as const,
        question: "My next wellness goal is:",
        placeholder: "Where do you want to go from here?"
      },
      {
        id: "next_goal_timeline",
        type: "text" as const,
        question: "Timeline for my next goal:",
        placeholder: "30 days? 90 days? 6 months?"
      },
      {
        id: "next_goal_step1",
        type: "text" as const,
        question: "3 Small Steps to Get There - Step 1:",
        placeholder: "Break it down"
      },
      {
        id: "next_goal_step2",
        type: "text" as const,
        question: "Step 2:",
        placeholder: "Keep it simple"
      },
      {
        id: "next_goal_step3",
        type: "text" as const,
        question: "Step 3:",
        placeholder: "You've got this"
      },
      {
        id: "weekly_checkin_commitment",
        type: "text" as const,
        question: "I will do my weekly check-in every:",
        placeholder: "Sunday? Monday? Pick your day"
      },
      {
        id: "celebrate_this_weekend",
        type: "textarea" as const,
        question: "I will celebrate myself this weekend by:",
        placeholder: "How will you honor this transformation?"
      },
      {
        id: "most_important_learned",
        type: "textarea" as const,
        question: "The most important thing I learned about myself:",
        placeholder: "This is the gold"
      },
      {
        id: "proud_of",
        type: "textarea" as const,
        question: "I am proud of myself for:",
        placeholder: "Everything. List it all."
      },
      {
        id: "radiant_future",
        type: "textarea" as const,
        question: "My radiant future looks like:",
        placeholder: "You finished. You showed up. You transformed. Now describe who you're becoming."
      },
      {
        id: "letter_to_week1_self",
        type: "textarea" as const,
        question: "Letter to Your Week 1 Self - Write to the woman who started this program. Tell her what she's about to accomplish and how proud you are of her:",
        placeholder: "Dear Week 1 Me..."
      },
      {
        id: "letter_to_future_self",
        type: "textarea" as const,
        question: "Letter to Your Future Self (6 Months) - Write to the woman you're becoming. Tell her what you hope she's accomplished and maintained:",
        placeholder: "Dear Future Me..."
      }
    ]
  }
};
