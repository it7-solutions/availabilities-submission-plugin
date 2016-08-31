var tsc = require('gulp-typescript');
var gulp = require('gulp');

var tsProject = tsc.createProject('tsconfig.json');

gulp.task('app.build', function () {
  var tsResult = gulp.src('app/**/*.ts', {base: './app/'})
    .pipe(tsc(tsProject));

  return tsResult.js
    .pipe(gulp.dest('build/js'));
});

var SystemBuilder = require('systemjs-builder');

gulp.task('app.systemjs.bundle', function () {
  var config = {
    paths: {
      '*': '*.js'
    },
    meta: {
      '@angular/*': {
        build: false
      },
      'rxjs/*': {
        build: false
      }
    }
  };

  var builder = new SystemBuilder('build/js', config);

  return builder.bundle('main', 'build/js/app.bundle.js');
});

gulp.task('default', ['app.build', 'app.systemjs.bundle']);
