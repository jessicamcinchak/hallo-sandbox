var gulp = require('gulp'),
	react = require('gulp-react'),
	babel = require('gulp-babel');

var opt = { es6module: true };

gulp.task('build', function() {
	return gulp.src('public/javascripts/components.jsx')
		.pipe(react(opt))
		.pipe(babel())
		.pipe(gulp.dest('public/javascripts'));
});

gulp.task('default', ['build']);