"use strict";

var _grunt = function(grunt)
{
    var _package = grunt.file.readJSON('package.json');
    var _devDeps = _package.devDependencies;

    var _loadGruntTasks = function()
    {
        Object
            .keys(_devDeps)
            .filter(function(task)
            {
                var _isGrunt = /^grunt-/;

                return _isGrunt.test(task)
            })
            .forEach(function(gruntTask)
            {
                grunt.loadNpmTasks(gruntTask);
            });
    }

    grunt.initConfig({
        pkg: _package,

        uglify:
        {
            dist:
            {
                files:
                {
                    'ng-xtorage-form.min.js': ['ng-xtorage-form.js']
                }
            }
        },

        karma:
        {
            unit:
            {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS'],
                singleRun: true
            }
        },

        coveralls:
        {
            options:
            {
                debug: true,
                coverageDir: 'coverage'
            }
        }

    })

    _loadGruntTasks();

    grunt.registerTask('build', ['karma:unit', 'uglify', 'coveralls']);
}

module.exports = _grunt;