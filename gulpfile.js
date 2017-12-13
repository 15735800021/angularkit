var gulp = require('gulp');
var  $ = require('gulp-load-plugins')();
var concat  = require('gulp-concat');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var open = require('open');

var app = {
    devPath:'./build/',
    distPath:'./dist/',
    srcPath:'./src'
}
//打包插件
gulp.task('copy-bundle',function(){
    gulp.src([
        './bower_components/angular/angular.min.js',
        './bower_components/angular-route/angular-route.min.js',
    ])
    .pipe($.plumber())//编译错误后继续执行
    .pipe($.concat('bundle.js'))//合并文件
    .pipe(gulp.dest(app.devPath + 'static/js'))//生成到这个路径里面
})
gulp.task('script',function(){
    gulp.src('./src/script/**/*.js')
    .pipe($.concat('all.js'))//合并文件
    .pipe(gulp.dest(app.devPath + 'static/js'))//生成到这个路径里面
    .pipe($.rename('all.min.js'))//重命名
    .pipe($.uglify())//压缩js
    .pipe(gulp.dest(app.distPath + 'static/js'))//生成到生产环境
})
// 打包html
gulp.task('html',function(){
    gulp.src('./src/view/index.html')
    .pipe($.concat('all.html'))//合并文件
    .pipe(connect.reload())//显示的页面内容
    .pipe(gulp.dest(app.devPath + 'static/html'))//生成到这个路径里面
    .pipe(htmlmin({collapseWhitespace: true}))//压缩html
    .pipe($.rename('all.min.html'))//重命名
    .pipe(gulp.dest(app.distPath + 'static/html'))//生成到生产环境
})
// 打包css
gulp.task('css',function(){
    gulp.src('./src/view/index.css')
    .pipe($.concat('all.css'))//合并文件
    .pipe(gulp.dest(app.devPath + 'static/css'))//生成到这个路径里面
    .pipe($.cssmin())//压缩css
    .pipe($.rename('all.min.css'))//重命名
    .pipe(gulp.dest(app.distPath + 'static/css'))//生成到生产环境
})
// 压缩图片
gulp.task('img',function(){
    gulp.src('./src/img/*')
    .pipe(imagemin())//压缩css
    // .pipe($.rename('1.min.jpg'))//重命名
    .pipe(gulp.dest(app.distPath + 'static/img'))//生成到生产环境
})


//监听的枢纽
gulp.task('watch',['watch-js','watch-css','watch-html'],()=>{
    return 'server'
    })
    //实时监听js文件变化如果发生变化‘script’
    gulp.task('watch-js',()=>{
        return gulp.watch(app.srcPath+'/script/**/*.js',['script'])
    })
    //实时监听css
    gulp.task('watch-css',()=>{
        return gulp.watch(app.srcPath+'/view/*.js',['css']);
    })
    //实时监听html
    gulp.task('watch-html',()=>{
        return gulp.watch(app.srcPath+'/view/*.html',['html']);
    })
     //实时监听img
     gulp.task('watch-img',()=>{
        return gulp.watch(app.srcPath+'/img/*',['img']);
    })



//启动server热加载
gulp.task('server',function(){
    connect.server({
        root:[app.devPath],
        port:8080,
        livereload:true
    })
})
gulp.task('dev',[
    'html',
    'css',
    'img',
    'script',
    'copy-bundle',
    'server',
    'watch',
])

