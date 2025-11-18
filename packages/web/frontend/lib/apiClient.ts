import { treaty } from "@elysiajs/eden";
import type { Api } from "../../backend/api";

export const apiClient = treaty<Api>(window.location.host);
