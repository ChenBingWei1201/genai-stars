import { ConvexError, v } from "convex/values";

import {
  internalMutation,
  query,
  action,
  internalQuery,
} from "./_generated/server";
import { api, internal } from "./_generated/api";

export const checkExistVideo = query({
  args: { videoId: v.string() },
  handler: async (ctx, args) => {
    const video = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("twelvelabsId"), args.videoId))
      .unique();

    return video ? true : false;
  },
});

export const getAllVideos = query({
  handler: async (ctx) => {
    const videos = await ctx.db.query("videos").order("desc").collect();
    return videos;
  },
});

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

export const getVideoByClass = query({
  args: { class: v.string() },
  handler: async (ctx, args) => {
    const video = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("class"), args.class))
      .collect();
    return video;
  },
});

export const getSimilarVideoById = internalQuery({
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

export const getVideoBySearch = query({
  args: { search: v.string() },
  handler: async (ctx, args) => {
    if (args.search === "") {
      return await ctx.db.query("videos").order("desc").collect();
    }

    const filenameSearch = await ctx.db
      .query("videos")
      .withSearchIndex("search_filename", (q) =>
        q.search("filename", args.search),
      )
      .take(50);

    if (filenameSearch.length > 0) {
      return filenameSearch;
    }

    const titleSearch = await ctx.db
      .query("videos")
      .withSearchIndex("search_title", (q) => q.search("title", args.search))
      .take(50);

    if (titleSearch.length > 0) {
      return titleSearch;
    }

    return await ctx.db
      .query("videos")
      .withSearchIndex("search_summary", (q) =>
        q.search("summary", args.search)
      )
      .take(50);
  },
});

export const createVideo = internalMutation({
  args: {
    twelvelabsId: v.string(),
    filename: v.string(),
    videoUrl: v.string(),
    thumbnailUrl: v.string(),
    class: v.string(),
    title: v.string(),
    topics: v.array(v.string()),
    hashtags: v.array(v.string()),
    summary: v.string(),
    chapters: v.array(
      v.object({
        chapter_number: v.number(),
        start: v.number(),
        end: v.number(),
        chapter_title: v.string(),
        chapter_summary: v.string(),
      }),
    ),
    highlights: v.array(
      v.object({
        start: v.number(),
        end: v.number(),
        highlight: v.string(),
        highlight_summary: v.string(),
        highlight_index: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("videos", {
      twelvelabsId: args.twelvelabsId,
      filename: args.filename,
      videoUrl: args.videoUrl,
      thumbnailUrl: args.thumbnailUrl,
      class: args.class,
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
    filename: v.string(),
    videoUrl: v.string(),
    thumbnailUrl: v.string(),
    class: v.string(),
    title: v.string(),
    topics: v.array(v.string()),
    hashtags: v.array(v.string()),
    summary: v.string(),
    chapters: v.array(
      v.object({
        chapter_number: v.number(),
        start: v.number(),
        end: v.number(),
        chapter_title: v.string(),
        chapter_summary: v.string(),
      }),
    ),
    highlights: v.array(
      v.object({
        start: v.number(),
        end: v.number(),
        highlight: v.string(),
        highlight_summary: v.string(),
        highlight_index: v.number(),
      }),
    ),
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
      filename: args.filename,
      videoUrl: args.videoUrl,
      thumbnailUrl: args.thumbnailUrl,
      class: args.class,
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

export const doSomeMagic = action({
  args: { videoId: v.string() },
  handler: async (ctx, { videoId }) => {
    const videoInfo = await ctx.runAction(api.twelve_labs.getVideo, {
      indexId: process.env.NEXT_PUBLIC_INDEX_ID!,
      videoId: videoId,
    });
    const videoObj = JSON.parse(videoInfo!);
    const classes = await ctx.runAction(api.twelve_labs.classifyVideo, {
      videoId: videoId,
    });
    const classObj = JSON.parse(classes!);
    let myClass = "Other",
      myScore = 0;
    if (classObj?.data?.length > 0) {
      for (let i = 0; i < classObj?.data[0]?.classes?.length; i++) {
        if (classObj?.data[0]?.classes[i].score > myScore) {
          myClass = classObj?.data[0]?.classes[i].name;
          myScore = classObj?.data[0]?.classes[i].score;
        }
      }
    }
    const gist = await ctx.runAction(api.twelve_labs.generateGist, {
      videoId: videoId,
    });
    const summary = await ctx.runAction(api.twelve_labs.generateSummary, {
      videoId: videoId,
    });
    const chapters = await ctx.runAction(api.twelve_labs.generateChapter, {
      videoId: videoId,
    });
    const highlights = await ctx.runAction(api.twelve_labs.generateHighlight, {
      videoId: videoId,
    });
    const existVideo = await ctx.runQuery(api.videos.checkExistVideo, {
      videoId: videoId,
    });
    if (existVideo) {
      await ctx.runMutation(internal.videos.updateVideo, {
        twelvelabsId: videoId,
        filename: videoObj?.metadata.filename,
        videoUrl: videoObj?.source?.url || videoObj?.hls?.video_url,
        thumbnailUrl: videoObj?.hls.thumbnail_urls[0],
        class: myClass,
        title: JSON.parse(gist).title,
        topics: JSON.parse(gist).topics,
        hashtags: JSON.parse(gist).hashtags,
        summary: JSON.parse(summary).summary,
        chapters: JSON.parse(chapters).chapters,
        highlights: JSON.parse(highlights).highlights,
      });
    } else {
      await ctx.runMutation(internal.videos.createVideo, {
        twelvelabsId: videoId,
        filename: videoObj?.metadata.filename,
        videoUrl: videoObj?.source?.url || videoObj?.hls?.video_url,
        thumbnailUrl: videoObj?.hls.thumbnail_urls[0],
        class: myClass,
        title: JSON.parse(gist).title,
        topics: JSON.parse(gist).topics,
        hashtags: JSON.parse(gist).hashtags,
        summary: JSON.parse(summary).summary,
        chapters: JSON.parse(chapters).chapters,
        highlights: JSON.parse(highlights).highlights,
      });
    }
  },
});
