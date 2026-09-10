# Polaris real demos — 9 September 2026

> Historical September 9 record. The current public page and media are described
> in [the September 10 redesign](polaris-page-redesign-2026-09-10.md).


The product page now uses real app captures instead of the drawn Polaris mock.
Six JPEG screenshots and an 11-second H.264 clip show signed development build
0.2.0 (84) running in the isolated Lodestar UX Lab macOS VM. All visible content
is sample data: a calculation, a two-minute tea timer, a deep-work blocklist and
a launch-outline note. Host desktop content and personal stores were not used.

Screenshots are unretouched captures of the VM window at 1182×768. The video
contains 55 captured frames at five frames per second, showing countdown, pause
and resume. Gaps between the three recording segments were omitted; it is an
edited demonstration, not a continuous timing benchmark. It contains no audio.
The macOS desktop and UTM frame provide context and are not Polaris features.
File hashes and sizes are recorded in `polaris-demo-assets-2026-09-09.json`.

The calculator showed 120/4 = 30. The timer creation screen parsed `2m tea`, then
the notch displayed the countdown, pause and resumed countdown. The sample timer
was cancelled afterward. Focus screenshots show the actual settings and a
filled blocklist editor; they do not claim that the Mac filters websites. Notes
shows a sample Inbox entry created through Polaris's supported URL action.

Remote guest screenshot capture remained unavailable because the guest CLI lacks
Screen Recording permission. Captures instead came from the host's UTM window
through the existing computer-use tool. No permission database was modified.
The original VM preferences were restored, the demo process stopped, and original
VM build 81 reopened. Synthetic demo data remains in the isolated QA directory.
The owner's host build and data were not changed.

The expanded page documents launcher workflows, the notch, timers/Pomodoro,
notes, tasks, clipboard, Focus policy and recovery, browser handoff, optional
online features, permissions, platform availability and FAQs. Images have
full-size links; video uses controls and metadata preload without autoplay.
These captures establish the shown behavior only, not complete runtime or
customer-release acceptance. Production site deployment remains separate.

Validation: ESLint, TypeScript, three product tests and the 23-page production
build passed. The local production preview loaded the real assets; video reached
11 seconds and ended without an error, the Pomodoro FAQ opened, and DOM bounds
showed no horizontal overflow at 816 px and 390 px. No console errors were
captured. These checks do not claim exhaustive browser/device coverage.

Production acceptance later on September 9 deployed site `d62aac3`: all six
JPEGs and the MP4 returned 200 with the expected types and source hashes.
The runtime image was checked for those same hashes before deployment. The
Dockerfile must copy `public/` explicitly because Next.js standalone output
omits it. This is site delivery evidence; native customer-release gates remain.
