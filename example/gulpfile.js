/**
 * Created by Administrator on 2017/4/29 0029.
 */
const gulp = require('gulp');
const b = require('browserify');
const path = require('path');
const source = require('vinyl-source-stream');
const less = require('../index');

gulp.task('test',()=>{
    let name = path.basename(path.resolve(__dirname,'js/test.js'));
    return b({
        entries:[path.resolve(__dirname,'js/test.js')]
    }).transform(less,{
        output:path.resolve(__dirname,'../dist'),
        autoprefixer:true
    }).bundle()
        .pipe(source(name))
        .pipe(gulp.dest(path.resolve(__dirname,'../dist')))
})


gulp.task('default',['test'])