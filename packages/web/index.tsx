import { serve } from "bun";
import { api } from "./backend/api";
import index from "./frontend/index.html";

const server = serve({
	routes: {
		"/api/*": api.handle,
		"/*": index,
	},

	development: process.env.NODE_ENV !== "production" && {
		// Enable browser hot reloading in development
		hmr: true,
		// Echo console logs from the browser to the server
		console: true,
	},
});

console.log(`🚀 Server running at ${server.url}`);
