import gulp from "gulp";
import gulpTS from "gulp-typescript";
import uglify from "gulp-uglify";
import htmlmin from "gulp-htmlmin";
import minifyInline from "gulp-minify-inline";

const transferHTML = () => {
  return gulp
    .src("src/**/*.html", {
      base: "./",
      allowEmpty: true,
    })
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(minifyInline())
    .pipe(gulp.dest("dist"));
};

const transferJSON = () => {
  return gulp
    .src("/src/**/*.json", {
      base: "./",
      allowEmpty: true,
    })
    .pipe(gulp.dest("dist"));
};

const transferFiles = gulp.parallel(transferHTML, transferJSON);

const compileTS = () => {
  const ts_project = gulpTS.createProject("tsconfig.json", {
    rootDir: "./",
    removeComments: true,
  });

  return ts_project
    .src()
    .pipe(ts_project())
    .on("error", () =>
      console.error("Despite TsProject errors found, proceeding with gulp")
    )
    .js.pipe(uglify())
    .pipe(gulp.dest("dist"));
};

const gulpTasks = gulp.series(transferFiles, compileTS);
export default gulpTasks;
