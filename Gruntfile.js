/*global module*/
var ES6ModulesPaths = ['controllers/*.js', 'models/*.js', 'routes/*.js', 'views/*.js'];

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        transpile: {
            main: {
                type: "yui",
                files: [{
                    expand: true,
                    src: ES6ModulesPaths,
                    dest: 'tmp/'
                }]
            }
        },
        watch: {
            scripts: {
                files: ES6ModulesPaths,
                tasks: ['transpile'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-es6-module-transpiler');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['transpile']);

};
