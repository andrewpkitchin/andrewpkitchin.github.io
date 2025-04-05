---
layout: post
title: "the mechanics of web attribution"
date: 2025-03-03
permalink: /attribution-part-two.html
series: "the attribution problem"
math: true
---

<img src="/assets/images/attribution_two.webp" alt="event firing inspired image" width="400" class="feature-image">

## **invisible events**

A programmatic event is a structured record of something that happens in a system, often triggered by a user action.

For instance, when a button is clicked, aside from hopefully performing the user's intended action, it also triggers code that creates a structured object. This object might include elements like a timestamp and user ID, which is then transmitted to a logging or analytics system. This structured object is what we call an **event**[^1].

[^1]: A term of art often used for the process of code creating and communicating an event is "event firing".

> *"If you can't measure it, you can't improve it." - Peter Drucker*

Events let us capture user actions as they navigate websites or apps. Rather than relying on basic server logs or page view counters that provide aggregate data, implementing event tracking allows us to gain insights into how individuals are using a product and where they're coming from.

## **client-side**

JavaScript[^2] running in the browser typically handles event recording for websites. The following snippet creates and communicates a page view event. The event will include what the user is viewing, when they arrived, and their user ID.

```javascript
function logPageView() {
    const event = {
        event_type: 'page_view',
        page_url: window.location.href,
        timestamp: Date.now(),
        user_id: getCookie('user_id') || null
    };
    // Send the event data to our analytics service.
    fetch('https://analytics.example.com/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    });
}
```

[^2]: We're focusing here on manual implementations for websites. In practice, many teams use third-party software developer kits (SDKs) or tag managers, like Google Tag Manager, to simplify event tracking.

## **server-side**

Events can also be logged on the server side. When a user performs an action that hits your server, such as triggering an API call, the server can log an event to a database or analytics service. This might complement client-side logging for verification or provide an alternative in cases where client-side tracking could be blocked.

Here's how a Python backend might log events:

```python
import json
from datetime import datetime

def log_conversion(user_id, event_name, metadata=None):
    event = {
        "event_type": event_name,
        "user_id": user_id,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "metadata": metadata or {}
    }
    with open("events.log", "a") as f:
        f.write(json.dumps(event) + "\n")
```

When a conversion happens, the server records the event by writing a line of structured JSON to a log file.

This is a simple example. In a real system, you'd typically send this data to a central analytics service. But the core concept remains: collect key details in a consistent format whenever something significant happens.

## **signal and noise**

Not everything should be tracked. Over-tracking creates noise that obscures meaningful patterns.

> "Data is like garbage. You'd better know what you are going to do with it before you collect it." - (Probably not) Mark Twain

When getting started, designing a small, purposeful set of events with straightforward analytical questions in mind is often the right approach for all but the most data-capable teams. Trying to track everything and planning to figure out the details later can lead to analysis paralysis.

Maintaining documentation that details event types, their properties, and the contexts in which they fire is also crucial to help the various teams who want to use the collected data.

## **back to attribution**

Events are our first attempt at establishing some ground truth around which marketing activities led a user to take a valuable action like signing up.

Imagine a user sees a Google ad for your website and clicks it. The link they follow includes tracking parameters in the URL:

```
https://example.com?utm_source=google&utm_campaign=spring_launch
```

When the page loads, a page view event fires. Alongside the basic page information, this event captures the tracking parameters and a unique user ID, which also gets stored in a cookie.

That user might leave without converting. But if they return later and sign up, a second event fires. We set things up so that the sign-up event retrieves the user ID from the cookie that's still stored with the user.

We can now connect the dots: The Google ad drove the initial visit, and that same user went on to convert. The credit for this conversion can be assigned to Google.

There are some important caveats to make in this toy example.

- Maybe this user interacted with less trackable marketing activities between the two events, so this "first touch" attribution, which gives all the credit to the Google ad, doesn't capture the whole story. This is where multi-touch attribution comes in.
- Cookie-based tracking (especially third-party) is increasingly unreliable due to browser privacy features.
- First-party cookies are still mostly functional, but privacy tools, browser restrictions, and ad blockers can affect those as well.

## **primer on user ids**

The `user_id` is a unique identifier we want to use to track a person across different events, pages, and sessions.

If the user hasn't signed up or logged in, we'll assign them a temporary ID, often stored in a browser cookie. This allows us to track behavior even before they're linked to an account:

```javascript
function getOrCreateUserId() {
    let userId = getCookie('user_id');
    if (!userId) {
        userId = crypto.randomUUID();
        setCookie('user_id', userId, { days: 30 }); // Store for future visits
    }
    return userId;
}
```

This approach gives us continuity. The same ID can be used across multiple visits, as long as the cookie persists.

Once a user logs in or creates an account, we can assign them a stable user ID from our system. This lets us break away from using cookies and track across browsers, devices, and more extended time periods (assuming they always sign in).

Many systems track both anonymous and known user IDs. When a user signs up, we can associate their past anonymous ID with their new account. For example:

```json
{
  "event_type": "signup",
  "anonymous_id": "temp-abc123",
  "user_id": "user-789",
  "utm_source": "google",
  "timestamp": "2025-03-21T12:00:00Z"
}
```

Events are designed representations of facts such as page views, clicks, and purchases. When stitched together, they can become a narrative which might reveal the things that are working well, or not so well with your product and marketing.
