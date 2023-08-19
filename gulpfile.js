'use strict';

var environment = 'local';

if (process.argv.indexOf('release') !== -1 ||
    process.argv.indexOf('preview') !== -1 ||
    process.argv.indexOf('dev') !== -1) {
    process.argv.push('--ship');
}

const build = require('@microsoft/sp-build-web');
var gulp = require('gulp');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};


build.initialize(gulp);

// running build by itself, works. I used 'series' just because my actual build tasks are in a series.
gulp.task('dev', gulp.series('bundle'));

// Doesn't work. Any combinitation of build or package-solution with other tasks doesn't work.
gulp.task('dev2', gulp.series('clean','bundle'));
