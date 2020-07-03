// progressive-image.js
// by Craig Buckler, @craigbuckler
if (window.addEventListener) window.addEventListener('load', function() {

  'use strict';

  // browser supported?
  var body = document.body;
  if (!body.getElementsByClassName || !body.querySelector || !body.classList || !body.getBoundingClientRect) return;

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
    observer.observe(body, { subtree: true, childList: true, attributes: true });

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

    // cancel monitoring
    item.classList.remove(classReplace);

    // fetch href and preview image
    var
      href = item.getAttribute('data-href') || item.href,
      pImg = item.querySelector('img.' + classPreview);

    if (!href || !pImg) return;

    // load main image
    var img = new Image(), ds = item.dataset;

    if (ds) {
      if (ds.srcset) img.srcset = ds.srcset;
      if (ds.sizes) img.sizes = ds.sizes;
    }

    img.onload = addImg;

    // load failure retry
    retry = 1 + (retry || 0);
    if (retry < 3) img.onerror = function() {
      setTimeout(function() { loadFullImage(item, retry); }, retry * 3000);
    };

    img.src = href;

    // replace image
    function addImg() {

      // disable link
      if (href === item.href) {
        item.style.cursor = 'default';
        item.addEventListener('click', function(e) { e.preventDefault(); });
      }

      // apply image attributes
      var imgClass = img.classList;
      img.className = pImg.className;
      imgClass.remove(classPreview);
      imgClass.add(classReveal);
      img.alt = pImg.alt || '';

      rAF(function() {

        // add full image
        item.insertBefore(img, pImg.nextSibling).addEventListener('animationend', function() {

          // remove preview image
          item.removeChild(pImg);
          imgClass.remove(classReveal);

        });

      });

    }

  }

}, false);
