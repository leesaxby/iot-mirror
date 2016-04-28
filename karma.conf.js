// Karma configuration
module.exports = function( config ) {
	config.set({
		basePath: '',
		frameworks: [ 'browserify', 'jasmine-jquery', 'jasmine' ],
		files: [
			{ pattern: 'tests/fixtures/**.html', included: false, served: true },
			'tests/**.js'
		],
		browserify: {
			debug: true,
			transform: [ 'babelify' ]
		},
		preprocessors: {
			'tests/**.js': ['browserify']
		},
		colors: true,
		//config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_ERROR,
		browsers: [ 'PhantomJS' ]
	});
};
