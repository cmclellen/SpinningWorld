var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	changed = require('gulp-changed'),
	minifyHtml = require('gulp-minify-html'),
	concat = require('gulp-concat'),
	stripDebug = require('gulp-strip-debug'),
	autoprefix = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync');

gulp.task('jshint', function() {
	gulp.src('./src/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('htmlpage', function() {
	var htmlSrc = './src/*.html',
		htmlDst = './build';

	gulp.src(htmlSrc)
	    .pipe(changed(htmlDst))
	    .pipe(minifyHtml())
	    .pipe(gulp.dest(htmlDst));
});

gulp.task('scripts', function() {
	gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
		.pipe(concat('script.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./build/scripts/'));
});

gulp.task('styles', function() {
  gulp.src(['./src/styles/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

gulp.task('browser-sync', function () {
   var files = [
      'src/**/*.html',
      'src/styles/**/*.css',
      'src/images/**/*.png',
      'src/scripts/**/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './src'
      }
   });
});

gulp.task('default', ['htmlpage', 'scripts', 'styles', 'browser-sync'], function() {

	gulp.watch('./src/*.html', function() {
    	gulp.run('htmlpage');
  	});

  	gulp.watch('./src/scripts/*.js', function() {
    	gulp.run('jshint', 'scripts');
	});
 
  	gulp.watch('./src/styles/*.css', function() {
		gulp.run('styles');
	});

});

