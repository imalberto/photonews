module.exports = function(grunt) {

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
        }
    });

    grunt.loadNpmTasks('grunt-es6-module-transpiler');

    grunt.registerTask('default', ['transpile']);

};
