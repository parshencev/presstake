var gulp = require("gulp"),
    less = require("gulp-less"),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 20 versions"]}),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleanCSSPlugin = new LessPluginCleanCSS({advanced: true}),
    browserSync = require('browser-sync').create(),
    paths = {
      less : "./less/*.less",
      css : "./css/",
      server : "./"
    };

gulp.task("default", ["less", "serve"]);

gulp.task("less", function(){
  return  gulp.src(paths.less)
          .pipe(less({
            pugins : [autoprefixPlugin, cleanCSSPlugin]
          }))
          .pipe(gulp.dest(paths.css));
});

gulp.task("serve", function(){
  browserSync.init({
    server : paths.server
  });

  gulp.watch(paths.less, ["less"]);
  gulp.watch(paths.less).on("change", browserSync.reload);
});