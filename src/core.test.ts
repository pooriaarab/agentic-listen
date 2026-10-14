import { describe, expect, test } from "vitest";
import { listen, VendorError } from "./core.js";
describe("listen", () => { test("defaults to a dry run", async () => expect(await listen({ source: "https://audio.test/call.mp3" })).toMatchObject({ dryRun: true, vendor: "deepgram", status: "preview" })); test("requires a vendor key for live calls", async () => await expect(listen({ source: "https://audio.test/call.mp3" }, { dryRun: false, env: {} })).rejects.toThrow("DEEPGRAM_API_KEY")); test("calls Deepgram's live host", async () => {
 const fetchFn = async (input: RequestInfo | URL) => { expect(String(input)).toMatch(/^https:\/\/api\.deepgram\.com\/v1\/listen/); return new Response(JSON.stringify({ results: { channels: [{ alternatives: [{ transcript: "hello fixture" }] }] } })); };
 expect(await listen({ source: "https://audio.test/call.mp3" }, { dryRun: false, env: { DEEPGRAM_API_KEY: "fixture" }, fetchFn: fetchFn as typeof fetch })).toMatchObject({ text: "hello fixture", status: "completed" });
});
test("calls OpenAI's live host", async () => {
 const fetchFn = async (input: RequestInfo | URL) => { expect(String(input)).toBe("https://api.openai.com/v1/audio/transcriptions"); return new Response(JSON.stringify({ text: "hello fixture" })); };
 expect(await listen({ source: "https://audio.test/call.mp3", vendor: "openai" }, { dryRun: false, env: { OPENAI_API_KEY: "fixture" }, fetchFn: fetchFn as typeof fetch })).toMatchObject({ text: "hello fixture", status: "completed" });
}); test("surfaces a vendor error", async () => await expect(listen({ source: "https://audio.test/call.mp3", vendor: "openai" }, { dryRun: false, env: { OPENAI_API_KEY: "fixture" }, fetchFn: (async () => new Response("bad", { status: 401 })) as typeof fetch })).rejects.toBeInstanceOf(VendorError)); });
