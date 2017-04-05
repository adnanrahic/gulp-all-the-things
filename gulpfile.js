var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var htmlclean = require('gulp-htmlclean');

var paths = {
	src: 'src',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',
	tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJS: 'tmp/**/*.js',
  dist: 'dist'
};

gulp.task('default', function () {
  console.log('Hello World!');
});

gulp.task('html', function () {
  return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});
gulp.task('css', function () {
  return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.tmp));
});
gulp.task('js', function () {
  return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
});

gulp.task('copy', ['html', 'css', 'js']);

gulp.task('inject', ['copy'], function () {
  var css = gulp.src(paths.tmpCSS);
  var js = gulp.src(paths.tmpJS);
  return gulp.src(paths.tmpIndex)
				.pipe(inject( css, { relative:true } ))
        .pipe(inject( js, { relative:true } ))
				.pipe(gulp.dest(paths.tmp));
});

gulp.task('clean', function () {
  del([paths.tmp, paths.dist]);
});