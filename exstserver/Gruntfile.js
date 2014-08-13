/**
 * Created by dmantsevich on 8/12/2014.
 */
module.exports = function(grunt) {

    var SRC = [
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
    ];
    var resultFile = "<%= jsRoot %>/application.js",
        resultMinFile = "<%= jsRoot %>/application.min.js";

    grunt.initConfig({
        jsRoot: "public/resources/js",
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {},
            app: {
                src: SRC,
                dest: resultFile
            },
            min: {
                src: SRC,
                dest: resultMinFile
            }
        },
        'closure-compiler': {
            frontend: {
                closurePath: './',
                js: resultFile,
                jsOutputFile: resultMinFile,
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

    grunt.registerTask('default', ['concat:app', 'closure-compiler']);
    grunt.registerTask('quick', ['concat:min']);

};