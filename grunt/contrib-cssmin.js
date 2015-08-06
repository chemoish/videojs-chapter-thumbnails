module.exports = function (grunt) {
    grunt.config('cssmin', {
        dist: {
            files: {
                'dist/videojs.chapter-thumbnails.min.css': 'src/videojs.chapter-thumbnails.css'
            }
        }
    });
};
