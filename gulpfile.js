"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coveralls = require('gulp-coveralls');
var rename = require('gulp-rename');
var karma = require('karma').server;

gulp.task('unit_test', function()
{
    karma
        .start({
            configFile: __dirname + '/karma.conf.js',
            browsers: ['PhantomJS'],
            singleRun: true
        })
})

gulp.task('build', ['unit_test'], function()
{
    gulp
        .src('ng-xtorage-form.js')
        .pipe(uglify())
        .pipe(rename('ng-xtorage-form.min.js'))
        .pipe(gulp.src('.'))
})

gulp.task('coverage', ['unit_test'], function()
{
    gulp
        .src('coverage/**/*.info')
        .pipe(coveralls());
})