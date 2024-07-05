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

/* List indexes */
export const getIndexes = action({
  args: {},
  handler: async (_ctx, _args) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${BASE_URL}/indexes`,
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
        url: `${BASE_URL}/indexes`,
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
      console.log("videoId", videoId);
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
      // Todo: Somehow make this function work
      const response = await axios.request({
        method: "POST",
        url: `${BASE_URL}/classify`,
        headers: { ...HEADERS },
        data: {
          video_ids: [videoId], // here
          options: ["conversation", "text_in_video", "visual"],
          classes: CLASSES,
        },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

export const findSimilarVideo = action({
  args: { indexId: v.string(), prompt: v.string() },
  handler: async (_ctx, { indexId, prompt }) => {
    try {
      const response = await axios.request({
        method: "POST",
        url: `${BASE_URL}/search-v2`,
        headers: { ...HEADERS },
        data: {
          index_id: indexId,
          query_text: prompt,
        },
      });
      return JSON.stringify(response.data);
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
