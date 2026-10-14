# Agentic listen

Turn a live audio stream or call recording URL into text as it arrives.

Dry run is the default. Use `--live` to call Deepgram or OpenAI.

## Install

```sh
npm install agentic-listen
```

## Quick start

```sh
npx agentic-listen listen --source https://example.com/call.mp3
```

This is a dry run. It does not call a vendor.

## Three uses

### CLI

```sh
DEEPGRAM_API_KEY=... npx agentic-listen listen \
  --source https://example.com/call.mp3 --live
```

### Library

```js
import { listen } from "agentic-listen";
const result = await listen({ source: "https://example.com/call.mp3" });
```

### MCP

```sh
npx agentic-listen mcp
```

Call the `listen` tool with `source`. Set `live: true` to call a vendor.

This pack listens to streams and recording URLs. It is not a file
transcription tool. Use `agentic-transcribe` for files.

## License

MIT
