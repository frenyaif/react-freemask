const { src, dest, parallel } = require('gulp');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');

function css() {
  return src('src/static/css/*.css').pipe(dest('npm/build/css/'));
}

function cssoCore() {
  return src('src/static/css/react-freemask.css')
    .pipe(minifyCSS())
    .pipe(rename('react-freemask.min.css'))
    .pipe(dest('npm/build/css/'));
}

function cssoBootstrap() {
  return src('src/static/css/react-freemask.bootstrap.css')
    .pipe(minifyCSS())
    .pipe(rename('react-freemask.bootstrap.min.css'))
    .pipe(dest('npm/build/css/'));
}

function cssoMaterial() {
  return src('src/static/css/react-freemask.material.css')
    .pipe(minifyCSS())
    .pipe(rename('react-freemask.material.min.css'))
    .pipe(dest('npm/build/css/'));
}

exports.css = css;
exports.cssoCore = cssoCore;
exports.cssoBootstrap = cssoBootstrap;
exports.cssoMaterial = cssoMaterial;
exports.default = parallel(css, cssoCore, cssoBootstrap, cssoMaterial);
