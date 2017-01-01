var gulp = require("gulp"),
		gutil = require("gulp-util"),
		browserify = require("browserify"),
		babelify = require("babelify"),
		source = require("vinyl-source-stream"),
		buffer = require("vinyl-buffer"),
		glob = require("glob"),
		uglify = require("gulp-uglify"),
		eslint = require("gulp-eslint"),
		sass = require("gulp-ruby-sass"),
		Server = require("karma").Server,
		connect = require("gulp-connect");

gulp.task("connect", function() {
	connect.server({
		root: "build",
		port: 8888,
		livereload: true,
		fallback: "build/index.html"
	});
});

gulp.task("html", function() {
	gulp.src( "build/*.html" )
			.pipe( connect.reload() );
});

gulp.task("move-html", function() {
	gulp.src( "src/*.html" )
			.on( "error", gutil.log )
			.pipe( gulp.dest( "build/" ) )
			.pipe( connect.reload() );

	gulp.src( "src/views/*.html" )
			.on( "error", gutil.log )
			.pipe( gulp.dest( "build/views" ) )
			.pipe( connect.reload() );

	gulp.src( "src/templates/*.html" )
			.on( "error", gutil.log )
			.pipe( gulp.dest( "build/templates" ) )
			.pipe( connect.reload() );
});

gulp.task("sass", function() {
	return sass( "src/css/*.scss" )
					.on( "error", sass.logError )
					.pipe( gulp.dest( "build/css" ) )
					.pipe( connect.reload() );
});

gulp.task("es6", function() {
	var files = glob.sync( "./src/**/**.js" ),
			bundler = browserify({
				entries: files,
				debug: true
			}).transform( babelify );

	return bundler.bundle()
								.on( "error", gutil.log )
								.pipe( source( "app.js" ) )
								.pipe( gulp.dest( "build" ) )
								.pipe( connect.reload() );
});

gulp.task("lint", function() {
	return gulp.src( "build/app.js" )
						 .pipe( eslint( "config.json" ) )
						 .pipe( eslint.format() );
});

gulp.task("karma-build", function( done ) {
	new Server({
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, done ).start();
});

gulp.task("karma-start", function( done ) {
	new Server({
		configFile: __dirname + "/karma.conf.js"
	}, done ).start();
});

gulp.task("uglify", function() {
	return gulp.src( "build/app.js" )
						 .pipe( uglify() )
						 .on( "error", gutil.log )
						 .pipe( gulp.dest( "build" ) );
});


gulp.task("watch", function() {
	gulp.watch( [ "src/**/**.html" ], [ "move-html" ] );
	gulp.watch( [ "src/**/**.js" ], [ "es6" ] );
	gulp.watch( [ "src/css/*.scss" ], [ "sass" ] );
});

gulp.task( "default", [ "connect", "watch"/*, "karma-start"*/] );
gulp.task( "karma", [ "karma-start" ] );
gulp.task( "build", [ "uglify" ], function() {
	return gulp.src( "build/**" )
						 .pipe( gulp.dest( "dist/app" ) );
});
