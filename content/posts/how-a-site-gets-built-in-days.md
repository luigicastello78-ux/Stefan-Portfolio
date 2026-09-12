---
title: "How a site gets built in days without cutting corners"
description: "Where the speed actually comes from, what it does not come from, and the questions to ask anyone who claims it."
date: 2026-09-09
tags:
  - "Process"
  - "Speed"
cover: "/blog/how-a-site-gets-built-in-days.webp"
---
When somebody says they can build a site in days, the reasonable reaction is suspicion. Fast usually means thin. So it is worth being specific about where the days go and where they do not.

## What actually got faster

Not the thinking. Not the review. The waiting.

- **The blank page is gone.** Every project used to start with an hour of scaffolding before there was anything worth looking at.
- **Boilerplate is cheap.** Forms, validation, configuration, the fourteenth variation on a card component. Work that was never difficult, only slow.
- **Exploration costs nothing.** You can build two versions of a page and throw one away without it hurting, which quietly improves the result more than anything else on this list.
- **The reference lookup disappeared.** No more losing twenty minutes to the exact shape of an API you use twice a year.

Add those up across a project and three weeks becomes three days. Nobody is typing faster. Most of what used to fill those three weeks was never the interesting part.

## What did not get faster

**Deciding what to build.** This was always the hardest part and it has not moved at all. No tool knows your customers, your constraints, or the political reason the last attempt failed.

**Reading what came out.** If anything this got longer. There is more to look at and less of it came out of your own head.

**Integration reality.** The third-party API that behaves differently from its documentation. The legacy system that returns a success status with an error in the body.

**Taste.** Whether a layout reads well, whether the copy sounds like a person, whether the interaction feels right. You can generate a hundred options. Choosing is still yours.

**Responsibility.** When it breaks at eleven at night, nobody else is on the call.

## The trap in the middle

There is a category that looks fast and is not.

Anything where the output is plausible but hard to verify. Complex business logic. Data transformations with edge cases. Anything involving money, dates or timezones.

Producing that code takes minutes. Confirming it is correct takes as long as it ever did, and sometimes longer, because you are auditing rather than reasoning through something you wrote. Skip the audit and you have not saved time, you have moved the cost to whoever finds the bug.

The rule I use: the more expensive a mistake would be, the less the speed matters and the more slowly I go.

## So what does a fast build actually look like

A marketing site with clear content and a decisive client is days. That is the claim on the front of this site and I stand behind it.

A web app with real business logic is two to three weeks for a working first version, because applications have state, state has edge cases, and edge cases are where fast work goes wrong.

Anyone quoting you one number for every kind of project has not thought about it properly.

## What to ask before you believe anyone

**Ask what they threw away on the last project.** Anyone working quickly and honestly discards a lot, and will be able to name something specific, probably with a trace of annoyance. Anyone who cannot name a single thing is not looking closely enough.

**Ask what happens in the last ten percent.** Empty states. What the form says when the email is wrong. The page at 320 pixels wide. Keyboard order. That is a day of work, reliably, and skipping it is the clearest difference between a site that feels professional and one that feels like a template.

**Ask who holds the accounts at the end.** Speed is worth nothing if you cannot take the result with you.

The speed is real. It comes from removing waiting, not from removing judgment, and those are very different things.
