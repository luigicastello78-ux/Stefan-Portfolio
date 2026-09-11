---
title: "Five things AI gets wrong in almost every build"
description: "The specific defects that turn up again and again in generated code, and why none of them announce themselves."
date: 2026-08-15
tags:
  - "Review"
  - "AI"
cover: "/blog/reviewing-ai-code.webp"
---
Models are wrong in a particular way. Human mistakes usually look like mistakes: half-finished, obviously confused, clearly abandoned. Model mistakes look finished. The naming is sensible, the structure is tidy, and the thing is quietly incorrect.

That is why the review is the job. Here are the five that come up on nearly every project, in the order I check for them.

## 1. Logic that reads correctly and behaves backwards

The most common and the most dangerous.

A condition gets inverted. A loop runs one iteration short. An error branch catches the failure and then carries on as though nothing happened. Read the code and it sounds right, because it was written to sound right.

You cannot catch these by reading for style. You catch them by asking what happens with no items, one item, a duplicate, and a value nobody expected. Generated code is almost always written for the case somebody described and almost never for the four cases nobody mentioned.

## 2. Dependencies nobody asked for

Ask for a date formatted nicely and you can end up with a date library. Ask for a carousel and you can end up with an animation framework.

Every one of those is a thing that has to be updated, can break on a major version, and adds weight a visitor pays for. Models reach for a package because packages are what the training data reaches for.

Most of the time the honest version is three lines. The rule I use: a dependency has to earn its place by doing something genuinely hard, not by saving me ten minutes once.

## 3. Accessibility skipped silently

This one is almost universal, and it is invisible unless you go looking.

Buttons that are actually styled div elements, so a keyboard cannot reach them. Form fields with a placeholder and no label, which a screen reader reads as nothing at all. Colour contrast that looks fine on a good monitor and disappears on a laptop in daylight. Headings chosen for size rather than structure, so the document outline is nonsense.

None of it shows up in a screenshot, which is exactly why it survives to production on so many sites. I check heading order, keyboard path, focus visibility and contrast on every build, because generated markup gets this wrong by default.

## 4. Performance nobody measured

Generated code has no instinct for cost.

Images at full resolution because nobody said otherwise. Fonts loading in a way that blocks the first paint. Work repeated on every frame that could happen once. A library pulled in whole to use one function from it.

Individually none of it is dramatic. Together it is the difference between a site that feels instant and one that feels like wading. The fix is not cleverness, it is measuring, and measuring is a step that has to be in the process or it never happens.

## 5. Security handled by hope

Input that goes straight into a query or a template without being checked. Secrets in a file that ends up in the repository. An endpoint anyone can call as often as they like. Error messages that helpfully explain the internals to whoever is probing.

Models write the happy path very well. The unhappy path, where someone is deliberately trying to break the thing, is not in the brief unless you put it there.

## What this does not mean

It does not mean the tools are useless. I use them on everything, and the speed is real.

It means the output is a first draft with a particular set of blind spots, and knowing the blind spots is what makes the speed safe to take advantage of. The list above is not a reason to write everything by hand. It is a checklist, and a checklist is fast.

## The question worth asking a developer

If you are hiring somebody who works this way, ask them what they threw away on their last project.

Anyone genuinely reading the output can tell you immediately, with examples, and will probably be slightly annoyed about one of them. Anyone who cannot name a single thing the model got wrong is not reading it.

That is the whole test, and it takes about thirty seconds.
