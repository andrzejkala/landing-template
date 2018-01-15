'use strict';

// General imports
import gulp from 'gulp';
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

gulp.task('scss', () => {
  return gulp.src(['./src/css/reset.css', './src/css/*'])
    .pipe(sass())
    .pipe(concat('bundle.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('css', ['cleanup'], () => {
  gulp.start(['fonts-css', 'scss']);
})



// ES6 Related
// --------------------
import babel from 'gulp-babel';
import uglifyJS from'gulp-uglify';

gulp.task('js-vendors', () => {
  return gulp.src('./src/js/vendors/*')
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



// Build task for packaging for production
// ---------------------------------------
gulp.task('build', () => {
  gulp.start(['js', 'css', 'static']);
});


// Watch task for development
// ----------------------------
gulp.task('watch', function () {

  // Build on start
  gulp.start('build');

  // Watch for changes
  gulp.watch('./src/js', ['js']);
  gulp.watch('./src/css', ['css']);
  gulp.watch('src/img/**/*', ['img']);
  gulp.watch('./src/*.html', ['html']);

});