import type { CookieOptions, Request } from "express";

export function getSessionCookieOptions(
  req: Request
): Pick<CookieOptions, "domain" | "httpOnly" | "path" | "sameSite" | "secure"> {
  // Always secure in production (Vercel always runs on HTTPS)
  // Use 'lax' so the cookie works on same-origin requests without requiring https in dev
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    path: "/",
    sameSite: isProduction ? "lax" : "lax",
    secure: isProduction,
  };
}
