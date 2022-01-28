const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const postcssimport = require('postcss-import');
const cssnano = require('cssnano')({
  preset: 'default',
  discardComments: { removeAll: true },
});

// browsersync server
function server(done) {
  browsersync.init({
    server: './_site/',
    files: ['./_site'],
    port: 3000,
    open: false,
  });
  done();
}

// build js
function jsBuild() {
  return gulp
    .src('./src/assets/js/main.js', {
      sourcemaps: process.env.NODE_ENV !== 'production',
    })
    .pipe(uglify())
    .pipe(
      gulp.dest('./_site/assets/js/', {
        sourcemaps: process.env.NODE_ENV !== 'production',
      })
    );
}

// build styles
function stylesBuild() {
  return gulp
    .src('./src/assets/css/main.css')
    .pipe(
      postcss([
        postcssimport(),
        require('tailwindcss')('./tailwind.config.js'),
        require('autoprefixer'),
        ...(process.env.NODE_ENV === 'production' ? [cssnano] : []),
      ])
    )
    .pipe(gulp.dest('./_site/assets/css/'));
}

// watch all files
function watchFiles() {
  gulp.watch(['./src/assets/css/**/*', './src/**/*.liquid'], stylesBuild);
  gulp.watch('./src/assets/js/**/*', jsBuild);
}

const build = gulp.series(gulp.parallel(stylesBuild, jsBuild));
const watch = gulp.series(build, gulp.parallel(server, watchFiles));

exports.build = build;
exports.watch = watch;
