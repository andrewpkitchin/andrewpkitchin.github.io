---
layout: default
title: "the attribution problem"
permalink: /the-attribution-problem/
series_name: "the attribution problem"
---

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
