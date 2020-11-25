const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const isProd = process.env.NODE_ENV === "production";
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano")({
  preset: "default",
  discardComments: { removeAll: true },
});
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ["./src/**/*.liquid"],
  whitelist: ["active", "fade-out", "loading"],
  whitelistPatterns: [/swiper/g],
  whitelistPatternsChildren: [/swiper/g],
  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

// browsersync server
function server(done) {
  browsersync.init({
    server: "./_site/",
    files: ["./_site"],
    port: 3000,
    open: false,
  });
  done();
}

// build js
function jsBuild() {
  return gulp
    .src("./src/assets/js/main.js", {
      sourcemaps: process.env.NODE_ENV !== "production",
    })
    .pipe(uglify())
    .pipe(
      gulp.dest("./_site/assets/js/", {
        sourcemaps: process.env.NODE_ENV !== "production",
      })
    );
}

// build styles
function stylesBuild() {
  return gulp
    .src("./src/assets/css/main.css")
    .pipe(
      postcss([
        require("autoprefixer"),
        require("tailwindcss"),
        ...(process.env.NODE_ENV === "production" ? [purgecss, cssnano] : []),
      ])
    )
    .pipe(gulp.dest("./_site/assets/css/"));
}

// watch all files
function watchFiles() {
  gulp.watch("./src/assets/css/**/*", stylesBuild);
  gulp.watch("./src/assets/js/**/*", jsBuild);
}

const build = gulp.series(gulp.parallel(stylesBuild, jsBuild));
const watch = gulp.parallel(server, watchFiles);

exports.build = build;
exports.watch = watch;
