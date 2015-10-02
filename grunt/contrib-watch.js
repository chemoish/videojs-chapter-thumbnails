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

        js: {
            files: [
                'src/*.js',
                'test/*.js'
            ],

            tasks: [
                // 'karma:unit:run'
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
