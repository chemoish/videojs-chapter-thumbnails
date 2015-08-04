module.exports = function (grunt) {
    grunt.config('uglify', {
        dist: {
            files: {
                'dist/videojs.chapters.min.js': 'dist/videojs.chapters.js'
            }
        }
    });
};
