// ===== reference links =====
// https://www.convex.dev/templates (open the link and choose for clerk than you will get the github link mentioned below)
// https://github.dev/webdevcody/thumbnail-critique/blob/6637671d72513cfe13d00cb7a2990b23801eb327/convex/schema.ts

import type { WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";

import { api, internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

import CryptoJS from "crypto-js";

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateClerkRequest(request);
  if (!event) {
    return new Response("Invalid request", { status: 400 });
  }
  switch (event.type) {
    case "user.created":
      await ctx.runMutation(internal.users.createUser, {
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
        imageUrl: event.data.image_url,
        name: event.data.first_name!,
      });
      break;
    case "user.updated":
      await ctx.runMutation(internal.users.updateUser, {
        clerkId: event.data.id,
        imageUrl: event.data.image_url,
        email: event.data.email_addresses[0].email_address,
      });
      break;
    case "user.deleted":
      await ctx.runMutation(internal.users.deleteUser, {
        clerkId: event.data.id as string,
      });
      break;
  }
  return new Response(null, {
    status: 200,
  });
});

const handleTwelveLabsWebhook = httpAction(async (ctx, request) => {
  const header = request.headers;
  const body = await request.text();
  const valid = validateTwelveLabsRequest(header, body);
  if (!valid) {
    return new Response("Invalid request", { status: 400 });
  }
  const payload = JSON.parse(body);
  if (payload.type === "index.task.ready"){
    const newVideo = JSON.parse(await ctx.runAction(api.twelve_labs.getVideoFromTask, {
      taskId: payload.data.id,
    }));
    await ctx.runAction(api.videos.doSomeMagic, {
      videoId: newVideo.videoId
    });
  }
  return new Response(null, {
    status: 200,
  });
});

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});

http.route({
  path: "/twelvelabs",
  method: "POST",
  handler: handleTwelveLabsWebhook,
});

const validateTwelveLabsRequest = (header: Headers, body: string): boolean => {
  const webhookSecret = process.env.TWELVE_LABS_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    throw new Error("TWELVE_LABS_WEBHOOK_SECRET is not defined");
  }
  const [t_raw, v1_raw] = header.get("TL-Signature")!.split(",");
  const t = t_raw.split("=")[1];
  const v1 = v1_raw.split("=")[1];
  const signedPayload = t + "." + body;
  const signatureValue = CryptoJS.HmacSHA256(signedPayload, webhookSecret);
  const v2 = CryptoJS.enc.Hex.stringify(signatureValue);
  // console.log(v1);
  // console.log(v2);
  // console.log(signedPayload);
  return v1 === v2;
};

const validateClerkRequest = async (
  req: Request,
): Promise<WebhookEvent | undefined> => {
  // key note: add the webhook secret variable to the environment variables field in convex dashboard setting
  // TODO: Update CLERK_WEBHOOK_SECRET
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }
  const payloadString = await req.text();
  const headerPayload = req.headers;
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  const event = wh.verify(payloadString, svixHeaders);
  return event as unknown as WebhookEvent;
};

export default http;
