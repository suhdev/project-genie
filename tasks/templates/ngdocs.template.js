gulp.task('ngdocs', function() {
	var options = {
    scripts: [PATHS.JS.DIST.MAX],
    html5Mode: false,
    startPage: '/api',
    title: "ngTranslate",
    titleLink: "/api"
  };
    return gulp.src(PATHS.JS.SRC)
    		.pipe(ngdocs.process(options))
    		.pipe(gulp.dest(PATHS.JS.DOCS));
});
