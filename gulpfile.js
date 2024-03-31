const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer  = require('gulp-autoprefixer');

gulp.task('sass', function(){
    return gulp.src('./styles/styles.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./styles/'));
});

gulp.task('prefix', function(){
    return gulp.src('./styles/styles.css')  
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('./dist'))
});