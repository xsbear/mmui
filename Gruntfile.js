/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
    // Task configuration.
    transport: {
      options: {
        debug: false
      },
      cmd: {
        options: {
          idleading: 'lib/<%= pkg.name %>/<%= pkg.version %>/'
        },
        files: [{
          cwd: 'src',
          src: '*.js',
          dest: '.build'
        }]
      }
    },
    concat: {
      cmd: {
        options: {
          include: 'relative'
        },
        files: {
          'dist/mmui_cmd.js': ['.build/mmui_cmd.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      mmui: {
        files: {
          'dist/mmui.min.js': ['src/mmui.js']
        }
      },
      cmd: {
        files: {
          'dist/mmui_cmd.js': ['dist/mmui_cmd.js']
        }
      }
    },
    clean: {
      build: ['.build']
    }
  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // cmd build
  grunt.registerTask('cmd', ['transport:cmd', 'concat:cmd', 'uglify:cmd', 'clean']);
  // Default task.
  grunt.registerTask('default', ['uglify:mmui']);
};
