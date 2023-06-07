const gulp = require("gulp");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const cssmin = require("gulp-cssmin");
const cssconcat = require("gulp-concat-css");
const autoprefixer = require("gulp-autoprefixer");

// HTML

gulp.task("html", () => {
	return gulp
		.src("public/**/*.html")
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		)
		.pipe(gulp.dest("dist"));
});

// Styles:index

gulp.task("stylesindex", () => {
	return gulp
		.src(["src/css/*.css", "src/css/adaptive/*.css"])
		.pipe(autoprefixer())
		.pipe(cssconcat("index.css"))
		.pipe(cssmin())
		.pipe(gulp.dest("dist/css"));
});

// Styles:const

gulp.task("stylesconst", () => {
	return gulp
		.src("src/css/__const/*.css")
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(gulp.dest("dist/css"));
});

// JavaScript

gulp.task("javascript", () => {
	return gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js"));
});

// Media

gulp.task("media", () => {
	return gulp.src("src/media/**/*").pipe(gulp.dest("dist/media"));
});

// Fonts

gulp.task("fonts", () => {
	return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

// Watch

gulp.task("watch", () => {
	gulp.watch("src/**/*.html", gulp.series("html"));
	gulp.watch("src/**/*.css", gulp.series("stylesindex", "stylesconst"));
	gulp.watch("src/**/*.js", gulp.series("javascript"));
	gulp.watch(
		["src/fonts/**/*", "src/media/**/*"],
		gulp.series("fonts", "media")
	);
});

// Delete

gulp.task("delete", () => {
	return del([
		"dist/styles",
		"dist/styles.css",
		"dist/scripts",
		"dist/scripts.js",
	]);
});

// Default

export default gulp.series(
	gulp.parallel(html, styles, javascript, more, fonts, images),
	gulp.parallel(watch, server)
);
