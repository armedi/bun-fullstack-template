import { treaty } from "@elysiajs/eden";
import type { Api } from "web/backend/api";
import { API_BASE } from "./config";

// @ts-expect-error - Elysia version mismatch across packages
export const apiClient = treaty<Api>(API_BASE);
