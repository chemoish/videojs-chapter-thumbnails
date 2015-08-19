module.exports = function (grunt) {
    grunt.config('karma', {
        unit: {
            autoWatch: true,
            background: true,
            configFile: 'karma.conf.js'
        },

        ci: {
            singleRun: true,
            configFile: 'karma.conf.js'
        }
    });
};
