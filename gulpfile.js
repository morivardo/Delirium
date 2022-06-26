/* eslint-disable import/no-unresolved */
// Dependences
const { src, dest, watch, series } = require('gulp');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const changed = require('gulp-changed');
const php = require('gulp-connect-php');
const postcss = require('gulp-postcss');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');
const webp = require('gulp-cwebp');

// Compile, prefix, and minify .scss/.sass files
function compileScss() {
  return src('src/style/main.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(postcss([cssnano()]))
    .pipe(dest('public/assets/style'));
}

// Minify .js files
function minJs() {
  return src('src/script/*.js')
    .pipe(
      terser({
        ecma: 2016,
        compress: false,
      }),
    )
    .pipe(dest('public/assets/script'));
}

// Optimize images
function optimizeImg() {
  return src('src/img/**/**/*.{jpg,png,svg}')
    .pipe(changed('public/assets/img'))
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true,
        }),
        imagemin.mozjpeg({
          quality: 100,
          progressive: true,
        }),
        imagemin.optipng({
          optimizationLevel: 5,
        }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: true,
            },
            {
              cleanupIDs: false,
            },
          ],
        }),
      ]),
    )
    .pipe(dest('public/assets/img'));
}

// Convert images to .webp
function webpImg() {
  return src('public/assets/img/**/**/*.{jpg,png}').pipe(webp()).pipe(dest('public/assets/img'));
}

function copyToFront() {
  const audio = src('src/audio/*.*').pipe(dest('public/assets/audio'));
  const fonts = src('src/fonts/*/*.*').pipe(dest('public/assets/fonts'));
  const gif = src('src/img/**/**/*.gif').pipe(dest('public/assets/img'));
  // const panel_snap = src('node_modules/panelsnap/docs/panelsnap.js').pipe(dest('public/assets/script/modules'));

  return merge(audio, fonts, gif);
}

// BrowserSync task
function browserSyncServe(cb) {
  browserSync.init({
    proxy: 'localhost:8010',
    baseDir: 'public/',
    open: true,
    notify: false,
    browser: ['google chrome'],
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

function startServer() {
  php.server({ base: 'public', port: 8010, router: 'api/cliserver.php' });
}

// Checks and executes tasks automatically
function watchTask() {
  watch(
    [
      'src/style/main.scss',
      'src/style/layouts/**',
      'src/style/abstracts/**',
      'src/style/pages/desktop/**',
      'src/style/pages/mobile/**',
      'src/style/pages/tablet/**',
    ],
    series(compileScss, browserSyncReload),
  );
  watch('src/script/*.js', series(minJs, browserSyncReload));
  watch('src/img/*.{jpg,png}', series(optimizeImg, browserSyncReload));
  watch('public/assets/img/*.{jpg,png}', series(webpImg, browserSyncReload));
  watch(['public/views/**/*.html', 'public/*.php', 'public/.htaccess'], browserSyncReload);
}

// Default Gulp task
exports.default = series(copyToFront, compileScss, minJs, optimizeImg, webpImg, browserSyncServe, watchTask);

exports.server = startServer;
