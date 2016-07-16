var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');


gulp.task('browserify', function() {
  return gulp.src('./public/javascripts/app.js')
              .pipe(browserify())
              .pipe(gulp.dest('./public/javascripts/bin'))
});

gulp.task('compress', function() {
  return gulp.src('./public/javascripts/bin/app.js')
              .pipe(uglify({
                mangle: false
              }))
              .pipe(gulp.dest('./public/javascripts/uglified'))
})

gulp.task('watch', function() {
  gulp.watch(['./public/javascripts/*.js'], ['browserify']);
  gulp.watch(['./public/javascripts/bin/app.js'], ['compress'])
});

gulp.task('default', ['browserify', 'watch', 'compress'])