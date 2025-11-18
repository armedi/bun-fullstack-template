import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

export const api = new Elysia()
  .use(cors())
  .get("/api/hello", () => ({ message: "Hello World! This message is from backend API /api/hello endpoint" }));

export type Api = typeof api;
