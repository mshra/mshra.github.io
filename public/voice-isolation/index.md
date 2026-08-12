# Eigen voice isolation

Eigen is a voice isolation model for production Voice AI. Aaryan Mishra helped ship its model runtime, developer platform, and SDK layer so developers could add it to existing audio stacks.

## Problem

Voice agents can perform well with clean test audio but break when real calls introduce street noise, side talk, and mumbles. Transcription errors rise, interruptions fire at the wrong time, and the rest of the agent receives incorrect context.

## What Aaryan built

Aaryan worked across the model runtime, developer platform, and SDK layer for [Eigen](https://www.arctan.ai/eigen), which runs in under 10 milliseconds. The SDK supports [direct Python audio processing](https://www.getarctan.com/help/for-voice-bots/eigen/python/standard-python/) and Voice AI integrations including Pipecat and LiveKit.

## Results

Eigen processes more than 100,000 minutes of audio each day. Arctan reports a 57% reduction in word error rate on leading automatic speech recognition systems. The benchmark evaluation used a custom fork of the [Open ASR Leaderboard methodology](https://github.com/arctan-ai/open_asr_leaderboard).

## Related

- [Human-readable case study](https://aaryanmishra.com/voice-isolation/)
- [About Aaryan Mishra](https://aaryanmishra.com/index.md)
