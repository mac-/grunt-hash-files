/*
 * grunt-hash-files
 * https://github.com/mac-/grunt-hash-files
 *
 * Copyright (c) 2014 mac-
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
		},

		// Configuration to be run (and then tested).
		hash_files: {
			default_options: {
				options: {
					numChars: 8
				},
				files: {
					'tmp/default_options1/{hash}/': ['test/fixtures/testing', 'test/fixtures/123'],
					'tmp/default_options2/{hash}/testing': ['test/fixtures/testing'],
				},
			},
			custom_options: {
				options: {
					algorithm: 'md5',
					token: '\<h[a4]sh\>'
				},
				expand: true,
				filter: 'isFile',
				flatten: true,
				src: ['test/fixtures/*'],
				dest: 'tmp/custom_options1/<h4sh>/'
			},
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'hash_files', 'nodeunit', 'clean']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
