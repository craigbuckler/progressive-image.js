# progressive-image.js

[**demonstration**](https://codepen.io/craigbuckler/full/yPqLXW) | [**GitHub**](https://github.com/craigbuckler/progressive-image.js) | [**npm**](https://www.npmjs.com/package/progressive-image.js) | [**donate**](https://gum.co/vIjey) | [@craigbuckler](https://twitter.com/craigbuckler) | [craigbuckler.com](https://craigbuckler.com/)


[progressive-image.js](https://github.com/craigbuckler/progressive-image.js) implements a progressively-loaded image effect similar to those seen on [Facebook](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/) and [Medium](https://jmperezperez.com/medium-image-progressive-loading-placeholder/). A very small blurred image is replaced with the full-resolution equivalent when the element is scrolled into view.

Please use the code as you wish. [Tweet me @craigbuckler](https://twitter.com/craigbuckler) if you find it useful and consider [donating toward development](https://gum.co/vIjey).

Benefits:

* saves unnecessary bandwidth
* fast loading, high performance, images loaded on view
* supports any image type (JPEG photographs are most appropriate)
* supports responsive images (`srcset` and `sizes` attributes)
* supports CSS background images
* supports native lazy loading and aspect ratios
* lightweight: 1,407 bytes of JavaScript, 407 bytes of optional CSS (minified)
* any CSS reveal effect can be applied
* no external dependencies - works with any framework
* makes up to three attempts if images fail to download
* works in all modern browsers (IE10+)
* progressively-enhanced to work in older browsers
* easy to use

**[View demonstration and full documentation...](https://codepen.io/craigbuckler/full/yPqLXW)**


## Basic usage

Include the minified CSS and JavaScript anywhere in your page:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/progressive-image.js/dist/progressive-image.css">
<script src="https://cdn.jsdelivr.net/npm/progressive-image.js/dist/progressive-image.js" async></script>
```

or use [npm](https://www.npmjs.com/package/progressive-image.js) and a bundler:

```sh
npm i progressive-image.js
```

Then add progressively-loaded images:

```html
<a href="full.jpg" class="progressive replace">
  <img src="tiny.jpg" class="preview" alt="image" />
</a>
```

where:

* `full.jpg` is the large image.
* `tiny.jpg` is a small preview image - typically 20px width.

**Both images must have the same aspect ratio.**

Refer to `demo.html` for full documentation, examples, options, and usage notes. It is also available as a [CodePen demonstration page](https://codepen.io/craigbuckler/full/yPqLXW).


## Version history

### v1.6.1, 2 October 2021

* fixed page resize removing responsive `srcset` images

### v1.6.0, 3 July 2020

* improved browser support verification
* more resilient to framework issues
* minor refactoring
* updated help and images
* bugfix: script now works in HTML `<head>`

### v1.5.0, 6 June 2020

* `pageshow` event for Single Page Apps
* more reliable MutationObserver
* `class` names applied to the preview are applied to the full image (except `preview`)
* smaller, better performance
* no errors in older browsers
* updated usage notes, including native lazy loading

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
