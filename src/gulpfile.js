const gulp        = require('gulp'),
      gutil       = require('gulp-util'),
      scss        = require('gulp-sass'),
      sourcemaps  = require('gulp-sourcemaps'),
      ftp         = require('vinyl-ftp');

gulp.task('scss', function(){
    return gulp.src('./common/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../dist/css/'));
});

gulp.task('css', function(){
    return gulp.src('./common/js/**/*.css')
        .pipe(gulp.dest('../dist/css/'));
});

gulp.task('html', function(){
    return gulp.src('./apps/test/*.html')
        .pipe(gulp.dest('../dist/'))
});

gulp.task('img', function(){
    return gulp.src('./apps/test/assets/img/**/*.*')
        .pipe(gulp.dest('../dist/img'))
});

gulp.task('fonts', function(){
    return gulp.src('./common/fonts/**/*.*')
        .pipe(gulp.dest('../dist/fonts'))
});

gulp.task('js', function(){
    return gulp.src('./common/js/**/*.*')
        .pipe(gulp.dest('../dist/js'))
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', gulp.parallel('scss', 'html', 'css', 'img', 'fonts', 'js'));
});

gulp.task('deploy', function() {
    var conn = ftp.create({
        host:      's28.webhost1.ru',
        user:      'avazmutall_test',
        password:  'avazmutall_test',
        parallel:  10,
        log: gutil.log
    });

    var globs = [
        './../dist/**',
        '.htaccess',
    ];

    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/'));
});

gulp.task('default', gulp.parallel('scss', 'html', 'css', 'img', 'fonts', 'js', 'watch'));
