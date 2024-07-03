import { ConvexError, v } from "convex/values";

import { internalMutation, query } from "./_generated/server";

export const getVideoById = query({
  args: { videoId: v.string() },
  handler: async (ctx, args) => {
    const video = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("twelvelabsId"), args.videoId))
      .unique();

    if (!video) {
      throw new ConvexError("Video not found");
    }

    return video;
  },
});

export const createVideo = internalMutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("videos", {
      twelvelabsId: args.twelvelabsId, 
      section: args.section, 
      title: args.title, 
      topics: args.topics, 
      hashtags: args.hashtags, 
      summary: args.summary, 
      chapters: args.chapters, 
      highlights: args.highlights,
    });
  },
});

export const updateVideo = internalMutation({
  args: {
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
  },
  async handler(ctx, args) {
    const video = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("twelvelabsId"), args.twelvelabsId))
      .unique();

    if (!video) {
      throw new ConvexError("Video not found");
    }

    await ctx.db.patch(video._id, {
        section: args.section, 
        title: args.title, 
        topics: args.topics, 
        hashtags: args.hashtags, 
        summary: args.summary, 
        chapters: args.chapters, 
        highlights: args.highlights,
    });
  },
});

export const deleteVideo = internalMutation({
  args: { twelvelabsId: v.string() },
  async handler(ctx, args) {
    const video = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("twelvelabsId"), args.twelvelabsId))
      .unique();

    if (!video) {
      throw new ConvexError("Video not found");
    }

    await ctx.db.delete(video._id);
  },
});