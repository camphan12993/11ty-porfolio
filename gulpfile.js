const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const isProd = process.env.NODE_ENV === 'production';
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');

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
		.src('./src/assets/js/main.js', { sourcemaps: true })
		.pipe(uglify())
		.pipe(gulp.dest('./_site/assets/js/', { sourcemaps: true }));
}

// build styles
function stylesBuild() {
	return gulp
		.src('./src/assets/css/main.css')
		.pipe(postcss([require('autoprefixer'), require('tailwindcss')]))
		.pipe(gulp.dest('./_site/assets/css/'));
}

// watch all files
function watchFiles() {
	gulp.watch('./src/assets/css/**/*', stylesBuild);
	gulp.watch('./src/assets/js/**/*', jsBuild);
}

const build = gulp.series(gulp.parallel(stylesBuild, jsBuild));
const watch = gulp.parallel(server, watchFiles);

exports.build = build;
exports.watch = watch;
