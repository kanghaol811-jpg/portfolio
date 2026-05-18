// 601 Patch: Create missing DOM elements and handle fallbacks
// Load this BEFORE 601-anim.js

// 1. Define styleSplash early (animation engine's window.styleSplash overwrites this)
window.styleSplash = window.styleSplash || {
  onloaded: function(){},
  onProgress: function(){},
  n1: {el: document.querySelector('[data-p="n1"]'), p: 0, a: 0},
  n2: {el: document.querySelector('[data-p="n2"]'), p: 0, a: 0},
  n3: {el: document.querySelector('[data-p="n3"]'), p: 0, a: 0}
};

// 2. Define domglScroll stub (animation engine overwrites this later)
window.domglScroll = window.domglScroll || {};

// 3. Create missing DOM elements the animation engine expects
(function() {
  // Create .ui-sw (UI switch)
  if (!document.querySelector('.ui-sw')) {
    var sw = document.createElement('a');
    sw.className = 'ui-sw _a';
    sw.href = '/';
    sw.style.display = 'none';
    document.body.appendChild(sw);
  }

  // Create .c-height if missing
  if (!document.querySelector('.c-height')) {
    var ch = document.createElement('div');
    ch.className = 'c-height';
    document.body.appendChild(ch);
  }

  // Create .ui-pagenav children
  var pn = document.querySelector('.ui-pagenav');
  if (pn) {
    if (!pn.querySelector('.before')) {
      var b = document.createElement('div');
      b.className = 'before';
      pn.appendChild(b);
    }
    if (!pn.querySelector('.after')) {
      var a = document.createElement('div');
      a.className = 'after';
      pn.appendChild(a);
    }
  }

  // Create .js-copy elements
  if (!document.querySelector('.js-copy')) {
    var cp = document.createElement('a');
    cp.className = 'ui-mail ui-mail-copy ui-link-a ui-link js-copy _a _fl _f';
    var d = document.createElement('div');
    d.className = 'o';
    ['Email','Copy','Copied'].forEach(function(t) {
      var td = document.createElement('div');
      td.className = 't js-c';
      td.textContent = t;
      d.appendChild(td);
    });
    cp.appendChild(d);
    cp.style.display = 'none';
    document.body.appendChild(cp);
  }

  // Create .ui-cursor
  if (!document.querySelector('.ui-cursor')) {
    var cur = document.createElement('div');
    cur.className = 'ui-cursor';
    cur.style.display = 'none';
    document.body.appendChild(cur);
  }

  // Create .ui-blank
  if (!document.querySelector('.ui-blank')) {
    var blank = document.createElement('a');
    blank.className = 'ui-blank';
    var lbl = document.createElement('span');
    lbl.className = 'l';
    blank.appendChild(lbl);
    blank.style.display = 'none';
    document.body.appendChild(blank);
  }

  // Create style element for --vh if missing
  if (!document.querySelector('style[data-vh]')) {
    var s = document.createElement('style');
    s.setAttribute('data-vh', '');
    s.textContent = ':root {--vh:' + window.innerHeight / 100 + 'px;}';
    document.head.appendChild(s);
  }
})();

// 4. Patch favicon URL
(function() {
  var fav = document.getElementById('favicon');
  if (fav && window.PATH) {
    var theme = document.documentElement.getAttribute('data-theme') || 'dark';
    fav.href = window.PATH.assets + '/favicon/' + theme + '/favicon.ico';
  }
})();
