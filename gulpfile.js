'use strict';

var gulp = require('gulp');
var chug = require('gulp-chug');
var exec = require('child_process').exec;
var path = require('path');

gulp.task('install:scripts', ['build:samples', 'build:core'], function (done) {
    exec('npm i', {cwd: path.join(__dirname, '../texen-scripts')}, done);
});

gulp.task('install:samples', function (done) {
    exec('npm i', {cwd: path.join(__dirname, '../texen-samples')}, done);
});

gulp.task('install:core', function (done) {
    exec('npm i', {cwd: path.join(__dirname, '../texen-core')}, done);
});

gulp.task('install:angular', function (done) {
    exec('npm i', {cwd: path.join(__dirname, '../texen-angular')}, done);
});

gulp.task('install:utils', function (done) {
    exec('npm i', {cwd: path.join(__dirname, '../texen-utils')}, done);
});

gulp.task('build:samples', ['install:samples'], function () {
    return gulp.src('../texen-samples/gulpfile.js', {read: false}).pipe(chug())
});

gulp.task('build:scripts', ['install:scripts'], function () {
    return gulp.src('../texen-scripts/gulpfile.js', {read: false}).pipe(chug())
});

gulp.task('build:utils', ['install:utils'], function () {
    return gulp.src('../texen-utils/gulpfile.js', {read: false}).pipe(chug())
});

gulp.task('build:angular', ['install:angular', 'build:utils', 'build:scripts', 'build:samples', 'build:core'], function () {
    return gulp.src('../texen-angular/gulpfile.js', {read: false}).pipe(chug())
});

gulp.task('build:core', ['build:samples', 'install:core'], function (done) {
    done();
});

gulp.task('build', ['build:utils', 'build:scripts', 'build:samples', 'build:core', 'build:angular']);

gulp.task('default', ['build']);
