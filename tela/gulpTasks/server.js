const gulp = require('gulp');
const watch = require('gulp-watch');
const webserver = require('gulp-webserver');


gulp.task('watch', () => {
    watch('app/**/*.html', () => gulp.start('app.html'));
    //will watch for changes in PATH and start app.html. Look on app.js to check what app.html will trigger
    watch('app/**/*.css', () => gulp.start('app.css'));
    watch('app/**/*.js', () => gulp.start('app.js'));
    watch('app/**/*.*', () => gulp.start('app.assets'));
});

gulp.task('server', ['watch'], () => {
    return gulp.src('public').pipe(webserver({
        livereload: true,
        port: 3003,
        open: true
    }))
});