module.exports = function (grunt) {
    grunt.config('bump', {
        options: {
            commitFiles: [
                'package.json'
            ],

            commitMessage: 'Release v%VERSION%',

            files: [
                'package.json'
            ],

            pushTo: 'origin',
            tagName: 'v%VERSION%'
        }
    });
};
