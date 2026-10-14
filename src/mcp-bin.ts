#!/usr/bin/env node
import { startMcp } from "./mcp.js";
startMcp().catch((e: unknown) => { console.error(e instanceof Error ? e.message : String(e)); process.exit(1); });
