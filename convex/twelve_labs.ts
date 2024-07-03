import { action } from "./_generated/server";
import { v } from "convex/values";
import axios from "axios";
import { HEADERS, ENGINES, BASE_URL, PAGE_LIMIT } from "@/constants/index";

// index
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

// video
export const getVideos = action({
  args: { indexId: v.string() },
  handler: async (_ctx, { indexId }) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${BASE_URL}/indexes/${indexId}/videos`,
        headers: { ...HEADERS },
      });
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});

export const getVideo = action({
  args: { indexId: v.string(), videoId: v.string() },
  handler: async (_ctx, { indexId, videoId }) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${BASE_URL}/indexes/${indexId}/videos/${videoId}`,
        headers: { ...HEADERS },
      });
      console.log("indexId", indexId);
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
});
