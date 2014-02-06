'use strict';

var grunt = require('grunt');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports.hash_files = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	default_options: function(test) {
		test.expect(3);

		var actual = grunt.file.read('tmp/default_options1/bdb72f90/test/fixtures/123');
		var expected = grunt.file.read('test/fixtures/123');
		test.equal(actual, expected, 'should have copied the file (123) to a dir containing the sha1 hash of both testing and 123.');

		actual = grunt.file.read('tmp/default_options1/bdb72f90/test/fixtures/testing');
		expected = grunt.file.read('test/fixtures/testing');
		test.equal(actual, expected, 'should have copied the file (testing) to a dir containing the sha1 hash of both testing and 123.');

		actual = grunt.file.read('tmp/default_options2/0820b32b/testing');

		test.equal(actual, expected, 'should have copied the file (testing) to a dir containing the sha1 hash of just testing.');

		test.done();
	},
	custom_options: function(test) {
		test.expect(2);

		var actual = grunt.file.read('tmp/custom_options1/6a003f0e4118bfb4dc9a3b6089edf352/123');
		var expected = grunt.file.read('test/fixtures/123');
		test.equal(actual, expected, 'should have copied the file (123) to a dir containing the md5 hash of both testing and 123 and flattened the dir structure.');

		actual = grunt.file.read('tmp/custom_options1/6a003f0e4118bfb4dc9a3b6089edf352/testing');
		expected = grunt.file.read('test/fixtures/testing');
		test.equal(actual, expected, 'should have copied the file (testing) to a dir containing the md5 hash of both testing and 123 and flattened the dir structure.');

		test.done();
	},
	more_custom_options: function(test) {
		test.expect(2);

		var actual = grunt.file.read('tmp/more_custom_options1/bdb72f90/test/fixtures/123');
		var expected = grunt.file.read('test/fixtures/123');
		test.equal(actual, expected, 'should have copied the file (123) to a dir containing the sha1 hash of both testing and 123.');

		actual = grunt.file.read('tmp/more_custom_options2/bdb72f90/123');
		test.equal(actual, expected, 'should have copied the file (123) to a dir containing the sha1 hash of both testing and 123 and flattened the dir structure.');

		test.done();
	}
};
