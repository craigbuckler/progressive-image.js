// Gulp.js configuration
const
  gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  terser = require('gulp-terser'),

  // CSS configuration
  cssCfg = {
    in: 'src/css/progressive-image.css',
    out: 'dist/',
    process: [
      require('autoprefixer')({
        browsers: ['> 1%', 'ie 11']
      }),
      require('cssnano')
    ]
  },

  // JS configuration
  jsCfg = {
    in: 'src/js/progressive-image.js',
    out: 'dist/',
    terser: {
      mangle: {
        toplevel: true
      },
      compress: {
        drop_console: true
      },
      output: {
        quote_style: 1
      }
    }
  };


// CSS minification
function css() {

  return gulp.src(cssCfg.in)
    .pipe(postcss(cssCfg.process))
    .pipe(gulp.dest(cssCfg.out));

}
exports.css = css;


// JS minification
function js() {

  return gulp.src(jsCfg.in)
    .pipe(terser(jsCfg.terser))
    .pipe(gulp.dest(jsCfg.out));

}
exports.js = js;


// build
exports.default = gulp.series(css, js);
