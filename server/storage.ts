import { db } from "./db";
import { posts, messages, type Post, type InsertPost, type Message, type InsertMessage } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Posts
  getPosts(): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  deletePost(id: number): Promise<void>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post>;

  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
}


export class DatabaseStorage implements IStorage {
  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
  async deletePost(id: number): Promise<void> {
  await db.delete(posts).where(eq(posts.id, id));
}

async updatePost(id: number, post: Partial<InsertPost>): Promise<Post> {
  const [updated] = await db
    .update(posts)
    .set(post)
    .where(eq(posts.id, id))
    .returning();

  return updated;
}

}

export const storage = new DatabaseStorage();
