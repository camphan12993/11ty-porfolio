const gulp = require("gulp");
const childProcess = require("child_process");
const browsersync = require("browser-sync").create();
const fs = require("fs");
const path = require("path");
const isProd = process.env.NODE_ENV === "production";
const uglify = require("gulp-uglify");

// browsersync server
function server(done) {
  browsersync.init({
    server: "./_site/",
    files: [
      "./_site/assets/css/main.min.css",
      "./_site/assets/js/bundle.min.js",
      "./_site/*.{html, xml}",
      "./_site/**/*.{html, xml}",
    ],
    port: 3000,
    open: false,
  });
  done();
}

// minify js
async function minify() {
  const entryPath = path.join(__dirname, "/src/assets/js/main.js");
  var code = fs.readFileSync(entryPath, "utf8");
  if (!isProd) {
    return code;
  }
  try {
    const minified = await minify(code);
    return minified.code;
  } catch (err) {
    console.error("Terser error: ", err);
    return code;
  }
}

// Run Eleventy
function eleventyBuild() {
  return childProcess.spawn("npx", ["eleventy", "--quiet"], {
    stdio: "inherit",
  });
}

// build js
function jsBuild() {
  return gulp
    .src("./src/assets/js/main.js", { sourcemaps: true })
    .pipe(uglify())
    .pipe(gulp.dest("./_site/assets/js/", { sourcemaps: true }));
}

// build styles (sass)
function stylesBuild() {
  return gulp
    .src("./src/assets/main.css")
    .pipe(gulp.dest("./_site/assets/css/"));
}

// watch all files
function watchFiles() {
  gulp.watch(
    [
      "./.eleventy.js",
      "./src/**/*",
      "!./src/assets/js/**/*",
      "!./src/assets/scss/**/*",
    ],
    eleventyBuild
  );
  gulp.watch("./src/assets/css/**/*", stylesBuild);
  gulp.watch("./src/assets/js/**/*", jsBuild);
}

const build = gulp.series(eleventyBuild);
const watch = gulp.parallel(server, watchFiles);

exports.build = build;
exports.watch = watch;
