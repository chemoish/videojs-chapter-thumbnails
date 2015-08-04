module.exports = function (grunt) {
    grunt.config('watch', {
        css: {
            files: [
                'src/*.css'
            ],

            tasks: [
                'cssmin:dist'
            ]
        },

        grunt: {
            files: [
                'Gruntfile.js',
                'grunt/*.js'
            ]
        },

        js: {
            files: [
                'src/*.js'
            ],

            tasks: [
                'babel:dist'
            ]
        },

        options: {
            interrupt: true,
            livereload: true
        }
    });
};
