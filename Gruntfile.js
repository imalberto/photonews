module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        transpile: {
            main: {
                type: "yui",
                files: [{
                    expand: true,
                    cwd: 'public/js/',
                    src: [
                        'pnapp.js', 'controllers/*.js', 'handlers/*.js',
                        'models/*.js', 'views/*.js'
                    ],
                    dest: 'tmp/'
                }]
            }
        },
        watch: {
            scripts: {
                files: [
                    'public/js/pnapp.js', 'public/js/controllers/*.js',
                    'public/js/handlers/*.js', 'public/js/models/*.js',
                    'public/js/views/*.js'
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
