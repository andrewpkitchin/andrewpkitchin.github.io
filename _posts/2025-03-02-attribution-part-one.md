---
layout: post
title: "half the money I spend on advertising…"
date: 2025-03-02
permalink: /attribution-part-one.html
series: "the attribution problem"
math: true
---

<!-- Enhanced audio player with progress bar and time display -->
<div class="audio-container">
  <audio id="attribution-audio" preload="metadata">
    <source src="/assets/audio/attribution-podcast.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <button class="play-button" onclick="togglePlay()">
    <span class="play-icon">▶</span>
    <span class="pause-icon" style="display: none;">❚❚</span>
  </button>
  <div class="audio-controls">
    <span class="listen-text">Listen</span>
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
      <div class="time-display">
        <span class="current-time">0:00</span>
        <span class="time-separator">/</span>
        <span class="total-time">0:00</span>
      </div>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('attribution-audio');
    var playIcon = document.querySelector('.play-icon');
    var pauseIcon = document.querySelector('.pause-icon');
    var progressFill = document.querySelector('.progress-fill');
    var currentTimeDisplay = document.querySelector('.current-time');
    var totalTimeDisplay = document.querySelector('.total-time');
    var progressBar = document.querySelector('.progress-bar');
    
    // Format time in MM:SS
    function formatTime(seconds) {
      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = Math.floor(seconds % 60);
      return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    }
    
    // Update progress bar and time display
    audio.addEventListener('timeupdate', function() {
      var percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = percent + '%';
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });
    
    // Set total time once metadata is loaded
    audio.addEventListener('loadedmetadata', function() {
      totalTimeDisplay.textContent = formatTime(audio.duration);
    });
    
    // Allow seeking when clicking on progress bar
    progressBar.addEventListener('click', function(e) {
      var rect = progressBar.getBoundingClientRect();
      var pos = (e.clientX - rect.left) / progressBar.offsetWidth;
      audio.currentTime = pos * audio.duration;
    });
    
    // Handle playback end
    audio.addEventListener('ended', function() {
      playIcon.style.display = 'inline-block';
      pauseIcon.style.display = 'none';
      progressFill.style.width = '0%';
      audio.currentTime = 0;
    });
  });
  
  function togglePlay() {
    var audio = document.getElementById('attribution-audio');
    var playIcon = document.querySelector('.play-icon');
    var pauseIcon = document.querySelector('.pause-icon');
    
    if (audio.paused) {
      audio.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline-block';
    } else {
      audio.pause();
      playIcon.style.display = 'inline-block';
      pauseIcon.style.display = 'none';
    }
  }
</script>

<img src="/assets/images/attribution_one.webp" alt="random tech/attribution inspired images" width="400" class="feature-image">

## **the attribution problem**

Attribution is the process of identifying which touchpoints in a user's journey contribute to conversions and determining their relative impact on purchasing decisions. For example, we might want to figure out which marketing efforts deserve credit for bringing customers through the door.

> "Half the money I spend on advertising is wasted; the trouble is I don't know which half." - John Wanamaker

This prescient quote from Wanamaker should be outdated in our digital marketing era. Modern attribution approaches promise to solve this age-old problem, at least for online marketing. In practice, accurate attribution remains challenging.

Consider a typical customer journey: someone sees your display ad, later discovers your company through organic search, signs up for a newsletter, and finally clicks an email link to make a purchase. The attribution problem is unraveling this journey to quantify the influence of each step. Getting attribution right matters because it helps optimize marketing campaigns, allocate budgets effectively, and justify strategic decisions about what to pursue or abandon.

## winning the attribution war

Each advertising platform tracks interactions independently and makes claims related to the credit they should receive for conversions (the so-called attribution war). If marketers simply add up conversions reported by say Facebook and Google, they'll likely overcount results because both channels are claiming the same victory. Determining how to divide credit among these touchpoints is the heart of attribution.

## you get what you're allowed to measure

It's often impossible to confirm that the person who clicked a mobile ad is the same one who later purchased on a computer since cookies and device IDs aren't shared between devices. Even on a single device, walled-garden platforms like Google, Facebook, and Amazon keep user data in closed ecosystems, making it challenging to create a unified view of the customer journey.

> "You get what you measure." - Richard Hamming

Privacy regulations add another layer of complexity. The EU's GDPR and California's CCPA require user consent for tracking, while Apple's iOS App Tracking Transparency framework blocks advertising IDs for users who opt out. These regulations create blind spots in attribution models. With Google's plans for third-party cookies still evolving, marketers are preparing for further changes.

## it's not real until it's an acronym

To address these attribution challenges, marketers and data scientists employ various methodologies like Multi-Touch Attribution (MTA) and Marketing Mix Modeling (MMM). 

> "Everything in ad tech is an acronym, it's not real until it's an acronym." - Antonio García Martínez

<p>The attribution problem series explores how to measure and assign credit for user actions across different marketing channels and touchpoints. From basic tracking techniques to advanced statistical models, these posts examine the technical and business challenges of understanding what's working in your marketing.</p>

<div class="series-page">
  <h1 class="series-title">{{ page.title }}</h1>
  
  <div class="series-description">
    
    <p>The attribution problem series explores how to measure and assign credit for user actions across different marketing channels and touchpoints. From basic tracking techniques to advanced statistical models, these posts examine the technical and business challenges of understanding what's working in your marketing.</p>
  </div>
  
  {% assign series_posts = site.posts | where: "series", page.series_name | sort: "date" %}
  
  {% if series_posts.size > 0 %}
    <ul class="post-list">
      {% for post in series_posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        <a class="post-link" href="{{ post.url | relative_url }}">
          {{ post.title | escape }}
        </a>
      </li>
      {% endfor %}
    </ul>
  {% else %}
    <p>No posts found in this series.</p>
  {% endif %}
</div>

