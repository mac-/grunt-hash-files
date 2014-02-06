/*
 * grunt-hash-files
 * https://github.com/mac-/grunt-hash-files
 *
 * Copyright (c) 2014 mac-
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	var path = require('path'),
		fs = require('fs'),
		chalk = require('chalk'),
		_ = require('underscore'),
		hashFiles = require('hash-files');

	grunt.registerMultiTask('hash_files', 'Copies files to a directory that includes a hash of the contents of those files.', function() {

		var options = this.options({
				encoding: grunt.file.defaultEncoding,
				mode: false,
				numChars: undefined,
				token: '{hash}',
				algorithm: 'sha1'
			}),
			hashRegex = new RegExp(options.token, 'g'),
			hash = '',
			dest,
			filesNoDirs,
			isExpandedPair,	
			self = this,
			tally = {
				dirs: 0,
				files: 0
			};

		this.files.forEach(function(filePair) {

			isExpandedPair = filePair.orig.expand || false;

			// something weird happens when expand is true and compact src/dest format is used
			// all the files globbed become their own file pair... this makes it look like each
			// file should have it's own dest dir, which affects how the hash in the dest is generated
			// so.... let's hack around it!
			if (isExpandedPair && self.data.src && self.data.src.length > 0) {
				filesNoDirs = _.map(self.files, function(fPair) {
					return fPair.src[0];
				});
			}
			else if (isExpandedPair && self.data.files && self.data.files instanceof Array) {
				filesNoDirs = _.groupBy(self.files, function(fPair) {
					return fPair.orig.dest;
				});
				filesNoDirs = _.map(filesNoDirs[filePair.orig.dest], function(fPair) {
					return fPair.src[0];
				});
			}
			else {
				filesNoDirs = _.filter(filePair.src, function(src) {
					return !grunt.file.isDir(src)
				});
			}

			hash = hashFiles.sync({
				files: filesNoDirs,
				noGlob: true,
				algorithm: options.algorithm,
				encoding: options.encoding
			});

			hash = hash.substr(0, options.numChars);

			filePair.src.forEach(function(src) {
				if (detectDestType(filePair.dest) === 'directory') {
					dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
				} else {
					dest = filePair.dest;
				}
				dest = dest.replace(hashRegex, hash);

				if (grunt.file.isDir(src)) {
					grunt.verbose.writeln('Creating ' + chalk.cyan(dest));
					grunt.file.mkdir(dest);
					tally.dirs++;
				} else {
					grunt.verbose.writeln('Copying ' + chalk.cyan(src) + ' -> ' + chalk.cyan(dest));
					grunt.file.copy(src, dest, options);
					if (options.mode !== false) {
						fs.chmodSync(dest, (options.mode === true) ? fs.lstatSync(src).mode : options.mode);
					}
					tally.files++;
				}
			});
		});

		if (tally.dirs) {
			grunt.log.write('Created ' + chalk.cyan(tally.dirs.toString()) + ' directories');
		}

		if (tally.files) {
			grunt.log.write((tally.dirs ? ', copied ' : 'Copied ') + chalk.cyan(tally.files.toString()) + (tally.files === 1 ? ' file' : ' files'));
		}

		grunt.log.writeln();
	});

	var detectDestType = function(dest) {
		if (grunt.util._.endsWith(dest, '/')) {
			return 'directory';
		} else {
			return 'file';
		}
	};

	var unixifyPath = function(filepath) {
		if (process.platform === 'win32') {
			return filepath.replace(/\\/g, '/');
		} else {
			return filepath;
		}
	};


};
