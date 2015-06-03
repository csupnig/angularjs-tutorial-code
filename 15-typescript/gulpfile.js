/**
 * Define dependencies
 */
var Q = require("q"),
    gulp = require('gulp'),
    gutil = require('gulp-util');
    path = require('path') ,
    bowerFiles = require('gulp-bower-files'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish-ex'),
    uglify = require('gulp-uglifyjs'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    inject = require("gulp-inject"),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence'),
    mergestream = require('merge-stream'),
    gulpFilter = require('gulp-filter'),
    ts = require('gulp-type');

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
 * App css
 */
gulp.task('app:css:build', function () {
    var destDir = path.join(cfg.dir.build, cfg.dir.assets);

    var cssFilter = gulpFilter('**/*.css');
    var vendorCss = bowerFiles()
        .pipe(cssFilter);

    var appCss = gulp.src(cfg.src.assets);

    return mergestream(vendorCss, appCss)
        .pipe(concat('app.'+pkg.version+'.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(destDir));
});

/**
 * JS
 */
gulp.task('app:js:build', function () {
    logHighlight("Copy js files");
    var destDir = path.join(cfg.dir.build, cfg.dir.app);

    var jsFilter = gulpFilter('**/*.js');

    var vendorJS = bowerFiles()
        .pipe(jsFilter);

    var src = cfg.src.ts;
    src.push(cfg.src.tslibs);
    src.push('!' + cfg.src.assets);
    var tsResult = gulp.src(src)
        .pipe(ts({
            declarationFiles: true,
            noExternalResolve: true,
            sortOutput:true
        }));

    return mergestream(vendorJS, tsResult.js)
        .pipe(uglify('app.'+pkg.version+'.min.js'))
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
        'app:css:build',
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
    gulp.watch('src/**/*.css', ['app:css:build']);
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