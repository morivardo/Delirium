//Dependences
const { src, dest, watch, series } = require("gulp");
const browserSync = require("browser-sync").create();
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");
const merge = require("merge-stream");
const newer = require("gulp-newer");
const postcss = require("gulp-postcss");
const prefix = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const terser = require("gulp-terser");
const webp = require("gulp-cwebp");

//Compile, prefix, and minify .scss/.sass files
function compileScss() {
  return src("src/style/main.scss")
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(postcss([cssnano()]))
    .pipe(dest("public"));
}

// Minify .js files
function minJs() {
  return src("src/script/*.js").pipe(terser()).pipe(dest("public/script"));
}

//Optimize images
function optimizeImg() {
  return src("src/img/*.{jpg,png}")
    .pipe(newer("public/img"))
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true,
        }),
        imagemin.mozjpeg({
          quality: 80,
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
    .pipe(dest("public/img"));
}

//Convert images to .webp
function webpImg() {
  return src("public/img/*.{jpg,png}").pipe(webp()).pipe(dest("public/img"));
}

function copyToFront() {
  let fonts = src("src/fonts/*/*.*").pipe(dest("public/fonts"));
  let audio = src("src/audio/*.*").pipe(dest("public/audio"));
  let panel_snap = src("node_modules/panelsnap/docs/panelsnap.js").pipe(
    dest("public/script/modules"),
  );

  return merge(fonts, audio);
}

// BrowserSync task
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: "public",
    },
    browser: ["google chrome"],
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

//Checks and executes tasks automatically
function watchTask() {
  watch(
    [
      "src/style/main.scss",
      "src/style/layouts/**",
      "src/style/abstracts/**",
      "src/style/pages/**",
    ],
    series(compileScss, browserSyncReload),
  );
  watch("src/script/**", series(minJs, browserSyncReload));
  watch("src/img/*.{jpg,png}", series(optimizeImg, browserSyncReload));
  watch("public/img/*.{jpg,png}", series(webpImg, browserSyncReload));
  watch("public/*.html", browserSyncReload);
}

// Default Gulp task
exports.default = series(
  copyToFront,
  compileScss,
  minJs,
  optimizeImg,
  webpImg,
  browserSyncServe,
  watchTask,
);
