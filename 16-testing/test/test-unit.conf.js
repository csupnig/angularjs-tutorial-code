// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
        // list of files / patterns to load in the browser

        // **/*.js: All files with a "js" extension in all subdirectories
        // **/!(jquery).js: Same as previous, but excludes "jquery.js"
        // **/(foo|bar).js: In all subdirectories, all "foo.js" or "bar.js" files

        files: [
            'build/app/*.js',
            'build/tests/*.js'
        ],

        browsers: [
            'PhantomJS'
        ],

        // level of logging: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_WARN,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // web server port
        port: 7676,

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // Additional reporters, such as growl, junit, teamcity or coverage
        reporters: ['progress'],

        // Continuous Integration mode, if true, it capture browsers, run tests and exit
        // singleRun: false, // (set it grunt file)

        // Set this for CI, encase its slow (SauceLabs)
        // captureTimeout: 120000,

        // enable / disable watching file and executing tests whenever any file changes
        // autoWatch: true, // (set it grunt file)

        // Enable or disable colors in the output (reporters and logs).
        colors: true
    });
};

