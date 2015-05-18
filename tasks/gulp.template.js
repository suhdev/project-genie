var gulp = require('gulp'),	
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngdocs = require('gulp-ngdocs'),
	karma = require('gulp-karma'),
	compass = require('gulp-compass'),
	debug = false,
	watchDependencies = __WATCH_TASK_DEPENDENCIES__;

var PATHS = {
	JS:{
		SRC:{
			BASE:__JS_SOURCE_BASE_DIR__,
			APP:__JS_SOURCE_APP_DIR__
		},
		LIB:__JS_LIB_DIRS__,
		DOCS:__JS_DOCS_DIR__,
		TEST:__JS_TEST_DIRS__
		DIST:{
			BASE:__JS_DIST_DIR__,
			MIN:__JS_DIST_MIN_FILE__,
			MAX:__JS_DIST_MAX_FILE__
		}
	},
};
