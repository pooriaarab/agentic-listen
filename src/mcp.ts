import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { listen } from "./core.js";
import { VERSION } from "./version.js";
const result = (value: unknown, isError = false) => ({ content: [{ type: "text" as const, text: JSON.stringify(value) }], ...(isError ? { isError: true as const } : {}) });
export function createMcpServer(): McpServer { const server = new McpServer({ name: "agentic-listen", version: VERSION }); server.registerTool("listen", { description: "Return speech text from a stream or recording URL. Dry run by default.", inputSchema: { source: z.string().url(), vendor: z.enum(["deepgram", "openai"]).optional(), live: z.boolean().optional(), language: z.string().optional() } }, async ({ source, vendor, live, language }) => { try { return result(await listen({ source, vendor, language }, { dryRun: !live })); } catch (e) { return result({ error: e instanceof Error ? e.message : String(e) }, true); } }); return server; }
export async function startMcp(): Promise<void> { const server = createMcpServer(); await server.connect(new StdioServerTransport()); }
