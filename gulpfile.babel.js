'use strict';

// General imports
import gulp from 'gulp';
import zip from 'gulp-zip';
import concat from 'gulp-concat';

// CLEANUP task
// -------------------
import clean from 'gulp-rimraf';

gulp.task('cleanup', () => {
  return gulp.src("dist/*", { read: false })
    .pipe(clean());
});

// SCSS/SASS Related
// --------------------
import sass from 'gulp-sass';
import minifyCSS from'gulp-minify-css';

gulp.task('fonts-css', () => {
  return gulp.src('./src/css/fonts/*.css')
    .pipe(concat('fonts.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css/fonts'))
});

gulp.task('venodrs-css', () => {
  return gulp.src('./src/css/vendors/*.css')
    .pipe(concat('vendors.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css/vendors'))
});

gulp.task('scss', () => {
  return gulp.src(['./src/css/reset.css', './src/css/*'])
    .pipe(sass())
    .pipe(concat('bundle.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('css', ['cleanup'], () => {
  gulp.start(['fonts-css', 'vendors-css', 'scss']);
})



// ES6 Related
// --------------------
import babel from 'gulp-babel';
import uglifyJS from'gulp-uglify';

gulp.task('js-vendors', () => {
  return gulp.src('./src/js/vendors/*.js')
    .pipe(concat('vendors.min.js'))
    .pipe(uglifyJS())
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('js-dev', function () {
  return gulp.src('./src/js/*.js')
      .pipe(babel())
      .pipe(concat('bundle.min.js'))
      .pipe(uglifyJS())
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('js', ['cleanup'], () => {
  gulp.start(['js-vendors', 'js-dev']);
})


// Static files Related
// --------------------
import htmlreplace from 'gulp-html-replace';

gulp.task('html', ['cleanup'], () => {
  return gulp.src('./src/*.html')
    .pipe(htmlreplace({
      'fonts': 'css/fonts/fonts.min.css',
      'vendors': 'js/vendors.min.js',
      'css': 'css/bundle.min.css',
      'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('img', ['cleanup'], () => {
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./dist/img'))
})

gulp.task('fonts', ['cleanup'], () => {
  return gulp.src('./src/css/fonts/*')
    .pipe(gulp.dest('./dist/css/fonts/'))
});

gulp.task('static', ['cleanup'], () => {
  gulp.start(['fonts', 'img', 'html']);
});


// Create a .zip of the src
// -------------------------
gulp.task('zip-dev', () => {
  gulp.src('src/**/*')
    .pipe(zip('src.zip'))
    .pipe(gulp.dest('zip'));
});

// Create a .zip of the dist
gulp.task('zip-prod', () => {
  gulp.src('dist/**/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('zip'));
});

// Build task for packaging for production
// ---------------------------------------
gulp.task('build', () => {
  gulp.start(['js', 'css', 'static']);
});


// Build task for dev
gulp.task('build-dev', () => {
  gulp.start(['js', 'css', 'static'], () => {
    connect.reload(); // Restart the dev server
  });
});

import connect from 'gulp-connect';

// Watch task for development
// ----------------------------
gulp.task('dev', function () {

  // Build on start
  gulp.start('build', () => {
    // Create a dev server for the project
    connect.server({
      name: "Dev server",
      root: './dist',
    });
  });

  // Watch for changes
  gulp.watch(['src/js/**/*', 'src/css/**/*', 'src/img/**/*', 'src/*.html'], ['build-dev']);



  // gulp.watch('src/js/**/*', ['build']);
  // gulp.watch('src/css/**/*', ['build']);
  // gulp.watch('src/img/**/*', ['build']);
  // gulp.watch('src/*.html', ['build']);

});