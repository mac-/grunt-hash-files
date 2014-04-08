# grunt-hash-files

> Copies files to a directory that includes a hash of the contents of those files. This is useful for versioning the contents of a folder.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hash-files --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hash-files');
```

## The "hash_files" task

### Overview
In your project's Gruntfile, add a section named `hash_files` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	hash_files: {
		options: {
			// Task-specific options go here.
		},
		your_target: {
			// Target-specific file lists and/or options go here.
		},
	},
});
```

### Options

#### algorithm
Type: `String`
Default value: `"sha1"`

A string value that is the type of hashing algorithm to use. Must be either "sha1" or "md5".

#### numChars
Type: `Number`
Default value: `undefined`

The number of characters from the beginning of the hash value to use. When set to undefined, all characters are used.

#### token
Type: `String`
Default value: `"{hash}"`

The string used as a token for where the actual hash value should be replaced.

#### encoding
Type: `String`  
Default: `grunt.file.defaultEncoding`

The file encoding to copy files with.

#### mode
Type: `Boolean` or `Number`  
Default: `false`

Whether to copy or set the existing file permissions. Set to `true` to copy the existing file permissions. Or set to the mode, i.e.: `0644`, that copied files will be set to.


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the files would be copied to the following directory: `dest/41c45d195416ad480be844112c8e596ac367628c/`

```js
grunt.initConfig({
	hash_files: {
		options: {},
		files: {
			'dest/{hash}/': ['src/testing', 'src/123'],
		},
	},
});
```


#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the files would be copied to the following directory: `dest/236a956/`

```js
grunt.initConfig({
	hash_files: {
		options: {
			algorithm: 'md5',
			numChars: 7,
			token: '\<token\>'
		},
		files: {
			'dest/<token>/': ['src/testing', 'src/123'],
		},
	},
});
```


Here are some additional examples, given the following file tree:
```shell
$ tree -I node_modules
.
├── Gruntfile.js
└── src
    ├── a
    └── subdir
        └── b

2 directories, 3 files
```

**Copy a single file tree:**
```js
hash_files: {
	main: {
		src: 'src/*',
		dest: '{hash}/'
	}
},
```

```shell
$ grunt hash-files
Running "hash_files:main" (hash_files) task
Created 1 directories, copied 1 files

Done, without errors.
$ tree -I node_modules
.
├── Gruntfile.js
├── bdb72f90802abc542e79d0e6eb809d7ed71b0f00
│   └── src
│       ├── a
│       └── subdir
└── src
    ├── a
    └── subdir
        └── b

5 directories, 4 files
```

**Flattening the filepath output:**

```js
hash_files: {
	options: {
		numChars: 8,
		algorithm: 'md5'
	},
	main: {
		expand: true,
		cwd: 'src/',
		src: '**',
		dest: '{hash}/',
		flatten: true,
		filter: 'isFile'
	}
},
```

```shell
$ grunt hash_files
Running "hash_files:main" (hash_files) task
Copied 2 files

Done, without errors.
$ tree -I node_modules
.
├── Gruntfile.js
├── 6a003f0e
│   ├── a
│   └── b
└── src
    ├── a
    └── subdir
        └── b

3 directories, 5 files
```
