/**
 * Created by mihelcic on 08. 09. 2016.
 */
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
// JS
const gulpConcat = require('gulp-concat')
const gulpRename = require('gulp-rename')
const gulpUglify = require('gulp-uglify')
const babel = require('gulp-babel')
// CSS
const stylus = require('gulp-stylus')
const nib = require('nib')

const jsFiles = [
  'private/javascripts/main.es6'
]

const cssFiles = [
  'private/stylesheets/main.styl'
]

gulp.task('es6', () => {
  var stream = gulp.src(jsFiles)
                   .pipe(gulpConcat('concat.js'))
                   .pipe(babel({
                     presets: ['es2015']
                   }).on('error', (error) => { console.log('ES6 error: \n\n', error, '\n\n')} ))
                   .pipe(gulpUglify())
                   .pipe(gulpRename('bundle.js'))
                   .pipe(gulp.dest('public/javascripts'))

  stream.on('error', error => {
    console.log('ES6 error: ', error)
  })
  // Skip returning stream to prevent Async, which causes race conditions
  //return stream
})

gulp.task('styl', () => {
  var stream = gulp.src(cssFiles)
                   .pipe(stylus({
                     import: ['nib'],
                     use: [nib()],
                     compress: true
                   }).on('error', (error) => { console.log('STYL error: \n\n', error, '\n\n')} ))
                   .pipe(gulpRename('bundle.css'))
                   .pipe(gulp.dest('public/stylesheets'))

  stream.on('error', error => {
    console.log('STYL error: ', error)
  })
  // Skip returning stream to prevent Async, which causes race conditions
  //return stream
})

// Execute es6 so we guarantee the latest code is compiled and ready
gulp.task('nodemon', ['es6', 'styl'], () => {
  // Register listener
  gulp.watch('private/javascripts/*.es6', ['es6'])
  gulp.watch('private/stylesheets/*.styl', ['styl'])
  // Start nodemon
  return nodemon({
    script: 'bin/www',
    env: {'NODE_ENV': 'development'}
  })
})