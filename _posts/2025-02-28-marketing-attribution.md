---
layout: post
title: "half the money I spend on advertising…"
date: 2025-02-28
permalink: /the_attribution_problem.html
math: true
---

## **the attribution problem**

Marketing attribution is the process of identifying which marketing activities contribute to conversions (such as purchases, installs, page views, or other key actions) and assigning appropriate credit to each touchpoint in the customer's journey.

> "Half the money I spend on advertising is wasted; the trouble is I don't know which half" - John Wanamaker

In theory, the modern attribution approach can tackle the problem referred to in the centuries-old John Wanamaker quote, at least within the digital marketing world. In practice, accurate attribution is notoriously tricky.

## which marketing efforts are driving our results?

A typical customer journey might consist of multiple marketing touchpoints before converting. A user might see a display ad, later find the company via an organic search, sign up for a newsletter, and eventually click on an email link to make a purchase. The attribution problem is to try to unravel this journey and quantify the influence of each step. We care about getting attribution right to optimise campaigns, budget allocation, and justify why we want to try or stop trying something.

## winning the attribution war

Content marketing, advertising, search, and more can influence a single conversion. Each platform (Facebook, Google, email, etc.) tracks interactions in a silo, and each will claim that interaction as necessary (the attribution war). If a marketer naively adds up conversions reported by every channel's tool, they will double-count or overestimate results because multiple channels claim the exact conversion. Deciding how to divide the pie of credit among these touches is the crux of attribution.

## you get what you're allowed to measure

It's often impossible to deterministically know that the same person who clicked a mobile ad is the one who later purchased on a laptop since cookies and device IDs are not shared between devices. Even within a single device, walled-garden platforms (like Google, Facebook, Amazon) silo user data in closed ecosystems, making it hard for marketers to stitch together a unified view of the customer journey when pieces of the puzzle are locked in separate silos.

Privacy regulations have added to the complexity of attribution. The EU's GDPR and California's CCPA require user consent for tracking, and Apple's iOS App Tracking Transparency framework blocks the advertising ID for users who decline tracking. Regulations like these mean attribution models have blind spots for many users. With Google's stance on deprecating third-party cookies still unclear, marketers are bracing for further disruptions.

> "You get what you measure" - Richard Hamming

## enter the three letter acronyms

The next few posts will explore how marketers and data scientists approach this problem, from model methodologies and technical implementations to experimental validation. By understanding the spectrum of attribution techniques and their trade-offs, marketing professionals can better tailor measurement strategies to their needs and more confidently allocate resources.
