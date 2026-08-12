# Speech enhancement app for call centers

Aaryan Mishra built a Tauri desktop application that runs voice models on-device during live calls. It reached more than 20 BPOs and call centers and produced a reported 58% increase in call conversion.

## Problem

Contact centers maintain quality-assurance and coaching teams, but only a fraction of calls can be reviewed. Feedback arrives late, training is difficult to personalize, and high attrition forces teams to repeat the same work for every new group of agents.

## Why it runs on-device

A cloud API would add another network dependency to a live call. Local inference keeps processing close to the audio path and makes the product easier to deploy inside existing call-center environments with different network and firewall restrictions.

## What Aaryan built

Aaryan built a Tauri desktop application that packaged on-device voice models for live calls. The implementation joined model inference, audio routing, application releases, and software distribution into a product that teams could deploy without rebuilding their dialer.

## Results

The application reached more than 20 BPOs and call centers and produced a reported 58% increase in call conversion. It moved the models from a demonstration into the environment where agents were already working.

## Audio samples

- [Original microphone input](https://aaryanmishra.com/demo/assets/input.wav)
- [Enhanced speech-to-speech model output](https://aaryanmishra.com/demo/assets/output.wav)

## Related

- [Human-readable case study and audio player](https://aaryanmishra.com/speech-app/)
- [About Aaryan Mishra](https://aaryanmishra.com/index.md)
