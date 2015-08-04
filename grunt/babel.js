module.exports = function (grunt) {
    grunt.config('babel', {
        dist: {
            files: {
                'dist/videojs.chapters.js': 'src/videojs.chapters.js'
            }
        }
    });
};
