var gulp = require('gulp');

var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var defineModule = require('gulp-define-module');

gulp.task('templates', function(){
	gulp.src('assets/views/*.hbs')
		.pipe(handlebars())
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'templates',
			noRedeclare: true, // Avoid duplicate declarations
		}))
		// .pipe(defineModule('node'))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('build/js/'));
});


gulp.task('build', ['templates'])
