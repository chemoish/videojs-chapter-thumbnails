module.exports = function (grunt) {
    // load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // time how long tasks take. can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: [
            '/**',
            ' * <%= _.titleize(pkg.name) %> v<%= pkg.version %>',
            ' *',
            ' * @date: <%= grunt.template.today("yyyy-mm-dd") %>',
            ' */\n\n'
        ].join('\n')
    });

    grunt.loadTasks('grunt');

    grunt.registerTask('default', 'Running development environment…', [
        'build:development'
    ]);

    grunt.registerTask('build:development', 'Running development build tasks…', [
        'babel:dist',
        'cssmin:dist',
        'connect',
        'watch'
    ]);

    grunt.registerTask('build:production', 'Running production build tasks…', [
        'clean:dist',
        'babel:dist',
        'cssmin:dist',
        'uglify:dist'
    ]);
};
