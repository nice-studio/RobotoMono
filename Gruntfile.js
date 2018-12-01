module.exports = function(grunt) {
	var gc = {
		fontVers: '1.0.0',
		fn: "robotomono",
		tasks: [
			'notify:watch',
			'less',
			'pug',
			'notify:done'
		]
	};
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		less: {
			css: {
				options : {
					compress: false,
					ieCompat: false,
					modifyVars: {
						fontpath: '"dist/fonts"'
					}
				},
				files : {
					'test/css/main.css' : [
						'src/less/main.less'
					],
					'dist/css/<%= globalConfig.fn %>.css' : [
						'src/less/fontface.less'
					]
				}
			},/*
			dist: {
				options : {
					compress: false,
					ieCompat: false,
					modifyVars: {
						fontpath: "dist/fonts"
					}
				},
				files : {
					'dist/css/<%= globalConfig.fn %>.css' : [
						'src/less/fontface.less'
					]
				}
			}*/
		},
		pug: {
			files: {
				options: {
					pretty: '\t',
					separator:  '\n'
				},
				files: {
					"index.html": ['src/pug/index.pug']
				}
			}
		},
		notify: {
			watch: {
				options: {
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: 'Запуск',
					image: __dirname+'\\src\\notify.png'
				}
			},
			done: {
				options: { 
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: "Успешно Завершено",
					image: __dirname+'\\src\\notify.png'
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			compile: {
				files: [
					'src/**/*.*'
				],
				tasks: gc.tasks
			}
		}
	});
	grunt.registerTask('dev',		['watch']);
	grunt.registerTask('default',	gc.tasks);
}