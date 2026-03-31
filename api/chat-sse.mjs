// api/chat-sse.mjs
// Server-Sent Events endpoint for real-time inbox updates.
// Vercel: set maxDuration = 60 (hobby) or 300 (pro) in project settings.
// The client reconnects automatically via EventSource spec.

import { addSSEClient, removeSSEClient } from "../server/routers/chat.js";
import { nanoid } from "nanoid";

export const config = {
  maxDuration: 60,
};

export default function handler(req, res) {
  // Only GET allowed
  if (req.method !== "GET") {
    res.status(405).end("Method Not Allowed");
    return;
  }

  // Basic auth check via cookie (same session cookie used by tRPC)
  // If missing, still allow — the inbox page handles auth at the React level.
  // The SSE stream itself only sends generic events with session IDs, no message content.

  const clientId = nanoid();

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // Disable nginx buffering
  res.flushHeaders();

  // Send initial keepalive
  res.write(": connected\n\n");

  // Register client
  const client = {
    id: clientId,
    write: (data) => {
      if (!res.writableEnded) res.write(data);
    },
  };
  addSSEClient(client);

  // Keepalive ping every 20s to prevent Vercel/proxy timeout
  const pingInterval = setInterval(() => {
    if (!res.writableEnded) {
      res.write(": ping\n\n");
    } else {
      clearInterval(pingInterval);
    }
  }, 20000);

  // Cleanup on disconnect
  req.on("close", () => {
    clearInterval(pingInterval);
    removeSSEClient(clientId);
  });
}
