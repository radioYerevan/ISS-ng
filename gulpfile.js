var gulp         = require('gulp'),
	webserver    = require('gulp-webserver'),
	sass         = require('gulp-ruby-sass'),
	handleErrors = require('./gulp-utils/handleErrors'),
	minifycss    = require('gulp-minify-css'),
	requireDir   = require('require-dir'),
	watch        = require('watchify'),
	buildTasks   = ['scss'];

gulp.task('setWatch', function() {
    global.isWatching = true;
});

gulp.task('build', buildTasks);

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
}); 


gulp.task('scss', function() {
    return sass('app/src/scss/style.scss', { compass: true } )
        .on('error', handleErrors)
        .pipe(minifycss())
        .pipe(gulp.dest('app/dist/css'));
});
	
gulp.task('watch', ['setWatch'], function() {
    gulp.watch( 'app/src/scss/style.scss', ['scss'] );
});

gulp.task('afterCreate', ['watch']);

gulp.task('default', ['scss', 'webserver', 'watch']);