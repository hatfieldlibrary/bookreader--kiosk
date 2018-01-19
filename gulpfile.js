var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var minimist = require('minimist');
var del = require('del');

var knownOptions = {
    string: 'mode',
    default: {mode: 'simple'}
};

var options = minimist(process.argv.slice(2), knownOptions);
var appDevRoot = options.mode;

function minifyJs(callback) {
    pump([
            gulp.src('./src/scripts/*'),
            uglify(),
            gulp.dest('./dist/scripts')
        ],
        callback
    );
}

function copyModules() {
    return gulp.src('./src/modules/**/*')
        .pipe(gulp.dest('./dist/scripts/vendor'))
}

function copyVendorJs() {
    return gulp.src('./src/scripts/vendor/**/*')
        .pipe(gulp.dest('./dist/scripts/vendor'))
}

function minifyCss() {
    return gulp.src(['./src/styles/**/*'])
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/styles'))
}

function copyImages() {
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images'));
}

function copyRootFiles() {
    return gulp.src('./src/app/' + appDevRoot + '/**/*')
        .pipe(gulp.dest('./dist'));
}

function startBrowserSync() {
    // wait one second to initialize browser-sync.
    setTimeout(function () {
        browserSync.init({
            server: './dist'
        });
    }, 2000);
}

function build(callback) {
    minifyCss();
    copyVendorJs();
    copyModules();
    copyRootFiles();
    copyImages();
    minifyJs(function () {console.log('BookReader.js minified.')});
    callback();
}

gulp.task('watch:cssmin', function () {
    minifyCss()
        .pipe(browserSync.stream());
});

gulp.task('watch:jsmin', function () {
    minifyJs(function () {
        browserSync.reload();
    });
});

gulp.task('watch:copy', function () {
    copyRootFiles()
        .pipe(browserSync.stream());
});

gulp.task('clean', function () {
    return Promise.all([
        del('./dist')
    ]);
});

gulp.task('build', ['clean'], function (done) {
    return build(done);
});

gulp.task('default', ['build'], function () {
    startBrowserSync();
    gulp.watch('./src/scripts/**/*', ['watch:jsmin']);
    gulp.watch('./src/styles/**/*', ['watch:cssmin']);
    gulp.watch('./src/app/' + appDevRoot + '/**/*', ['watch:copy']);


});