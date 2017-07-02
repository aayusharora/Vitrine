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
})();
