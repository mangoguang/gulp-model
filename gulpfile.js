/**
 * Created by Administrator on 2016/6/30.
 */
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    smushit = require('gulp-smushit'),
    babel = require('gulp-babel'),
    es2015 = require("babel-preset-es2015"),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    livereload = require('gulp-livereload');

gulp.task('htmlmin', function() {
    return gulp.src('./html/*.html')
        .pipe(watch('./html/*.html'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/html'))
})
gulp.task('indexhtml', function() {
    return gulp.src('./index.html')
        .pipe(watch('./index.html'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
})

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(watch('./sass/*.scss'))
        .pipe(sass())
        // .pipe(gulp.dest('./css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./css'))
})

//压缩合并JS文件
gulp.task('js', function() {
    return gulp.src('./script/*.js')
        .pipe(watch('./script/*.js')) 
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('./dist/script'))
})

//压缩合并JS库文件
gulp.task('jslib', function() {
    return gulp.src('./script/lib/*.js')
        .pipe(watch('./script/lib/*.js'))
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('./dist/script/lib'))
})

//图片压缩
gulp.task('smushit', function() {
    return gulp.src('./images/*')
        .pipe(watch('./images/*'))
        .pipe(smushit({
            verbose: true
        })) //压缩
        .pipe(gulp.dest('./dist/images'))
})

gulp.task('browser-sync', function() {
    var files = [
        './html/*.html',
        './css/*.css',
        './script/*.js',
        './*.html'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    })
})



gulp.task('default', ['browser-sync', 'js', 'jslib', 'sass', 'htmlmin', 'indexhtml', 'smushit'], function() {
    // gulp.src('./views/**/*.js')
    //     .pipe(uglify())
    //     .pipe(concat('main.js'))
    //     .pipe(gulp.dest('./js'));
});