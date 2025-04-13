---
layout: post
title: "it's not just the destination, it's the journey"
date: 2025-04-13
permalink: /attribution-part-four.md
series: "the attribution problem"
math: true
---

**why multi-touch attribution?**

There's a danger in giving all the credit for a conversion to the last piece of marketing content a user interacted with. You might be undervaluing some activities and overvaluing others.

Purchase journeys can be complex and contain multiple nudges from paid and organic marketing activities. A user might initially discover your brand through a Google ad, revisit your site later via an organic search, and eventually complete a purchase after clicking on a retargeting ad on Facebook. Which of these interactions deserves the credit for the conversion?

Multi-touch attribution (MTA) is an approach to distribute credit across multiple touchpoints.

> "It's not the destination, it's the journey." - Kind of Ralph Waldo Emerson

## **implementing mta on a website**

Let's expand on the approach[^1] described in ##part two## and handle referrals to multiple touchpoints, constructing a more nuanced narrative of how a user has converted.

[^1]: We're focusing here on manual implementations for websites for illustrative purposes. In practice, many teams use third-party software like Google Analytics 4 (GA4), which provides built-in multi-touch attribution modeling.

A user visits your website after clicking a Google ad. They're assigned a temporary anonymous ID: temp-1234, stored in a cookie in their browser's local storage. Any referrer data is stored in a database along with the ID.

```
// Initial visit from Google Ad
logTouchpoint('google', 'cpc', 'sale_promo', 'temp-1234');
```

The user then leaves the site without creating an account.

Later, they return using a different device, clicking on an organic search result. A new temporary ID: temp-5678 is created.

```
// Visit from Organic Search
logTouchpoint('organic', 'search', 'organic_search', 'temp-5678');
```

The next day, they click on a retargeting ad on Facebook, still using the second device.

```
// Retargeting visit from Facebook Ad
logTouchpoint('facebook', 'cpc', 'retargeting_ad', 'temp-5678');
```

This user creates an account, and we associate the data of temp-5678 with the permanent user ID: user-789. At a later stage, when the user returns on their first device, the ID is detected from the cookie in their browser. When they sign into their account, we complete the linking by joining the data from temp-1234 to the permanent ID. We now have a complete customer journey for this user.

```json
{
  "user_id": "user-789",
  "touchpoints": [
    {"source": "google", "medium": "cpc", "campaign": "sale_promo", "timestamp": 1712925600000},
    {"source": "organic", "medium": "search", "campaign": "organic_search", "timestamp": 1713012000000},
    {"source": "facebook", "medium": "cpc", "campaign": "retargeting_ad", "timestamp": 1713098400000}
  ]
}
```

This dataset becomes the foundation for our MTA analysis.

## **all models are wrong**

With multi-touch data in hand, we need a method to allocate conversion credit among touchpoints.

Here are a few simple attribution models:

**Linear:** Assign equal credit to all touchpoints.

**Time-decay:** The more recent the interaction, the more credit it gets.

**U-shaped:** The first and last interactions receive the most credit.

The model for assigning credit can become as complicated as you like. There might be specific things about your product or marketing that inform the approach you take; if not, it's best to start simple.

So, let's apply these models to our example with some simple assumptions for how time-decay and u-shaped may distribute.

| **MTA Model** | Google Ad | Organic Search | Facebook Ad |
|---------------|-----------|----------------|-------------|
| Linear        | 33.3%     | 33.3%          | 33.3%       |
| Time-Decay    | 10%       | 30%            | 60%         |
| U-shaped      | 40%       | 20%            | 40%         |

You can see that linear is simple to understand and is kind of objective. The other models require some parameter setting of how much more critical you think various touchpoints are.

> "All models are wrong, but some are useful" - George Box

Now we have assigned credit we can proceed to calculate cost per action for each advertising channel, you can see from our toy example, that the chose of MTA model will really effect our perception of the value for money we are getting from each channel, this is great if we pick a useful model, not so great if we don't.

## **implementing mta for mobile apps is trickier**

Web attribution benefits from relatively stable mechanisms like cookies, which reliably track user interactions within a browser environment. Mobile attribution faces unique challenges because there isn't an equivalent consistent tracking method. The candidate solution for this would be device ID, but on iOS, Apple's privacy frameworks, App Tracking Transparency (ATT) and SKAdNetwork, significantly restrict tracking capabilities, creating attribution gaps. Even Android, which has traditionally been less restrictive, now faces privacy barriers through Google's Privacy Sandbox initiatives, which aim to reduce long-term persistent identifiers.

On Android, the Google Play Install Referrer API provides a more deterministic connection between ad clicks and app installs, but it's not without limitations. It only works reliably when users follow a direct, uninterrupted path from clicking an ad to installing the app from the Google Play Store. If users delay their download, use alternative stores, or encounter privacy-oriented restrictions that disrupt tracking parameters, the API's reliability diminishes.

The complexity further intensifies when users interact with brands across multiple devices and platforms, fragmenting their digital identity and making unified attribution increasingly tricky. On web, persistent browser user logins provide more stable identifiers that link these cross-device activities.

What makes this even more challenging on mobile is the fundamental difference between install attribution and deeper funnel events. Unlike websites, installed apps don't receive URL referral data directly. Once the app is installed, it exists independently of the browser context—there is no inherent "referrer header" equivalent passed automatically into the app from future ad clicks.

Instead, apps must rely on special mechanisms such as deep linking. These deep links (or Universal/App Links on iOS and Android) can capture inbound referral data post-install, but they must be explicitly implemented. This requires careful coordination between app developers, marketers, and ad networks, adding substantial complexity to the attribution puzzle.

Due to these limitations, marketers are forced into uncomfortable compromises. Mobile attribution frequently relies on probabilistic modeling and specialized Mobile Measurement Partners (MMPs), both of which add complexity and introduce inevitable inaccuracies that web-based multi-touch attribution (MTA) typically avoids. Consequently, mobile attribution often produces less reliable data, involves more estimation, and complicates the task of justifying marketing decisions.
