module.exports = function (grunt) {
    grunt.config('bump', {
        options: {
            commitFiles: [
                'bower.json',
                'package.json'
            ],

            commitMessage: 'Release v%VERSION%',

            files: [
                'bower.json',
                'package.json'
            ],

            pushTo: 'origin',
            tagName: 'v%VERSION%'
        }
    });
};
