---
layout: post
title: "the mechanics of attribution"
date: 2025-03-03
permalink: /attribution-part-three.html
series: "the attribution problem"
math: true
---

Attribution works through a combination of tracking methods that capture user interactions across digital channels. Below is a breakdown of some well known methods.

## Referrer Data

When a user clicks from one site to another, the browser passes "referrer" information in the HTTP request headers, identifying the source URL. This helps attribute traffic to the referring site, such as a social media platform or another website.

### Example
A user on Facebook clicks an ad linking to example.com. The landing page detects the referrer as facebook.com, attributing the visit to Facebook.

### Accessing Referrer Data
- In web analytics tools like Google Analytics, referrer data is captured automatically under traffic sources.
- In JavaScript, you can access the referrer using:
  ```javascript
  console.log(document.referrer);
  ```
- For mobile apps, the Google Play Install Referrer API provides referrer data when a user installs an app from a specific ad or campaign.

### Limitations
- No referrer data is passed if the user types the URL directly, uses a bookmark, or has privacy settings that block it.
- Some websites mask referrers for security, reducing reliability.

## UTM Parameters

UTM (Urchin Tracking Module) parameters originated from Urchin Software, which Google acquired and built into Google Analytics. UTM parameters help track traffic sources in digital marketing campaigns across various platforms.

Common parameters include:
- utm_source (e.g., google)
- utm_medium (e.g., cpc)
- utm_campaign (e.g., summer_sale)
- utm_term (keyword)
- utm_content (ad variation)

### Example
```
https://example.com?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale
```
This URL indicates that the user came from a Google paid ad in the summer sale campaign.

### Where You Can Use These?
Here's a list of places you might use UTM Parameters:
- Paid ads (Google Ads, Facebook Ads, LinkedIn Ads, etc.)
- Email campaigns
- Social media posts
- QR codes in offline marketing
- Affiliate links

**Note**: Useful for tracking traffic from emails, QR codes, and offline sources where referrer data is unavailable.
Consistency in setting UTM parameters is critical for accuracy. Sharing URLs with UTM parameters can result in misattribution.

## Click IDs

Ad platforms like Google Ads and Facebook provide unique identifiers (gclid for Google, fbclid for Facebook) appended to URLs when users click ads. These IDs help track conversions.

### Example
```
https://example.com?gclid=1234567890abcdef
```
When a user converts, the website sends this gclid back to Google for attribution.

### Accessing Click IDs
- Google Ads Click IDs (gclid) can be retrieved in Google Analytics or by storing them in cookies or a database when users land on the website.
- Facebook Click IDs (fbclid) can be accessed in Facebook's reporting tools and stored for future reference.
- Click IDs can be extracted using JavaScript:
  ```javascript
  const urlParams = new URLSearchParams(window.location.search);
  const gclid = urlParams.get('gclid');
  console.log(gclid);
  ```

**Use Case**: Essential for ad performance tracking, ensuring conversions are linked to specific ad campaigns.

## Tracking Templates

Standardized structures for event data ensure consistency across platforms and improve the accuracy of attribution models. Tracking templates help unify data collection, making it easier to analyze and compare insights across different marketing channels and campaigns.

### Components
- **Event Naming Conventions**: Establishing a clear and consistent naming structure (e.g., product_viewed vs. viewed_product) ensures data integrity.
- **Required Parameters**: Essential data points such as user ID, session ID, timestamp, and event type.
- **Contextual Properties**: Environmental details like device type, browser, referrer, and UTM parameters.
- **Event-specific Properties**: Custom properties relevant to the event, varying by action type (e.g., purchase amount for a transaction event).

### Example Event Code:
```javascript
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  currency: 'USD',
  value: 99.99,
  items: [{ item_id: 'SKU_001', item_name: 'Product A', quantity: 1, price: 99.99 }]
});
```

This code sends a purchase event to Google Analytics, including transaction details for attribution analysis. It should be placed on the purchase confirmation page.

### Setting Up Tracking Templates on Google Ads:
1. Navigate to Your Google Ads Account
2. Go to Campaigns > Settings > Tracking Template
3. Enter a Tracking URL Format:
   ```
   {lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&gclid={gclid}
   ```
4. Save and Apply
5. Ensure Your Web Analytics Captures These Parameters

By using tracking templates, businesses can establish standardized data structures that enable more reliable attribution analysis and ensure that reporting is accurate and actionable.

## SDKs and Attribution

Software Development Kits (SDKs) are pre-built code libraries that facilitate tracking and attribution within mobile apps. SDKs help capture user interactions, measure in-app events, and send data to analytics platforms.

### Popular SDKs for Attribution:
- **Google Analytics for Firebase** – Tracks user behavior in Android and iOS apps.
- **Facebook SDK** – Captures app events and integrates with Facebook Ads.
- **Adjust** – Provides multi-touch attribution across various ad networks.
- **AppsFlyer** – Offers advanced mobile attribution and deep linking.

### Example Implementation (Google Analytics for Firebase in Android):
```java
FirebaseAnalytics mFirebaseAnalytics = FirebaseAnalytics.getInstance(this);

Bundle bundle = new Bundle();
bundle.putString(FirebaseAnalytics.Param.ITEM_ID, "SKU_001");
bundle.putString(FirebaseAnalytics.Param.ITEM_NAME, "Product A");
bundle.putDouble(FirebaseAnalytics.Param.VALUE, 99.99);
mFirebaseAnalytics.logEvent(FirebaseAnalytics.Event.PURCHASE, bundle);
```

This event logs a purchase in a mobile app, allowing attribution tools to analyze the conversion.

### Where to Place SDK Code
**Initialization**: In the app's onCreate() method.
**Event Tracking**: At specific user interaction points, such as button clicks or purchases.

SDKs streamline data collection, making it easier to track user behavior and analyze attribution in mobile environments.
