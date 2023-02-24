const gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const inject = require("gulp-inject");
const pug = require("gulp-pug");
const svgmin = require("gulp-svgmin");
const svgstore = require("gulp-svgstore");
const cheerio = require("gulp-cheerio");
const path = require("path");
const cleanCSS = require("gulp-clean-css");
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const { outRoot, outTheme, outTemplates, templatesPath, cssPath, assetsPath, } = require("./front.end.env.js");
var releaseMode = require("gulp-mode")({
    modes: ["production", "development"],
    default: "development",
    verbose: false,
});
gulp.task("sass", () =>
    gulp
    .src([`${cssPath}/**/*.scss`])
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(releaseMode.production(cleanCSS()))
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest(`${outTheme}/css`))
    .pipe(
        reload({
            stream: true,
        })
    )
    //.pipe(dest('./dist'))
);

gulp.task("pug", () =>
    gulp
    .src([`${templatesPath}/**/*.pug`])
    .pipe(
        pug({
            doctype: "html",
            pretty: true,
        })
    )
    .pipe(gulp.dest(`${outTemplates}`))
    .pipe(
        reload({
            stream: true,
        })
    )
);
gulp.task("inject-html", () =>
    gulp
    .src(`${outTemplates}/pages/*.html`)
    .pipe(
        inject(
            gulp.src([`${outTheme}/css/pages/*.css`, `${outTheme}/css/modules/*.css`, `${outTheme}/css/critical/*.css`], {
                read: false,
            }), {
                ignorePath: `${outTheme}`,
                addRootSlash: false,
                relative: true,
                name: "inject-style-modules",
                transform: function(filepath, file, index, length, targetFile) {
                    //console.log("filePath = " + filepath);
                    const d = new Date();
                    let time = d.getTime();
                    const content = targetFile.contents.toString("utf8");

                    const match = content.match(/<!--cssfiles:.+-->/);
                    let cssFiles = match[0];
                    cssFiles = cssFiles.replace("<!--cssfiles:", "").replace("-->", "");
                    const cssFileArr = cssFiles.split(",");
                    //console.log("cssFileArr = " + cssFileArr);
                    const filename = filepath.replace(/^.*[\\\/]/, "");
                    //console.log("filename = " + filename);
                    if (cssFileArr.includes(filename)) {
                        return `<link rel="stylesheet" href="${filepath}?v=${time}"></link>`;
                    }
                },
            }
        )
    )
    .pipe(
        inject(
            gulp.src([`${outTheme}/css/main*.css`], {
                read: false,
            }), {
                ignorePath: `${outTheme}`,
                addRootSlash: false,
                relative: true,
                name: "inject-style-main",
            }
        )
    )
    .pipe(
        inject(
            gulp.src([`${outRoot}/scripts/main.bundle*.js`, `${outRoot}/scripts/vendors.bundle*.js`], {
                read: false,
            }), {
                ignorePath: `${outRoot}`,
                addRootSlash: false,
                relative: true,
                name: "inject-script",
                transform: function(filepath) {
                    //console.log("filePath = " + filepath);
                    return `<script src="${filepath}" async ></script>`;
                },
            }
        )
    )
    .pipe(gulp.dest(`${outTemplates}/pages`))
);

gulp.task("svg-critical", function() {
    // ONLY build for SP and inject directly inline to default.html fe,_Master.cshtml be
    var svgs = gulp
        .src(`${assetsPath}/icons/inline/*.svg`)
        .pipe(
            svgmin(function(file) {
                var prefix = path.basename(file.relative, path.extname(file.relative));
                return {
                    plugins: [{
                        cleanupIDs: {
                            prefix: prefix + "-",
                            minify: true,
                        },
                    }, ],
                };
            })
        )
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(
            cheerio(function($) {
                // We need to add style for svg block to not break the layout
                $("svg").attr("style", "display:none;");
            })
        );

    function fileToString(filePath, file) {
        return file.contents.toString();
    }
    // Inject directly to the master file
    return gulp
        .src(`${outTemplates}/pages/*.html`)
        .pipe(inject(svgs, { transform: fileToString }))
        .pipe(gulp.dest(`${outTemplates}/pages`));
});


gulp.task("fe:dev", gulp.series("pug", "sass", "inject-html", "svg-critical"));