module.exports = function (grunt) {
    grunt.config('cssmin', {
        development: {
            files: {
                'tmp/videojs.chapter-thumbnails.min.css': 'src/videojs.chapter-thumbnails.css'
            }
        }
    });
};
