import gulp from "gulp";

// HTML

export const html = () => {
	return gulp.src("public/**/*.html").pipe(gulp.dest("dist"));
};
