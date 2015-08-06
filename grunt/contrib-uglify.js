module.exports = function (grunt) {
    grunt.config('uglify', {
        dist: {
            files: {
                'dist/videojs.chapter-thumbnails.min.js': 'dist/videojs.chapter-thumbnails.js'
            }
        }
    });
};
