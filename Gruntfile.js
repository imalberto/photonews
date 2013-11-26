module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        transpile: {
            main: {
                type: "yui",
                files: [{
                    expand: true,
                    cwd: 'public/js/',
                    src: ['**/*.js'],
                    dest: 'tmp/'
                }]
            }
        },
        watch: {
            scripts: {
                files: [
                    'public/js/**/*.js'
                ],
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
