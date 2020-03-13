
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const baseDir = 'app';
const sassFiles = 'app/scss/**/*.scss';
const imageFiles = 'app/images/*';

const cssDestination = 'dist/css';
const imagesDestination = 'dist/images';

const cssToDelete = 'dist/css/*.css';

gulp.task('clean', () => {
    return del([
        cssToDelete,
    ]);
});

gulp.task('sass', function () {
    return gulp.src(sassFiles)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(cssDestination))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('images', function () {
    return gulp.src(imageFiles)
        .pipe(imagemin())
        .pipe(gulp.dest(imagesDestination));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('watch', function () {    
    gulp.watch(sassFiles, gulp.series('sass'));
    gulp.watch(baseDir, gulp.series('browserSync'));    
    gulp.watch(imageFiles, gulp.series('images'));
});

gulp.task('default', gulp.series(['clean', 'sass', 'images', 'browserSync', 'watch']));