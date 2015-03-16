module.exports = function(grunt) {
  var autoprefixer = require('autoprefixer-core');

  grunt.initConfig({
    jshint: {
      src: ['client/js/*.js'],
      options: {
        curly:  true,
        immed:  true,
        newcap: true,
        noarg:  true,
        sub:    true,
        boss:   true,
        eqnull: true,
        node:   true,
        undef:  true,
        devel:  true,
        globals: {
          _:       false,
          jQuery:  false,
          angular: false,
          moment:  false,
          console: false,
          $:       false,
          io:      false
        }
       }
    },
    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['jshint'],
      },
      css: {
        files: ['**/*.less'],
        tasks: ['less', 'postcss', 'cssmin'],
      },
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['client/js/*.js'],
        dest: 'client/dist/js/built.js',
      },
    },
    uglify: {
      my_target: {
        files: {
          'client/dist/js/built.min.js': ['client/dist/js/built.js']
        }
      }
    },
    less: {
    build: {
        files: {
          'client/dist/css/main.css': 'client/css/main.less'
        }
      }
    },
    postcss: {
        options: {
            processors: [
              autoprefixer({ browsers: ['last 2 version'] }).postcss
            ]
        },
        dist: { src: 'client/dist/css/*.css' }
    },
    cssmin: {
      build: {
        files: {
          'client/dist/css/main.min.css': 'client/dist/css/main.css'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'client/karma.conf.js',
      	runnerPort: 9009,
      	singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask( 'default', [ 'jshint', 'concat', 'uglify', 'less', 'postcss', 'cssmin', 'karma' ] );
};

