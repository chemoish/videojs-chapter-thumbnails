module.exports = function (grunt) {
    grunt.config('watch', {
        css: {
            files: [
                'src/*.css'
            ],

            tasks: [
                'cssmin:development'
            ]
        },

        grunt: {
            files: [
                'Gruntfile.js',
                'grunt/*.js'
            ]
        },

        options: {
            interrupt: true,
            livereload: true
        }
    });
};
