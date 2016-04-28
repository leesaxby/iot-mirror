var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: 9990,
    livereload: {
      port: 35728
    }
  });
});

gulp.task('reload', function() {
  gulp.src('app/*.html')
      .pipe( connect.reload() );
});


gulp.task('watch', function() {
  gulp.watch([ 'app/**/**.**' ], [ 'reload' ]);

});

gulp.task('default', [ 'connect', 'watch']);
