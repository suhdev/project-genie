gulp.task('watch', function() {
    gulp.watch(PATHS.JS.SRC.BASE,watchDependencies);
});