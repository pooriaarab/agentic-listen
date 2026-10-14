import { describe, expect, test } from "vitest";
import { parseArgs, runCli } from "./cli.js";
describe("cli", () => { test("parses dry run", () => expect(parseArgs(["listen", "--source", "https://audio.test/x"])).toMatchObject({ dryRun: true })); test("prints a dry run", async () => { const out: string[] = []; expect(await runCli(["listen", "--source", "https://audio.test/x"], { out: x => out.push(x), err: () => {} })).toBe(0); expect(JSON.parse(out[0])).toMatchObject({ dryRun: true }); }); });
