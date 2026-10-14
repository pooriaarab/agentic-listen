# agentic-listen

[![npm version](https://img.shields.io/npm/v/agentic-listen)](https://www.npmjs.com/package/agentic-listen) [![Downloads/month](https://img.shields.io/npm/dm/agentic-listen)](https://www.npmjs.com/package/agentic-listen) [![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/license/mit)

[Package and API types](https://www.npmjs.com/package/agentic-listen)

agentic-listen is an open-source audio URL transcription wrapper for developers using Deepgram, with an incomplete OpenAI request path.

## Install

```sh
npm install agentic-listen
```

Requires Node.js 18 or later. Includes TypeScript types and two direct runtime dependencies.

## Preview your first transcription

```sh
npx agentic-listen listen --source https://example.com/call.mp3
```

Success prints JSON with `dryRun: true`, `status: "preview"`, and empty `text`. The URL is a placeholder; previews make no network request.

```js
import { listen } from "agentic-listen";
console.log(await listen({ source: "https://example.com/call.mp3" }));
```

To call Deepgram, export its key and replace the URL with a reachable audio recording.
The package does not load `.env` files.

```sh
export DEEPGRAM_API_KEY="your-key"
npx agentic-listen listen --source https://your-domain.com/call.mp3 --vendor deepgram --language en --live
```

A successful response prints `status: "completed"` and transcript `text`. Inspect `text`; the parser can return an empty string.
SDK calls require `{ dryRun: false }` as the second argument to contact a provider.

## How it works

```text
SDK / CLI / MCP -> preview OR HTTP POST with audio URL -> transcript text
```

## Provider coverage

| Provider | Status | Environment variable | Request behavior |
| --- | --- | --- | --- |
| Deepgram | Implemented HTTP; live verification pending | `DEEPGRAM_API_KEY` | Posts an audio URL; reads the first transcript alternative |
| OpenAI | Scaffold; incompatible transcription payload | `OPENAI_API_KEY` | Posts JSON `{ url }` without a model or file upload |

The code has two provider branches. Neither has been credential-checked in this README review; tests use mocked responses.
OpenAI requires a file upload and model. The current branch does not meet that contract; do not rely on live OpenAI transcription.
See the [OpenAI transcription request reference](https://developers.openai.com/api/reference/resources/audio/subresources/transcriptions/methods/create).

## Features and runtime surfaces

- CLI command: `listen`; flags: `--source`, `--vendor`, `--language`, `--live`, `--help`/`-h`, `--version`/`-V`.
- SDK: `listen(request, options)` returns source, vendor, execution flags, text, and status. `VendorError` exposes provider failures.
- Model Context Protocol (MCP) exposes one tool, `listen`, with `source`, `vendor`, `language`, and `live` inputs.
- Start MCP with `npx --package agentic-listen agentic-listen-mcp`. The main CLI has no `mcp` command.
- SDK options accept `env` and `fetchFn` for explicit credentials and custom HTTP transport.

## Behavior limits and status

This package sends one HTTP request per live call. It provides no WebSocket streaming, microphone capture, or incremental transcript events.
`live: true` describes a provider request; it does not prove real-time audio processing.
Local audio uploads, retries, request timeouts, cost accounting, and guard enforcement are absent.
`language` is forwarded only to Deepgram. Deepgram is the default provider; dry run is the default execution mode.
Version 0.1.1 remains an early wrapper. It provides no managed transcription service.
Support uses repository issues; access may require repository permissions.

## Contributing

Run `npm run build && npm run typecheck && npm test` before pushing. Provider mocks do not prove live compatibility.
The `release` branch publishes only when the package version is new.

## License

MIT.
