# progressive-image.js

A lazy-loading progressive image system similar to those seen on  [Facebook](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/) and [Medium](https://jmperezperez.com/medium-image-progressive-loading-placeholder/). A very small, blurred image is replaced with the full-resolution equivalent when the element is scrolled into view.

**[View demonstration and further examples on codepen.io...](https://codepen.io/craigbuckler/pen/yPqLXW)**

Please use the code as you wish - [tweet me @craigbuckler](https://twitter.com/craigbuckler) if you find it useful.

Benefits:

* saves unnecessary bandwidth
* fast loading, high performance, images loaded on view
* supports any image type (JPEG photographs are most appropriate)
* supports responsive images (`srcset` and `sizes` attributes)
* supports CSS background images
* small: 1,300 bytes of JavaScript, 445 bytes of CSS (minified)
* any CSS reveal effect can be applied
* no external dependencies - works with any framework
* works in all modern browsers (IE10+)
* progressively-enhanced to work in older browsers
* easy to use


## Usage instructions
Include the minified CSS and JavaScript anywhere in your page:

```html
<link rel="stylesheet" href="css/progressive-image.min.css">
<script src="js/progressive-image.min.js"></script>
```

Basic example:

```html
<a href="full.jpg" class="progressive replace">
  <img src="tiny.jpg" class="preview" alt="image" />
</a>
```

Where:

* `full.jpg` is the large image.
* `tiny.jpg` is a very small preview image - typically 20px in width saved with high JPEG compression. It be added to the page directly or inlined as a data URI.

*Both images must have the same aspect ratio.*

If image loading or JavaScript fails, a blurred version of the preview image can be clicked to view the full image.

When JavaScript runs successfully, the large image is loaded and revealed when the preview is scrolled into view. The link click is disabled and resulting HTML will be:

```html
<a href="full.jpg" class="progressive">
  <img src="full.jpg" alt="image" />
</a>
```

Responsive images of differing sizes and resolutions can be defined in the link using the `data-srcset` and `data-sizes` attributes which map to the standard `srcset` and `sizes` attributes, e.g.

```html
<a href="small.jpg"
   data-srcset="small.jpg 800w, large.jpg 1200w"
   data-sizes="100vw"
   class="progressive replace">
    <img src="tiny.jpg" class="preview" alt="image" />
</a>

```

On replacement, the image code becomes:

```html
<img src="small.jpg" srcset="small.jpg 800w, large.jpg 1200w" sizes="100vw" alt="image" />
```

Modern browsers will load `large.jpg` on screens of 800px width or greater.

Further examples, options and usage notes can be found on the [demo.html example page](https://cdn.rawgit.com/craigbuckler/progressive-image.js/7f022aaf/demo.html).

## Version history

**v1.2, 13 April 2018**

* added CSS background image support information

**v1.2, 9 April 2018**

* full image replaces preview in-place (PR from ftaiolivista)
* minor refactoring and simplification

**v1.1, 25 November 2017**

* permits any container element
* link to other URLs can be retained
* mutation observer event detects elements added via JavaScript
* minor performance tweaks

**v1.0, 16 January 2017**

* Initial commit
