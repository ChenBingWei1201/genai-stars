// ref: https://docs.twelvelabs.io/reference
import { action } from "./_generated/server";
import { v } from "convex/values";
import axios from "axios";
import {
  HEADERS,
  ENGINES,
  BASE_URL,
  PAGE_LIMIT,
  CLASSES,
} from "@/constants/index";
import { internal } from "./_generated/api";
import { ClipType, SimilarVideoType } from "@/types/index";

/* List indexes */
export const getIndexes = action({
  args: {},
  handler: async (_ctx, _args) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${BASE_URL}/classes`,
        headers: { ...HEADERS },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* Create an index */
export const createIndex = action({
  args: { name: v.string() },
  handler: async (_ctx, { name }) => {
    try {
      const response = await axios.request({
        method: "POST",
        url: `${BASE_URL}/classes`,
        headers: { ...HEADERS },
        data: { index_name: name, engines: ENGINES, addons: ["thumbnail"] },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* List videos */
export const getVideos = action({
  args: { indexId: v.string() },
  handler: async (_ctx, { indexId }) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${BASE_URL}/indexes/${indexId}/videos`,
        headers: { ...HEADERS },
        params: { page_limit: PAGE_LIMIT },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* Retrieve video information */
export const getVideo = action({
  args: { indexId: v.string(), videoId: v.string() },
  handler: async (_ctx, { indexId, videoId }) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${BASE_URL}/indexes/${indexId}/videos/${videoId}`,
        headers: { ...HEADERS },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* List video indexing tasks */
export const getTasks = action({
  args: { indexId: v.string() },
  handler: async (_ctx, { indexId }) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${BASE_URL}/tasks`,
        headers: { ...HEADERS },
        params: { index_id: indexId, page_limit: PAGE_LIMIT },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* Retrieve a video indexing task */
export const getVideoFromTask = action({
  args: { taskId: v.string() },
  handler: async (_ctx, { taskId }) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${BASE_URL}/tasks/${taskId}`,
        headers: { ...HEADERS },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* Classify a set of videos */
export const classifyVideo = action({
  args: { videoId: v.string() },
  handler: async (_ctx, { videoId }) => {
    try {
      const response = await axios.request({
        method: "POST",
        url: `${BASE_URL}/classify`,
        headers: { ...HEADERS },
        data: {
          video_ids: [videoId],
          options: ["conversation", "text_in_video", "visual"],
          classes: CLASSES,
          threshold: { min_video_score: 1 },
          show_detailed_score: true,
        },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* Search */
export const findSimilarVideo = action({
  args: { indexId: v.string(), prompt: v.string() },
  handler: async (ctx, { indexId, prompt }) => {
    try {
      const data = {
        index_id: indexId,
        search_options: ["visual", "conversation", "text_in_video", "logo"],
        query: prompt,
        group_by: "video",
        sort_option: "clip_count",
        threshold: "medium",
        adjust_confidence_level: 1,
        page_limit: PAGE_LIMIT,
      };
      const response = await axios.request({
        method: "POST",
        url: `${BASE_URL}/search`,
        headers: { ...HEADERS },
        data: data,
      });
      const clips: ClipType[] = response.data.data[0].clips;
      const similarVideos: SimilarVideoType[] = await Promise.all(
        clips.map(async (video: ClipType) => {
          const videoInfo = await ctx.runQuery(
            internal.videos.getSimilarVideoById,
            {
              videoId: video.video_id,
            },
          );
          const similarVideo: SimilarVideoType = {
            filename: videoInfo.filename,
            videoUrl: videoInfo.videoUrl,
            score: video.score,
            start: video.start,
            end: video.end,
            twelvelabsId: video.video_id,
            confidence: video.confidence,
            thumbnailUrl: video.thumbnail_url,
          };
          return similarVideo;
        }),
      );

      return similarVideos;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* Titles, topics, or hashtags */
export const generateGist = action({
  args: { videoId: v.string() },
  handler: async (_ctx, { videoId }) => {
    try {
      const response = await axios.request({
        method: "POST",
        url: `${BASE_URL}/gist`,
        headers: { ...HEADERS },
        data: { video_id: videoId, types: ["topic", "hashtag", "title"] },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* Summaries */
export const generateSummary = action({
  args: { videoId: v.string() },
  handler: async (_ctx, { videoId }) => {
    try {
      const response = await axios.request({
        method: "POST",
        url: `${BASE_URL}/summarize`,
        headers: { ...HEADERS },
        data: { video_id: videoId, type: "summary", prompt: "" },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* Chapters */
export const generateChapter = action({
  args: { videoId: v.string() },
  handler: async (_ctx, { videoId }) => {
    try {
      const response = await axios.request({
        method: "POST",
        url: `${BASE_URL}/summarize`,
        headers: { ...HEADERS },
        data: { video_id: videoId, type: "chapter", prompt: "" },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

/* Highlights */
export const generateHighlight = action({
  args: { videoId: v.string() },
  handler: async (_ctx, { videoId }) => {
    try {
      const response = await axios.request({
        method: "POST",
        url: `${BASE_URL}/summarize`,
        headers: { ...HEADERS },
        data: { video_id: videoId, type: "highlight", prompt: "" },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});
