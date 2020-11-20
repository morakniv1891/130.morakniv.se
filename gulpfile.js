const { src, dest, series, parallel, watch } = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const wait = require("gulp-wait");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const rename = require("gulp-rename");
const glob = require("glob");
const es = require("event-stream");

function scriptsDev(done) {
  glob("./src/js/*.js", function (err, files) {
    if (err) done(err);
    const tasks = files.map(function (entry) {
      return browserify({ transform: ["babelify"], entries: [entry] })
        .bundle()
        .pipe(source(entry))
        .pipe(
          rename({
            dirname: "",
          })
        )
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write())
        .pipe(dest("./assets/js"));
    });
    es.merge(tasks).on("end", done);
  });
}

function scriptsBuild(done) {
  glob("./src/js/*.js", function (err, files) {
    if (err) done(err);
    const tasks = files.map(function (entry) {
      return browserify({ transform: ["babelify"], entries: [entry] })
        .bundle()
        .pipe(source(entry))
        .pipe(
          rename({
            dirname: "",
            suffix: ".min",
          })
        )
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest("./assets/js"));
    });
    es.merge(tasks).on("end", done);
  });
}

function stylesDev() {
  return src("./src/scss/**/*.scss")
    .pipe(wait(50))
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(dest("./assets/css/"));
}

function stylesBuild() {
  return src("./src/scss/**/*.scss")
    .pipe(wait(50))
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./assets/css/"));
}

function watchFiles() {
  watch("./src/js/**/*.js", scriptsDev);
  watch("./src/scss/**/*.scss", stylesDev);
}

exports.default = series(scriptsDev, stylesDev, watchFiles);
exports.build = parallel(scriptsBuild, stylesBuild);
