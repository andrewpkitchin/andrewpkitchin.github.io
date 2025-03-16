// Utility function to add cache-busting parameters to URLs
function addCacheBuster(url) {
  // Skip URLs that already have a timestamp or are external
  if (url.includes('?v=') || url.includes('//')) {
    return url;
  }
  
  // Add a timestamp parameter
  return url + (url.includes('?') ? '&' : '?') + 'v=' + Date.now();
}

// Function to force reload all stylesheets with cache busting
function reloadStylesheets() {
  var links = document.getElementsByTagName('link');
  for (var i = 0; i < links.length; i++) {
    if (links[i].rel === 'stylesheet') {
      var href = links[i].getAttribute('href');
      if (href) {
        links[i].setAttribute('href', addCacheBuster(href));
      }
    }
  }
}

// Function to force reload all scripts with cache busting
function reloadScripts() {
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute('src');
    if (src) {
      var newSrc = addCacheBuster(src);
      if (newSrc !== src) {
        var newScript = document.createElement('script');
        newScript.src = newSrc;
        scripts[i].parentNode.replaceChild(newScript, scripts[i]);
      }
    }
  }
}

// Force a hard refresh
function forceHardRefresh() {
  // This is a developer utility - bind to key combination or button
  window.location.reload(true);
}

// Add a keyboard shortcut for hard refresh (Ctrl+F5 or Cmd+R)
document.addEventListener('keydown', function(event) {
  // Check if Ctrl+F5 (Windows) or Cmd+R (Mac)
  if ((event.ctrlKey && event.key === 'F5') || 
      (event.metaKey && event.key === 'r')) {
    event.preventDefault();
    forceHardRefresh();
  }
});

// Add a visible refresh button in development mode
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  var refreshButton = document.createElement('button');
  refreshButton.innerHTML = '🔄 Refresh';
  refreshButton.style.position = 'fixed';
  refreshButton.style.bottom = '20px';
  refreshButton.style.right = '20px';
  refreshButton.style.zIndex = '9999';
  refreshButton.style.padding = '10px';
  refreshButton.style.background = '#267CB9';
  refreshButton.style.color = 'white';
  refreshButton.style.border = 'none';
  refreshButton.style.borderRadius = '4px';
  refreshButton.style.cursor = 'pointer';
  
  refreshButton.addEventListener('click', function() {
    forceHardRefresh();
  });
  
  document.body.appendChild(refreshButton);
}
