---
layout: post
title: "mobile attribution"
date: 2025-04-04
permalink: /attribution-part-three.html
series: "the attribution problem"
math: true
---

## **beyond the install**

Knowing where installs of a mobile app are coming from – for example, which ad campaign or social media post – is crucial for optimizing your marketing spend and scaling effectively. This process is called mobile attribution.

We will look at some of the basic tools Android developers use to try to create a narrative of where installs are originating.

## **google play install referrer api**

Google provides an install attribution tool directly within its ecosystem, the Google Play Install Referrer API. 

The API allows us, upon first launch after installation by a user, to retrieve several key pieces of information. The most valuable is the Referrer URL – the full URL string that led the user to the Play Store listing of the app. This can be set up to contain tracking parameters (like UTM tags or specific campaign IDs) appended by the ad network or marketing source. The API also provides the Referrer Click Timestamp, indicating when the user clicked the link that initiated the Play Store visit, and the App Install Begin Timestamp, marking when the app installation process started via the Play Store.

The API works by securely storing referrer information when a user clicks an ad or link that directs them to the Play Store. Once the app is installed and opened, code within the app can query this API to retrieve the stored data. 

It's worth noting that this referral information is only available for retrieval for 90 days after the app is installed. Despite this limitation, the API remains the authoritative source for linking an install directly back to the specific Play Store entry point triggered by a marketing effort.

The response we get after calling the Install Referrer API looks something like this:

```
// Example referrerUrl value:
"utm_source=facebook&utm_medium=cpc&utm_campaign=summer_sale&utm_content=video_ad_1&utm_term=fitness_app"

// Example timestamp values (Unix time in seconds):
referrerClickTimestampSeconds: 1633042800  // October 1, 2021, 10:00:00 AM UTC
appInstallTimestampSeconds: 1633043100     // October 1, 2021, 10:05:00 AM UTC
```

The above response contains two key components that help us understand the user's journey.

**First**, there's the Install Referrer String, which contains URL-encoded parameters passed in the original tracking link. These include standard UTM parameters (source, medium, campaign, content, term), ad network-specific identifiers (campaign_id, ad_id, creative_id), and click identifiers like Google's gclid parameter. 

**Second**, we have the timestamps that bookend the install process. The referrerClickTimestampSeconds tells us exactly when the user clicked the ad or link, while the appInstallTimestampSeconds marks when they began installing the app.

Looking at the example, we can create a straightforward narrative. 

The user discovered our app through a Facebook advertisement that was part of our "summer_sale" campaign. 
Specifically, they engaged with a video ad targeted at fitness app seekers. 
The timestamps reveal that it took approximately 5 minutes from their initial click to the moment they decided to install the app – valuable information that helps us understand user behavior patterns and the effectiveness of our ad creative.

## **software development kits **

While the Install Referrer API can be called to provide the initial install source information, Software Development Kits (SDKs) can collect and transmit this attribution data as well as track ongoing user behavior.

SDKs are pre-packaged sets of code provided by analytics or attribution companies that developers integrate directly into their mobile applications. Upon the app's first launch, the attribution SDK typically makes the call to the Google Play Install Referrer API to retrieve the install source information. Beyond this initial connection, SDKs track in-app events – logging user actions after the install, such as completing registration or making a purchase.

SDKs also gather contextual information like device type, OS version, and potentially the Google Advertising ID (GAID) to help link installs and events accurately. All this data – install referrer info, event data, device info – is securely packaged and sent to the servers of the attribution provider for processing.
Integrating an SDK usually involves adding a library to your app and writing small code snippets to initialize the SDK and log specific events.

## **mobile measurement partners**

Mobile Measurement Partners (MMPs) are third-party platforms that specialize in mobile attribution and marketing analytics. Examples include Adjust, Appsflyer, and Branch. MMPs provide SDKs as mentioned above, but their role extends far beyond just data collection.

MMPs process the data sent by the SDKs (including the Install Referrer data and in-app events) and apply attribution logic using various data points to determine which marketing source deserves credit for an install or subsequent event. They often match data received from the SDK with click/impression data received directly from ad networks - this data is not accessible to most companies and developers.

MMPs provide dashboards and reports allowing marketers to see which campaigns are driving installs and engagement. This centralizes your attribution efforts, providing a single source of data across multiple ad networks and marketing channels, which can make it easier to make day-to-day decisions.

Downsides of working with an MMP include reliance on somewhat of a black-box platform that makes attribution decisions you can’t independently verify, like crediting installs or conversions to specific channels based on proprietary logic or data.
Over time, marketing mix modeling (MMM) can serve as a helpful check on MMP-reported performance. But MMM is data-hungry, technically demanding, and slow to mature—making it a long-term solution, not a quick fix.

> “It’s not the voting that’s democracy; it’s the counting.” – Tom Stoppard

Google and Facebook both run the campaigns and report the results, akin to dictators running the election and counting the votes. MMPs offer a layer of independence, akin to independent exit pollers. But let’s not stretch the analogy too far - ad networks don’t benefit much in the long run from outright deception, since marketers will stop spending if ad network spend doesn’t map to real-world sales.

## **the attribution flow**

Let's walk through a typical scenario: A user sees an advertisement for your app ("SuperFit Tracker") on a social media platform like Meta/Facebook and clicks the ad. This click hits a tracking link managed by your MMP (e.g., AppsFlyer, Adjust). The link records the click details (source=Facebook, campaign=SummerSale, ad=VideoAd1) and appends this information into the referrer parameter of a Google Play Store URL. The user is instantly redirected to the SuperFit Tracker page on the Google Play Store.

The resulting Play Store URL might look something like:
```
https://play.google.com/store/apps/details?id=com.superfit&referrer=utm_source%3Dfacebook%26utm_campaign%3DSummerSale%26utm_ad%3DVideoAd1%26...
```

When the user installs SuperFit Tracker from the Google Play Store, Google securely stores the referrer string associated with this installation event. Upon the first app open, the MMP's SDK, integrated within the app, initializes and calls the Google Play Install Referrer API, which returns the referrer string, the click timestamp, and the install timestamp to the SDK.

The SDK then sends this install data, along with device information, to the MMP's servers. The MMP's server receives and parses the data, identifying the source, campaign, and other parameters. It may also match this install data against the click data it recorded earlier, ultimately attributing this install to the Facebook SummerSale campaign.

The attributed install appears in your MMP dashboard, credited to Facebook. Later, when the user completes their profile setup, the SDK's logEvent("profile_complete") function is called, and the SDK sends this event data to the MMP. The MMP receives the "profile_complete" event and associates it with the user, linking it back to the original attributed source. This allows you to measure not just installs but also the quality of users from different sources.

## **iOS attribution**

While we've focused on Android, it's worth noting that attribution on iOS is significantly different and generally more complex. There isn't an iOS equivalent to the Google Play Install Referrer API that allows apps to directly fetch detailed referrer strings from the App Store upon install.

Apple requires apps to get explicit user permission (via the App Tracking Transparency framework prompt) to track them using the device's advertising identifier. Many users opt out of this, limiting deterministic matching. Apple's SKAdNetwork (SKAN) is its privacy-preserving attribution framework, providing install attribution data directly from the App Store to ad networks and MMPs, but it's aggregated, delayed, and offers limited granularity on campaigns and post-install events.

This has led to increased reliance on MMPs and probabilistic methods. MMPs play a crucial role in navigating SKAdNetwork data and may use probabilistic methods, although these are less precise than deterministic methods like the Play Install Referrer.
