module.exports = function (grunt) {
    grunt.config('connect', {
        server: {
            options: {
                base: [
                    '.',
                    'example'
                ],

                open: true,
                port: 8080
            }
        }
    });
};
