import { z } from 'zod';

// Authentication validation schemas
export const signUpSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  inviteCode: z.string()
    .max(50, 'Invite code too long')
    .optional()
});

export const signInSchema = z.object({
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(1, 'Password is required')
    .max(100, 'Password must be less than 100 characters')
});

// Community validation schema
export const communityPostSchema = z.object({
  content: z.string()
    .trim()
    .min(1, 'Post content is required')
    .max(5000, 'Post must be less than 5000 characters')
});

// Journal validation schemas
export const journalEntrySchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  body: z.string()
    .trim()
    .min(1, 'Entry content is required')
    .max(50000, 'Entry must be less than 50,000 characters'),
  sessionId: z.string().optional()
});

// Profile validation schema
export const profileUpdateSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
});

// Type exports for TypeScript
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type CommunityPostInput = z.infer<typeof communityPostSchema>;
export type JournalEntryInput = z.infer<typeof journalEntrySchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
