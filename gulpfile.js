const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  scripts: [
      "bower_components/jquery/dist/jquery.min.js",
      "bower_components/angular/angular.min.js",
      "bower_components/angular-animate/angular-animate.min.js",
      "bower_components/angular-material/angular-material.min.js",
      "bower_components/angular-messages/angular-messages.min.js",
      "bower_components/angular-aria/angular-aria.min.js",
      "bower_components/hello/dist/hello.all.js",
      "bower_components/hello/dist/hello.js",
      "scripts/api-explorer-init.js",
      "scripts/api-explorer-helpers.js",
      "scripts/api-explorer-app.js",
      "scripts/api-explorer-svc.js",
      "scripts/**/*.js"
    ],
    stylesheets: [
      "bower_components/angular-material/angular-material.min.css",
      "styles/api-explorer.css"
    ]
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});


gulp.task('stylesheets', ['clean'], function() {
  return gulp.src(paths.stylesheets)
    .pipe(concat('all.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts', 'stylesheets']);
  gulp.watch(paths.stylesheets, ['scripts', 'stylesheets']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'stylesheets']);