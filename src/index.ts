import app from "./app";
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import OAuthProvider from "@cloudflare/workers-oauth-provider";
import { tools } from "./tools";

export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Demo",
		version: "1.0.0",
	});

	async init() {
		this.server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
			content: [{ type: "text", text: String(a + b) }],
		}));

		this.server.tool("greet", { name: z.string() }, async ({ name }) => ({
			content: [{ type: "text", text: `Hello, ${name}! Welcome to the MCP server!` }],
		}));

		// Add web search tool
		this.server.tool("performWebSearch", { query: z.string() }, async ({ query }) => {
			const results = await tools.performWebSearch.handler({ query });
			return {
				content: [{
					type: "text",
					text: JSON.stringify(results, null, 2)
				}],
			};
		});
	}
}

// Export the OAuth handler as the default
export default new OAuthProvider({
	apiRoute: "/sse",
	// TODO: fix these types
	// @ts-expect-error
	apiHandler: MyMCP.mount("/sse"),
	// @ts-expect-error
	defaultHandler: app,
	authorizeEndpoint: "/authorize",
	tokenEndpoint: "/token",
	clientRegistrationEndpoint: "/register",
});
