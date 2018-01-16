var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');

var appDevRoot = 'kioskApp';

function minifyCss() {
    return gulp.src(['./src/styles/**/*'])
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/styles'))
}

function minifyJs(callback) {
    pump([
            gulp.src('./src/scripts/**/*'),
            uglify(),
            gulp.dest('./dist/scripts')
        ],
        callback
    );
}

function copyModules() {
    gulp.src('./src/modules/**/*')
        .pipe(gulp.dest('./dist/scripts/vendor'))
}

function copyImages() {
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images'));
}

function copyRootFiles() {
    return gulp.src('./src/app/' + appDevRoot + '/**/*')
        .pipe(gulp.dest('./dist'));
}

function startBrowserSync() {
    // wait one second to initialize browser-sync.
    setTimeout( function() {
        browserSync.init({
            server: './dist'
        });
    }, 1000);
}

function build() {
    minifyCss();
    minifyJs(function() {});
    copyModules();
    copyImages();
    copyRootFiles();

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

gulp.task('build', function() {
    build();
});

gulp.task('default', function () {

    build();
    startBrowserSync();
    gulp.watch('./src/scripts/**/*', ['jsmin']);
    gulp.watch('./src/styles/**/*', ['cssmin']);
    gulp.watch('./src/app/' + appDevRoot + '/**/*', ['copy']);


});