# progressive-image.js

[**demonstration**](https://codepen.io/craigbuckler/pen/yPqLXW) | [**GitHub**](https://github.com/craigbuckler/progressive-image.js) | [**npm**](https://www.npmjs.com/package/progressive-image.js) | [**donate**](https://gum.co/vIjey) | [@craigbuckler](https://twitter.com/craigbuckler) | [craigbuckler.com](https://craigbuckler.com/)

A lazy-loading progressive image system similar to those seen on [Facebook](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/) and [Medium](https://jmperezperez.com/medium-image-progressive-loading-placeholder/). A very small, blurred image is replaced with the full-resolution equivalent when the element is scrolled into view.

Please use the code as you wish. [Tweet me @craigbuckler](https://twitter.com/craigbuckler) if you find it useful and [donate toward development](https://gum.co/vIjey) if you use it commercially.

* saves unnecessary bandwidth
* fast loading, high performance, images loaded on view
* supports any image type (JPEG photographs are most appropriate)
* supports responsive images (`srcset` and `sizes` attributes)
* supports CSS background images
* small: 1,350 bytes of JavaScript, 440 bytes of CSS (minified)
* any CSS reveal effect can be applied
* no external dependencies - works with any framework
* makes up to three attempts if images fail to download
* works in all modern browsers (IE10+)
* progressively-enhanced to work in older browsers
* easy to use


## Usage instructions

Include the minified CSS and JavaScript anywhere in your page:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/progressive-image.js/dist/progressive-image.css">
<script src="https://cdn.jsdelivr.net/npm/progressive-image.js/dist/progressive-image.js"></script>
```

CDN URLs are shown above but you can also `npm i progressive-image.js` to install via npm and use a bundler.

Basic example:

```html
<a href="full.jpg" class="progressive replace">
  <img src="tiny.jpg" class="preview" alt="image" />
</a>
```

Where:

* `full.jpg` is the large image.
* `tiny.jpg` is a very small preview image - typically 20px in width saved with high JPEG compression. It be added to the page directly or inlined as a data URI.

**Both images must have the same aspect ratio.**

The full image is revealed when the preview is scrolled into view. After replacement, link-clicking is disabled and the HTML becomes:

```html
<a href="full.jpg" class="progressive">
  <img src="full.jpg" alt="image" />
</a>
```

If JavaScript or image loading fails, a blurred version of the preview image can be clicked to view the full image.

To retain the link or use an alternative container element, add a `data-href` attribute with the large image URL:

```html
<a href="http://site.com/" data-href="full.jpg" class="progressive replace">
  <img src="tiny.jpg" class="preview" alt="image" />
</a>
```

Responsive images of differing sizes and resolutions can be defined in the container link/element using `data-srcset` and `data-sizes` attributes which map to the standard `srcset` and `sizes` attributes:

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

Modern browsers will load `large.jpg` when the viewport width is 800px or greater.

Further examples, options and usage notes can be found on the [demonstration page](https://codepen.io/craigbuckler/pen/yPqLXW).

See [How to Build Your Own Progressive Image Loader](https://www.sitepoint.com/how-to-build-your-own-progressive-image-loader/) for information about the inspiration and techniques used in this component.


## Version history

### v1.4.1, 9 July 2019

* strict mode
* srcset and sizes attributes only set when available
* README and demo.html update

### v1.4.0, 24 June 2019

* retries download after 3s and 6s (suggestion from [cheuksing](https://github.com/cheuksing))
* continues to show preview if full image download fails
* autoprefixer update

### v1.3.0, 30 May 2019

* Gulp.js minification
* published on npm, CDN information

### v1.2.0, 13 April 2018

* added CSS background image support information

### v1.2.0, 9 April 2018

* full image replaces preview in-place (PR from [ftaiolivista](https://github.com/ftaiolivista))
* minor refactoring and simplification

### v1.1.0, 25 November 2017

* permits any container element
* link to other URLs can be retained
* mutation observer event detects elements added via JavaScript
* minor performance tweaks

### v1.0.0, 16 January 2017

* Initial commit
