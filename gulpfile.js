const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');

const paths = {
  scripts: [
      "bower_components/hello/dist/hello.all.min.js",
      "scripts/api-explorer-init.js",
      "scripts/typescript/api-explorer-helpers.js",
      "scripts/api-explorer-app.js",
      "scripts/typescript/api-explorer-svc.js",
      "scripts/typescript/loc_strings.js",
      "scripts/typescript/api-explorer-ctrl.js",
      "scripts/typescript/api-explorer-directive.js",
      "scripts/typescript/api-explorer-jseditor.js",
      "scripts/typescript/api-explorer-jsviewer.js",
      "scripts/typescript/api-explorer-msgraph.js",
      "scripts/typescript/auth.js",
      "scripts/typescript/*.js"
    ],
    stylesheets: [
      "bower_components/angular-material/angular-material.min.css",
      "styles/api-explorer.css"
    ],
    assets: [
      './assets/**/*'
    ]
};

gulp.task('clean', function() {
  return del(['build']);
});


gulp.task('clean-scripts', function() {
  return del(['build/scripts']);
});

gulp.task('clean-assets', function() {
  return del(['build/assets']);
});

gulp.task('clean-stylesheets', function() {
  return del(['build/stylesheets']);
});

gulp.task('scripts', [], function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(minify({
      ext:{
          src:'.js',
          min:'.min.js'
      }}))
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
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.stylesheets, ['stylesheets']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['clean', 'watch', 'scripts', 'stylesheets', 'assets']);