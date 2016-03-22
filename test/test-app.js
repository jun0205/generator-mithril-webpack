'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs-extra');

describe('mithril-webpack:app', function() {
	before(function(done) {
		helpers.run(path.join(__dirname, '../generators-cov/app'))
			.withPrompts({
				'useJQuery': false,
				'useGit': false
			})
			.withOptions({
				skipInstall: true
			})
			.on('end', done);
	});

	it('creates the application structure', function() {
		assert.file([
			'package.json',
			'webpack.config.js',
			'webpack.production.config.js',
			'.gitignore',
			'.jshintrc',
			'src',
			'src/index.html',
			'src/index.js',
			'src/styles/styles.less',
			'src/components/README.md',
			'src/images/README.md',
			'src/models/README.md',
			'src/modules/README.md',
		]);
	});
});

describe('mithril-webpack:component', function() {
	before(function(done) {
		helpers.run(path.join(__dirname, '../generators-cov/component'))
			.withOptions({
				skipInstall: true
			})
			.withArguments(['testComponent'])
			.inTmpDir(function(dir) {
				var done = this.async();
				fs.outputFile(path.join(dir, 'src/styles/styles.less'), '', done);
			})
			.on('end', done);
	});

	it('creates the component structure', function() {
		assert.file([
			'src/components/testComponent/controller.js',
			'src/components/testComponent/index.js',
			'src/components/testComponent/view.js',
			'src/components/testComponent/viewModel.js',
			'src/components/testComponent/style.less'
		]);
	});
});

describe('mithril-webpack:model', function() {
	before(function(done) {
		helpers.run(path.join(__dirname, '../generators-cov/model'))
			.withOptions({
				skipInstall: true
			})
			.withArguments(['testModel'])
			.on('end', done);
	});

	it('creates the model file', function() {
		assert.file([
			'src/models/testModel.js'
		]);
	});
});

describe('mithril-webpack:route', function() {
	before(function(done) {
		helpers.run(path.join(__dirname, '../generators-cov/route'))
			.withOptions({
				skipInstall: true,
				// We are forcing here because the yeoman conflict
				// resolver will throw errors if we don't force it
				// to overwrite
				force: true
			})
			.withArguments(['/testRoute'])
			.inTmpDir(function (dir) {
				var doneSetup = this.async();
				fs.copy(path.join(__dirname, '../generators/app/templates/src/index.js'), path.join(dir, 'src/index.js'), function(err) {
					fs.outputFile(path.join(dir, 'src/styles/styles.less'), '', function(err) {
						doneSetup();
					});
				});
			})
			.on('end', done);
	});

	it('creates the module structure', function() {
		assert.file([
			'src/modules/testRoute/controller.js',
			'src/modules/testRoute/index.js',
			'src/modules/testRoute/view.js',
			'src/modules/testRoute/viewModel.js',
			'src/modules/testRoute/style.less'
		]);
	});
});