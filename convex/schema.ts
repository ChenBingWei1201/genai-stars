import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
  videos: defineTable({
    twelvelabsId: v.string(),
    section: v.string(),
    title: v.string(),
    topics: v.string(),
    hashtags: v.array(v.string()),
    summary: v.string(),
    chapters: v.array(v.object({
      chapter_number: v.number(),
      start: v.number(),
      end: v.number(),
      chapter_title: v.string(),
      chapter_summary: v.string(),
    })),
    highlights: v.array(v.object({
      start: v.number(),
      end: v.number(),
      highlight: v.string(),
      highlight_summary: v.string(),
      highlight_index: v.number(),
    })),
  }),
});
