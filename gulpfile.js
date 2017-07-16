/**
 * Created by aayusharora on 7/2/17.
 */
/*jslint node: true */

(function(){

    'use strict';

    var gulp = require('gulp');
    var jshint = require('gulp-jshint');

    var jsFiles = ['*js','!node_modules/**/*js'];

    gulp.task('default',function(){
        return gulp.src(jsFiles)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish',{
                verbose: true
            }));
    });

    // gulp.task('inject', function() {
    //     var wiredep = require('wiredap').stream;
    //     var options = {
    //         bowerJson: require('./bower.json'),
    //         directory:'./public/lib'
    //     };
    //
    //     return gulp.src('public/*.html')
    //         .pipe(wiredep(options))
    //         .pipe(gulp.dest('.src/views'))
    // });
})();
