module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        },
        transpile: {
            main: {
                type: "yui",
                files: [{
                    expand: true,
                    cwd: 'public/js/',
                    src: ['controllers/*.js', 'handlers/*.js', 'models/*.js'],
                    dest: 'tmp/'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['public/js/controllers/*.js', 'public/js/handlers/*.js', 'public/js/models/*.js'],
                tasks: ['transpile'],
                options: {
                    spawn: false
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-es6-module-transpiler');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'transpile']);

};
