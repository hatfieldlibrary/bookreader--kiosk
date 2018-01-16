var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');

var appDevRoot = 'kioskApp';

function minifyCss() {
    return gulp.src(['./src/app/styles/**/*'])
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/styles'))
}

function minifyJs(callback) {
    pump([
            gulp.src('./src/app/scripts/**/*'),
            uglify(),
            gulp.dest('./dist/scripts')
        ],
        callback
    );
}

function copyModules() {
    gulp.src('./src/app/modules/**/*')
        .pipe(gulp.dest('./dist/scripts/vendor'))
}

function copyImages() {
    gulp.src('./src/app/images/**/*')
        .pipe(gulp.dest('./dist/images'));
}

function copyRootFiles() {
    return gulp.src('./src/app/' + appDevRoot + '/simple/**/*')
        .pipe(gulp.dest('./dist'));
}

function initialize() {
    minifyCss();
    minifyJs(function() {});
    copyModules();
    copyImages();
    copyRootFiles();
    // wait one second to initialize browser-sync.
    setTimeout( function() {
        browserSync.init({
            server: './dist'
        });
    }, 1000);
}

gulp.task('cssmin', function () {
    cleanCss()
        .pipe(browserSync.stream());
});

gulp.task('jsmin', function () {
    minifyJs(function() { browserSync.reload(); });

});

gulp.task('copy', function () {
    copyRootFiles()
        .pipe(browserSync.stream());
});

gulp.task('default', function () {

    initialize();
    gulp.watch('./src/app/scripts/**/*', ['jsmin']);
    gulp.watch('./src/app/styles/**/*', ['cssmin']);
    gulp.watch('./src/app/' + appDevRoot + '/simple/**/*', ['copy']);


});