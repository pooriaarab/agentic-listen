# Agentic listen

Agentic listen turns a live stream or call recording URL into text with Deepgram or OpenAI. It does not accept local audio files. Use `agentic-transcribe` for files.

Dry run is the default. It exits successfully and does not call the network.

## Install

```sh
npm install agentic-listen
```

## Quick start

```sh
npx agentic-listen listen --source https://example.com/call.mp3
```

The command previews the request. It does not contact a vendor.

## Live vendors

| Brand | Environment key | Live command |
| --- | --- | --- |
| Deepgram | `DEEPGRAM_API_KEY` | `DEEPGRAM_API_KEY=... npx agentic-listen listen --source https://example.com/call.mp3 --vendor deepgram --live` |
| OpenAI | `OPENAI_API_KEY` | `OPENAI_API_KEY=... npx agentic-listen listen --source https://example.com/call.mp3 --vendor openai --live` |

Use `--live` only when you want the vendor request. Deepgram is the default vendor.

## Three uses

### CLI

```sh
npx agentic-listen listen --source https://example.com/call.mp3
```

Add `--vendor deepgram` or `--vendor openai`. Add `--language en` for Deepgram.

### Library

```js
import { listen } from "agentic-listen";

const result = await listen({ source: "https://example.com/call.mp3" });
```

Pass `{ dryRun: false }` and a vendor key to make a live request.

### MCP

```sh
npx agentic-listen mcp
```

Call the `listen` tool with `source`. Set `live: true` to call a vendor.

## License

MIT
