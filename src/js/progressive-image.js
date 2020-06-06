// progressive-image.js
// by Craig Buckler, @craigbuckler
if (window.addEventListener && document.body.classList) window.addEventListener('load', function() {

  'use strict';

  var
    classReplace = 'replace',
    classPreview = 'preview',
    classReveal = 'reveal',
    pItem = document.getElementsByClassName('progressive ' + classReplace),
    rAF = window.requestAnimationFrame || function(f) { f(); },
    timer;

  // bind events
  ['pageshow', 'scroll', 'resize'].forEach(function(h) {
    window.addEventListener(h, throttle, { passive: true });
  });

  // DOM mutation observer
  if (window.MutationObserver) {

    var observer = new MutationObserver(throttle);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true });

  }

  // initial check
  inView();


  // throttle events, no more than once every 300ms
  function throttle() {

    timer = timer || setTimeout(function() {
      timer = null;
      inView();
    }, 300);

  }


  // image in view?
  function inView() {

    if (pItem.length) rAF(function() {

      var wH = window.innerHeight, cRect, cT, cH, p = 0;
      while (p < pItem.length) {

        cRect = pItem[p].getBoundingClientRect();
        cT = cRect.top;
        cH = cRect.height;

        if (0 < cT + cH && wH > cT) {
          loadFullImage(pItem[p]);
        }
        else p++;

      }

    });

  }


  // replace with full image
  function loadFullImage(item, retry) {

    item.classList.remove(classReplace);

    var href = item && (item.getAttribute('data-href') || item.href);
    if (!href) return;

    // load image
    var img = new Image(), ds = item.dataset;
    if (ds) {
      if (ds.srcset) img.srcset = ds.srcset;
      if (ds.sizes) img.sizes = ds.sizes;
    }
    img.onload = addImg;
    retry = 1 + (retry || 0);
    if (retry < 3) img.onerror = function() {
      setTimeout(function() { loadFullImage(item, retry); }, retry * 3000);
    };
    img.src = href;

    // replace image
    function addImg() {

      rAF(function() {

        // disable link click
        if (href === item.href) {
          item.style.cursor = 'default';
          item.addEventListener('click', function(e) { e.preventDefault(); });
        }

        // preview image
        var pImg = item.querySelector && item.querySelector('img.' + classPreview), imgClass = img.classList;
        img.className = pImg.className;
        imgClass.remove(classPreview);
        imgClass.add(classReveal);

        // add full image
        item.insertBefore(img, pImg && pImg.nextSibling).addEventListener('animationend', function() {

          // remove preview image
          if (pImg) {
            if (pImg.alt) img.alt = pImg.alt;
            item.removeChild(pImg);
          }

          imgClass.remove(classReveal);

        });

      });

    }

  }

}, false);
