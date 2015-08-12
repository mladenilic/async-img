/*global module, require*/
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: 'src/<%= pkg.name %>.js',
            tasks: ['jshint'],
        },

        uglify: {
            js: {
                files: {'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']}
            }
        },

        jshint: {
            options: {jshintrc: '.jshintrc'},
            src: 'src/<%= pkg.name %>.js'
        }
    });

    grunt.registerTask('default', 'watch');
    grunt.registerTask('release', ['jshint', 'uglify']);
};
