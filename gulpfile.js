var gulp = require('gulp');

var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var defineModule = require('gulp-define-module');

gulp.task('build-templates', function(){
	gulp.src('assets/views/*.hbs')
		.pipe(handlebars())
		.pipe(declare({
			namespace: 'templates',
			noRedeclare: true, // Avoid duplicate declarations
		}))
		.pipe(concat('templates.js'))
		// .pipe(defineModule('node'))
		.pipe(gulp.dest('build/bin/'));
});

gulp.task('build-javascript', function () {
	gulp.src('assets/js/**/*.js')

	// browserify i guess
		.pipe(gulp.dest('build/public/js'));
});

gulp.task('build-css', function () {
	gulp.src('assets/css/**/*.css')

	// todo add autoprefixer
		.pipe(gulp.dest('build/public/css'));
});

gulp.task('build-sass', function () {
	gulp.src('assets/css/**/*.scss')
		// .pipe(sass())
		// .pipe(gulp.dest('build/public/css'));
});


gulp.task('build', ['build-templates', 'build-javascript', 'build-css', 'build-sass'], function () {
	// notify({
		// title: 'Build Success'
	// });
});

gulp.task('watch', function() {
	gulp.watch('assets/**/*', ['build']);
});
