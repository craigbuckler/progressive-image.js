// progressive-image.js
// by Craig Buckler, @craigbuckler
if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) window.addEventListener('load', function() {

  // start
  var pItem = document.getElementsByClassName('progressive replace'), pCount, timer;

  // scroll and resize events
  window.addEventListener('scroll', scroller, false);
  window.addEventListener('resize', scroller, false);

  // DOM mutation observer
  if (MutationObserver) {

    var observer = new MutationObserver(function() {
      if (pItem.length !== pCount) inView();
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });

  }

  // initial check
  inView();


  // throttled scroll/resize
  function scroller() {

    timer = timer || setTimeout(function() {
      timer = null;
      inView();
    }, 300);

  }


  // image in view?
  function inView() {

    if (pItem.length) requestAnimationFrame(function() {

      var wH = window.innerHeight, cRect, cT, cH, p = 0;
      while (p < pItem.length) {

        cRect = pItem[p].getBoundingClientRect();
        cT = cRect.top;
        cH = cRect.height;

        if (0 < cT + cH && wH > cT) {
          loadFullImage(pItem[p]);
          pItem[p].classList.remove('replace');
        }
        else p++;

      }

      pCount = pItem.length;

    });

  }


  // replace with full image
  function loadFullImage(item, retry) {

    var href = item && (item.getAttribute('data-href') || item.href);
    if (!href) return;

    // load image
    var img = new Image();
    if (item.dataset) {
      img.srcset = item.dataset.srcset || '';
      img.sizes = item.dataset.sizes || '';
    }
    img.onload = addImg;
    retry = 1 + (retry || 0);
    if (retry < 3) img.onerror = function() {
      setTimeout(function() { loadFullImage(item, retry); }, retry * 3000);
    };
    img.className = 'reveal';
    img.src = href;

    // replace image
    function addImg() {

      requestAnimationFrame(function() {

        // disable click
        if (href === item.href) {
          item.style.cursor = 'default';
          item.addEventListener('click', function(e) { e.preventDefault(); }, false);
        }

        // preview image
        var pImg = item.querySelector && item.querySelector('img.preview');

        // add full image
        item.insertBefore(img, pImg && pImg.nextSibling).addEventListener('animationend', function() {

          // remove preview image
          if (pImg) {
            img.alt = pImg.alt || '';
            item.removeChild(pImg);
          }

          img.classList.remove('reveal');

        });

      });

    }

  }

}, false);
