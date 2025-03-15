---
layout: post
title: "half the money I spend on advertising…"
date: 2025-03-02
permalink: /attribution-part-one.html
series: "the attribution problem"
math: true
---

## **the attribution problem**

Attribution is the process of identifying which touchpoints in a user's journey contribute to customer conversions and determining their relative impact on the purchasing decision. 

> "Half the money I spend on advertising is wasted; the trouble is I don't know which half." - John Wanamaker

In theory, the modern attribution approaches should tackle the problem referred to in the centuries-old John Wanamaker quote, at least within the digital marketing world. In practice, accurate attribution is notoriously tricky.

## which marketing efforts are driving our results?

A typical customer journey might consist of multiple marketing touchpoints, some before their first interaction with a product and some after. A user might see a display ad, later find the company via an organic search, sign up for a newsletter, and eventually click on an email link and make a purchase. 

The attribution problem is to try to unravel this journey and quantify the influence of each step. We care about getting attribution right to optimize marketing campaigns, budget allocation, and justify why we want to try, or stop trying something.

## winning the attribution war

Each ad platform tracks interactions in a silo, and each will claim that interaction as necessary (the attribution war). If a marketer naively adds up conversions reported by Facebook and Google, they may overcount or overestimate results because multiple channels claim credit for the exact conversion. Deciding how to divide the pie of credit among these touches is the crux of attribution.

## you get what you're allowed to measure

It's often impossible to deterministically know that the same person who clicked a mobile ad is the one who later purchased using a laptop since cookies and device IDs are not shared between devices. Even within a single device, walled-garden platforms (like Google, Facebook, Amazon) silo user data in closed ecosystems, making it hard for analysts to stitch together a unified view of the customer journey when pieces of the puzzle are locked in separate silos.

> "You get what you measure." - Richard Hamming

Privacy regulations have added to the complexity of attribution. The EU's GDPR and California's CCPA require user consent for tracking, and Apple's iOS App Tracking Transparency framework blocks the advertising ID for users who decline tracking. Regulations like these mean attribution models have blind spots for many users. With Google's stance on deprecating third-party cookies still unclear, marketers are bracing for further disruptions.

## enter the three-letter acronyms

To approach the attribution problem, marketers and data scientists use various methodologies like multi-touch attribution (MTA) and Marketing Mix Modelling (MMM). In the following articles, we will examine these models and technical implementations, like programmatic events and attempts at experimental validation like incrementality testing.
