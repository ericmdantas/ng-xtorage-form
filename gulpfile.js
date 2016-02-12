"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coveralls = require('gulp-coveralls');
var rename = require('gulp-rename');
var karma = require('karma').server;

gulp.task('unit_test', (done) => {
    return karma
            .start({
              configFile: __dirname + '/karma.conf.js',
              browsers: ['Chrome'],
              singleRun: true
            }, done);
});

gulp.task('build', ['unit_test'], () => {
    return gulp
            .src('ng-xtorage-form.js')
            .pipe(uglify())
            .pipe(rename('ng-xtorage-form.min.js'))
            .pipe(gulp.dest('.'));
});

gulp.task('coverage', ['unit_test'], () => {
    return gulp
            .src('coverage/**/lcov.info')
            .pipe(coveralls());
});
