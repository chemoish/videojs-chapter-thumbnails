module.exports = function (grunt) {
    grunt.config('cssmin', {
        dist: {
            files: {
                'dist/videojs.chapters.min.css': 'src/videojs.chapters.css'
            }
        }
    });
};
