/**
 * Define dependencies
 */
var Q = require("q"),
    gulp = require('gulp'),
    gutil = require('gulp-util');
    path = require('path') ,
    bowerFiles = require('gulp-bower-files'),
    filter = require('gulp-filter'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish-ex'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    inject = require("gulp-inject"),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence'),
    print = require('gulp-print'),
    cliArgs = require('yargs').argv;

/**
 * Load config files
 */
var pkg = require('./package.json');
var cfg = require('./build.config.js');


// ----------------------------------------------------------------------------
// COMMON TASKS
// ----------------------------------------------------------------------------
/**
 * Clean build (bin) and compile (compile) directories
 */
gulp.task('clean', function () {
    return gulp.src([cfg.dir.build, cfg.dir.compile], {read: false})
        .pipe(clean());
});


// ----------------------------------------------------------------------------
// BASIC BUILD TASKS
// ----------------------------------------------------------------------------

/**
 * App assets
 */
gulp.task('app:assets:build', function () {
    var destDir = path.join(cfg.dir.build, cfg.dir.assets);
    return gulp.src(cfg.src.assets)
        .pipe(gulp.dest(destDir));
});

/**
 * JS
 */
gulp.task('app:js:build', function () {
    logHighlight("Copy js files");
    var destDir = path.join(cfg.dir.build, cfg.dir.app);

    // ignore assets
    var src = cfg.src.js;
    src.push('!' + cfg.src.assets);

    return gulp.src(src)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
        .pipe(gulp.dest(destDir));
});


/**
 *  JSON
 */
gulp.task('app:json:build', function () {
    return gulp.src(cfg.src.json)
        .pipe(gulp.dest(cfg.dir.build));
});

/**
 * Vendor: copy
 */
gulp.task('vendor:build', function () {
    var destDir = path.join(cfg.dir.build, cfg.dir.vendor);
    return bowerFiles()
        .pipe(gulp.dest(destDir));
});



/**
 * index.html: inject css and js files
 */
gulp.task('html:build', function () {
    var src = {
        css: path.join(cfg.dir.build, cfg.dir.assets, '**', '*.css'),
        js: path.join(cfg.dir.build, cfg.dir.app, '**', '*.js')
    };
    var destDir = path.join(cfg.dir.build);
    var ignorePath = path.join(cfg.dir.build);

    return gulp.src(cfg.src.html)
        .pipe(inject(bowerFiles(), {ignorePath: ignorePath, starttag: '<!-- inject:vendor:{{ext}} -->'}))
        .pipe(inject(gulp.src(src.js, {read: false}), {ignorePath: ignorePath, starttag: '<!-- inject:app:{{ext}} -->'}))
        .pipe(inject(gulp.src(src.css, {read: false}), {ignorePath: ignorePath}))
        .pipe(gulp.dest(destDir));
});


/**
 *
 */
gulp.task('app:build', function () {
    var deferred = Q.defer();

    runSequence(
        'clean',
        'vendor:build',
        'app:assets:build',
        'app:js:build',
        'app:json:build',
        'html:build',
        function () {
            deferred.resolve();
        });

    return deferred.promise;
});

// ----------------------------------------------------------------------------
// WATCH BUILD TASKS
// ----------------------------------------------------------------------------


gulp.task('watch', ['app:build'], function () {
    var server = livereload();

    // .css files
    gulp.watch('src/**/*.css', ['app:assets:build']);
    // .js files
    gulp.watch('src/**/*.js', ['app:js:build']);
    // .html files
    gulp.watch('src/**/*.html', ['html:build']);

    var buildDir = path.join(cfg.dir.build, '**');
    gulp.watch(buildDir).on('change', function (file) {
        server.changed(file.path);
    });
});


// ----------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Highlight debug messages in log
 * @param message
 */
function logHighlight(message) {
    gutil.log(gutil.colors.black.bgWhite(message));
};