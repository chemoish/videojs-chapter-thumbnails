module.exports = function (grunt) {
    grunt.config('copy', {
        dist: {
            files: [{
                dest: 'dist/',
                expand: true,
                flatten: true,
                src: 'tmp/*'
            }]
        }
    });
};
