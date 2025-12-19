import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import {
  users, purchases, programs, programWeeks, sessions, checkIns, journalEntries, communityPosts, comments, userRoles,
  type User, type InsertUser, type Purchase, type Program, type InsertProgram,
  type ProgramWeek, type InsertProgramWeek, type Session, type InsertSession,
  type CheckIn, type InsertCheckIn, type JournalEntry, type InsertJournalEntry,
  type CommunityPost, type InsertCommunityPost, type Comment, type InsertComment
} from "../shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserRole(userId: number): Promise<string>;
  getUserAccess(userId: number): Promise<boolean>;
  grantUserAccess(userId: number): Promise<void>;
  createPurchase(purchase: { userId: number; stripeCheckoutSessionId: string; stripePaymentIntentId?: string | null; amountTotal?: number | null; currency?: string | null; status?: string; }): Promise<Purchase>;
  
  getPrograms(): Promise<Program[]>;
  getProgram(id: string): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program | undefined>;
  
  getProgramWeeks(programId: string): Promise<ProgramWeek[]>;
  getProgramWeek(id: string): Promise<ProgramWeek | undefined>;
  createProgramWeek(week: InsertProgramWeek): Promise<ProgramWeek>;
  
  getSessions(weekId: string): Promise<Session[]>;
  getSession(id: string): Promise<Session | undefined>;
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: string, session: Partial<InsertSession>): Promise<Session | undefined>;
  
  getCheckIns(userId: number): Promise<CheckIn[]>;
  createCheckIn(checkIn: InsertCheckIn): Promise<CheckIn>;
  
  getJournalEntries(userId: number): Promise<JournalEntry[]>;
  getJournalEntry(id: string): Promise<JournalEntry | undefined>;
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  updateJournalEntry(id: string, entry: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined>;
  deleteJournalEntry(id: string): Promise<boolean>;
  
  getCommunityPosts(): Promise<CommunityPost[]>;
  getCommunityPost(id: string): Promise<CommunityPost | undefined>;
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;
  
  getComments(postId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
}

interface MemoryUser {
  email: string;
  password: string;
  name: string;
}

interface MemoryProgram {
  title: string;
  shortDescription?: string | null;
  longDescription?: string | null;
  isActive?: boolean;
}

interface MemoryProgramWeek {
  programId: string;
  weekNumber: number;
  title: string;
  summary?: string | null;
  intentionText?: string | null;
}

interface MemorySession {
  programId: string;
  weekId: string;
  orderIndex: number;
  title: string;
  description?: string | null;
  durationMinutes?: number | null;
  videoUrl?: string | null;
  videoUrl2?: string | null;
  journalPrompt?: string | null;
  isActive?: boolean;
}

interface MemoryCheckIn {
  userId: number;
  programId: string;
  weekId: string;
  sessionId: string;
}

interface MemoryJournalEntry {
  userId: number;
  sessionId?: string | null;
  title: string;
  body: string;
}

interface MemoryCommunityPost {
  userId: number;
  programId?: string | null;
  weekId?: string | null;
  sessionId?: string | null;
  content: string;
  isHidden?: boolean;
}

interface MemoryComment {
  postId: string;
  userId: number;
  content: string;
  isHidden?: boolean;
}

class MemoryStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private userRoles: Map<number, string> = new Map();
  private purchases: Map<string, Purchase> = new Map();
  private programs: Map<string, Program> = new Map();
  private programWeeks: Map<string, ProgramWeek> = new Map();
  private sessions: Map<string, Session> = new Map();
  private checkIns: Map<number, CheckIn[]> = new Map();
  private journalEntries: Map<string, JournalEntry> = new Map();
  private communityPosts: Map<string, CommunityPost> = new Map();
  private comments: Map<string, Comment> = new Map();
  private nextUserId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.nextUserId++;
    const now = new Date();
    const u = user as unknown as MemoryUser;
    const isAdmin = u.email.toLowerCase().includes("marti");
    const newUser: User = {
      id,
      email: u.email,
      password: u.password,
      name: u.name,
      currentProgramId: null,
      currentWeekId: null,
      hasAccess: isAdmin,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(id, newUser);
    const role = isAdmin ? "admin" : "client";
    this.userRoles.set(id, role);
    return newUser;
  }

  async getUserRole(userId: number): Promise<string> {
    return this.userRoles.get(userId) || "client";
  }

  async getUserAccess(userId: number): Promise<boolean> {
    const user = this.users.get(userId);
    return Boolean(user?.hasAccess);
  }

  async grantUserAccess(userId: number): Promise<void> {
    const user = this.users.get(userId);
    if (user) {
      user.hasAccess = true;
      user.updatedAt = new Date();
    }
  }

  async createPurchase(purchase: { userId: number; stripeCheckoutSessionId: string; stripePaymentIntentId?: string | null; amountTotal?: number | null; currency?: string | null; status?: string; }): Promise<Purchase> {
    const id = crypto.randomUUID();
    const now = new Date();
    const newPurchase: Purchase = {
      id,
      userId: purchase.userId,
      stripeCheckoutSessionId: purchase.stripeCheckoutSessionId,
      stripePaymentIntentId: purchase.stripePaymentIntentId ?? null,
      amountTotal: purchase.amountTotal ?? null,
      currency: purchase.currency ?? null,
      status: purchase.status ?? "paid",
      createdAt: now,
    };
    this.purchases.set(id, newPurchase);
    return newPurchase;
  }

  async getPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values()).filter(p => p.isActive);
  }

  async getProgram(id: string): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const now = new Date();
    const id = crypto.randomUUID();
    const p = program as unknown as MemoryProgram;
    const newProgram: Program = {
      id,
      title: p.title,
      shortDescription: p.shortDescription ?? null,
      longDescription: p.longDescription ?? null,
      isActive: p.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
    this.programs.set(id, newProgram);
    return newProgram;
  }

  async updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program | undefined> {
    const existing = this.programs.get(id);
    if (!existing) return undefined;
    const updated: Program = { ...existing, ...(program as Partial<Program>), updatedAt: new Date() };
    this.programs.set(id, updated);
    return updated;
  }

  async getProgramWeeks(programId: string): Promise<ProgramWeek[]> {
    return Array.from(this.programWeeks.values()).filter(w => w.programId === programId);
  }

  async getProgramWeek(id: string): Promise<ProgramWeek | undefined> {
    return this.programWeeks.get(id);
  }

  async createProgramWeek(week: InsertProgramWeek): Promise<ProgramWeek> {
    const now = new Date();
    const id = crypto.randomUUID();
    const w = week as unknown as MemoryProgramWeek;
    const newWeek: ProgramWeek = {
      id,
      programId: w.programId,
      weekNumber: w.weekNumber,
      title: w.title,
      summary: w.summary ?? null,
      intentionText: w.intentionText ?? null,
      createdAt: now,
      updatedAt: now,
    };
    this.programWeeks.set(id, newWeek);
    return newWeek;
  }

  async getSessions(weekId: string): Promise<Session[]> {
    return Array.from(this.sessions.values()).filter(s => s.weekId === weekId);
  }

  async getSession(id: string): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async createSession(session: InsertSession): Promise<Session> {
    const now = new Date();
    const id = crypto.randomUUID();
    const s = session as unknown as MemorySession;
    const newSession: Session = {
      id,
      programId: s.programId,
      weekId: s.weekId,
      orderIndex: s.orderIndex,
      title: s.title,
      description: s.description ?? null,
      durationMinutes: s.durationMinutes ?? null,
      videoUrl: s.videoUrl ?? null,
      videoUrl2: s.videoUrl2 ?? null,
      journalPrompt: s.journalPrompt ?? null,
      isActive: s.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
    this.sessions.set(id, newSession);
    return newSession;
  }

  async updateSession(id: string, session: Partial<InsertSession>): Promise<Session | undefined> {
    const existing = this.sessions.get(id);
    if (!existing) return undefined;
    const updated: Session = { ...existing, ...(session as Partial<Session>), updatedAt: new Date() };
    this.sessions.set(id, updated);
    return updated;
  }

  async getCheckIns(userId: number): Promise<CheckIn[]> {
    return this.checkIns.get(userId) || [];
  }

  async createCheckIn(checkIn: InsertCheckIn): Promise<CheckIn> {
    const id = crypto.randomUUID();
    const now = new Date();
    const c = checkIn as unknown as MemoryCheckIn;
    const newCheckIn: CheckIn = {
      id,
      userId: c.userId,
      programId: c.programId,
      weekId: c.weekId,
      sessionId: c.sessionId,
      completedAt: now,
    };
    const existing = this.checkIns.get(c.userId) || [];
    existing.push(newCheckIn);
    this.checkIns.set(c.userId, existing);
    return newCheckIn;
  }

  async getJournalEntries(userId: number): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values())
      .filter(e => e.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getJournalEntry(id: string): Promise<JournalEntry | undefined> {
    return this.journalEntries.get(id);
  }

  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    const id = crypto.randomUUID();
    const now = new Date();
    const e = entry as unknown as MemoryJournalEntry;
    const newEntry: JournalEntry = {
      id,
      userId: e.userId,
      sessionId: e.sessionId ?? null,
      title: e.title,
      body: e.body,
      createdAt: now,
      updatedAt: now,
    };
    this.journalEntries.set(id, newEntry);
    return newEntry;
  }

  async updateJournalEntry(id: string, entry: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined> {
    const existing = this.journalEntries.get(id);
    if (!existing) return undefined;
    const updated: JournalEntry = { ...existing, ...(entry as Partial<JournalEntry>), updatedAt: new Date() };
    this.journalEntries.set(id, updated);
    return updated;
  }

  async deleteJournalEntry(id: string): Promise<boolean> {
    return this.journalEntries.delete(id);
  }

  async getCommunityPosts(): Promise<CommunityPost[]> {
    return Array.from(this.communityPosts.values())
      .filter(p => !p.isHidden)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getCommunityPost(id: string): Promise<CommunityPost | undefined> {
    return this.communityPosts.get(id);
  }

  async createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost> {
    const id = crypto.randomUUID();
    const now = new Date();
    const p = post as unknown as MemoryCommunityPost;
    const newPost: CommunityPost = {
      id,
      userId: p.userId,
      programId: p.programId ?? null,
      weekId: p.weekId ?? null,
      sessionId: p.sessionId ?? null,
      content: p.content,
      isHidden: p.isHidden ?? false,
      createdAt: now,
      updatedAt: now,
    };
    this.communityPosts.set(id, newPost);
    return newPost;
  }

  async getComments(postId: string): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(c => c.postId === postId && !c.isHidden);
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const id = crypto.randomUUID();
    const now = new Date();
    const c = comment as unknown as MemoryComment;
    const newComment: Comment = {
      id,
      postId: c.postId,
      userId: c.userId,
      content: c.content,
      isHidden: c.isHidden ?? false,
      createdAt: now,
      updatedAt: now,
    };
    this.comments.set(id, newComment);
    return newComment;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not available");
    const u = user as unknown as MemoryUser;
    const isAdmin = u.email.toLowerCase().includes("marti");
    const [newUser] = await db.insert(users).values({
      email: u.email,
      password: u.password,
      name: u.name,
      hasAccess: isAdmin,
    }).returning();
    const role = isAdmin ? "admin" : "client";
    await db.insert(userRoles).values({ userId: newUser.id, role });
    return newUser;
  }

  async getUserRole(userId: number): Promise<string> {
    if (!db) return "client";
    const [role] = await db.select().from(userRoles).where(eq(userRoles.userId, userId));
    return role?.role || "client";
  }

  async getUserAccess(userId: number): Promise<boolean> {
    const user = await this.getUser(userId);
    return Boolean(user?.hasAccess);
  }

  async grantUserAccess(userId: number): Promise<void> {
    if (!db) return;
    await db.update(users).set({ hasAccess: true, updatedAt: new Date() }).where(eq(users.id, userId));
  }

  async createPurchase(purchase: { userId: number; stripeCheckoutSessionId: string; stripePaymentIntentId?: string | null; amountTotal?: number | null; currency?: string | null; status?: string; }): Promise<Purchase> {
    if (!db) throw new Error("Database not available");
    const [created] = await db.insert(purchases).values({
      userId: purchase.userId,
      stripeCheckoutSessionId: purchase.stripeCheckoutSessionId,
      stripePaymentIntentId: purchase.stripePaymentIntentId ?? null,
      amountTotal: purchase.amountTotal ?? null,
      currency: purchase.currency ?? null,
      status: purchase.status ?? "paid",
    }).returning();
    return created;
  }

  async getPrograms(): Promise<Program[]> {
    if (!db) return [];
    return db.select().from(programs).where(eq(programs.isActive, true));
  }

  async getProgram(id: string): Promise<Program | undefined> {
    if (!db) return undefined;
    const [program] = await db.select().from(programs).where(eq(programs.id, id));
    return program;
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    if (!db) throw new Error("Database not available");
    const p = program as unknown as MemoryProgram;
    const [newProgram] = await db.insert(programs).values({
      title: p.title,
      shortDescription: p.shortDescription,
      longDescription: p.longDescription,
      isActive: p.isActive,
    }).returning();
    return newProgram;
  }

  async updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program | undefined> {
    if (!db) return undefined;
    const [updated] = await db.update(programs).set({ ...(program as Partial<Program>), updatedAt: new Date() }).where(eq(programs.id, id)).returning();
    return updated;
  }

  async getProgramWeeks(programId: string): Promise<ProgramWeek[]> {
    if (!db) return [];
    return db.select().from(programWeeks).where(eq(programWeeks.programId, programId));
  }

  async getProgramWeek(id: string): Promise<ProgramWeek | undefined> {
    if (!db) return undefined;
    const [week] = await db.select().from(programWeeks).where(eq(programWeeks.id, id));
    return week;
  }

  async createProgramWeek(week: InsertProgramWeek): Promise<ProgramWeek> {
    if (!db) throw new Error("Database not available");
    const w = week as unknown as MemoryProgramWeek;
    const [newWeek] = await db.insert(programWeeks).values({
      programId: w.programId,
      weekNumber: w.weekNumber,
      title: w.title,
      summary: w.summary,
      intentionText: w.intentionText,
    }).returning();
    return newWeek;
  }

  async getSessions(weekId: string): Promise<Session[]> {
    if (!db) return [];
    return db.select().from(sessions).where(eq(sessions.weekId, weekId));
  }

  async getSession(id: string): Promise<Session | undefined> {
    if (!db) return undefined;
    const [session] = await db.select().from(sessions).where(eq(sessions.id, id));
    return session;
  }

  async createSession(session: InsertSession): Promise<Session> {
    if (!db) throw new Error("Database not available");
    const s = session as unknown as MemorySession;
    const [newSession] = await db.insert(sessions).values({
      programId: s.programId,
      weekId: s.weekId,
      orderIndex: s.orderIndex,
      title: s.title,
      description: s.description,
      durationMinutes: s.durationMinutes,
      videoUrl: s.videoUrl,
      videoUrl2: s.videoUrl2,
      journalPrompt: s.journalPrompt,
      isActive: s.isActive,
    }).returning();
    return newSession;
  }

  async updateSession(id: string, session: Partial<InsertSession>): Promise<Session | undefined> {
    if (!db) return undefined;
    const [updated] = await db.update(sessions).set({ ...(session as Partial<Session>), updatedAt: new Date() }).where(eq(sessions.id, id)).returning();
    return updated;
  }

  async getCheckIns(userId: number): Promise<CheckIn[]> {
    if (!db) return [];
    return db.select().from(checkIns).where(eq(checkIns.userId, userId));
  }

  async createCheckIn(checkIn: InsertCheckIn): Promise<CheckIn> {
    if (!db) throw new Error("Database not available");
    const c = checkIn as unknown as MemoryCheckIn;
    const [newCheckIn] = await db.insert(checkIns).values({
      userId: c.userId,
      programId: c.programId,
      weekId: c.weekId,
      sessionId: c.sessionId,
    }).returning();
    return newCheckIn;
  }

  async getJournalEntries(userId: number): Promise<JournalEntry[]> {
    if (!db) return [];
    return db.select().from(journalEntries).where(eq(journalEntries.userId, userId)).orderBy(desc(journalEntries.createdAt));
  }

  async getJournalEntry(id: string): Promise<JournalEntry | undefined> {
    if (!db) return undefined;
    const [entry] = await db.select().from(journalEntries).where(eq(journalEntries.id, id));
    return entry;
  }

  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    if (!db) throw new Error("Database not available");
    const e = entry as unknown as MemoryJournalEntry;
    const [newEntry] = await db.insert(journalEntries).values({
      userId: e.userId,
      sessionId: e.sessionId,
      title: e.title,
      body: e.body,
    }).returning();
    return newEntry;
  }

  async updateJournalEntry(id: string, entry: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined> {
    if (!db) return undefined;
    const [updated] = await db.update(journalEntries).set({ ...(entry as Partial<JournalEntry>), updatedAt: new Date() }).where(eq(journalEntries.id, id)).returning();
    return updated;
  }

  async deleteJournalEntry(id: string): Promise<boolean> {
    if (!db) return false;
    await db.delete(journalEntries).where(eq(journalEntries.id, id));
    return true;
  }

  async getCommunityPosts(): Promise<CommunityPost[]> {
    if (!db) return [];
    return db.select().from(communityPosts).where(eq(communityPosts.isHidden, false)).orderBy(desc(communityPosts.createdAt));
  }

  async getCommunityPost(id: string): Promise<CommunityPost | undefined> {
    if (!db) return undefined;
    const [post] = await db.select().from(communityPosts).where(eq(communityPosts.id, id));
    return post;
  }

  async createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost> {
    if (!db) throw new Error("Database not available");
    const p = post as unknown as MemoryCommunityPost;
    const [newPost] = await db.insert(communityPosts).values({
      userId: p.userId,
      programId: p.programId,
      weekId: p.weekId,
      sessionId: p.sessionId,
      content: p.content,
      isHidden: p.isHidden,
    }).returning();
    return newPost;
  }

  async getComments(postId: string): Promise<Comment[]> {
    if (!db) return [];
    return db.select().from(comments).where(and(eq(comments.postId, postId), eq(comments.isHidden, false)));
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    if (!db) throw new Error("Database not available");
    const c = comment as unknown as MemoryComment;
    const [newComment] = await db.insert(comments).values({
      postId: c.postId,
      userId: c.userId,
      content: c.content,
      isHidden: c.isHidden,
    }).returning();
    return newComment;
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemoryStorage();
