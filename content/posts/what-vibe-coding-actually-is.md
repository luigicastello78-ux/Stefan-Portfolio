---
title: "What vibe coding actually is"
description: "A plain explanation of vibe coding, what it changes about building software, and where the term gets oversold."
date: 2026-09-09
tags:
  - "Vibe coding"
  - "AI"
cover: "/blog/what-vibe-coding-actually-is.webp"
---
If you have heard the term and assumed it means describing an app to a chatbot and shipping whatever comes back, you are not wrong about how some people use it. You are wrong about how it works when someone competent does it.

Here is the plain version.

## The short definition

Vibe coding is building software by describing what you want in natural language and letting an AI model write the first version, then reviewing and correcting that version yourself.

The model does the typing. A developer decides what gets built, reads everything that comes back, and owns the result. That second half is the entire difference between a working product and a pile of confident nonsense.

## What actually changes

The thing people expect to change is quality. It does not, at least not on its own. A model will happily write code that is elegant, idiomatic and completely wrong about your problem.

What changes is the cost of the boring parts.

- **The blank page is gone.** Every project used to start with an hour of scaffolding before anything was worth looking at.
- **Boilerplate is free.** Forms, validation, API routes, configuration. The parts nobody was ever proud of.
- **Exploration is cheap.** You can build two versions of something and throw one away without it hurting.
- **The reference lookup disappears.** No more losing twenty minutes to remembering the exact shape of an API you use twice a year.

Add those up across a project and a three-week build becomes a three-day build. Not because anyone is working faster, but because most of what used to fill those three weeks was never the interesting part.

## What does not change

The review does not get shorter. If anything it gets longer, because you are now reading code you did not write.

Models are wrong in a specific and dangerous way. They are wrong fluently. Human mistakes usually look like mistakes, half-finished or obviously confused. Model mistakes look finished. The variable names are sensible, the structure is clean, and the logic is subtly incorrect in a way that will not surface until someone real uses it.

So the job shifts. Less typing, more reading. Less remembering syntax, more noticing that the thing in front of you is quietly lying.

## Where the term gets oversold

Three claims worth pushing back on.

**"You do not need to know how to code."** You need to know more, not less. You have to evaluate code you did not write, in a codebase you did not design, at a speed that makes it tempting not to look. Someone who cannot read the output cannot tell the good version from the plausible one.

**"It works for anything."** It works best where the problem is common and the patterns are well-established. A marketing site, a CRUD application, an integration between two APIs. It works worst where the problem is genuinely novel, because the model has nothing to draw on and will confidently invent something.

**"It is a different kind of programming."** It is the same programming with a faster first draft. The decisions are the same decisions. The consequences are the same consequences.

## Why I use the term anyway

Because it describes something real, and because pretending otherwise would be dishonest about how the work gets done.

When a client asks how I built their site in four days, the answer is not that I type quickly. The answer is that the first draft cost almost nothing and I spent the time where it mattered, which was deciding what to build and checking that it worked.

That is worth naming. Vibe coding is the name it got.

## What this means if you are hiring someone

Ask two questions.

Ask what they threw away. Anyone using these tools seriously discards a lot of generated code. If they cannot name something the model got wrong on your kind of project, they are not reading the output.

Ask what they would do if the tools stopped working tomorrow. The answer should be "build it slower", not "find another job".

The speed is real. It comes from removing waiting, not from removing judgment.
