module.exports = function (grunt) {
    grunt.config('babel', {
        dist: {
            files: {
                'dist/videojs.chapter-thumbnails.js': 'src/videojs.chapter-thumbnails.js'
            }
        }
    });
};
