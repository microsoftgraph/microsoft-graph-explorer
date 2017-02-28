const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const typescript = require('gulp-tsc');
const addsrc = require('gulp-add-src');

const paths = {
    stylesheets: [
      "bower_components/angular-material/angular-material.min.css",
      "styles/api-explorer.css"
    ],
    assets: [
      './assets/**/*'
    ],
    typescript: [
      "scripts/*.ts"
    ]
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('clean-assets', function() {
  return del(['build/assets']);
});

gulp.task('clean-stylesheets', function() {
  return del(['build/stylesheets']);
});

gulp.task('scripts', [], function() {
  return gulp.src(paths.typescript)
    .pipe(typescript({
      target: 'ES5'
    }))
    .pipe(addsrc("bower_components/hello/dist/hello.all.min.js"))
    .pipe(addsrc("bower_components/es6-promise/es6-promise.auto.min.js"))
    .pipe(concat('all.js'))
    // .pipe(sourcemaps.init())
    .pipe(minify({
      ext:{
          src:'.js',
          min:'.min.js'
      }}))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/scripts'));
});


gulp.task('assets', ['clean-assets'], function() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest('build/assets'));
});

gulp.task('stylesheets', ['clean-stylesheets'], function() {
  return gulp.src(paths.stylesheets)
    .pipe(concat('all.css'))
    .pipe(gulp.dest('build/stylesheets'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.assets, ['assets'])
  gulp.watch(paths.typescript, ['scripts']);
  gulp.watch(paths.stylesheets, ['stylesheets']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['clean', 'build', 'watch']);
gulp.task('build', ['clean', 'scripts', 'stylesheets', 'assets']);