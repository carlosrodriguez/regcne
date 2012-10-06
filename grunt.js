module.exports = function(grunt) {

// Project configuration.
	grunt.initConfig({
		pkg: "<json:package.json>",

		test: {
			files: ["test/**/*.js"]
		},

		coffeelint: {
			app: ["source/coffee/*.coffee"]
		},

		coffee: {
			app: {
				src: ["source/coffee/*.coffee"],
				dest: "lib",
				options: {
					bare: true
				}
			}
		},

		lint: {
			files: ["grunt.js", "lib/**/*.js", "test/**/*.js"]
		},

		strip : {
			main : {
				files : "lib/**/*.js",
				inline : true,
				nodes : ["console"]
			}
		},

		"heroku-deploy" : {
			production : {
				deployBranch : "master"
			},
			staging : {
				deployBranch : "dev"
			}
		},

		watch: {
			files: "<config:lint.files>",
			tasks: "default"
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				node: true
			},

			globals: {
				exports: true
			}
		}
	});

	// Grunt modules
	grunt.loadNpmTasks("grunt-coffeelint");
	grunt.loadNpmTasks("grunt-coffee");
	grunt.loadNpmTasks("grunt-bump");
	grunt.loadNpmTasks("grunt-heroku-deploy");
	grunt.loadNpmTasks("grunt-strip");


	// Default task.

	grunt.registerTask("dev", "coffeelint coffee strip lint");

	grunt.registerTask("default", "dev watch");

	grunt.registerTask("release", "default bump heroku-deploy");

};