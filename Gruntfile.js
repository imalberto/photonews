module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        transpile: {
            main: {
                type: "yui",
                files: [{
                    expand: true,
                    cwd: 'public/js/',
                    src: ['**/news.js'],
                    dest: 'tmp/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'public/styles',
                    src: ['*.scss'],
                    dest: 'build/css',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-es6-module-transpiler');

    grunt.registerTask('default', ['sass', 'transpile']);

};
