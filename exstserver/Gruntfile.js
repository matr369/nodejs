/**
 * Created by dmantsevich on 8/12/2014.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        jsRoot: "public/resources/js",
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {},
            dist: {
                src: [
                    "<%= jsRoot %>/libs/jquery-2.1.1.js",
                    "<%= jsRoot %>/libs/lodash-2.4.1.js",
                    "<%= jsRoot %>/libs/sha3.js",
                    "<%= jsRoot %>/libs/doT.js",
                    "<%= jsRoot %>/libs/backbone.js",
                    "<%= jsRoot %>/libs/bootstrap.min.js",
                    "<%= jsRoot %>/libs/typeahead.jquery.js",
                    "<%= jsRoot %>/Core/**/*.js",
                    "<%= jsRoot %>/Config.js",
                    "<%= jsRoot %>/App.js",
                    "<%= jsRoot %>/main.js"
                ],
                dest: "<%= jsRoot %>/application.js"
            }
        },
        'closure-compiler': {
            frontend: {
                closurePath: './',
                js: "<%= jsRoot %>/application.js",
                jsOutputFile: "<%= jsRoot %>/application.min.js",
                maxBuffer: 500,
                noreport: true,
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS'
                }
            }
        },
        watch: {
            files: ['<%= jsRoot %>/**/*.js'],
            tasks: ['concat']
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-closure-compiler');

    grunt.registerTask('default', ['concat', 'closure-compiler']);

};