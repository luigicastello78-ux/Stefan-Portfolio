---
title: "The automation most small businesses are missing"
description: "Not the clever kind. The boring kind, where an enquiry reaches the right person without anyone remembering to check an inbox."
date: 2026-08-01
tags:
  - "Automation"
  - "n8n"
cover: "/blog/the-automation-most-businesses-miss.webp"
---
Ask a small business what they would automate and you get ambitious answers. A chatbot. Something with AI in it. A dashboard.

Then look at how an enquiry actually reaches them, and it goes: form, to a shared inbox, that one person checks when they remember, who forwards it to whoever is free, who replies a day and a half later.

That is the automation that is missing. It is not clever and nobody puts it on a slide, but it is worth more than everything on the wish list.

## The test

Pick any process in your business and ask one question: does this depend on somebody remembering?

If yes, it will fail. Not today, and not dramatically. It fails on the week somebody is ill, or the Friday afternoon when everyone is busy, and you will never find out, because a lead that goes cold does not send a complaint.

Every automation worth building starts as an answer to that question.

## Where it usually pays

**Enquiries reaching a person, not an inbox.** The form should put the enquiry where the work already happens. If your team lives in a messaging app, it goes there, with the details attached, not as a notification that an email exists.

**Something chasing.** Most enquiries that go nowhere go nowhere because nobody followed up once. One scheduled reminder recovers more revenue than most marketing.

**A record that creates itself.** Every enquiry lands in one list with a date, a source and a status. Not for the reporting. So that in six months you can answer "where did our work come from" without guessing.

**Handoffs between tools.** The quote written in one place, the invoice raised in another, the job tracked in a third, and a person retyping the same details into each of them. That person is not doing skilled work, they are being an integration.

## Why it does not get built

Because nobody owns it.

It sits between marketing and operations, it is not urgent on any given day, and the cost is invisible. Nobody logs the hours spent copying between tools, so nothing shows up in a budget to justify fixing it.

It also does not feel like a project. It feels like admin, and admin does not get a kickoff meeting.

## What I actually build

Mostly n8n, which is a workflow tool you can self-host and which connects to the things you already use.

A typical one looks like this. Form submits. The payload gets validated and tidied. A row goes into a sheet or a CRM. A message lands in the channel where the team works, formatted so it is readable rather than a wall of field names. A reminder fires in two days if nobody has marked it handled. Anything that fails, fails loudly, to a place somebody sees.

That is it. Five or six steps, half a day to two days of work, and it removes an entire category of quiet loss.

## The part people get wrong

Silent failure.

An automation that breaks quietly is worse than no automation, because you have stopped checking. The workflow was doing the remembering, and now it is doing nothing, and the first sign is a customer asking why nobody got back to them.

So every workflow I build has an error path that reaches a human. It is the least interesting part and the one that matters most.

## Start smaller than you think

Not a system. One process.

Take the single thing that most often gets forgotten, and make it impossible to forget. Get that working, watch it for a fortnight, then do the next one.

The businesses that end up genuinely automated did not plan it. They fixed one annoying thing, noticed it stayed fixed, and did it again.
