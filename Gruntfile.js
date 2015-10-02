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
};
