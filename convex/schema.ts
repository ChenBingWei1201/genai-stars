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
    title: v.string(),
    topics: v.string(),
    hashtags: v.array(v.string()),
  }),
});
