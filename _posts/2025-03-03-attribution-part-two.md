---
layout: post
title: "the multi-touch journey"
date: 2025-03-10
permalink: /attribution-part-two.html
series: "the attribution problem"
math: true
---

## the attribution problem

> "Attribution is trying to solve a fundamentally difficult problem: how do we allocate credit for a conversion across multiple marketing touchpoints?" - Bryan Eisenberg

In a perfect world, customers would see one ad, click it, and immediately purchase—making attribution crystal clear. But real customer journeys are messy and non-linear. A typical path might include scrolling past a Facebook ad, clicking a retargeting banner days later, abandoning a cart, opening an email reminder, and finally converting after a Google search.

When multiple touchpoints influence a conversion, who should get the credit? This is where user attribution models come in—frameworks that determine how to distribute conversion credit across the customer journey. The model you choose can change how you perceive channel performance and ultimately where you invest your marketing spend.

## Single-Touch Simplicity

Single touch attribution models assign all of the conversion credit to just one touchpoint. Two common approaches dominate.

**Last-Touch Attribution:** All credit goes to the final interaction before conversion. If a customer's journey ends with clicking a Google Search ad before purchasing, that search ad gets full credit—even if five other touchpoints preceded it. Last-click has been the default in many analytics platforms historically, partly because it's relatively easy to implement and explain.

**First-Touch Attribution:** This model gives full credit to the very first interaction that brought the customer into the funnel. If a Facebook ad first captured their attention three weeks before purchase, Facebook gets 100% credit regardless of what happened between that click and conversion.

> "First click attribution is akin to giving my first girlfriend 100% of the credit for me marrying my wife." - Avinash Kaushik

Single-touch models are appealing for their simplicity. They can be implemented by recording either the first or last referrer for each conversion. Last-touch intuitively gives credit to what "closed the deal," while first-touch acknowledges what "made the introduction".

The downside is that these models fail to capture much of the complexity of the multi-channel experience customers go through. Consider this journey:

Facebook Ad → Marketing Email → Google Search → Direct Visit → Purchase

Under last-touch the credit goes to the Direct Visit. Under first-touch it goes to the Facebook ad. Both models completely ignore the likely important inbetween touchpoints. Making violent budget allocation changes based on this would be naive.

Without being careful last-click models tend to lead to an overvaluing of bottom of the funnel channels like branded search or direct traffic while undervaluing awareness-building efforts. This can lead to pouring money into retargeting and search (which score those last-click conversions) while starving upper-funnel initiatives that might be driving initial interest. First-click does the opposite. Both approaches risk creating a vicious cycle where you invest only in what gets measured, regardless of true contribution.

## Splitting the Difference with MTA

Multi-touch attribution (MTA) models distribute credit across multiple touchpoints in the journey. Several standard approaches have emerged:

**Linear Attribution:** The democracy of attribution models—equal credit to every touchpoint. If four interactions occurred before purchase, each gets 25%. It's fair but not necessarily accurate, as it treats a casual website visit with the same weight as a product demo that closed the deal.

**Time-Decay Attribution:** This model assigns more credit to touchpoints that occurred closer to conversion. A touch that happened the day of purchase gets substantially more weight than one from three weeks prior. While this emphasizes recency, it systematically undervalues upper-funnel touchpoints that may have been crucial.

**Position-Based (U-Shaped) Attribution:** A compromise that gives fixed high credit to the first and last touchpoints while distributing the remainder among middle touches. A common example is the "40/20/40" split—40% to first touch, 40% to last touch, and 20% split among intermediate interactions. This approach acknowledges that awareness (first touch) and conversion (last touch) are key milestones while still keeping mid-funnel activities in the picture.

Let's revisit our example journey with different attribution models:

| Attribution Model | Facebook Ad (Touch 1) | Email (Touch 2) | Search (Touch 3) | Direct (Touch 4) |
|-------------------|----------------------|----------------|-----------------|------------------|
| First-Touch       | 100%                 | 0%             | 0%              | 0%               |
| Last-Touch        | 0%                   | 0%             | 0%              | 100%             |
| Linear (Equal)    | 25%                  | 25%            | 25%             | 25%              |
| Time-Decay        | 10%                  | 20%            | 30%             | 40%              |
| U-Shaped          | 40%                  | 10%            | 10%             | 40%              |

As you can see, the choice of model changes how we perceive channel value. Under last-touch, we might conclude "only direct traffic matters," while a linear view suggests "all channels contributed equally."

## Beyond Rules: Data-Driven Attribution

Rule-based models apply predetermined weights regardless of actual impact. But what if we could let the data decide? Enter data-driven attribution models, which analyze patterns in conversion data to infer each channel's true influence.

**Shapley Value Attribution:** Inspired by game theory, this approach calculates each channel's marginal contribution across all possible journey permutations. If removing email from the mix decreases conversion probability by 5% on average, email gets that proportional credit. This method is theoretically fair but computationally intensive.

**Markov Chain Attribution:** This technique models the customer journey as a state machine, examining transitions between touchpoints and toward conversion. By removing channels one at a time and measuring conversion probability drops, it infers each channel's importance. If eliminating paid search causes conversion rates to plummet, it clearly deserves substantial credit.

**Machine Learning Approaches:** More advanced techniques use regression or classification models to predict conversion outcomes based on touchpoint presence, then interpret the model coefficients as attribution weights. These can incorporate timing, frequency, and user attributes for more nuanced attribution.

Data-driven models promise accuracy over arbitrary rules. Many companies report significant performance improvements after switching to data-driven attribution. One Google case study found an 81% increase in ROAS when using data-driven attribution with automated bidding—the algorithm recognized and invested in channels that last-click had been under-crediting.

## The Incrementality Reality Check

Attribution models—even sophisticated ones—work primarily with observational data. They reveal correlation but not necessarily causation. A channel might appear in many converting paths without actually causing those conversions.

This is why leading organizations complement attribution with incrementality testing: running controlled experiments to measure true incremental lift. For example, withholding Facebook ads from a random 10% of users and comparing conversion rates with the exposed group reveals Facebook's true causal impact.

These experiments provide ground truth to calibrate attribution models. If your model gives email 30% credit but incrementality tests show it drives only 10% lift, your model needs adjustment.
