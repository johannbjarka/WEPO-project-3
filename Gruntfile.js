module.exports = function(grunt) {

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

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['client/js/*.js'],
        dest: 'client/dist/built.js',
      },
    },

    uglify: {
      my_target: {
        files: {
          'client/dist/built.min.js': ['cLient/dist/built.js']
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
    cssmin: {
      build: {
        files: {
          'client/dist/css/main.min.css': 'client/dist/css/main.css'
        }
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask( 'default', [ 'jshint', 'concat', 'uglify', 'less', 'cssmin' ] );
};

