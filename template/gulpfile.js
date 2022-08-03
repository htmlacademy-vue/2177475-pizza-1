'use strict';
import gulp from 'gulp';
import { deleteAsync } from 'del';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';

// import imagemin from 'gulp-imagemin';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';

import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import objectFit from 'postcss-object-fit-images';
import minify from 'gulp-csso';

import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);

// const gulp = require('gulp');
// const del = require('del');
// const newer = require('gulp-newer');
// const plumber = require('gulp-plumber');
// const rename = require('gulp-rename');
//
// const imagemin = require('gulp-imagemin');
// const svgmin = require('gulp-svgmin');
// const svgstore = require('gulp-svgstore');
//
// const sass = require('gulp-sass');
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
// const objectFit = require('postcss-object-fit-images');
// const minify = require('gulp-csso');

const server = browserSync.create();

gulp.task('clean', function () {
  return deleteAsync('build');
});

gulp.task('copy', function () {
  return gulp.src([
    'src/fonts/**/*.{woff,woff2}',
    'src/img/*.webp',
    'src/js/*'
  ], {
    base: 'src'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('images', function () {
  return gulp.src([
    'src/img/**/*.{png,jpg,svg,webp}',
    '!src/img/sprite/*.svg'
  ])
    .pipe(newer('build/img'))
    // .pipe(imagemin([
    //   imagemin({
    //     optimizationLevel: 3
    //   }),
    //   imagemin({
    //     progressive: true
    //   }),
    //   imagemin({
    //     plugins: [{
    //       removeViewBox: false
    //     }]
    //   })
    // ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function () {
  return gulp.src('src/img/sprite/*.svg')
    .pipe(svgmin({
      plugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(svgstore({
      inlineSvg: true,
      removeAttrs: {attrs: '(stroke|fill)'}
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('style', function () {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer(),
      objectFit()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('build'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('build', gulp.series(
    'clean',
    'copy',
    'images',
    'sprite',
    'style',
    'html'
));

gulp.task('serve', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    port: 9999,
  });

  gulp.watch('src/img/**/*', gulp.series('images', 'refresh'));
  gulp.watch('src/img/sprite/*.svg', gulp.series('sprite', 'refresh'));
  gulp.watch('src/sass/**/*.scss', gulp.series('style'));
  gulp.watch('src/**/*.html', gulp.series('html', 'refresh'));
});

gulp.task('start', gulp.series('build', 'serve'));
