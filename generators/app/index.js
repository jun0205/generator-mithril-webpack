'use strict';
var yeoman = require('yeoman-generator');
var astQuery = require('ast-query');

module.exports = yeoman.generators.Base.extend({
	constructor: function() {
		yeoman.generators.Base.apply(this, arguments);
	},
	prompting: function() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log('Welcome to the awe-inspiring Mithril generator!');

		// Let the user know this generator will create a new directory
		this.log('INFO: This generator will create a new directory for your project with the provided project name.');

		var prompts = [];

		// Prompt user for project name
		prompts.push({
			type: 'input',
			name: 'projectName',
			message: 'What is the name of your project?',
			validate: function(result) {
				if(result.toString().trim().length > 0) {
					return true;
					// TODO: Check if the folder exists, we dont want to overwrite folders
					// if(this.fs.exists(this.destinationPath(result)) == false) {
					// 	return true;
					// } else {
					// 	return 'Directory ' + this.destinationPath(result) + ' already exists!';
					// }
				}
				return 'Please enter a name for your project.';
			}.bind(this)
		});

		// Prompt user for jQuery inclusion
		prompts.push({
			type: 'confirm',
			name: 'useJQuery',
			message: 'Would you like to use jQuery in your project?',
			default: false
		});
		
		// Prompt user for Git repo creation
		prompts.push({
			type: 'confirm',
			name: 'useGit',
			message: 'Would you like us to setup a Git repo for you?',
			default: false
		});

		this.prompt(prompts, function(answer) {
			this.promptResults = answer;
			// Set the destination root to the provided project name
			this.destinationRoot(this.promptResults.projectName);
			done();
		}.bind(this));
	},

	writing: {
		configFiles: function() {
			// Copy the NPM package json file
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{ projectName: this.promptResults.projectName || 'Untitled' }
			);
			// Copy the gitignore file
			this.fs.copy(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);
			// Copy the webpack config file
			this.fs.copy(
				this.templatePath('_webpack.config.js'),
				this.destinationPath('webpack.config.js')
			);
			// Copy the webpack production config file
			this.fs.copy(
				this.templatePath('_webpack.production.config.js'),
				this.destinationPath('webpack.production.config.js')
			);
			// Copy the gitkeep files
			this.fs.copy(
				this.templatePath('src/**/.gitkeep'),
				this.destinationPath('src')
			);
			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
		},
		projectfiles: function() {
			// Copy the source folder
			this.fs.copy(
				this.templatePath('src/**/*'),
				this.destinationPath('src')
			);
			// Copy index file and fill in our values
			this.fs.copyTpl(
				this.templatePath('src/index.html'),
				this.destinationPath('src/index.html'),
				{ projectName: this.promptResults.projectName || 'Untitled' }
			);
		},
		jQuery: function() {
			if(this.promptResults.useJQuery) {
				var sourcePath = this.destinationPath('webpack.config.js');
				// Tree is an instance of ast-query
				var tree = astQuery(this.fs.read(sourcePath));
				// Module exports is an assignment node
				var moduleExports = tree.assignment('module.exports').value();
				// Plugins is an array expression node
				var plugins = moduleExports.key('plugins');
				var providePlugin = plugins.nodes[0].elements.reduce(function(result, current) {
					if(current.callee.property && current.callee.property.name === 'ProvidePlugin') {
						return current;
					}
					return result;
				});
				if(providePlugin) {
		 			var pluginArguments = providePlugin.arguments[0].properties;
		 			pluginArguments.push({
		 				type: 'Property',
		 				key: {
		 					type: 'Identifier',
		 					name: '$'
		 				},
		 				value: {
		 					type: 'Literal',
		 					value: 'jquery'
		 				}
		 			});
		 			pluginArguments.push({
		 				type: 'Property',
		 				key: {
		 					type: 'Identifier',
		 					name: 'jQuery'
		 				},
		 				value: {
		 					type: 'Literal',
		 					value: 'jquery'
		 				}
		 			});
		 			pluginArguments.push({
		 				type: 'Property',
		 				key: {
		 					type: 'Identifier',
		 					name: 'jquery'
		 				},
		 				value: {
		 					type: 'Literal',
		 					value: 'jquery'
		 				}
		 			});
				}
				this.fs.write(sourcePath, tree.toString());
			}
		}
	},

	install: function() {
		// Init git repo
		if(this.promptResults.useGit) {
			// TODO: This is ugly and will need to be fixed at some point!
			this.spawnCommand('git', ['init']).on('close', function() {
				this.spawnCommand('git', ['add', '.']).on('close', function() {
					this.spawnCommand('git', ['commit', '-m', '"Initial Commit"']);
				}.bind(this));
			}.bind(this));
		}

		var optionalDependencies = [];
		// Install jQuery
		if(this.promptResults.useJQuery) {
			optionalDependencies.push('jquery');
		}

		// Install dependencies
		this.npmInstall(optionalDependencies, {
			save: true
		});
		this.installDependencies({
			npm: true,
			bower: false
		});
	}
});