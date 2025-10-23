# FirePRD — Sora 2 Pro One‑Shot Prompt (Hero Demo)

Use this prompt to generate a 12s, landscape, voiceover+music product demo that matches the landing page design.

## API parameters (suggested)

- model: `sora-2-pro`
- size: `1792x1024` (premium wide). Fallback: `1280x720`.
- seconds: `12`
- audio: `on`
- seed: set one if you want repeatability

> Note: Sora 2 Pro accepts 4/8/12 seconds. For a 15s hero, add a 3s end hold/fade in editing.

---

## One‑shot prompt (copy below)

Style and intent
Create a polished, desktop‑style product demo with audio, showing a split-screen: left = code editor with TypeScript; right = markdown PRD preview. Communicate “your repo → PRD” clearly for a landing‑page hero. Brand cues: warm light oranges, clean whites, subtle shadows. No real logos or trademarked editors.

Composition
Two white cards with gentle shadows centered on a soft off‑white canvas with a warm orange vignette:
- Left card: dark theme code editor (monospace, tasteful syntax colors), a narrow AI chat dock on the right side of the editor.
- Right card: bright markdown preview with a Table of Contents at top and clear section headings and bullets below.

Camera
Locked, head‑on screen capture look. Single move: 2% slow push‑in across the whole shot. No shake.

Lighting & palette
Soft, even light. Palette anchors: amber/orange (#fb923c), deep orange (#ea580c), creams/whites, cool gray text. Maintain high text contrast and zero jitter.

Action beats & timing (12 seconds total)
- 0.0–1.5s — Establish: both cards fade in. Left shows ~25 lines of TypeScript with syntax highlight; right shows a minimal “PRD” placeholder.
- 1.5–3.0s — In the left editor’s AI chat dock, a prompt appears and submits (abstract text like “/fireprd” then “*start .”, “*analyze”). The chat displays a brief “Analyzing repo…” response. Keep wording generic but structurally plausible.
- 3.0–6.5s — On the right card, “Table of Contents” fades in and expands to ~7 items (Vision, Personas, Experience Design, Data Model, Release Notes, Glossary, Appendix). Keep text clean and legible; no wobble.
- 6.5–10.0s — The PRD preview autoscrolls smoothly to reveal “Desired Experience” and “Acceptance Criteria” with 2–3 short bullet points each. Emphasize visual hierarchy (H2/H3, bullets).
- 10.0–12.0s — Settle on a strong poster frame: left shows readable code lines; right shows TOC plus a clear acceptance‑criteria bullet. Subtle glow on the right card edge to draw focus.

Legibility guidance
Text should look realistic; exact wording need not be perfectly readable. Focus on crisp headings, bullet structure, and stable UI. Avoid moiré, warping, or jitter.

Do / Don’t
Do: crisp UI, soft shadows, warm accent colors, single slow push‑in.
Don’t: show brand logos, real editor UI chrome, people/hands, or camera angle changes.

Audio (in‑model)
- Background music: soft, modern, minimal electronica; tempo ~90–100 BPM; unobtrusive; no melody that competes with voice.
- Voiceover: warm, clear narrator (gender‑neutral), neutral American accent, clean studio tone. Pacing synced to beats below.

Voiceover script (time‑aligned)
- 0.6s: “From your code…”
- 3.2s: “…to a human‑centered PRD—”
- 6.8s: “—in minutes.”
- 7.2–10.8s: “FirePRD reads your repo, you approve the structure, and it drafts the narrative your stakeholders can use.”
- 10.8–12.0s: “You stay in control at every step.”

Mixing notes
Voiceover: primary; background music −18 to −16 LUFS perceived, gentle sidechain duck during VO lines. No sound effects. End clean with a one‑second tail.

Subtitles
Display synchronized subtitles at the bottom of the frame in white with a faint black shadow. Each subtitle fades in smoothly as speak.

Finishing
Neutral color grade, subtle motion blur only. Clean end frame suitable as poster. No captions burned‑in.

Safety
No real logos, company names, or trademarked UI; no sensitive code content. All UI should be generic and stylized.

---

## Reference image (optional)
Use `docs/demo-reference.html` to capture a 1792×1024 still of the split layout and pass it as `input_reference` to lock composition and palette.
