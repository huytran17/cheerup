import gulp from "gulp";
import gulpTS from "gulp-typescript";
import uglify from "gulp-uglify";
import htmlmin from "gulp-htmlmin";
import minifyInline from "gulp-minify-inline";

const transferHTML = () => {
  return gulp
    .src("src/**/*.html", {
      base: "./src",
      allowEmpty: true,
    })
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(minifyInline())
    .pipe(gulp.dest("dist"));
};

const transferJSON = () => {
  return gulp
    .src("/src/**/*.json", {
      base: "./src",
      allowEmpty: true,
    })
    .pipe(gulp.dest("dist"));
};

const transferFiles = gulp.parallel(transferHTML, transferJSON);

const compileTS = () => {
  const ts_project = gulpTS.createProject("tsconfig.json");

  return gulp
    .src(["./src/**/*", "!./src/**/*.html", "!./src/upload/**/*"])
    .pipe(ts_project())
    .on("error", () =>
      console.error("Despite TsProject errors found, proceeding with gulp")
    )
    .js.pipe(uglify())
    .pipe(gulp.dest("dist"));
};

const gulp_tasks = gulp.series(transferFiles, compileTS);
export default gulp_tasks;
